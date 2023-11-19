import React, { useEffect, useState } from "react";
import Image from "./components/ImageComponent";
import "./css/app.css";
import Connect from "./components/Connect";
import socket from "./client.js";
import getCompletion from "./gpt.js";
import Form from "./components/Form.jsx";
import EmotionChart from "./components/EmotionGraph.jsx";
import EEGChart from "./components/EEGGraph.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ConnectButton from "./components/ConnectButton.jsx";
import CaseFormButton from "./components/CaseFormButton.jsx";
import StatusButton from "./components/StatusButton.jsx";
import EEGData from "./components/EegData.jsx";
import TranscriptedData from "./components/TranscriptedData.jsx";

const App = () => {
  // set up state for the passcode

  // todo for yongbin if connnecting is false, then set the connect button to Green
  const [connecting, setConnecting] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [showConnect, setShowConnect] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState(true);

  // History of the conversation
  const [conversationHistory, setConversationHistory] = useState([
    { title: "Title!", summary: "summary" },
    { title: "Title1", summary: "Summary1" },
  ]);
  const [currentHistory, setCurrentHistory] = useState(-1);

  const onSelectHistory = (index) => {
    setCurrentHistory(index);
    console.log(index);
  };

  const handleStatusChange = () => {
    setStatus(!status);
    setCurrentHistory(-1);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const formUpdate = async (data, key) => {
    if (key === "completed") {
      setFormOpen(false);
      try {
        let conversationHistory = [];
        // Assuming you have the necessary data in your formData
        const {
          name,
          date,
          relationship,
          caseSummary,
          caseEvidence,
          crimeRecords,
        } = formData;

        // Build the detective prompt
        const detectivePrompt = `I am a detective and I am trying to interrogate a suspect. The suspect name is ${name} born at ${date}. The suspect is a ${relationship} 
          to the victim. The cases summarize that ${caseSummary}. The evidence that supports the crime is ${caseEvidence}.
          the suspect has criminal records of ${crimeRecords}. Provide me a three guide questions for me to ask to the suspect in order to figure out the real criminal. Simply respond with possible questions and don't say anything else.
          The questions must be able to ba anserwed by suspect within 1 sentence`;

        // Call getCompletion
        // const response = await getCompletion(
        //   detectivePrompt,
        //   conversationHistory
        // );

        // Handle the response as needed
        // console.log(response);
      } catch (error) {
        console.error("Error in getCompletion:", error);
      }
    } else if (key === "incomplete") {
      setFormOpen(false);
    } else {
      const temp = formData;
      temp[key] = data;
      setFormData(temp);
    }
  };

  const handlePasscodeChange = (newPasscode) => {
    if (newPasscode === "") {
      setShowConnect(false);
    } else {
      socket.emit("passcode", newPasscode);
    }
  };

  const handleCommand = (command) => {
    socket.emit("command", command);
  };

  useEffect(() => {
    socket.on("connection", (passcode_status) => {
      console.log("connected!");
      setConnecting(passcode_status);
    });
    socket.on("command", (data) => {
      console.log(data);
    });
  }, []);

  const handleButtonClick = () => {
    setShowConnect(true);
    console.log("button Clicked!");
  };

  const handleEmotionData = () => {
    const data = {
      TimeStamp: [
        "2023-11-17 17:51:25",
        "2023-11-17 17:51:27",
        "2023-11-17 17:51:28",
        "2023-11-17 17:51:29",
        "2023-11-17 17:51:30",
        "2023-11-17 17:51:31",
        "2023-11-17 17:51:33",
        "2023-11-17 17:51:34",
        "2023-11-17 17:51:35",
        "2023-11-17 17:51:36",
        "2023-11-17 17:51:37",
        "2023-11-17 17:51:38",
        "2023-11-17 17:51:39",
        "2023-11-17 17:51:41",
        "2023-11-17 17:51:42",
      ],
      Emotion: [
        "sad",
        "sad",
        "sad",
        "sad",
        "happy",
        "happy",
        "neutral",
        "neutral",
        "neutral",
        "sad",
        "sad",
        "surprise",
        "neutral",
        "neutral",
        "sad",
      ],
    };
    return data;
  };

  const emotionData = handleEmotionData();
  return (
    <div className="App">
      <Form updateForm={formUpdate} open={formOpen} />
      <div className="panels-container">
        <div className="leftPanel">
          <div className="logo">
            <div className="logo-image">
              <Image />
            </div>
            <div className="logo-name">
              <h1>MyDetective</h1>
            </div>
            <div className="connect-button">
              <ConnectButton
                handleButtonClick={handleButtonClick}
                connecting={connecting}
              >
                Connect
              </ConnectButton>
              {showConnect ? (
                <Connect
                  handlePasscodeChange={handlePasscodeChange}
                  open={connecting}
                />
              ) : null}
            </div>
          </div>
          <div className="graphs">
            {
              <div className="emotion-graph">
                <EmotionChart data={emotionData} />
              </div>
            }
            <div className="eeg-graph">
              <div className="eeg-data">
                <EEGData eegData={true} />
              </div>
              <div className="transcripted-data">
                <TranscriptedData transcriptedData={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <div className="right-panel-header">
            <div className="case-form-button-box">
              <CaseFormButton handleOpen={handleFormOpen} />
            </div>
            <div className="case-list-box">
              <StatusButton handleClick={handleStatusChange} />
            </div>
          </div>
          <div className="GPTChatBox">
            {status ? (
              <>
                {conversationHistory.map((data, index) => (
                  <QuestionCard
                    data={data}
                    handleClick={onSelectHistory}
                    index={index}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
