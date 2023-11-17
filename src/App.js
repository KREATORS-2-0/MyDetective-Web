import React from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
import Connect from "./components/Connect";

const App = () => {
  return (
    <>
      <Connect />
      <div className="app-container">
        <h1>MyDetective</h1>
      </div>
      <UnorderedList></UnorderedList>
      <Image />
      <Button />
    </>
  );
};

export default App;
