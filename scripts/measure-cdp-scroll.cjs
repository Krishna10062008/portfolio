const { chromium } = require('playwright');

async function main() {
  console.log('Launching Chromium for scroll performance profiling...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Connect CDP session
  const client = await context.newCDPSession(page);
  await client.send('Performance.enable');

  // Initial metrics baseline
  const baselineMetrics = await client.send('Performance.getMetrics');

  // Inject in-page frame delta and longtask observer
  await page.evaluate(() => {
    window.__perf = {
      frameTimes: [],
      longTasks: [],
      lastTime: performance.now(),
      running: true,
    };

    // Longtask observer
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perf.longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {}

    // rAF frame time tracker
    function trackFrame(now) {
      if (!window.__perf.running) return;
      const delta = now - window.__perf.lastTime;
      window.__perf.lastTime = now;
      window.__perf.frameTimes.push(delta);
      requestAnimationFrame(trackFrame);
    }
    requestAnimationFrame(trackFrame);
  });

  console.log('Starting 10-second continuous scroll performance run...');
  const durationMs = 10000;
  const startTime = Date.now();
  let step = 0;

  // Real mouse wheel input loop over 10 seconds (down and up)
  while (Date.now() - startTime < durationMs) {
    const elapsed = Date.now() - startTime;
    // Oscillate wheel: downwards for first 5s, upwards for last 5s
    const deltaY = elapsed < (durationMs / 2) ? 60 : -60;
    await page.mouse.wheel(0, deltaY);
    await new Promise((r) => setTimeout(r, 16));
    step++;
  }

  // Final metrics from CDP
  const finalMetrics = await client.send('Performance.getMetrics');

  // Retrieve in-page performance data
  const report = await page.evaluate(() => {
    window.__perf.running = false;
    const frames = window.__perf.frameTimes.slice(3); // drop initial warmup
    frames.sort((a, b) => a - b);

    const total = frames.length;
    const sum = frames.reduce((a, b) => a + b, 0);
    const mean = sum / total;

    return {
      totalFrames: total,
      meanFrameMs: Number(mean.toFixed(2)),
      minFrameMs: Number(frames[0].toFixed(2)),
      p50FrameMs: Number(frames[Math.floor(total * 0.5)].toFixed(2)),
      p90FrameMs: Number(frames[Math.floor(total * 0.9)].toFixed(2)),
      p95FrameMs: Number(frames[Math.floor(total * 0.95)].toFixed(2)),
      p99FrameMs: Number(frames[Math.floor(total * 0.99)].toFixed(2)),
      maxFrameMs: Number(frames[total - 1].toFixed(2)),
      framesUnder8ms: frames.filter((f) => f <= 8.33).length,
      framesUnder16ms: frames.filter((f) => f <= 16.67).length,
      longTasks: window.__perf.longTasks,
    };
  });

  const getMetricDiff = (name) => {
    const before = baselineMetrics.metrics.find((m) => m.name === name)?.value || 0;
    const after = finalMetrics.metrics.find((m) => m.name === name)?.value || 0;
    return after - before;
  };

  const cdpSummary = {
    layoutCount: getMetricDiff('LayoutCount'),
    recalcStyleCount: getMetricDiff('RecalcStyleCount'),
    layoutDurationSec: Number(getMetricDiff('LayoutDuration').toFixed(4)),
    recalcStyleDurationSec: Number(getMetricDiff('RecalcStyleDuration').toFixed(4)),
    scriptDurationSec: Number(getMetricDiff('ScriptDuration').toFixed(4)),
    taskDurationSec: Number(getMetricDiff('TaskDuration').toFixed(4)),
  };

  await browser.close();

  console.log('\n========================================');
  console.log('10-SECOND SCROLL PERFORMANCE REPORT');
  console.log('========================================');
  console.log(`Total Frames: ${report.totalFrames}`);
  console.log(`Mean Frame Time: ${report.meanFrameMs} ms`);
  console.log(`50th Percentile (p50): ${report.p50FrameMs} ms`);
  console.log(`90th Percentile (p90): ${report.p90FrameMs} ms`);
  console.log(`95th Percentile (p95): ${report.p95FrameMs} ms`);
  console.log(`99th Percentile (p99): ${report.p99FrameMs} ms`);
  console.log(`Max Frame Time: ${report.maxFrameMs} ms`);
  console.log(`Long Tasks (>50ms): ${report.longTasks.length}`);
  if (report.longTasks.length > 0) {
    console.log(`Max Long Task: ${Math.max(...report.longTasks.map(t => t.duration))} ms`);
  }
  console.log(`Frames <= 16.67ms (60 FPS): ${report.framesUnder16ms} (${((report.framesUnder16ms / report.totalFrames) * 100).toFixed(1)}%)`);
  console.log('\n--- CDP Browser Engine Activity ---');
  console.log(`Layout Count: ${cdpSummary.layoutCount}`);
  console.log(`Layout Total Duration: ${cdpSummary.layoutDurationSec} s`);
  console.log(`Recalculate Style Count: ${cdpSummary.recalcStyleCount}`);
  console.log(`Recalculate Style Total Duration: ${cdpSummary.recalcStyleDurationSec} s`);
  console.log(`Script Duration: ${cdpSummary.scriptDurationSec} s`);
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('Measurement failed:', err);
  process.exit(1);
});
