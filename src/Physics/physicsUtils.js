import { Vector } from "./Vector";

export const getForce = (body1,body2) => {
  const dist = body2.position.subtract(body1.position).squareMagnitude();
  if(dist < 1){
    return new Vector(0,0,0)
  }
  const G = 6.67430e-11;
  const Force = G * body1.mass * body2.mass / dist;
  const direction = body2.position.subtract(body1.position).normalize();
  return direction.scale(Force)
}


export const getAcceleration = (body1,body2) => {
  return getForce(body1,body2).divide(body1.mass);
}

export const getVelocity = (body1,body2,dt) => {
  return getAcceleration(body1,body2).scale(dt);
}

export const getPosition = (body1,body2,dt) => {
  return getVelocity(body1,body2).scale(dt);
}
