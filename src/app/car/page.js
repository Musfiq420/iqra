import React from 'react'

const PhotosynthesisSVG = () => {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun */}
      <circle cx="50" cy="50" r="30" fill="yellow">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Sunlight rays */}
      <line x1="50" y1="50" x2="100" y2="100" stroke="yellow" strokeWidth="2">
        <animate
          attributeName="x2"
          from="100"
          to="200"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          from="100"
          to="200"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

      {/* Plant */}
      <rect x="170" y="250" width="60" height="120" fill="green" />
      <circle cx="200" cy="220" r="40" fill="green" />

      {/* Water molecules (H2O) */}
      <g fill="blue">
        <circle cx="50" cy="350" r="5">
          <animate
            attributeName="cx"
            from="50"
            to="200"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="350"
            to="250"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="70" cy="370" r="5">
          <animate
            attributeName="cx"
            from="70"
            to="220"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="370"
            to="270"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Carbon dioxide (CO2) */}
      <g fill="gray">
        <circle cx="350" cy="100" r="5">
          <animate
            attributeName="cx"
            from="350"
            to="200"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="100"
            to="220"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="370" cy="120" r="5">
          <animate
            attributeName="cx"
            from="370"
            to="220"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="120"
            to="240"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Oxygen molecules (O2) */}
      <g fill="red">
        <circle cx="200" cy="220" r="5">
          <animate
            attributeName="cx"
            from="200"
            to="50"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="220"
            to="50"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="220" cy="240" r="5">
          <animate
            attributeName="cx"
            from="220"
            to="70"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="240"
            to="70"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Glucose molecule */}
      <g fill="orange">
        <circle cx="200" cy="250" r="5">
          <animate
            attributeName="cx"
            from="200"
            to="350"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="250"
            to="350"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}; 

const CarSVG = () => {
  return (
    <svg
      width="200"
      height="100"
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grouping the car parts for easier animation */}
      <g>
        {/* Car Body */}
        <rect x="30" y="50" width="140" height="40" fill="blue" />
        <rect x="50" y="30" width="100" height="40" fill="blue" />

        {/* Car Windows */}
        <rect x="60" y="35" width="30" height="20" fill="lightblue" />
        <rect x="110" y="35" width="30" height="20" fill="lightblue" />

        {/* Car Wheels */}
        <circle cx="50" cy="90" r="10" fill="black" />
        <circle cx="150" cy="90" r="10" fill="black" />

        {/* Headlights */}
        <circle cx="30" cy="70" r="5" fill="yellow" />
        <circle cx="170" cy="70" r="5" fill="yellow" />

        {/* Wheel animations */}
        <circle cx="50" cy="90" r="10" fill="black">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 90"
            to="360 50 90"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="150" cy="90" r="10" fill="black">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 150 90"
            to="360 150 90"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Animate the car's movement */}
      <animateTransform
        attributeName="transform"
        type="translate"
        from="-200 0"
        to="400 0"
        dur="5s"
        repeatCount="indefinite"
      />
    </svg>
  );
};

const HeartCirculationSVG = () => {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart Outline */}
      <rect x="100" y="100" width="200" height="200" fill="none" stroke="black" strokeWidth="2" />

      {/* Heart Chambers */}
      {/* Right Atrium */}
      <rect x="100" y="100" width="90" height="90" fill="lightblue" />
      <text x="120" y="150" fill="black" fontSize="12">Right Atrium</text>
      
      {/* Right Ventricle */}
      <rect x="100" y="210" width="90" height="90" fill="lightblue" />
      <text x="120" y="260" fill="black" fontSize="12">Right Ventricle</text>
      
      {/* Left Atrium */}
      <rect x="210" y="100" width="90" height="90" fill="pink" />
      <text x="230" y="150" fill="black" fontSize="12">Left Atrium</text>
      
      {/* Left Ventricle */}
      <rect x="210" y="210" width="90" height="90" fill="pink" />
      <text x="230" y="260" fill="black" fontSize="12">Left Ventricle</text>

      {/* Blood Flow Arrows */}
      {/* From Right Atrium to Right Ventricle */}
      <path d="M 145 190 L 145 210" stroke="red" strokeWidth="2" markerEnd="url(#arrowhead)">
        <animate
          attributeName="d"
          values="M 145 190 L 145 210; M 145 190 L 145 210"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* From Right Ventricle to Lungs (Pulmonary Artery) */}
      <path d="M 145 300 L 145 350 Q 140 360 180 360 Q 220 360 210 350 L 210 300" stroke="blue" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <animate
          attributeName="d"
          values="M 145 300 L 145 350 Q 140 360 180 360 Q 220 360 210 350 L 210 300;
                  M 145 300 L 145 350 Q 140 360 180 360 Q 220 360 210 350 L 210 300"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* From Lungs to Left Atrium (Pulmonary Vein) */}
      <path d="M 255 100 L 255 80 Q 260 60 300 60 Q 340 60 330 80 L 330 100" stroke="blue" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <animate
          attributeName="d"
          values="M 255 100 L 255 80 Q 260 60 300 60 Q 340 60 330 80 L 330 100;
                  M 255 100 L 255 80 Q 260 60 300 60 Q 340 60 330 80 L 330 100"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* From Left Atrium to Left Ventricle */}
      <path d="M 255 190 L 255 210" stroke="red" strokeWidth="2" markerEnd="url(#arrowhead)">
        <animate
          attributeName="d"
          values="M 255 190 L 255 210; M 255 190 L 255 210"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* From Left Ventricle to Body (Aorta) */}
      <path d="M 255 300 L 255 350 Q 260 360 300 360 Q 340 360 330 350 L 330 300" stroke="red" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <animate
          attributeName="d"
          values="M 255 300 L 255 350 Q 260 360 300 360 Q 340 360 330 350 L 330 300;
                  M 255 300 L 255 350 Q 260 360 300 360 Q 340 360 330 350 L 330 300"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Define arrowhead for blood flow */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
      </defs>
    </svg>
  );
};



const Page = () => {
  return (
    <div style={{marginTop:"100px"}}>
        <HeartCirculationSVG />
    </div>
  )
}

export default Page