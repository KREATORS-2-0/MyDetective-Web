import React, { useEffect, useState } from "react";
import Image from "./components/ImageComponent";
import "./css/app.css";
import Connect from "./components/Connect";
import socket from "./client.js";
import getCompletion from "./gpt.js";
import Form from "./components/Form.jsx";
import EmotionChart from "./components/EmotionGraph.jsx";
import EEGChart from "./components/EEGGraph.jsx";
import GPTChatBox from "./components/GPTChatBox.jsx";
import ConnectButton from "./components/ConnectButton.jsx";
import CaseFormButton from "./components/CaseFormButton.jsx";
import CaseList from "./components/CaseList.jsx";

const App = () => {
  // set up state for the passcode

  // todo for yongbin if connnecting is false, then set the connect button to Green
  const [connecting, setConnecting] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [showConnect, setShowConnect] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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

  const handleEEGData = () => {
    const data = [
      {
        "EXG Channel 1": -144.917383383,
        "EXG Channel 2": -384.8132660408,
        "EXG Channel 3": -328.6885874057,
        "EXG Channel 4": -149.2444476318,
        Timestamp: 1700261346.6810429096,
        Response: null,
      },
      {
        "EXG Channel 1": 72.1239706455,
        "EXG Channel 2": -871.1479863287,
        "EXG Channel 3": 114.8298882395,
        "EXG Channel 4": 63.974728642,
        Timestamp: 1700261346.6810429096,
        Response: null,
      },
      {
        "EXG Channel 1": -125.3876258144,
        "EXG Channel 2": -1285.7420757166,
        "EXG Channel 3": -284.4044320304,
        "EXG Channel 4": -141.8544053193,
        Timestamp: 1700261346.6956601143,
        Response: null,
      },
      {
        "EXG Channel 1": -12.7754982486,
        "EXG Channel 2": -1147.8893633499,
        "EXG Channel 3": -76.1780221974,
        "EXG Channel 4": -16.2760446072,
        Timestamp: 1700261346.6956601143,
        Response: null,
      },
      {
        "EXG Channel 1": 88.8936820468,
        "EXG Channel 2": -837.5487251268,
        "EXG Channel 3": 174.9188608276,
        "EXG Channel 4": 92.1473950082,
        Timestamp: 1700261346.6958003044,
        Response: null,
      },
      {
        "EXG Channel 1": -78.747333467,
        "EXG Channel 2": -1144.3626376917,
        "EXG Channel 3": -160.3295111004,
        "EXG Channel 4": -82.3862561239,
        Timestamp: 1700261346.6958003044,
        Response: null,
      },
      {
        "EXG Channel 1": -89.1816543434,
        "EXG Channel 2": -1302.33975172,
        "EXG Channel 3": -249.5635240432,
        "EXG Channel 4": -92.1174758086,
        Timestamp: 1700261346.7092843056,
        Response: null,
      },
      {
        "EXG Channel 1": 68.4401691891,
        "EXG Channel 2": -880.9427843126,
        "EXG Channel 3": 163.3962290641,
        "EXG Channel 4": 80.942654741,
        Timestamp: 1700261346.7092843056,
        Response: null,
      },
      {
        "EXG Channel 1": 12.7081800494,
        "EXG Channel 2": -973.8082401124,
        "EXG Channel 3": -1.3575836839,
        "EXG Channel 4": -1.2977452846,
        Timestamp: 1700261346.7249467373,
        Response: null,
      },
      {
        "EXG Channel 1": -140.9119505305,
        "EXG Channel 2": -1360.4353576316,
        "EXG Channel 3": -331.2990375748,
        "EXG Channel 4": -148.6236242391,
        Timestamp: 1700261346.7249467373,
        Response: null,
      },
      {
        "EXG Channel 1": 45.237829864,
        "EXG Channel 2": -980.1511104372,
        "EXG Channel 3": 86.1972141787,
        "EXG Channel 4": 54.0452942597,
        Timestamp: 1700261346.7257108688,
        Response: null,
      },
      {
        "EXG Channel 1": 66.8918506075,
        "EXG Channel 2": -869.6744657462,
        "EXG Channel 3": 120.7127508698,
        "EXG Channel 4": 66.1775297159,
        Timestamp: 1700261346.7257108688,
        Response: null,
      },
      {
        "EXG Channel 1": -132.4971756302,
        "EXG Channel 2": -1284.8706790269,
        "EXG Channel 3": -279.4490645891,
        "EXG Channel 4": -137.2618081737,
        Timestamp: 1700261346.7392427921,
        Response: null,
      },
      {
        "EXG Channel 1": -18.9313735757,
        "EXG Channel 2": -1149.145969735,
        "EXG Channel 3": -79.8393842541,
        "EXG Channel 4": -14.604309327,
        Timestamp: 1700261346.7392427921,
        Response: null,
      },
    ];
    return data;
  };

  const eegData = handleEEGData();

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
            <div className="emotion-graph">
              <EmotionChart data={emotionData} />
            </div>
            <div className="eeg-graph">
              {eegData ? (
                <EEGChart data={eegData} />
              ) : (
                <div>Loading EEG Data...</div>
              )}
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <div className="GPTChatBox">
            <div className="right-panel-header">
              <div className="case-form-button-box">
                <CaseFormButton handleOpen={handleFormOpen} />
              </div>
              <div className="case-list-box">
                <CaseList />
              </div>
            </div>
            {/* <GPTChatBox /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
