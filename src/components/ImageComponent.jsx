// Image.js
import React from "react";
import "./css/image_style.css";

const Image = () => {
  return (
    <div className="circular-image">
      <img src={require("../images/NatHackLogo.png")} />
    </div>
  );
};

export default Image;
