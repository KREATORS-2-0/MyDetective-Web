import React, { useEffect, useState } from "react";
import Image from "./components/ImageComponent";
import "./css/app.css";
import Connect from "./components/Connect";
import socket from "./client.js";
import { getCompletion, initializeGPT } from "./gpt.js";
import Form from "./components/Form.jsx";
import EmotionChart from "./components/EmotionGraph.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ConnectButton from "./components/ConnectButton.jsx";
import CaseFormButton from "./components/CaseFormButton.jsx";
import StatusButton from "./components/StatusButton.jsx";
import EEGData from "./components/EegData.jsx";
import TranscriptedData from "./components/TranscriptedData.jsx";
import Suggestions from "./components/Suggestions.jsx";
import { CircularProgress } from "@mui/material";

const openaiAPIKey = "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";

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

const handleEmotionData1 = () => {
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
      "happy",
      "sad",
      "neutral",
      "happy",
      "sad",
      "sad",
      "sad",
      "neutral",
      "sad",
      "neutral",
      "neutral",
      "happy",
      "neutral",
      "surprise",
    ],
  };
  return data;
};

const App = () => {
  // set up state for the passcode

  // todo for yongbin if connnecting is false, then set the connect button to Green
  const [connecting, setConnecting] = React.useState(true);
  const [formData, setFormData] = React.useState({ emtpy: true });
  const [showConnect, setShowConnect] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(-1);

  // for gpt
  const [conversationHistory, setConversationHistory] = useState([]);

  // History of the conversation
  const [questionHistory, setQuestionHistory] = useState([
    {
      title: "",
      summary: "",
      faceData: null,
      EEGData: "",
      speechData: {
        transcriptedData: "",
        emotion: "",
      },
    },
    {
      title: "Title!",
      summary: "summary",
      faceData: handleEmotionData(),
      EEGData: "true",
      speechData: {
        transcriptedData: "hi how are you I am good thanks!",
        emotion: "happy",
      },
    },
    {
      title: "Title!",
      summary: "summary",
      faceData: handleEmotionData1(),
      EEGData: "false",
      speechData: {
        transcriptedData: "I am not happy at all dammit!",
        emotion: "neutral",
      },
    },
  ]);
  const [currentHistory, setCurrentHistory] = useState(0);

  // states for current suggestions from gpt
  const [suggestions, setSuggestions] = useState(["", "", ""]);

  const onSelectHistory = (index) => {
    setCurrentHistory(index);
    console.log(index);
  };

  const handleStatusChange = () => {
    setStatus(!status);
    setCurrentHistory(0);
  };

  const selectSuggestion = async (index) => {
    setCurrentSuggestion(index);
  };

  const handleFormOpen = () => {
    let temp = formData;
    temp["emtpy"] = false;
    setFormData(temp);
    setFormOpen(true);
    setLoading(true);
  };

  const formUpdate = async (data, key) => {
    if (key === "completed") {
      setFormOpen(false);
      let tempHistory = [];
      // call gpt here and get the response
      const response = await initializeGPT(
        formData["name"],
        formData["date"],
        formData["relationship"],
        formData["caseSummary"],
        formData["caseEvidence"],
        formData["crimeRecords"],
        openaiAPIKey,
        tempHistory
      );
      setLoading(false);
      // // // update the question history
      // let History = questionHistory;
      // History.push(response);
      // setQuestionHistory(History);

      // // // update the current history to display the latest
      // setCurrentHistory(History.length - 1);

      // // update the suggestions
      setSuggestions(JSON.parse(response));
    } else if (key === "incomplete") {
      setFormOpen(false);
      setLoading(false);
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
                <EmotionChart
                  data={questionHistory[currentHistory]["faceData"]}
                />
              </div>
            }
            <div className="eeg-graph">
              <div className="eeg-data">
                <EEGData eegData={questionHistory[currentHistory]["EEGData"]} />
              </div>
              <div className="transcripted-data">
                <TranscriptedData
                  data={questionHistory[currentHistory]["speechData"]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <div className="right-panel-header">
            <div className="case-list-box">
              <StatusButton handleClick={handleStatusChange} />
            </div>
          </div>
          <div className="GPTChatBox">
            {status ? (
              <>
                {questionHistory.slice(1).map((data, index) => (
                  <QuestionCard
                    data={data}
                    handleClick={onSelectHistory}
                    index={index + 1}
                  />
                ))}
              </>
            ) : (
              <>
                {loading && (
                  <div>
                    <CircularProgress />
                  </div>
                )}
                <div style={{ marginTop: "30px" }}></div>
                {formData["emtpy"] && (
                  <CaseFormButton handleOpen={handleFormOpen} />
                )}
                <Suggestions
                  data={suggestions}
                  handleClick={selectSuggestion}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
