'use client'
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import MdText from '@/app/utils/mdText';
import styles from './model3d.module.css';

function animateTransform(start, end, duration, callback) {
  const startTime = performance.now();
  
  function update(currentTime) {
      const elapsedTime = currentTime - startTime;
      const t = Math.min(elapsedTime / duration, 1); // Normalized time (0 to 1)
      // Interpolate each value
      const position = start.position.map((v, i) => v + (end.position[i] - v) * t);
      const rotation = start.rotation.map((v, i) => v + (end.rotation[i] - v) * t);
      const target = start.target.map((v, i) => v + (end.target[i] - v) * t);

      // Call the callback with interpolated values
      callback({ position, rotation, target });

      if (t < 1) {
          requestAnimationFrame(update);
      }
  }

  requestAnimationFrame(update);
}


const FBXModel = ({ src, colors, selectedPart, controlsRef }) => {
  const fbx = useLoader(FBXLoader, src);

  const raycaster = useRef(new THREE.Raycaster());
  const { camera, mouse, gl } = useThree();
  const mouseStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (fbx) {
      let colorIndex = 0;
      fbx.traverse((child) => {
        if (child.isMesh) {
          // Make all meshes transparent with 40% opacity
          
          child.material = new THREE.MeshStandardMaterial({
            color: colors[colorIndex],
            transparent: true,
            opacity: 1,
          });
          // Enable click detection
          child.userData.isClickable = true;
          colorIndex++;
        }
      });
    }
  }, [fbx]);

  useEffect(() => {
    
    fbx.traverse((child) => {
      if (child.isMesh) {
        if(child.name==selectedPart.key)
        {
          
        }
          
        child.material.opacity = child.name == selectedPart.key ? 1 : selectedPart.key == 'outside'? 1: 0.1;
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

    if (deltaX < 2 && deltaY < 2) {
      // Perform raycasting
      raycaster.current.setFromCamera(mouse, camera);
      const intersects = raycaster.current.intersectObject(fbx, true);

      if (intersects.length > 0) {
        // If clicked on a part of the model
        const clickedPart = intersects[0].object;

        console.log("Clicked part:", clickedPart.name || "Unnamed Part");

        fbx.traverse((child) => {
          if (child.isMesh) {
            child.material.opacity = child === clickedPart ? 1 : 0.3;

            console.log(JSON.stringify({
              "position": camera.position.toArray(),
              "rotation": camera.rotation.toArray().slice(0,3),
              "target": controlsRef.current.target.toArray()
            }))
          }
        });
      } 
      else {
        fbx.traverse((child) => {
          if (child.isMesh) {
            child.material.opacity = 1; // Reset opacity for all parts
          }
        });
      }
    }
  };

  // Attach the event listener to the canvas
  gl.domElement.addEventListener("pointerdown", handlePointerDown);
  gl.domElement.addEventListener("pointerup", handlePointerUp);

  return (
    <primitive
      object={fbx}
      scale={0.1}
    />
  );
};

const Scene = ({ src, selectedPart, initialState }) => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    console.log(selectedPart.position)
    if(selectedPart.position)
    {
      const foc = JSON.parse(selectedPart.position);
      animateTransform(
          { position: camera.position.toArray(), rotation: camera.rotation.toArray().slice(0,3), target: controlsRef.current.target.toArray() }, // Start values
          { position: foc.position, rotation: foc.rotation, target: foc.target }, // End values
          1000, // Duration in milliseconds
          (result) => {
            camera.position.set(...result.position);
            camera.rotation.set(...result.rotation);
            controlsRef.current.target.set(...result.target);
            controlsRef.current.update();
          }
      );
    }
    else
    {
      animateTransform(
          { position: camera.position.toArray(), rotation: camera.rotation.toArray().slice(0,3), target: controlsRef.current.target.toArray() }, // Start values
          { position: initialState.position, rotation: initialState.rotation, target: initialState.target }, // End values
          1000, // Duration in milliseconds
          (result) => {
            camera.position.set(...result.position);
            camera.rotation.set(...result.rotation);
            controlsRef.current.target.set(...result.target);
            controlsRef.current.update();
          }
      );
    }
    
  }, [selectedPart])



  const colors = [
    0xff6f61, // Vibrant Coral, 
    0xffa07a, // Light Salmon
    0x98fb98, // Pale Green
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
    0xffd700, // Bright Yellow
    0x87ceeb, // Sky Blue
  ];

  return (
    <>
      <Suspense fallback={null}>
        <FBXModel
          src={src}
          colors={colors}
          selectedPart={selectedPart}
          controlsRef={controlsRef}
        />
      </Suspense>
      <OrbitControls ref={controlsRef} />
    </>
  );
};

const Canvas3D = ({src, selectedPart, initialState}) => {

  

  return (
    <>
      <Canvas >
        <PerspectiveCamera
        makeDefault // Makes this the default camera
        position={initialState.position}// Initial rotation
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Scene 
          src={src}
          selectedPart={selectedPart}
          initialState={initialState}
          />
      </Canvas>
    </>
  );
};


function convertToXYZ(str) {
  const _str = str?str:"0,0,0"
  const cor = _str.split(',').map((e) => parseFloat(e));
  
  return cor;
}

const Model3D = ({ src, parts, pos, rot, tar }) => {
  const [selectedPart, setSelectedPart] = useState(parts[0]);

  const initialState = {
    position: convertToXYZ(pos),
    rotation: convertToXYZ(rot),
    target: convertToXYZ(tar),
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
        <Canvas3D src={src} selectedPart={selectedPart} initialState={initialState} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.partButtons}>
          {parts.map((part) => (
            <div
              key={part.key}
              className={`${styles.partButton} ${selectedPart.key === part.key ? styles.selected : styles.default}`}
              onClick={() => setSelectedPart(part)}
            >
              {part.title}
            </div>
          ))}
        </div>
        <div className={styles.mdTextContainer}>
          <MdText>{selectedPart.value}</MdText>
        </div>
      </div>
    </div>
  );
};


export default Model3D