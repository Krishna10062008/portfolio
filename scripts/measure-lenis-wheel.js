import { execSync } from 'child_process';

const script = `
(async () => {
  return new Promise((resolve) => {
    const frameDeltas = [];
    const longTasks = [];
    let lastTime = performance.now();
    let isRunning = true;

    // Observe long tasks
    let observer;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
          });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {}

    // Frame tracking loop
    const onFrame = (now) => {
      if (!isRunning) return;
      const delta = now - lastTime;
      lastTime = now;
      frameDeltas.push(delta);
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);

    // Continuous 10-second wheel scroll test (simulating realistic user wheel gestures)
    const startTime = performance.now();
    const duration = 10000; // 10 seconds

    const wheelInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(wheelInterval);
        isRunning = false;
        if (observer) observer.disconnect();

        // Calculate statistics
        // Discard first 5 warmup frames
        const samples = frameDeltas.slice(5);
        samples.sort((a, b) => a - b);

        const totalFrames = samples.length;
        const sum = samples.reduce((acc, v) => acc + v, 0);
        const mean = sum / totalFrames;
        const min = samples[0];
        const max = samples[samples.length - 1];
        const p50 = samples[Math.floor(totalFrames * 0.5)];
        const p90 = samples[Math.floor(totalFrames * 0.90)];
        const p95 = samples[Math.floor(totalFrames * 0.95)];
        const p99 = samples[Math.floor(totalFrames * 0.99)];

        const dropped60 = samples.filter((d) => d > 20).length;

        resolve({
          durationSec: Number((elapsed / 1000).toFixed(2)),
          totalFrames,
          meanFrameMs: Number(mean.toFixed(2)),
          minFrameMs: Number(min.toFixed(2)),
          maxFrameMs: Number(max.toFixed(2)),
          p50FrameMs: Number(p50.toFixed(2)),
          p90FrameMs: Number(p90.toFixed(2)),
          p95FrameMs: Number(p95.toFixed(2)),
          p99FrameMs: Number(p99.toFixed(2)),
          longTasksCount: longTasks.length,
          longTasksMaxMs: longTasks.length > 0 ? Number(Math.max(...longTasks.map(t => t.duration)).toFixed(2)) : 0,
          droppedFramesOver20Ms: dropped60,
          fpsEstimated: Number((totalFrames / (elapsed / 1000)).toFixed(1)),
        });
        return;
      }

      // Alternate scrolling down for 5s then up for 5s with realistic wheel deltaY
      const direction = elapsed < (duration / 2) ? 1 : -1;
      const wheelEv = new WheelEvent('wheel', {
        deltaY: direction * 120,
        deltaMode: 0,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(wheelEv);
    }, 32);
  });
})()
`;

const res = execSync(`playwright-cli eval "${script.replace(/\n\s*/g, ' ').replace(/"/g, '\\"')}"`, {
  encoding: 'utf-8',
  timeout: 30000,
});
console.log(res);
