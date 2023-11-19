import React from "react";
import "./css/transcripted-data.css";
import Typed from "react-typed";

const TranscriptedData = ({ data }) => {
  return (
    <div class="eeg-card">
      <center>
        <div class="terminal_promt">
          <span class="terminal_user">transcripted data: </span>
          <span class="terminal_location">~</span>
          <span class="terminal_bling">$</span>
          <span class="terminal_cursor"></span>
        </div>
        <div class="terminal_content">
          <p class="terminal_text">
            {data === "" ? null : (
              <Typed
                key={data["transcriptedData"]}
                strings={[data["transcriptedData"]]}
                typeSpeed={50}
              />
            )}
          </p>
        </div>
      </center>
    </div>
  );
};

export default TranscriptedData;
