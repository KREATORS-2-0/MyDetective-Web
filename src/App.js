import React, { useEffect } from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
import "./css/background.css";
import "./css/header.css";
import Form from "./components/Form.jsx";
import socket from "./client.js";

const App = () => {
  // set up state for the passcode
  const [connection, setConnection] = React.useState(true);
  const [formData, setFormData] = React.useState({});

  const formUpdate = (data, key) => {
    const temp = formData;
    temp[key] = data;
    setFormData(temp);
    console.log(temp);
  };

  const handlePasscodeChange = (newPasscode) => {
    if (newPasscode === "0") {
      setConnection(false);
    }
    socket.emit("passcode", newPasscode);
  };

  const handleCommand = (command) => {
    socket.emit("command", command);
  };

  useEffect(() => {
    socket.on("connection", (passcode_status) => {
      console.log("connected!");
      setConnection(!passcode_status);
    });
    socket.on("command", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      {/* <Connect handlePasscodeChange={handlePasscodeChange} open={connection} /> */}
      <Form updateForm={formUpdate} />
      <div className="app-container">
        <h1 className="my-detective-heading">MyDetective</h1>
      </div>
      <div className="background-image-container">
        <UnorderedList></UnorderedList>
        <Image />
        <Button handleButton={handleCommand} />
      </div>
    </>
  );
};

export default App;
