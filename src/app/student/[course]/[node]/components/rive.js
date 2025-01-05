'use client'
import React, { useEffect, useState } from 'react'
import { useRive } from '@rive-app/react-canvas';
import MdText from '@/app/utils/mdText';

const RiveComponent = ({src, instruction}) => {
    const { rive, RiveComponent } = useRive({
        src: src,  // Path to your .riv file in the public folder
        stateMachines: "State Machine 1",  // Name of the state machine controlling the animation
        autoplay: true,  // Automatically play the animation
      });
    
      const [inputs, setInputs] = useState([]); // Store state machine inputs
      const [inputValues, setInputValues] = useState({}); // Store input values
    
      // Fetch and set state machine inputs on component mount
      useEffect(() => {
        if (rive) {
          const stateMachineInputs = rive.stateMachineInputs("State Machine 1");
          setInputs(stateMachineInputs);
    
          // Initialize input values with default values
          const initialValues = stateMachineInputs.reduce((acc, input) => {
            acc[input.name] = 0; // Handle both text and range defaults
            return acc;
          }, {});
          setInputValues(initialValues);
        }
      }, [rive]);
    
      // Update input values when the user interacts with the inputs
      const handleInputChange = (name, value) => {
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    
        // Apply the change to the Rive input
        const input = inputs.find((input) => input.name === name);
        if (input) {
          input.value = value;
        }
      };
    
      // Helper function to parse input types from the name
      const parseInputType = (name) => {
        if (name.includes('-number-')) {
          const parts = name.split('-');
          return {
            type: 'range',
            caption: parts[0], // e.g., "Zoom"
            min: parseInt(parts[2], 10), // e.g., 1
            max: parseInt(parts[3], 10), // e.g., 100
          };
        } else if (name.includes('-select-')) {
          const parts = name.split('-');
          return {
            type: 'select',
            caption: parts[0], // e.g., "State"
            options: parts.slice(2), // e.g., ["option1", "option2"]
          };
        }
        return { type: 'trigger', caption: name }; // Default to trigger for other types
      };
    
      const handleTrigger = (name) => {
        const input = inputs.find((input) => input.name === name);
        if (input) {
          console.log(input)
          input.fire(); // Trigger the Rive input
        }
      };
    
      return (
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
          <MdText>{instruction}</MdText>
          <RiveComponent style={{ width: "300px", height: "300px" }} />
          {/* Dynamically render inputs */}
          {inputs.map((input) => {
            const { type, caption, min, max, options } = parseInputType(input.name);
            return (
              <div key={input.name} style={{ margin: '10px 0' }}>
                
                  {type === 'range' ? (
                    <label>
                      {caption || input.name}:
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={inputValues[input.name]}
                        onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value))}
                      />
                    </label>
                  ) : type === 'select' ? (
                    <label>
                      {caption || input.name}:
                      <select
                        value={inputValues[input.name]}
                        onChange={(e) => handleInputChange(input.name, parseInt(e.target.value))}
                      >
                        {options.map((option, index) => (
                          <option key={option} value={index}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : type === 'trigger' ? (
                    <button
                    style={{border:'none',margin:"10px", padding:"5px", paddingLeft:"20px", paddingRight:"20px", backgroundColor:"#9757b5", color:"white", cursor:"pointer", borderRadius:"5px"}}
                     onClick={() => handleTrigger(input.name)}>
                      {caption || input.name}
                    </button>
                  ) : null}
                
              </div>
            );
          })}
        </div>
      );
}

export default RiveComponent;
