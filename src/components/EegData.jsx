import React from "react";
import "./css/eeg-data.css";
import { Typography } from "@mui/material";

const EEGData = ({ eegData }) => {
  return (
    <div className="eeg-card">
      <center>
        <div className="profileimage">
          <img
            src={require("../images/NatHackLogo.png")}
            className={`logo-image ${
              eegData
                ? "logo-image-green"
                : eegData === false
                ? "logo-image-red"
                : ""
            }`}
            alt="logo"
          />
        </div>
        <div className="Name"></div>
        <div className="socialbar">
          <Typography fontSize={20} color={"#1eff8e"}>
            {eegData}
          </Typography>
        </div>
      </center>
    </div>
  );
};

export default EEGData;
