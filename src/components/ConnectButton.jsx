import React, { useState } from "react";
import "./css/connect-button.css";

const ConnectButton = ({ onClick }) => {
  const [isEnabled, setIsEnabled] = useState(true); // Initialize as true to enable the button initially

  const handleButtonClick = () => {
    setIsEnabled(false); // Optionally disable the button after click, or handle it as per your logic
    onClick && onClick(); // Call the passed onClick handler if it exists
  };

  return (
    <button
      class="button"
      data-text="Connect"
      disabled={!isEnabled} // The button is enabled initially and gets disabled based on your logic
      onClick={handleButtonClick} // Attach the event handler
    >
      <span class="actual-text">&nbsp;Connect&nbsp;</span>
      <span aria-hidden="true" class="hover-text">
        &nbsp;Connect&nbsp;
      </span>
    </button>
  );
};

export default ConnectButton;
