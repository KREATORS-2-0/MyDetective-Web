import React, { useEffect } from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
import "./css/background.css";
import "./css/header.css";
import Connect from "./components/Connect";
import socket from "./client.js";

const App = () => {
  // set up state for the passcode
  const [connection, setConnection] = React.useState(true);

  const handlePasscodeChange = (newPasscode) => {
    socket.emit("passcode", newPasscode);
  };

  useEffect(() => {
    socket.on("connection", (passcode_status) => {
      console.log("connected!");
      setConnection(!passcode_status);
    });
  }, []);

  return (
    <>
      <Connect handlePasscodeChange={handlePasscodeChange} open={connection} />
      <div className="app-container">
        <h1 className="my-detective-heading">MyDetective</h1>
      </div>
      <div className="background-image-container">
        <UnorderedList></UnorderedList>
        <Image />
        <Button />
      </div>
    </>
  );
};

export default App;
