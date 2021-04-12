import * as CANNON from 'cannon';

const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -10, 0);
world.defaultContactMaterial.friction = 0;

const groundMaterial = new CANNON.Material('groundMaterial');
const wheelMaterial = new CANNON.Material('wheelMaterial');
const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
  friction: 0.3,
  restitution: 0,
  contactEquationStiffness: 10,
});

world.addContactMaterial(wheelGroundContactMaterial);

const matrix = [
  [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], // 1
  // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 2
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 3
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 4
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 5
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 6
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 7
  [100, 0, 0, 0, 0, 0, 4, 6, 8, 0, 0, 8, 6, 4, 0, 0, 0, 0, 0, 100], // 8
  [100, 0, 0, 0, 0, 0, 4, 6, 8, 0, 0, 8, 6, 4, 0, 0, 0, 0, 0, 100], // 9
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 10
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 11
  [100, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 100], // 12
  [100, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 100], // 13
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 14
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 15
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 16
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 17
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 18
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // 19
  [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], // 20
];

const hfShape = new CANNON.Heightfield(matrix, {
  elementSize: 10,
});
const hfBody = new CANNON.Body({ mass: 0 });
hfBody.addShape(hfShape);
hfBody.position.set(-95, 0, 95);
hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.add(hfBody);

const matrix1 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const hfShape1 = new CANNON.Heightfield(matrix1, {
  elementSize: 10,
});
const hfBody1 = new CANNON.Body({ mass: 0 });
hfBody1.addShape(hfShape1);
hfBody1.position.set(-25, 8, 15);
hfBody1.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.add(hfBody1);

export { world, wheelMaterial, hfBody, hfBody1 };
