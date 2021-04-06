import * as THREE from 'three';
import { updatePhysics } from './vehicle.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { chassisBody } from './vehicle.js';
import { stats } from './utils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { moveKeyboard, showSpeed } from './control.js';
import { renderer, sizes } from './renderer.js';
import { canvas } from './renderer.js';
import { world } from './physic.js';
import { CannonHelper } from './cannon-helper.js';
import { hfBody } from './physic.js';

const gltfLoader = new GLTFLoader();

gltfLoader.load('./objects/scene.glb', (gltf) => {
  const ground = gltf.scene;

  ground.children[2].children.forEach((item) => {
    item.receiveShadow = true;
  });

  scene.add(ground);
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.rotation.y = Math.PI;
camera.rotation.x = Math.PI / 7;

let helper = null;

let isMobile = false;

if (window.innerWidth < 1200) {
  isMobile = true;
}

setTimeout(() => {
  helper = new CannonHelper(scene, world);
  // helper.addVisual(hfBody, 0x00aa00, 'landscape');
  // helper.addVisual(chassisBody, 0x00aa00, 'landscape');
}, 1000);

// const controls = new OrbitControls(camera, canvas);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  world.step(1 / 60, deltaTime, 3);

  // if (helper) {
  //   helper.update();
  // }

  renderer.render(scene, camera);

  stats.update();

  updatePhysics();

  if (!isMobile) {
    moveKeyboard();
  }

  showSpeed();

  camera.position.x = chassisBody.position.x;
  camera.position.z = chassisBody.position.z - 8;
  camera.position.y = chassisBody.position.y + 5;

  window.requestAnimationFrame(tick);
};

tick();

export { scene, camera };
