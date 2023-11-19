import * as React from "react";
import "./css/gpt-chat-box.css";
import Typed from "react-typed";

export default function GPTChatBox({ gptText }) {
  return (
    <div class="card">
      <div class="header">
        {gptText && <Typed strings={[gptText]} typeSpeed={50} />}
      </div>
      <div class="chat-box-buttons">
        <button class="form-button">
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Start</span>
        </button>
        <button class="form-button">
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Pause</span>
        </button>
        <button class="form-button">
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Graph</span>
        </button>
      </div>
    </div>
  );
}
