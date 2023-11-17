import React, { useEffect } from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
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
        <h1>MyDetective</h1>
      </div>
      <UnorderedList></UnorderedList>
      <Image />
      <Button />
    </>
  );
};

export default App;
