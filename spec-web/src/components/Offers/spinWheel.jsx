// import React, { useState } from 'react';
// import './spinWheel.css'; 

// const SpinWheel = ({ segments, onSpin }) => {
//   const [rotation, setRotation] = useState(0);

//   const handleSpin = () => {
//     const newRotation = rotation + Math.ceil(Math.random() * 3600);
//     setRotation(newRotation);
//     if (onSpin) {
//       onSpin(); 
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div
//         className="relative w-80 h-80 spin-wheel-container"
//         style={{ transform: `rotate(${rotation}deg)` }}
//       >
//         {segments.map((segment, index) => (
//           <div
//             key={index}
//             className="spin-wheel-segment"
//             style={{
//               backgroundColor: `hsl(${(360 / segments.length) * index}, 70%, 70%)`, // Colors for visualization
//               transform: `rotate(${(360 / segments.length) * index}deg)`
//             }}
//           >
//             {segment}
//           </div>
//         ))}
//         <span className="spin-wheel-arrow">
//           &#x1F817;
//         </span>
//       </div>
//       <button
//         onClick={handleSpin}
//         className="spin-wheel-button"
//       >
//         Spin
//       </button>
//     </div>
//   );
// };

// export default SpinWheel;

import React, { useState } from 'react';
import './spinWheel.css'; 

const SpinWheel = ({ segments, onSpin }) => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    const newRotation = rotation + Math.ceil(Math.random() * 3600);
    setRotation(newRotation);
    if (onSpin) {
      onSpin(); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-80 h-80 spin-wheel-container" style={{ transform: `rotate(${rotation}deg)` }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className="spin-wheel-segment"
            style={{
              backgroundColor: `hsl(${(360 / segments.length) * index}, 40%, 50%)`,
              transform: `rotate(${(360 / segments.length) * index}deg)`,
            }}
          >
            <span className="segment-label">
              {segment}
            </span>
          </div>
        ))}
      </div>
      <span className="spin-wheel-arrow">&#x1F817;</span>
      <button onClick={handleSpin} className="spin-wheel-button">
        Press
      </button>
    </div>
  );
};

export default SpinWheel;
