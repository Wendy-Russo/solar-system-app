import React, {useState} from 'react';

const calcRadiusIncrease = (massMultiplier) => {
  return Math.pow(massMultiplier, 1 / 3);
};

const Edit = ({ 
  play = true, 
  setPlay = () => {}, 
  speed, 
  setSpeed = () => {},
  timeToVal = () => {},
  valToTime = () => {},
  bodies = [], 
  selected = 0,
  changePlanetMass = () => {},
}) => {

  const [unfolded,setUnfolded] = useState(true);
  const sizeIncrease = 1.5;
  const radiusIncrease = calcRadiusIncrease(sizeIncrease);

  return (
    <div 
      style={
        unfolded ? {} : {
          width:"6rem"
        }
      }
      className="controls"
    >
      {unfolded ? 
      <>
        <button onClick={() => setPlay(play => !play)}>
          {play ? "Pause" : "Play"}
        </button>
        <span className="separator" />
        <button onClick={() => setSpeed(speed => valToTime(timeToVal(speed) - 1))}>
          Slower
        </button>
        <div>
          <p>{timeToVal(speed)} H/f</p>
        </div>
        <button onClick={() => setSpeed(speed => valToTime(timeToVal(speed) + 1))}>
          Faster
        </button>
        <span className="separator" />
        <p className="massName">
          {bodies[selected].name}
        </p>
        <p>
          Mass: {bodies[selected].mass.toExponential(1)} kg
        </p>
        <div className="massControls">
          <button onClick={() => changePlanetMass(sizeIncrease,radiusIncrease)}>
            +
          </button>
          <button onClick={() => changePlanetMass(1/sizeIncrease,1/radiusIncrease)}>
            -
          </button>
        </div> 
      </>
      : <></>}

      <button 
        onClick={() => setUnfolded(prev => !prev)}
        style={{
          position:"absolute",
          right:0,
          height:'100%',
          width:'5rem'
        }}
      >
        {unfolded ? '< Fold' : '> Unfold'}
      </button>
    </div>
  );
};

export default Edit;