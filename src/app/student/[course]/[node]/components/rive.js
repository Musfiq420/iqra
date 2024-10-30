// Input Name	                        Rendered Input	              Select Values
// "Zoom-number-1-100"	              Range input (1 to 100)	
// "State-select-option1-option2"	    Select input	                0 (option1), 1 (option2)

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
        return { type: 'text', caption: name }; // Default fallback
      };
    
      return (
        <div  style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:'center'}}>
          <MdText>{instruction}</MdText>
          <RiveComponent style={{ width: "300px", height: "300px" }} />
          {/* Dynamically render inputs */}
      {/* Dynamically render inputs */}
      {inputs.map((input) => {
        const { type, caption, min, max, options } = parseInputType(input.name);
        return (
          <div key={input.name} style={{ margin: '10px 0' }}>
            <label>
              {caption || input.name}:
              {type === 'range' ? (
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={inputValues[input.name]}
                  onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value))}
                />
              ) : type === 'select' ? (
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
              ) : null}
            </label>
          </div>
        );
      })}
          
        </div>
      )
}

export default RiveComponent