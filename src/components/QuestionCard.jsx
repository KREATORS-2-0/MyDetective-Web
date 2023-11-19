import * as React from "react";
import "./css/gpt-chat-box.css";

export default function QuestionCard({ data, handleClick, index, title }) {
  return (
    <div
      class="card"
      onClick={() => {
        handleClick(index);
      }}
    >
      <div class="card-details">
        <p class="text-title">{title}</p>
      </div>
      <button class="card-button">Click Card to access data</button>
    </div>
  );
}
