import React from "react";
import "./css/connect-button.css";

const ConnectButton = ({ handleButtonClick, connecting }) => {
  // Determine the class to apply
  const buttonClass = connecting ? "button" : "button green";

  return (
    <button
      className={buttonClass} // Use className instead of class
      data-text="Connect"
      onClick={handleButtonClick}
    >
      <span className="actual-text">&nbsp;Connect&nbsp;</span>
      <span aria-hidden="false" className="hover-text">
        &nbsp;Connect&nbsp;
      </span>
    </button>
  );
};

export default ConnectButton;
