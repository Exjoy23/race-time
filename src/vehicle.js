import * as CANNON from 'cannon';
import { world } from './physic.js';
import { wheelMaterial } from './physic.js';
import { scene } from './scene.js';

const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2.9));
const chassisBody = new CANNON.Body({ mass: 150 });
chassisBody.addShape(chassisShape);
chassisBody.position.set(0, 3, 0);
chassisBody.angularVelocity.set(0, 0, 0);

const vehicle = new CANNON.RaycastVehicle({
  chassisBody: chassisBody,
  indexRightAxis: 0, // x
  indexUpAxis: 1, // y
  indexForwardAxis: 2, // z
});

const options = {
  radius: 0.46,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 45,
  suspensionRestLength: 0.5,
  frictionSlip: 5,
  dampingRelaxation: 2.3,
  dampingCompression: 4.5,
  maxSuspensionForce: 100000,
  rollInfluence: 0.01,
  axleLocal: new CANNON.Vec3(-1, 0, 0),
  chassisConnectionPointLocal: new CANNON.Vec3(1, 2, 0),
  maxSuspensionTravel: 0.25,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
};

const axlewidth = 0.95;
options.chassisConnectionPointLocal.set(axlewidth, 0, -1.8);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, -1.8);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(axlewidth, 0, 2);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, 2);
vehicle.addWheel(options);

vehicle.addToWorld(world);

const wheelBodies = [];

vehicle.wheelInfos.forEach((wheel) => {
  const shape = new CANNON.Cylinder(wheel.radius, wheel.radius, 0.2, 20);
  const body = new CANNON.Body({ mass: 10, material: wheelMaterial });
  const q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  body.addShape(shape, new CANNON.Vec3(), q);
  wheelBodies.push(body);
});

const updatePhysics = () => {
  const car = scene.children[3];

  car.children[0].position.copy(chassisBody.position);
  car.children[0].quaternion.copy(chassisBody.quaternion);

  for (let i = 0; i < vehicle.wheelInfos.length; i++) {
    vehicle.updateWheelTransform(i);
    const t = vehicle.wheelInfos[i].worldTransform;

    wheelBodies[i].position.copy(t.position);
    wheelBodies[i].quaternion.copy(t.quaternion);

    car.children[4 - i].position.copy(t.position);
    car.children[4 - i].quaternion.copy(t.quaternion);
    car.children[4 - i].rotateZ(Math.PI / 2);
    car.children[1].rotateZ(Math.PI);
    car.children[3].rotateZ(Math.PI);
  }
};

export { updatePhysics, chassisBody, vehicle };
