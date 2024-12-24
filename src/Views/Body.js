import React from 'react';
import { Vector } from '../Physics/Vector';

const sunSize = 695700;
const sunPixels = window.innerHeight;
const sunScale = sunPixels / sunSize;
const posScale = 1 / 10000000000;

const getDropShadow = (pos, size) => {
  const distance = 2;
  const count = Math.max(size / distance, 20);
  const dir = pos.normalize();
  let shadow = '';

  for (let i = 0; i < count; i++) {
    const offset = i * distance + distance;
    const opacity = (1 - (i / count) ** 0.5);
    const shadowGrow = offset * 0.2;
    shadow += `${dir.x * offset}px ${dir.y * offset}px 0px ${shadowGrow}px hsla(0,0%,0%,${opacity})`;
    if (i < count - 1) {
      shadow += ', ';
    }
  }

  return shadow;
};

const getFrontShadow = (size, position, name, color) => {
  const { x, y } = position.normalize();
  const paperHighlight = `inset ${x * 2}px ${y * 2}px hsla(0,0%,100%,0.5)`;
  const softPaperHighlight = `inset ${x * 2}px ${y * 2}px hsla(0,0%,100%,0.25)`;
  const smallPlanetShadow = `
    ${softPaperHighlight},
    inset ${x * size * -0.05}px ${y * size * -0.05}px 0px 
    ${size * 0.05}px hsl(from ${color} h calc(s + 5) calc(l - 10))
  `;
  const sunShadow = ''; // Placeholder for sun shadow logic if needed
  const planetShadow = `${paperHighlight}`;

  if (size < 30) {
    return smallPlanetShadow;
  } else if (name === 'Sun') {
    return sunShadow;
  }
  return planetShadow;
};

const getGradient = (name, color, shadowAngle, darker) => {
  return name === 'Sun' ? 
    `
      radial-gradient(
        hsl(from ${color} h s l) 0%, 
        hsl(from ${color} calc(h - 5) s calc(l - 2.5)) 30%, 
        hsl(from ${color} calc(h - 15) s calc(l - 7.5)) 60%, 
        hsl(from ${color} calc(h - 30) s calc(l - 15)) 80%
      )
    ` : 
    `
      linear-gradient(${shadowAngle}deg,
        hsl(from ${color} h calc(s + ${darker}) calc(l + ${darker})) 0%, 
        hsl(from ${color} h calc(s + ${darker}) calc(l - ${darker})) 100%)
    `;
};

function Body({
  radius,
  position = new Vector(0, 0, 0),
  color = 'red',
  name = 'Body',
  atmosphere = false,
  zIndex = 1,
  onClick = () => {}
}) {
  const size = sunScale * radius;
  const { x, y } = position.normalize();
  const darker = 15;
  const shadowAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
  const gradient = getGradient(name, color, shadowAngle, darker);

  const realPos = position.scale(posScale);

  return (
    <>
      <div
        onClick={onClick}
        className="Body"
        style={{
          width: size,
          height: size,
          position: "absolute",
          borderRadius: "50%",
          left: `calc(50% + ${realPos.x}px)`,
          top: `calc(50% + ${realPos.y}px)`,
          transform: "translate(-50%, -50%)",
          zIndex: zIndex + 1,
          boxShadow: getFrontShadow(size, position, name, color, atmosphere),
          background: gradient
        }}
      />
      <div
        style={{
          width: size,
          height: size,
          position: "absolute",
          borderRadius: "50%",
          left: `calc(50% + ${realPos.x}px)`,
          top: `calc(50% + ${realPos.y}px)`,
          transform: "translate(-50%, -50%)",
          zIndex: name === 'Sun' ? 1 : 2,
          background: gradient,
          boxShadow: name === 'Sun' ? '' : getDropShadow(position, size),
          opacity:0.2,
          filter: name === 'Sun' ? `blur(${size}px)` : 'none',
          mixBlendMode:'overlay'
        }}
      />
      {
        name === 'Sun' && <div
          style={{
            width: size,
            height: size,
            position: "absolute",
            borderRadius: "50%",
            left: `calc(50% + ${realPos.x}px)`,
            top: `calc(50% + ${realPos.y}px)`,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            background: gradient,
            filter: `blur(${size}px)`,
          }}
        />
      }
    </>
  );
}

export default Body;

/*Keyword values
mix-blend-mode: normal;
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: overlay;
mix-blend-mode: darken;
mix-blend-mode: lighten;
mix-blend-mode: color-dodge;
mix-blend-mode: color-burn;
mix-blend-mode: hard-light;
mix-blend-mode: soft-light;
mix-blend-mode: difference;
mix-blend-mode: exclusion;
mix-blend-mode: hue;
mix-blend-mode: saturation;
mix-blend-mode: color;
mix-blend-mode: luminosity;
mix-blend-mode: plus-darker;
mix-blend-mode: plus-lighter;

Global values 
mix-blend-mode: inherit;
mix-blend-mode: initial;
mix-blend-mode: revert;
mix-blend-mode: revert-layer;
mix-blend-mode: unset;
*/
