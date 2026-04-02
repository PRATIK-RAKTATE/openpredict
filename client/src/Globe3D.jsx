/**
 * Globe3D.jsx
 * Interactive 3D Earth using Three.js (r128)
 * Features: procedural texture · atmosphere glow · pulsing hotspot markers · drag rotation
 */

import { useEffect, useRef, memo } from "react";
import * as THREE from "three";

// ─── Hotspot data ─────────────────────────────────────────────────────────────
export const GLOBE_HOTSPOTS = [
  { lat: 40.71,  lng: -74.00, city: "New York",      price: "$1.2M",   trend: "+8.3%"  },
  { lat: 51.51,  lng: -0.12,  city: "London",         price: "£850K",   trend: "+5.1%"  },
  { lat: 35.68,  lng: 139.65, city: "Tokyo",          price: "¥85M",    trend: "+3.7%"  },
  { lat: 48.86,  lng: 2.35,   city: "Paris",          price: "€920K",   trend: "+6.2%"  },
  { lat: -33.87, lng: 151.21, city: "Sydney",         price: "A$1.1M",  trend: "+9.4%"  },
  { lat: 37.77,  lng: -122.42,city: "San Francisco",  price: "$1.8M",   trend: "+4.2%"  },
  { lat: 25.20,  lng: 55.27,  city: "Dubai",          price: "$680K",   trend: "+12.1%" },
  { lat: 19.08,  lng: 72.88,  city: "Mumbai",         price: "₹2.8Cr",  trend: "+7.8%"  },
  { lat: 1.35,   lng: 103.82, city: "Singapore",      price: "S$1.5M",  trend: "+6.9%"  },
  { lat: -23.55, lng: -46.63, city: "São Paulo",      price: "R$890K",  trend: "+4.5%"  },
];

// ─── Pure helpers ─────────────────────────────────────────────────────────────
const latLngToVec3 = (lat, lng, r) => {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
};

/** Builds a canvas-based procedural Earth texture (no external network required) */
const buildEarthTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Deep ocean base
  const ocean = ctx.createLinearGradient(0, 0, 0, 1024);
  ocean.addColorStop(0,   "#010619");
  ocean.addColorStop(0.4, "#020e42");
  ocean.addColorStop(0.6, "#031660");
  ocean.addColorStop(1,   "#010619");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, 2048, 1024);

  // Latitude grid lines
  ctx.strokeStyle = "rgba(30,110,255,0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 12; i++) {
    ctx.beginPath();
    ctx.moveTo((i / 12) * 2048, 0);
    ctx.lineTo((i / 12) * 2048, 1024);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (i / 6) * 1024);
    ctx.lineTo(2048, (i / 6) * 1024);
    ctx.stroke();
  }

  // Simplified continent shapes
  const continents = [
    { x: 190, y: 240, rx: 140, ry: 130, rot: -0.2 },   // N. America
    { x: 240, y: 530, rx: 80,  ry: 150, rot: 0.3  },   // S. America
    { x: 980, y: 210, rx: 70,  ry: 80,  rot: 0.1  },   // Europe
    { x: 960, y: 380, rx: 100, ry: 170, rot: 0.05 },   // Africa
    { x: 1200,y: 230, rx: 260, ry: 180, rot: 0.1  },   // Asia
    { x: 1380,y: 400, rx: 80,  ry: 100, rot: 0.15 },   // SE Asia
    { x: 1580,y: 580, rx: 110, ry: 80,  rot: 0.2  },   // Australia
    { x: 340, y: 110, rx: 60,  ry: 55,  rot: 0.0  },   // Greenland
  ];

  ctx.fillStyle = "rgba(5, 35, 105, 0.88)";
  continents.forEach(({ x, y, rx, ry, rot }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // City luminescence dots (approx. major metros)
  const cities = [
    [190, 260], [130, 230], [960, 205], [980, 215],
    [1050, 200], [1130, 250], [1300, 310], [1490, 300], [1580, 580],
  ];
  cities.forEach(([x, y]) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
    g.addColorStop(0, "rgba(56,189,248,0.9)");
    g.addColorStop(0.3, "rgba(56,189,248,0.3)");
    g.addColorStop(1, "rgba(56,189,248,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  });

  return new THREE.CanvasTexture(canvas);
};

/** Builds a single atmosphere shell */
const makeAtmoShell = (radius, opacity, color) =>
  new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.BackSide })
  );

// ─── Component ────────────────────────────────────────────────────────────────
const Globe3D = memo(() => {
  const mountRef = useRef(null);
  /** Single mutable ref avoids re-render closures touching stale state */
  const glRef = useRef({
    renderer: null, scene: null, camera: null,
    globeGroup: null, rings: [],
    frame: null,
    drag: false,
    prev: { x: 0, y: 0 },
    rot: { x: 0.25, y: 0.4 },
  });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const g = glRef.current;

    // ── Renderer / Scene / Camera ──────────────────────────────────────────
    const W = el.clientWidth, H = el.clientHeight;

    g.scene    = new THREE.Scene();
    g.camera   = new THREE.PerspectiveCamera(42, W / H, 0.1, 500);
    g.camera.position.z = 3.2;

    g.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    g.renderer.setSize(W, H);
    g.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    g.renderer.setClearColor(0x000000, 0);
    el.appendChild(g.renderer.domElement);

    // ── Globe group ────────────────────────────────────────────────────────
    g.globeGroup = new THREE.Group();

    // Earth surface
    g.globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: buildEarthTexture(),
        shininess: 18,
        specular: new THREE.Color(0x1a5eb8),
        emissive: new THREE.Color(0x020c38),
        emissiveIntensity: 0.5,
      })
    ));

    // Wireframe overlay
    g.globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.003, 36, 18),
      new THREE.MeshBasicMaterial({
        color: 0x1e6fff, wireframe: true, transparent: true, opacity: 0.06,
      })
    ));

    // Layered atmosphere
    [
  { r: 1.02 + Math.random() * 0.03, o: 0.11, c: 0x003ccc },
  { r: 1.07 + Math.random() * 0.03, o: 0.085, c: 0x004ae0 },
  { r: 1.12 + Math.random() * 0.03, o: 0.065, c: 0x0055ff },
  { r: 1.17 + Math.random() * 0.03, o: 0.045, c: 0x1a7fff },
  { r: 1.22 + Math.random() * 0.03, o: 0.03, c: 0x3399ff },
].forEach(({ r, o, c }) => g.globeGroup.add(makeAtmoShell(r, o, c)));
    // ── Hotspot markers ────────────────────────────────────────────────────
    GLOBE_HOTSPOTS.forEach((spot, i) => {
      const pos = latLngToVec3(spot.lat, spot.lng, 1.015);

      // Core dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff })
      );
      dot.position.copy(pos);
      g.globeGroup.add(dot);

      // Outer pulse ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.02, 0.036, 24),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
        })
      );
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      ring.userData.phase = i * 0.63;
      g.rings.push(ring);
      g.globeGroup.add(ring);
    });

    g.scene.add(g.globeGroup);

    // ── Starfield ──────────────────────────────────────────────────────────
    const starPos = new Float32Array(3200 * 3).map(() => (Math.random() - 0.5) * 200);
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    g.scene.add(new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x7799cc, size: 0.1, transparent: true, opacity: 0.45 })
    ));

    // ── Lighting ───────────────────────────────────────────────────────────
    g.scene.add(new THREE.AmbientLight(0x0a1a55, 4));
    const sun = new THREE.DirectionalLight(0x5599ff, 4.5);
    sun.position.set(5, 3, 5);
    g.scene.add(sun);
    const rim = new THREE.DirectionalLight(0x001166, 2);
    rim.position.set(-4, -2, -4);
    g.scene.add(rim);

    // ── Animation loop ─────────────────────────────────────────────────────
    let t = 0;
    const tick = () => {
      g.frame = requestAnimationFrame(tick);
      t += 0.016;
      if (!g.drag) g.rot.y += 0.0018;
      g.globeGroup.rotation.x = g.rot.x;
      g.globeGroup.rotation.y = g.rot.y;
      g.rings.forEach(r => {
        const p = t * 1.6 + r.userData.phase;
        r.scale.setScalar(1 + 0.45 * Math.sin(p));
        r.material.opacity = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p));
      });
      g.renderer.render(g.scene, g.camera);
    };
    tick();

    // ── Input ──────────────────────────────────────────────────────────────
    const onDown  = e => { g.drag = true;  g.prev = { x: e.clientX, y: e.clientY }; };
    const onMove  = e => {
      if (!g.drag) return;
      g.rot.y += (e.clientX - g.prev.x) * 0.005;
      g.rot.x  = Math.max(-1.1, Math.min(1.1, g.rot.x + (e.clientY - g.prev.y) * 0.004));
      g.prev = { x: e.clientX, y: e.clientY };
    };
    const onUp    = () => { g.drag = false; };
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      g.camera.aspect = w / h;
      g.camera.updateProjectionMatrix();
      g.renderer.setSize(w, h);
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", onResize);

    // Touch support
    const onTouchStart = e => onDown(e.touches[0]);
    const onTouchMove  = e => { e.preventDefault(); onMove(e.touches[0]); };
    const onTouchEnd   = () => onUp();
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(g.frame);
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      g.renderer.dispose();
      if (el.contains(g.renderer.domElement)) el.removeChild(g.renderer.domElement);
    };
  }, []);

  return (
    <div
  ref={mountRef}
  className="w-full h-full scale-75 md:scale-100 ml-0 lg:ml-24 cursor-grab active:cursor-grabbing select-none"
  aria-label="Interactive 3D Earth showing global real estate hotspots"
/>
  );
});

Globe3D.displayName = "Globe3D";
export default Globe3D;
