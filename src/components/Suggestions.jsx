import React from "react";
import "./css/suggestion-cards.css";
import "./css/warning.css";
import Typed from "react-typed";

export default function Suggestions() {
  return (
    <>
      <div class="cards">
        <div class="card white">
          <p class="tip">
            <Typed key={"1"} strings={["Hello World"]} typeSpeed={50} />
          </p>
        </div>
        <div class="card white">
          <p class="tip">
            {" "}
            <Typed
              key={"1"}
              strings={["Hello World qwer qwefq asdf asdva efwq rerqqe"]}
              typeSpeed={50}
            />
          </p>
        </div>
        <div class="card white">
          <p class="tip">
            {" "}
            <Typed
              key={"1"}
              strings={[
                "Hello World qwer fasdf zscv asedf qer wgqwert qwe frqwfqwefasdf asdva efwq rerqqe",
              ]}
              typeSpeed={50}
            />
          </p>
        </div>
      </div>
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
