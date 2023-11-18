import React, { useState } from "react";
import "./css/case-form-button.css";

const CaseFormButton = ({ handleOpen }) => {
  return <button onClick={handleOpen}>Hover Over</button>;
};

export default CaseFormButton;
