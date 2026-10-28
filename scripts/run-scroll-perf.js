// Scroll performance test script for playwright-cli run-code
const result = await page.evaluate(async () => {
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
    } catch (e) {
      // fallback if longtask not supported
    }

    // Frame tracking loop
    const onFrame = (now) => {
      if (!isRunning) return;
      const delta = now - lastTime;
      lastTime = now;
      frameDeltas.push(delta);
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);

    // Continuous 10-second scroll test (top to bottom and back)
    const startTime = performance.now();
    const duration = 10000; // 10 seconds
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const scrollInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(scrollInterval);
        isRunning = false;
        if (observer) observer.disconnect();

        // Calculate statistics
        // Discard first 2 warmup frames
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

        // Dropped frames (> 16.67ms for 60Hz target)
        const dropped60 = samples.filter((d) => d > 16.67).length;
        // Dropped frames (> 8.33ms for 120Hz target)
        const dropped120 = samples.filter((d) => d > 8.33).length;

        resolve({
          durationSec: (elapsed / 1000).toFixed(2),
          totalFrames,
          meanMs: Number(mean.toFixed(2)),
          minMs: Number(min.toFixed(2)),
          maxMs: Number(max.toFixed(2)),
          p50Ms: Number(p50.toFixed(2)),
          p95Ms: Number(p95.toFixed(2)),
          p99Ms: Number(p99.toFixed(2)),
          longTasksCount: longTasks.length,
          longTasksMaxMs: longTasks.length > 0 ? Number(Math.max(...longTasks.map(t => t.duration)).toFixed(2)) : 0,
          droppedFrames60Hz: dropped60,
          droppedFrames120Hz: dropped120,
          fpsEstimated: Number((totalFrames / (elapsed / 1000)).toFixed(1)),
        });
        return;
      }

      // Smooth ping-pong scroll
      const progress = (elapsed / duration); // 0 -> 1
      // Oscillate 2 full cycles up and down
      const wave = (Math.sin(progress * Math.PI * 4 - Math.PI / 2) + 1) / 2;
      window.scrollTo(0, wave * maxScroll);
    }, 16);
  });
});

console.log('PERF_METRICS_JSON:' + JSON.stringify(result));
