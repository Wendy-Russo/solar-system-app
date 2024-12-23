import React from 'react';
import { Vector } from '../Physics/Vector';

const sunSize = 695700;
const sunPixels = window.innerHeight;
const sunScale = sunPixels / sunSize;
const posScale = 1 / 10000000000;

//getShadow 

const getDropShadow = (pos,size) => {
  const distance = 2;
  const count = Math.max(size / distance,20);
  const dir = pos.normalize();

  let shadow = ' ';
  
  for(let i = 0; i < count; i++){
    let offset = i * distance + distance;
    const opacity = (1 - (i / count) ** 0.5) * 0.03 ;
    let shadowGrow = offset * 0.2;
    shadow += `${dir.x * offset}px ${dir.y * offset}px 0px ${shadowGrow}px hsla(0,0%,0%,${opacity})`
    if(i < (count - 1)){
      shadow += ', '
    }
  }

  return shadow
}
 
const getFrontShadow = (size, position, name,color) => {
  const shadowDirection = position.normalize();

  const innerShadow = name === 'Sun' ? 
  `
    inset 0px 0px 0px ${size * 0.05}px hsl(25,100%,50%,1),
    inset 0px 0px 0px ${size * 0.2}px hsl(35,100%,50%,1)
  ` 
  : 
  `
    inset ${shadowDirection.x*2}px ${shadowDirection.y*2}px hsla(0,0%,100%,0.5),
    inset ${shadowDirection.x*size * -0.05}px ${shadowDirection.y*size * -0.05}px 0px 
    ${size * 0.05}px hsl(from ${color} h calc(s + 5) calc(l - 10))
  `

  return innerShadow 
}

function Body({
  radius,
  position = new Vector(0,0,0),
  color = 'red',
  name = 'Body',
  atmosphere = false,
  zIndex = 1,
  onClick = () => { }
}) {
  
  const size = sunScale * radius;

  let realPos = position
    .scale(posScale)

  return (
    <>
    <div
        onClick={onClick}
        className="Body"
        style={{
          width: size,
          height: size,
          backgroundColor:color,
          position:"absolute",
          borderRadius:"50%",
          left:`calc( 50% + ${realPos.x}px )`,
          top:`calc( 50% + ${realPos.y}px )`,
          transform:"translate(-50%,-50%)",
          zIndex:zIndex+1,
          boxShadow: getFrontShadow(size, position, name, color, atmosphere),
        }}
      />
      <div
        onClick={onClick}
        className="Body"
        style={{
          width: size,
          height: size,
          position:"absolute",
          borderRadius:"50%",
          left:`calc( 50% + ${realPos.x}px )`,
          top:`calc( 50% + ${realPos.y}px )`,
          transform:"translate(-50%,-50%)",
          zIndex:name === 'Sun' ? 1 : 2,
          backgroundColor:color,
          boxShadow: name === 'Sun' ? "" : getDropShadow(position,size),
          filter: (name === 'Sun') ? `blur(${size / 4}px)` : `none`,
        }}
      />
    </>
  );
}
  
export default Body
  