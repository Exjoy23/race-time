import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene, tick } from './scene.js';

const loadingBarElement = document.querySelector('.loading-bar');
const loadingManager = new THREE.LoadingManager(
  () => {
    tick();
    loadingBarElement.remove();
  },

  (itemUrl, itemsLoaded, itemsTotal) => {
    const progressRatio = itemsLoaded / itemsTotal;
    loadingBarElement.textContent = `Loading ${Math.round(progressRatio * 100)}%`;
  }
);
const gltfLoader = new GLTFLoader(loadingManager);

gltfLoader.load('./objects/scene.glb', (gltf) => {
  const ground = gltf.scene;

  scene.add(ground);
});

gltfLoader.load('./objects/cybertruck.glb', (gltf) => {
  const car = gltf.scene;

  scene.add(car);
});

export { loadingManager };
