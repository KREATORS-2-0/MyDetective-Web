// ButtonComponent.js
import React from 'react';
import '../css/Buttonstyle.css'
const Button = () => {
  const handleButtonClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`);
    // Add your button click logic here
  };

  return (
    <div className="button-container">
      <button onClick={() => handleButtonClick(1)}>Initiate</button>
      <button onClick={() => handleButtonClick(2)}>Start</button>
      <button onClick={() => handleButtonClick(3)}>Pause</button>
      <button onClick={() => handleButtonClick(4)}>Terminate</button>
    </div>
  );
};

export default Button;