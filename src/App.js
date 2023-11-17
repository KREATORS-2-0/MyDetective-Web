import React from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
import './css/background.css';
import './css/header.css';
import Connect from "./components/Connect";


const App = () => {
  return (
    <>
    <div className="app-container">
    <h1 className="my-detective-heading">MyDetective</h1>
    </div>
     <div className="background-image-container">
      <Connect />
      <UnorderedList></UnorderedList>
      <Image />
      <Button />
      </div>
      </>
  );
};

export default App;
