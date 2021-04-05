// import CannonHelper from './cannon-helper.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { scene } from './scene.js';
import { world } from './physic.js';

// const helper = new CannonHelper(scene, world);

const stats = new Stats();
document.body.appendChild(stats.dom);

export { stats };
