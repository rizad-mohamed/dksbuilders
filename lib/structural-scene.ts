import * as THREE from "three";
export type StudyController = {
  setPhase: (phase: number) => void;
  setVisible: (visible: boolean) => void;
  setRunning: (running: boolean) => void;
  dispose: () => void;
};
export function createStudy(host: HTMLDivElement): StudyController {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(11, 9, 13);
  camera.lookAt(0, 2, 0);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  const group = new THREE.Group();
  scene.add(group);
  const frame = new THREE.Group();
  group.add(frame);
  const enclosure = new THREE.Group();
  group.add(enclosure);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const steel = new THREE.MeshStandardMaterial({
    color: 0x55758b,
    metalness: 0.35,
    roughness: 0.5,
  });
  const concrete = new THREE.MeshStandardMaterial({
    color: 0xb5c5cf,
    transparent: true,
    opacity: 0.58,
    roughness: 0.85,
  });
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x9cb8cc,
    transparent: true,
    opacity: 0.38,
    roughness: 0.8,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0758c4,
    transparent: true,
    opacity: 0.65,
  });
  materials.push(steel, concrete, wallMaterial, lineMaterial);
  function box(
    parent: THREE.Group,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
  ) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    const edgeGeo = new THREE.EdgesGeometry(geometry);
    geometries.push(edgeGeo);
    const edges = new THREE.LineSegments(edgeGeo, lineMaterial);
    edges.position.copy(mesh.position);
    parent.add(edges);
  }
  box(group, 6.6, 0.16, 4.6, 0, 0, 0, concrete);
  for (const x of [-3, 0, 3])
    for (const z of [-2, 2]) box(frame, 0.15, 5.5, 0.15, x, 2.8, z, steel);
  for (const y of [2.8, 5.6]) {
    box(frame, 6.3, 0.14, 4.3, 0, y, 0, concrete);
    for (const z of [-2, 2]) box(frame, 6.2, 0.22, 0.16, 0, y - 0.13, z, steel);
    for (const x of [-3, 0, 3])
      box(frame, 0.16, 0.22, 4.2, x, y - 0.13, 0, steel);
  }
  for (const y of [1.4, 4.2]) {
    box(enclosure, 6, 2.55, 0.08, 0, y, -2, wallMaterial);
    box(enclosure, 0.08, 2.55, 4, -3, y, 0, wallMaterial);
    box(enclosure, 2.3, 2.55, 0.08, 1.8, y, 2, wallMaterial);
  }
  const grid = new THREE.GridHelper(11, 22, 0x94aabd, 0xcbd8e0);
  grid.position.y = -0.15;
  scene.add(grid);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x647888, 2.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(5, 12, 8);
  scene.add(sun);
  let phase = 1,
    visible = true,
    running = true,
    disposed = false,
    raf = 0,
    last = 0,
    rotation = -0.18;
  const pointer = { x: 0, y: 0 };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    draw();
  };
  const draw = () => {
    if (!disposed) renderer.render(scene, camera);
  };
  const tick = (time: number) => {
    raf = 0;
    if (disposed || !visible || document.hidden || !running) return;
    const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
    last = time;
    rotation += delta * 0.09;
    group.rotation.y = rotation + pointer.x * 0.1;
    group.rotation.x = pointer.y * 0.035;
    const target = phase === 0 ? 0.025 : 1;
    frame.scale.y = THREE.MathUtils.lerp(frame.scale.y, target, 0.1);
    enclosure.scale.y = frame.scale.y;
    draw();
    raf = requestAnimationFrame(tick);
  };
  const start = () => {
    last = 0;
    if (!raf && visible && running && !document.hidden && !disposed)
      raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  };
  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || !running) return;
    const rect = host.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  document.addEventListener("visibilitychange", onVisibility);
  host.addEventListener("pointermove", onPointer);
  enclosure.visible = false;
  resize();
  start();
  return {
    setPhase(next) {
      phase = next;
      enclosure.visible = next === 2;
      frame.visible = true;
      if (!running) {
        frame.scale.y = next === 0 ? 0.025 : 1;
        enclosure.scale.y = frame.scale.y;
        draw();
      }
    },
    setVisible(next) {
      visible = next;
      if (next) start();
      else stop();
    },
    setRunning(next) {
      running = next;
      if (next) start();
      else {
        stop();
        frame.scale.y = phase === 0 ? 0.025 : 1;
        enclosure.scale.y = frame.scale.y;
        draw();
      }
    },
    dispose() {
      disposed = true;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointer);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      grid.geometry.dispose();
      if (Array.isArray(grid.material))
        grid.material.forEach((m) => m.dispose());
      else grid.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
