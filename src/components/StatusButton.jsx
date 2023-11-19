import * as React from "react";
import "./css/status-button.css";

export default function StatusButton({ handleClick }) {
  return (
    <div class="switch">
      <input
        class="switch-check"
        id="switch1"
        type="checkbox"
        onClick={handleClick}
      />
      <label class="switch-label" for="switch1">
        Check
        <span></span>
      </label>
    </div>
  );
}
