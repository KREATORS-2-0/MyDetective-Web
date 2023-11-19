import React from "react";
import "./css/suggestion-cards.css";
import "./css/warning.css";
import "./css/start_pause.css";
import Typed from "react-typed";

export default function Suggestions({ data, handleClick, buttonClick }) {
  const [index, setIndex] = React.useState(-1);
  const [stopped, setStopped] = React.useState(false);

  const handleClickIndex = (i) => {
    setIndex(i);
  };

  const handleStop = () => {
    setStopped(true);
  };

  return (
    <>
      {data[0] === "" ? null : (
        <div class="cards">
          {!stopped && (index === -1 || index === 0) ? (
            <div
              className="card white"
              onClick={() => {
                handleClick(0, data[0]);
                handleClickIndex(0);
              }}
              style={{
                border: index === 0 ? "2px solid black" : null,
              }}
            >
              <p className="tip">
                <Typed key={data[0]} strings={[data[0]]} typeSpeed={50} />
              </p>
            </div>
          ) : null}
          {!stopped && (index === -1 || index === 1) ? (
            <div
              className="card white"
              onClick={() => {
                handleClick(1, data[1]);
                handleClickIndex(1);
              }}
              style={{
                border: index === 0 ? "2px solid black" : null,
              }}
            >
              <p className="tip">
                <Typed key={data[1]} strings={[data[1]]} typeSpeed={50} />
              </p>
            </div>
          ) : null}
          {!stopped && (index === -1 || index === 2) ? (
            <div
              className="card white"
              onClick={() => {
                handleClick(2, data[2]);
                handleClickIndex(2);
              }}
              style={{
                border: index === 0 ? "2px solid black" : null,
              }}
            >
              <p className="tip">
                <Typed key={data[2]} strings={[data[2]]} typeSpeed={50} />
              </p>
            </div>
          ) : null}
        </div>
      )}
      {index !== -1 && (
        <div
          style={{
            marginTop: "5%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {stopped ? (
            <></>
          ) : (
            <>
              <button
                className="start-pause"
                onClick={() => buttonClick("Start")}
              >
                START
              </button>
              <button
                className="start-pause"
                onClick={() => {
                  buttonClick("Stop");
                  handleStop();
                }}
              >
                STOP
              </button>
            </>
          )}
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
