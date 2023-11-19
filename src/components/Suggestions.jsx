import React from "react";
import "./css/suggestion-cards.css";
import "./css/warning.css";
import Typed from "react-typed";

export default function Suggestions({ data, handleClick }) {
  return (
    <>
      {data[0] == "" ? null : (
        <div class="cards">
          <div className="card white" onClick={() => handleClick(0)}>
            <p className="tip">
              <Typed key={data[0]} strings={[data[0]]} typeSpeed={50} />
            </p>
          </div>
          <div className="card white" onClick={() => handleClick(1)}>
            <p className="tip">
              <Typed key={data[1]} strings={[data[1]]} typeSpeed={50} />
            </p>
          </div>
          <div className="card white" onClick={() => handleClick(2)}>
            <p className="tip">
              <Typed key={data[2]} strings={[data[2]]} typeSpeed={50} />
            </p>
          </div>
        </div>
      )}

      <div class="warning" style={{ marginTop: "80px" }}>
        <p class="warning-title">
          Disclaimer for Use of Generated Interrogation Questions
        </p>
        <p class="small-desc">
          Please be advised that the interrogation questions provided have been
          generated using an advanced artificial intelligence language model.
          While these questions can serve as a useful guide or starting point,
          they are not tailored to specific individuals or circumstances and may
          not cover all relevant aspects of your particular situation.
        </p>
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </div>
    </>
  );
}
