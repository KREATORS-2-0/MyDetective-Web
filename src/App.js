import React, { useEffect } from "react";
import Button from "./components/Button";
import UnorderedList from "./components/UnorderedList";
import Image from "./components/ImageComponent";
import "./css/app.css";
import "./css/background.css";
import "./css/header.css";
import Form from "./components/Form.jsx";
import socket from "./client.js";
import getCompletion from "./gpt.js";

const App = () => {
  // set up state for the passcode
  const [connection, setConnection] = React.useState(true);
  const [formData, setFormData] = React.useState({});

  const formUpdate = async (data, key) => {
    if (key === "completed") {
      try {
        let conversationHistory=[]
        // Assuming you have the necessary data in your formData
        const { name, date, relationship, caseSummary, caseEvidence, crimeRecords } = formData;
  
        // Build the detective prompt
        const detectivePrompt = `I am a detective and I am trying to interrogate a suspect. The suspect name is ${name} born at ${date}. The suspect is a ${relationship} 
          to the victim. The cases summarize that ${caseSummary}. The evidence that supports the crime is ${caseEvidence}.
          the suspect has criminal records of ${crimeRecords}. Provide me a three guide questions for me to ask to the suspect in order to figure out the real criminal. Simply respond with possible questions and don't say anything else.
          The questions must be able to ba anserwed by suspect within 1 sentence`;
  
        // Call getCompletion
        const response = await getCompletion(detectivePrompt, conversationHistory);
  
        // Handle the response as needed
        console.log(response);
      } catch (error) {
        console.error("Error in getCompletion:", error);
      }

    } else {
      const temp = formData;
      temp[key] = data;
      setFormData(temp);
    }
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
