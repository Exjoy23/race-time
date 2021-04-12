import * as THREE from 'three';
import { scene } from './scene.js';

const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.castShadow = true;
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.3);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight('#ffffff', 30);
// pointLight.castShadow = true;
// pointLight.shadow.mapSize.set(1024, 1024);
// pointLight.shadow.camera.far = 150;
// pointLight.shadow.radius = 8;
// scene.add(pointLight);
// pointLight.position.set(0, 40, 0);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
