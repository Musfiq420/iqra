"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useFBX } from "@react-three/drei";
import * as THREE from "three";
import MdText from "@/app/utils/mdText";

const Model = ({src, selectedPart, setSelectedPart, rot, pos, scale}) => {
  const fbx = useFBX(src);
  const raycaster = useRef(new THREE.Raycaster());
  const { camera, mouse, gl } = useThree();
  const mouseStart = useRef({ x: 0, y: 0 });



  const ensureMaterialSupport = (child) => {
    if (child.isMesh) {
      if (!(child.material instanceof THREE.MeshStandardMaterial)) {
        // Replace incompatible materials with MeshStandardMaterial
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map || null, // Retain texture if available
        });
      }
      child.material.transparent = true; // Enable transparency
    }
  };

  // Assign unique colors based on mesh name or index
  const assignColors = () => {
    let colorIndex = 0;
    const colorPalette = [
      0xff6f61, // Vibrant Coral
      0xffa07a, // Light Salmon
      0xffd700, // Bright Yellow
      0x98fb98, // Pale Green
      0x87ceeb, // Sky Blue
      0xffffe0, // Light Yellow
      0xffb6c1, // Light Pink
      0xf4a460, // Sandy Brown
      0x00fa9a, // Spring Green
      0x6495ed, // Cornflower Blue
      0xe6e6fa, // Lavender
      0xffdab9, // Peach Puff
      0x8fbc8f, // Dark Sea Green
      0x4682b4, // Steel Blue
      0xff7f50, // Coral
      0xd8bfd8, // Thistle
      0xf0e68c, // Khaki
      0x40e0d0, // Turquoise
      0xdda0dd, // Plum
      0xba55d3, // Orchid Purple
    ];

    fbx.traverse((child) => {
      if (child.isMesh) {
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          // Replace incompatible materials with MeshStandardMaterial
          child.material = new THREE.MeshStandardMaterial({
            transparent: true,
          });
        }

        // Assign unique colors
        console.log(child.name);
        child.material.color = new THREE.Color(colorPalette[colorIndex % colorPalette.length]);
        colorIndex++;

      }
    });
  };

  useEffect(() => {
    const target = new THREE.Vector3(0, 0, 0); // Define target position
    camera.lookAt(target);
}, [camera]);


  useEffect(() => {
    assignColors();
  }, [fbx]);

  useEffect(() => {
    
    fbx.traverse((child) => {
      if (child.isMesh) {
        ensureMaterialSupport(child);
        if(child.name==selectedPart)
        {
          // const worldPosition = new THREE.Vector3();
          // child.getWorldPosition(worldPosition);
          // console.log("object")
          // console.log(worldPosition)
          // console.log("camera")
          // console.log(camera.position)
          // console.log(camera.rotation)

          // camera.position.set(worldPosition.x, worldPosition.y, worldPosition.z+15);
          // camera.rotation.set(-0.32, -0.29, -0.09);
          // camera.lookAt(worldPosition);


          // Get the world position of the selected mesh
          // const worldPosition = new THREE.Vector3();
          // child.getWorldPosition(worldPosition);

          // camera.position.set(worldPosition.x, worldPosition.y, worldPosition.z+10)
          // camera.lookAt(worldPosition)

          // Move the camera to focus on the selected part
          // const cameraOffset = new THREE.Vector3(0, 0, 20); // Offset to view the mesh from a distance
          // const newCameraPosition = worldPosition.clone().add(cameraOffset);

          // Smoothly animate camera movement

          // animateTransform(
          //   {
          //     position: [camera.position.x, camera.position.y, camera.position.z],
          //     rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
          //     scale: 1,
          //   },
          //   {
          //     position: [worldPosition.x, worldPosition.y, worldPosition.z+10],
          //     rotation: [worldPosition.x, worldPosition.y, worldPosition.z+10], // You can compute a target rotation if needed
          //     scale: 1,
          //   },
          //   500, // Duration in milliseconds
          //   ({ position }) => {
          //     camera.position.set(position[0], position[1], position[2]);
          //     camera.lookAt(worldPosition); // Ensure the camera faces the selected mesh
          //   }
          // );
        }
          
        child.material.opacity = child.name == selectedPart ? 1 : selectedPart == 'outside'? 1: 0.3;
      }
    });
  }, [selectedPart])

  const handlePointerDown = (event) => {
    // Record the mouse position on pointer down
    mouseStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event) => {
    // Calculate the distance the mouse has moved
    const deltaX = Math.abs(event.clientX - mouseStart.current.x);
    const deltaY = Math.abs(event.clientY - mouseStart.current.y);

    // Log camera position and rotation
    // console.log("Camera Position: ["+camera.position.x.toFixed(2)+", "+camera.position.y.toFixed(2)+", "+camera.position.z.toFixed(2)+"]");
    // console.log("Camera Rotation: ["+camera.rotation.x.toFixed(2)+", "+camera.rotation.y.toFixed(2)+", "+camera.rotation.z.toFixed(2)+"]");

    if (deltaX < 2 && deltaY < 2) {
      // Perform raycasting
      raycaster.current.setFromCamera(mouse, camera);
      const intersects = raycaster.current.intersectObject(fbx, true);

      if (intersects.length > 0) {
        // If clicked on a part of the model
        const clickedPart = intersects[0].object;

        console.log("Clicked part:", clickedPart.name || "Unnamed Part");
        setSelectedPart(clickedPart.name);

        // Update the opacity for all meshes
        fbx.traverse((child) => {
          if (child.isMesh) {
            ensureMaterialSupport(child);
            child.material.opacity = child === clickedPart ? 1 : 0.3;
          }
        });
      } else {
        setSelectedPart("outside");
        // Clicked outside the model
        fbx.traverse((child) => {
          if (child.isMesh) {
            ensureMaterialSupport(child);
            child.material.opacity = 1; // Reset opacity for all parts
          }
        });
      }
    }
  };

  // Attach the event listener to the canvas
  gl.domElement.addEventListener("pointerdown", handlePointerDown);
  gl.domElement.addEventListener("pointerup", handlePointerUp);

  return <primitive object={fbx} scale={scale} rotation={[rot[0] * (Math.PI / 180), rot[1] * (Math.PI / 180), rot[2] * (Math.PI / 180)]} position={pos} />;
};


const ModelViewer = ({src, selectedPart, setSelectedPart, rot, pos, scale}) => {
 
  return (
    <Canvas  >
      <PerspectiveCamera
      makeDefault // Makes this the default camera
      position={[0, 0, 20]}// Initial rotation
      />
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Render the model */}
      <Model src={src} setSelectedPart={setSelectedPart} pos={pos} rot={rot} scale={scale} selectedPart={selectedPart} />
      {/* Add controls */}
      <OrbitControls />
    </Canvas>
  );
};

function convertToXYZ(str) {
  const _str = str?str:"0,0,0"
  const cor = _str.split(',').map((e) => parseFloat(e));
  // console.log(cor)
  return cor;
}

function animateTransform(start, end, duration, callback) {
  const startTime = performance.now();
  
  function update(currentTime) {
      const elapsedTime = currentTime - startTime;
      const t = Math.min(elapsedTime / duration, 1); // Normalized time (0 to 1)
      // Interpolate each value
      const position = start.position.map((v, i) => v + (end.position[i] - v) * t);
      const rotation = start.rotation.map((v, i) => v + (end.rotation[i] - v) * t);
      const scale = start.scale + (end.scale - start.scale) * t;

      // Call the callback with interpolated values
      callback({ position, rotation, scale });

      if (t < 1) {
          requestAnimationFrame(update);
      }
  }

  requestAnimationFrame(update);
}

const Model3D = ({src, parts, pos, rot, scale}) => {
    const [selectedPart, setSelectedPart] = useState("outside");

    const [cPos, setcPos] = useState(convertToXYZ(pos));
    const [cRot, setcRot] = useState(convertToXYZ(rot));
    const [cScale, setcScale] = useState(scale);
    
    const convertArrayToJson = (arr) => {
      return arr.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    };
  
    const jsonObject = convertArrayToJson(parts);

    
  
    return (
      <div style={{display:"flex", height:"400px", width:"100%", padding:"10px"}}>
        <div style={{backgroundColor:"#F2F2F2", width:"50%", padding:"5px", borderRadius:"5px", margin:"5px"}}>
          
          <ModelViewer src={src} selectedPart={selectedPart} setSelectedPart={setSelectedPart} pos={cPos} rot={cRot} scale={cScale} />
        </div>
        
        <div style={{backgroundColor:"#F2F2F2", width:"50%", padding:"15px", borderRadius:"5px", margin:"5px"}}>
          <div style={{display:"flex", flexWrap:"wrap", marginBottom:"10px"}}>
            {parts.map((e) => <div 
              style={{ color:e.key==selectedPart?"white":"black", backgroundColor:e.key==selectedPart?"#9757b5":"lightgray", opacity:0.7, padding:"5px", margin:"2px", borderRadius:"3px", fontSize:"10px", cursor:"pointer"}}
              onClick={() => {
                setSelectedPart(e.key);
              //   animateTransform(
              //     { position: [0,2,0], rotation: [45,0,0], scale: 0.1 }, // Start values
              //     { position: [0, 4, 0], rotation: [60, 0, 0], scale: 0.2 }, // End values
              //     200, // Duration in milliseconds
              //     (result) => {
              //         setcPos(result.position);
              //         setcRot(result.rotation);
              //         setcScale(result.scale); // Current interpolated values
              //     }
              // );
              }}
              >
              {e.key}
            </div>)}
          </div>
          <div style={{ height:"200px"}}>
              <MdText>
                {jsonObject[selectedPart]}
              </MdText>
          </div>
        </div>
      </div>
    )
  }
  
export default Model3D