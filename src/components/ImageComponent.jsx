// Image.js
import React from 'react';
import '../css/image_style.css'

const Image = () => {
  return (
    <div className = "image-container">
      <img src ={require("../images/NatHackLogo.png")} />
    </div>
  );
};

export default Image;