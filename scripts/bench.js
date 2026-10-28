import { execSync } from 'child_process';

const code = `(async () => {
  return new Promise((resolve) => {
    const frameDeltas = [];
    const longTasks = [];
    let lastTime = performance.now();
    let isRunning = true;

    let observer;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {}

    const onFrame = (now) => {
      if (!isRunning) return;
      const delta = now - lastTime;
      lastTime = now;
      frameDeltas.push(delta);
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);

    const startTime = performance.now();
    const duration = 10000;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const scrollInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(scrollInterval);
        isRunning = false;
        if (observer) observer.disconnect();

        const samples = frameDeltas.slice(2);
        samples.sort((a, b) => a - b);

        const totalFrames = samples.length;
        const sum = samples.reduce((acc, v) => acc + v, 0);
        const mean = sum / totalFrames;
        const min = samples[0];
        const max = samples[samples.length - 1];
        const p50 = samples[Math.floor(totalFrames * 0.5)];
        const p95 = samples[Math.floor(totalFrames * 0.95)];
        const p99 = samples[Math.floor(totalFrames * 0.99)];

        const dropped60 = samples.filter((d) => d > 16.67).length;
        const dropped120 = samples.filter((d) => d > 8.33).length;

        resolve({
          durationSec: Number((elapsed / 1000).toFixed(2)),
          totalFrames,
          meanFrameMs: Number(mean.toFixed(2)),
          minFrameMs: Number(min.toFixed(2)),
          maxFrameMs: Number(max.toFixed(2)),
          p50FrameMs: Number(p50.toFixed(2)),
          p95FrameMs: Number(p95.toFixed(2)),
          p99FrameMs: Number(p99.toFixed(2)),
          longTasksCount: longTasks.length,
          longTasksMaxMs: longTasks.length > 0 ? Number(Math.max(...longTasks.map(t => t.duration)).toFixed(2)) : 0,
          droppedFrames60Hz: dropped60,
          droppedFrames120Hz: dropped120,
          fpsRendered: Number((totalFrames / (elapsed / 1000)).toFixed(1)),
        });
        return;
      }

      const progress = elapsed / duration;
      const wave = (Math.sin(progress * Math.PI * 4 - Math.PI / 2) + 1) / 2;
      window.scrollTo(0, wave * maxScroll);
    }, 16);
  });
})()`;

const oneLiner = code.replace(/\n\s*/g, ' ');
try {
  const output = execSync(`playwright-cli eval "${oneLiner.replace(/"/g, '\\"')}"`, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 30000,
  });
  console.log(output);
} catch (err) {
  console.error('Bench error:', err.stdout || err.message);
}
