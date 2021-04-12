import * as THREE from 'three';
import { updatePhysics, chassisBody } from './vehicle.js';
import { stats } from './utils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { moveKeyboard, showSpeed } from './control.js';
import { renderer, sizes, canvas } from './renderer.js';
import { world, hfBody, hfBody1 } from './physic.js';
import { CannonHelper } from './cannon-helper.js';
import { Vector3 } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

let isMobile = false;

if (window.innerWidth < 1200) {
  isMobile = true;
}

// const helper = new CannonHelper(scene, world);

// helper.addVisual(hfBody, 0x00aa00, 'landscape');
// helper.addVisual(hfBody1, 0x00aa00, 'landscape');
// helper.addVisual(chassisBody, 0x00aa00, 'landscape');

// const controls = new OrbitControls(camera, canvas);
// camera.position.y = 150;

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  world.step(1 / 60, deltaTime, 3);

  // helper.update();

  renderer.render(scene, camera);

  stats.update();

  updatePhysics();

  if (!isMobile) {
    moveKeyboard();
  }

  // showSpeed();

  camera.position.x = chassisBody.position.x;
  camera.position.z = chassisBody.position.z - 15;
  camera.position.y = chassisBody.position.y + 20;
  camera.lookAt(new Vector3(chassisBody.position.x, chassisBody.position.y, chassisBody.position.z));

  window.requestAnimationFrame(tick);
};

export { scene, camera, tick };
