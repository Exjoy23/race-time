import { vehicle } from './vehicle.js';
import { JoyStick } from './joystick.js';
import { chassisBody } from './vehicle.js';

let forward = false;
let backward = false;
let left = false;
let right = false;
let stop = false;

const speedElement = document.querySelector('.speed');

const onMove = (forward, turn) => {
  const maxSteerVal = 0.5;
  const maxForce = 200;
  const brakeForce = 5;

  const force = maxForce * forward * -1;
  const steer = maxSteerVal * -turn;

  if (forward) {
    vehicle.setBrake(0, 0);
    vehicle.setBrake(0, 1);
    vehicle.setBrake(0, 2);
    vehicle.setBrake(0, 3);

    vehicle.applyEngineForce(force, 2);
    vehicle.applyEngineForce(force, 3);
  }

  if (!forward) {
    vehicle.setBrake(brakeForce, 0);
    vehicle.setBrake(brakeForce, 1);
    vehicle.setBrake(brakeForce, 2);
    vehicle.setBrake(brakeForce, 3);
  }

  vehicle.setSteeringValue(steer, 2);
  vehicle.setSteeringValue(steer, 3);
};

if (window.innerWidth < 1200) {
  const joystick = new JoyStick({
    onMove,
  });
}

const moveKeyboard = () => {
  const engineForce = 200;
  const maxSteerVal = 0.5;

  if (forward) {
    vehicle.applyEngineForce(-engineForce, 0);
    vehicle.applyEngineForce(-engineForce, 1);
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
  }

  if (backward) {
    vehicle.applyEngineForce(engineForce, 0);
    vehicle.applyEngineForce(engineForce, 1);
    vehicle.applyEngineForce(engineForce, 2);
    vehicle.applyEngineForce(engineForce, 3);
  }

  if (!forward && !backward) {
    vehicle.applyEngineForce(0, 0);
    vehicle.applyEngineForce(0, 1);
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
  }

  if (left) {
    vehicle.setSteeringValue(maxSteerVal, 2);
    vehicle.setSteeringValue(maxSteerVal, 3);
  }

  if (right) {
    vehicle.setSteeringValue(-maxSteerVal, 2);
    vehicle.setSteeringValue(-maxSteerVal, 3);
  }

  if (!left && !right) {
    vehicle.setSteeringValue(0, 2);
    vehicle.setSteeringValue(0, 3);
  }

  if (stop) {
    vehicle.setBrake(10, 0);
    vehicle.setBrake(10, 1);
    vehicle.setBrake(10, 2);
    vehicle.setBrake(10, 3);
  }

  if (!stop) {
    vehicle.setBrake(0, 0);
    vehicle.setBrake(0, 1);
    vehicle.setBrake(0, 2);
    vehicle.setBrake(0, 3);
  }
};

const onMoveKeydown = (evt) => {
  switch (evt.keyCode) {
    case 38: // forward
      forward = true;
      backward = false;
      break;

    case 40: // backward
      backward = true;
      forward = false;
      break;

    case 37: // left
      left = true;
      right = false;
      break;

    case 39: // right
      right = true;
      left = false;
      break;

    case 32: // stop
      stop = true;
      break;
  }
};

const onMoveKeyup = (evt) => {
  switch (evt.keyCode) {
    case 38: // forward
      forward = false;
      break;

    case 40: // backward
      backward = false;
      break;

    case 39: // right
      right = false;
      break;

    case 37: // left
      left = false;
      break;

    case 32: // stop
      stop = false;
      break;
  }
};

const showSpeed = () => {
  const speed = Math.floor(chassisBody.velocity.norm() * 3.6);

  speedElement.textContent = `${speed} km/h`;
};

window.addEventListener('keydown', onMoveKeydown);
window.addEventListener('keyup', onMoveKeyup);

export { moveKeyboard, showSpeed };
