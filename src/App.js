import React, {useEffect,useState} from "react";
import Body from "./Views/Body";
import { getAcceleration, getForce, getVelocity } from "./Physics/physicsUtils";
import Star from "./Views/Star";
import { Vector } from "./Physics/Vector";
import Edit from "./Views/Edit";

const startAmount = 1000;
const stars = []

for(let i = 0; i < startAmount; i++){
  stars[i] = {
    position: new Vector(
      Math.random() * 100, 
      Math.random() * 100
    ),
    color:`hsl(
      ${Math.random() * 360},
      10%,
      ${Math.random() * 30}%
    )`,
    radius: Math.ceil(Math.random() * 1) + 2,
    
  }
}

const valToTime = (val) => {
  return (parseInt(val) * 3600)
}

const timeToVal = (val) => {
  return parseInt(val) / 3600
}

function App() {
  
  const [speed, setSpeed] = useState(valToTime(4));
  const [selected,setSelected] = useState(0)
  const [bodies, setBody] = useState([
    {
      name: "Sun",
      atmosphere:true,
      radius: 695700,
      mass: 1.989e30,
      velocity: new Vector(0, 0, 0),
      position: new Vector(0, 0),
      color: "hsl(40,100%,50%)", // Bright yellow for the Sun
      zIndex: 1
    },
    {
      name: "Mercury",
      atmosphere:false,
      radius: 2439.7,
      mass: 3.3011e23,
      velocity: new Vector(0, 47870, 0),
      position: new Vector(57910000000, 0),
      color: "grey", // Bright blue for Earth
      zIndex: 7,
    },
    {
      name: "Venus",
      atmosphere:false,
      radius: 6051.8,
      mass: 4.8675e24,
      velocity: new Vector(0, 35020, 0),
      position: new Vector(108200000000, 0),
      color: "#DBC7A5", // Bright blue for Earth
      zIndex: 6,
    },
    {
      name: "Earth",
      atmosphere:true,
      radius: 6371,
      mass: 5.972e24,
      velocity: new Vector(0, 29780, 0),
      position: new Vector(149600000000, 0),
      color: "hsl(210,100%,60%)", // Bright blue for Earth
      zIndex: 4,
    },
    {
      name: "Mars",
      atmosphere:true,
      radius: 3389.5,
      mass: 6.4171e23,
      velocity: new Vector(0, 24077, 0),
      position: new Vector(227900000000, 0),
      color: "#EF693C", // Reddish-orange for Mars
      zIndex: 5,
    },
    {
      name: "Jupiter",
      atmosphere:false,
      radius: 69911,
      mass: 1.8982e27,
      velocity: new Vector(0, 13070, 0),
      position: new Vector(778600000000, 0),
      color: "#D19A6A", // Light brown for Jupiter
      zIndex: 3,
    },
    {
      name: "Saturn",
      atmosphere:false,
      radius: 58232,
      mass: 5.6834e26,
      velocity: new Vector(0, 9690, 0),
      position: new Vector(1433500000000, 0),
      color: "#E1C699", // Pale yellow-brown for Saturn
      zIndex: 3,
    },
    {
      name: "Uranus",
      atmosphere:true,
      radius: 25362,
      mass: 8.6810e25,
      velocity: new Vector(0, 6810, 0),
      position: new Vector(2872500000000, 0),
      color: "#A7D3E3", // Light cyan for Uranus
      zIndex: 3,
    },
    {
      name: "Neptune",
      atmosphere:true,
      radius: 24622,
      mass: 1.02413e26,
      velocity: new Vector(0, 5430, 0),
      position: new Vector(4495100000000, 0),
      color: "#4B9CD3", // Bright blue for Neptune
      zIndex: 3,
    }
  ]);

  const [play,setPlay] = useState(true);

  const changePlanetMass = (mult) => {
    setBody(prev => {
      const updatedBodies = [...prev]; // Clone the array
      updatedBodies[selected] = { 
        ...updatedBodies[selected], // Clone the selected object
        mass: updatedBodies[selected].mass * (1 / mult) // Update the mass
      };
      return updatedBodies; // Return the updated array
    })
  }

  useEffect(() => {
    if(!play){
      return
    }
    let animationFrameId;
  
    const animate = () => {
      setBody(prevBodies => {
        const newBodies = prevBodies.map(body => ({
          ...body,
          acceleration: new Vector(0, 0, 0), // Reset acceleration for each body
        }));
  
        // Calculate accelerations
        for (let i = 0; i < newBodies.length; i++) {
          for (let j = 0; j < newBodies.length; j++) {
            if (i !== j) {
              const acceleration = getAcceleration(newBodies[i], newBodies[j]);
              newBodies[i].acceleration = newBodies[i].acceleration.add(acceleration);
            }
          }
        }
  
        // Update velocities and positions
        return newBodies.map(body => {
          const updatedVelocity = body.velocity.add(body.acceleration.scale(speed));
          const updatedPosition = body.position.add(updatedVelocity.scale(speed));
  
          return {
            ...body,
            velocity: updatedVelocity,
            position: updatedPosition,
          };
        });
      });
  
      animationFrameId = requestAnimationFrame(animate); // Schedule the next frame
    };
  
    animationFrameId = requestAnimationFrame(animate); // Start the animation loop
  
    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, [bodies, setBody, speed, play]); // Add 'speed' dependency if it's dynamic
  
  // pause on press Space
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setPlay(play => !play);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "black",
        position:"relative",
        overflow:"hidden",
        display: "flex",
      }}
    >
      <Edit
        play={true}
        setPlay={setPlay}
        speed={speed}
        setSpeed={setSpeed}
        timeToVal={timeToVal}
        valToTime={valToTime}
        bodies={bodies}
        selected={selected}
        changePlanetMass={changePlanetMass}
      />
      {
        bodies.map((body, index) => (
          <Body
            key={index}
            radius={body.radius}
            position={body.position}
            color={body.color}
            name={body.name}
            atmosphere={body.atmosphere}
            zIndex={body.zIndex}
            onClick={() => setSelected(index)}
          />
        ))
      }
      {
        stars.map((body, index) => (
          <Star
            key={index}
            radius={body.radius}
            position={body.position}
            color={body.color}
          />
        ))
      }
      
    </div>
  );
}

export default App;


/*function calculate_force(body1, body2):
    G = gravitational constant
    r = distance between body1 and body2
    F = (G * body1.mass * body2.mass) / (r * r)
    direction = unit vector from body1 to body2
    return F * direction

function update_acceleration(bodies):
    for i = 0 to len(bodies) - 1:
        bodies[i].acceleration = vector(0, 0, 0)
        for j = 0 to len(bodies) - 1:
            if i != j:
                force = calculate_force(bodies[i], bodies[j])
                bodies[i].acceleration += force / bodies[i].mass

function update_velocity(bodies, dt):
    for body in bodies:
        body.velocity += body.acceleration * dt

function update_position(bodies, dt):
    for body in bodies:
        body.position += body.velocity * dt

function simulate(bodies, time_step, total_time):
    t = 0
    while t < total_time:
        update_acceleration(bodies)
        update_velocity(bodies, time_step)
        update_position(bodies, time_step)
        t += time_step
*/