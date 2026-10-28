import { execSync } from 'child_process';

// Start recording longtasks and frame times in page
const script = `
(async () => {
  window.__perfReport = { longTasks: [], frames: [] };
  const obs = new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      window.__perfReport.longTasks.push({
        name: e.name,
        duration: e.duration,
        startTime: e.startTime,
        attribution: e.attribution?.map(a => ({ name: a.name, containerType: a.containerType, containerSrc: a.containerSrc }))
      });
    }
  });
  obs.observe({ entryTypes: ['longtask'] });

  let last = performance.now();
  window.__stopPerf = false;
  function loop(now) {
    if (window.__stopPerf) return;
    window.__perfReport.frames.push(now - last);
    last = now;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  return 'observer_ready';
})()
`;

execSync(`playwright-cli eval "${script.replace(/\n\s*/g, ' ').replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

// Scroll down and up using page.mouse.wheel over several iterations
for (let i = 0; i < 15; i++) {
  execSync(`playwright-cli mousewheel 0 350`, { stdio: 'inherit' });
  execSync(`sleep 0.1`);
}
for (let i = 0; i < 15; i++) {
  execSync(`playwright-cli mousewheel 0 -350`, { stdio: 'inherit' });
  execSync(`sleep 0.1`);
}

// Retrieve report
const collectScript = `
(() => {
  window.__stopPerf = true;
  const f = window.__perfReport.frames.slice(2);
  f.sort((a,b) => a - b);
  const total = f.length;
  const sum = f.reduce((a,b) => a + b, 0);
  const mean = sum / total;
  return {
    totalFrames: total,
    meanMs: mean,
    p50Ms: f[Math.floor(total * 0.5)],
    p95Ms: f[Math.floor(total * 0.95)],
    maxMs: f[total - 1],
    longTasks: window.__perfReport.longTasks,
  };
})()
`;

const res = execSync(`playwright-cli eval "${collectScript.replace(/\n\s*/g, ' ').replace(/"/g, '\\"')}"`, { encoding: 'utf-8' });
console.log('RESULT:', res);
