// ButtonComponent.js
import React from "react";
import "./css/button_style.css";

const Button = ({ handleButton }) => {
  return (
    <div className="button-container">
      <button onClick={() => handleButton("Initiate")}>Initiate</button>
      <button onClick={() => handleButton("Start")}>Start</button>
      <button onClick={() => handleButton("Pause")}>Pause</button>
      <button onClick={() => handleButton("Terminate")}>Terminate</button>
    </div>
  );
};

export default Button;
