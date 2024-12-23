import React from 'react';
import { Vector } from '../Physics/Vector';

function Star({
  position = new Vector(0,0,0),
  color = "red",
  radius = 0,
}) {

  return (
    <div 
      style={{
        width: radius,
        height: radius,
        backgroundColor:color,
        position:"absolute",
        borderRadius:"50%",
        left:`${position.x}%`,
        top:`${position.y}%`,
      }}
    />
  );
}
  
export default React.memo(Star,(prevProps,nextProps) => {
  return true;
})
  