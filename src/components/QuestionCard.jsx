import * as React from "react";
import "./css/gpt-chat-box.css";

export default function QuestionCard({ data, handleClick, index }) {
  return (
    <div
      class="card"
      onClick={() => {
        handleClick(index);
      }}
    >
      <div class="card-details">
        <p class="text-title">{data.title}</p>
        <p class="text-body">{data.summary}</p>
      </div>
      <button class="card-button">Click Card to access data</button>
    </div>
  );
}
