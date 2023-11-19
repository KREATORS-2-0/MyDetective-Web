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
        <p class="warning-title">Product Name</p>
        <p class="small-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
          veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
          officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
          eum nihil itaque!
        </p>
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </div>
    </>
  );
}
