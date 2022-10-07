import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const Laps = (props) => {
  console.log(props);
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [lapButtonText, setLapButtonText] = useState("Lap");
  let lapsArray = [];
  let lapObject = {};
  function runTimer() {
    setTime((prevTime) => prevTime + 1);
  }
  function parseTime(centis) {
    let seconds = Math.floor(centis / 100);
    let actualSeconds = seconds % 60;
    let minutes = Math.floor(seconds / 60);
    let milis = centis % 100;
    return `${minutes.toString().padStart(2, "0")}: ${actualSeconds
      .toString()
      .padStart(2, "0")}.${milis.toString().padStart(2, "0")} `;
  }

  // function handleLaps() {
  //   lapsArray = [...lapsArray, time];
  //   console.log(lapsArray);
  // }

  function handleStartStopButton() {
    if (!running) {
      setButtonText("Stop");
      setLapButtonText("Lap");
      setRunning(true);
    } else if (running) {
      setButtonText("Start");
      setLapButtonText("Reset");
      setRunning(false);
    }
  }
  function handleLaps() {
    let lapObj = {};
    lapsArray = [...lapsArray, time];
  }

  function handlelapsReset() {
    if (!running) [setLapButtonText()];
  }
  //Everytime 'runnin' is changed the arrow function in useEffect is going to be executed.
  //The second paramater, the [] takes values and everytime they chagnge the hook will be executed.
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(runTimer, 10);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span className="displayed-time">{parseTime(time)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setTime(0)}>Reset</button>
        <button
          className={running ? "active-lap-button" : "inactive-lap-button"}
        >
          {lapButtonText}
        </button>
        {/* <button
          className={running ? "start-button" : "inactive-start-button"}
          onClick={() => setRunning(true)}
        >
          Start
        </button> */}
        <button
          className={running ? "start-button" : "start-button"}
          onClick={handleStartStopButton}
        >
          {buttonText}
        </button>
      </div>
      <div></div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Stopwatch></Stopwatch>
      {/* <Laps arr={lapsArray} /> */}
    </div>
  );
}

export default App;
