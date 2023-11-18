import React, { useState } from "react";
import "./css/case-list.css";

const CaseList = () => {
  return (
    <div className="radio-inputs">
      <label className="radio">
        <input type="radio" name="radio" defaultChecked />
        <span className="name">Homocide Case</span>
      </label>
      <label className="radio">
        <input type="radio" name="radio" />
        <span className="name">Robbery Case</span>
      </label>
      <label className="radio">
        <input type="radio" name="radio" />
        <span className="name">Jail breaking Case</span>
      </label>
    </div>
  );
};

export default CaseList;
