import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeMandalaProps {
  onTiltChange?: (tiltX: number, tiltY: number, shiftX: number, shiftY: number) => void;
  className?: string;
  onLoaded?: () => void;
}

export default function ThreeMandala({
  onTiltChange,
  className = '',
  onLoaded,
}: ThreeMandalaProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onTiltChangeRef = useRef(onTiltChange);
  onTiltChangeRef.current = onTiltChange;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    let isPaused = false;
    let animId = 0;

    // Detect software WebGL to pace appropriately
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // 2. WebGL Renderer with capped DPR at 1.5 per performance specification
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Generate procedural rune-dash circular texture on 2D canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, 1024, 1024);
      const cx = 512;
      const cy = 512;

      ctx.strokeStyle = '#C9922B';
      ctx.fillStyle = '#C9922B';
      ctx.lineWidth = 4;

      // Outer solid and dashed rings
      ctx.beginPath();
      ctx.arc(cx, cy, 490, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([8, 12]);
      ctx.lineWidth = 3;
      ctx.arc(cx, cy, 470, 0, Math.PI * 2);
      ctx.stroke();

      // Outer radial tick marks (48 runes)
      ctx.setLineDash([]);
      for (let i = 0; i < 48; i++) {
        const angle = (i * Math.PI * 2) / 48;
        const r1 = i % 4 === 0 ? 440 : 455;
        const r2 = 470;
        ctx.lineWidth = i % 4 === 0 ? 4 : 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
      }

      // Middle ring & 8-pointed star geometry
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.stroke();

      // Squares forming octagram
      ctx.save();
      ctx.translate(cx, cy);
      for (let r = 0; r < 2; r++) {
        ctx.rotate((Math.PI / 4) * r);
        ctx.strokeRect(-250, -250, 500, 500);
      }
      ctx.restore();

      // Inner rune ring with dash pattern
      ctx.setLineDash([14, 10, 4, 10]);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.stroke();

      // Innermost core circle
      ctx.setLineDash([]);
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      // 12 rune dots
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * 320, cy + Math.sin(angle) * 320, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const runeTexture = new THREE.CanvasTexture(canvas);
    runeTexture.colorSpace = THREE.SRGBColorSpace;
    runeTexture.needsUpdate = true;

    // 4. Group for all rings with interactive tilt
    const mandalaGroup = new THREE.Group();
    scene.add(mandalaGroup);

    // Three concentric gold ring meshes with additive blending
    const ringMat1 = new THREE.MeshBasicMaterial({
      map: runeTexture,
      color: 0xC9922B,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ringMat2 = new THREE.MeshBasicMaterial({
      map: runeTexture,
      color: 0xC9922B,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ringMat3 = new THREE.MeshBasicMaterial({
      map: runeTexture,
      color: 0xD4A33B,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ringGeo1 = new THREE.PlaneGeometry(5.2, 5.2);
    const ringGeo2 = new THREE.PlaneGeometry(4.0, 4.0);
    const ringGeo3 = new THREE.PlaneGeometry(2.8, 2.8);

    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    const ringMesh3 = new THREE.Mesh(ringGeo3, ringMat3);

    ringMesh1.position.z = 0.05;
    ringMesh2.position.z = 0.1;
    ringMesh3.position.z = 0.15;

    mandalaGroup.add(ringMesh1);
    mandalaGroup.add(ringMesh2);
    mandalaGroup.add(ringMesh3);

    // 5. At most 250 orbiting ember particles in gold (#C9922B) and crimson (#D4161F)
    const particleCount = 220; // within <= 250
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const zOffsets = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#C9922B');
    const crimsonColor = new THREE.Color('#D4161F');

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 0.8;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      radii[i] = radius;
      angles[i] = angle;
      speeds[i] = (0.2 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1);
      zOffsets[i] = z;

      // Color split: ~65% gold, ~35% crimson
      const isGold = Math.random() < 0.65;
      const chosenColor = isGold ? goldColor : crimsonColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mandalaGroup.add(particles);

    // 6. Pointer movement tilt (up to 12 degrees) and 8px portrait shift
    const maxTiltRad = (12 * Math.PI) / 180; // 12 degrees in radians
    const maxShiftPx = 8; // 8px shift
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerMove = (e: MouseEvent) => {
      // Use window-relative coordinates to eliminate forced synchronous reflow (getBoundingClientRect)
      const x = (e.clientX / (window.innerWidth * 0.5)) - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      // Clamp between -1 and 1
      const cx = Math.max(-1, Math.min(1, x));
      const cy = Math.max(-1, Math.min(1, y));

      targetTiltY = cx * maxTiltRad;
      targetTiltX = -cy * maxTiltRad;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // 7. Pause when hero is off-screen or tab is hidden
    const heroSection = document.getElementById('hero') || container;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isPaused = !entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(heroSection);

    const onVisibilityChange = () => {
      isPaused = document.visibilityState === 'hidden';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Resize handler
    const onResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Notify parent component that WebGL loaded successfully
    onLoaded?.();

    // 8. Animation Render Loop
    let lastTime = performance.now();
    const frameInterval = isSoftwareGl ? 33 : 0; // 30fps budget on software GL

    const animate = (time: number) => {
      if (isDisposed) return;

      if (!isPaused && (window.scrollY < (window.innerHeight || 900))) {
        if (frameInterval > 0 && time - lastTime < frameInterval) {
          animId = requestAnimationFrame(animate);
          return;
        }

        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        // Slow mystical rotation
        ringMesh1.rotation.z += delta * 0.15;
        ringMesh2.rotation.z -= delta * 0.22;
        ringMesh3.rotation.z += delta * 0.35;

        // Animate particles orbiting
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          angles[i] += speeds[i] * delta;
          posArray[i * 3] = Math.cos(angles[i]) * radii[i];
          posArray[i * 3 + 1] = Math.sin(angles[i]) * radii[i];
          posArray[i * 3 + 2] = zOffsets[i] + Math.sin(angles[i] * 3) * 0.1;
        }
        posAttr.needsUpdate = true;

        // Smooth lerp for tilt (up to 12 degrees)
        currentTiltX += (targetTiltX - currentTiltX) * 0.08;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08;

        mandalaGroup.rotation.x = currentTiltX;
        mandalaGroup.rotation.y = currentTiltY;

        // Compute 8px portrait shift and notify parent
        const shiftX = (currentTiltY / maxTiltRad) * maxShiftPx;
        const shiftY = (-currentTiltX / maxTiltRad) * maxShiftPx;
        if (onTiltChangeRef.current) {
          onTiltChangeRef.current(currentTiltX, currentTiltY, shiftX, shiftY);
        }

        renderer.render(scene, camera);
      } else {
        lastTime = time;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // 9. Dispose everything on unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();

      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      particleGeo.dispose();

      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      particleMat.dispose();

      runeTexture.dispose();
      particleTexture.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}
