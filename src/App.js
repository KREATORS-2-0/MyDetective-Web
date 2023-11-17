import React from "react";
import Button from "./components/Button";
import Connect from "./components/Connect";

import "./css/app.css";
const App = () => {
  return (
    <>
      <Connect />
      <div className="app-container">
        <h1>MyDetective</h1>
      </div>
      <Button />
    </>
  );
};

export default App;
