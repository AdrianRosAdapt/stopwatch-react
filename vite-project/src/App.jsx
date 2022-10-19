import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Laps from "./components/Laps";
import Timer from "./components/Timer";
import { parseTime } from "./utils";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lapsArray, setLapsArray] = useState([]);
  const [lapTime, setLapTime] = useState(0);
  const [lapCounter, setLapCounter] = useState(0);
  const [minMaxlap, setMinMaxLap] = useState({
    fastestLap: Infinity,
    slowestLap: -1,
  });
  // const [lapData, setLapData] = useState({
  //   slowestLap: -1,
  //   fastestLap: Infinity,
  //   laps: [],
  //   lapNumber: 1,
  //   timeStamp1: 0,
  // });

  function runTimer() {
    setLapTime((prevLapTime) => prevLapTime + 1);
    setTime((prevTime) => prevTime + 1);
  }

  function handleStartStopButton() {
    if (!running) {
      if (lapCounter === 0) {
        setLapCounter(lapCounter + 1);
      }
      setRunning(true);
    } else if (running) {
      setRunning(false);
    }
  }

  // 1. determine/check the min + max lap (and change if necessary)
  // 2. when rendering, if the current IS the min or max lap, add the class name

  function insertRows() {
    // setLapData({
    //   ...lapData,
    //   laps: [...lapData.laps, lapTime],
    //   timeStamp1: lapTime,
    // });
    // console.log(lapData);
    let newLapsArray = [{ lapCounter, timeStamp: lapTime }, ...lapsArray];
    setLapCounter(lapCounter + 1);
    let fastest = Math.min(...newLapsArray.map((lap) => lap.timeStamp));
    let slowest = Math.max(...newLapsArray.map((lap) => lap.timeStamp));
    if (lapCounter >= 2) {
      setMinMaxLap({ slowestLap: slowest, fastestLap: fastest });
    }
    setLapsArray([{ lapCounter, timeStamp: lapTime }, ...lapsArray]);
    setLapTime(0);
  }

  function handlelapsReset() {
    if (!running && time > 0) {
      setTime(0);
      setLapsArray([]);
      setLapCounter(0);
      setLapTime(0);
      setMinMaxLap(
        (minMaxlap.fastestLap = -1),
        (minMaxlap.slowestLap = Infinity)
      );
    } else if (running) {
      insertRows();
    }
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

  const startStopButtonText = !running ? "Start" : "Stop";
  const lapButtonText = time === 0 || running ? "Lap" : "Reset";

  return (
    <div className="container">
      <div className="stopwatch">
        <div className="timer-section">
          <Timer runningTime={time}></Timer>
        </div>
        <div className="buttons-section">
          <button
            className={running ? "active-lap-button" : "inactive-lap-button"}
            onClick={handlelapsReset}
          >
            {lapButtonText}
          </button>
          <button
            className={running ? "stop-button" : "start-button"}
            onClick={handleStartStopButton}
          >
            {startStopButtonText}
          </button>
        </div>
        <div>
          <Laps
            lapCounter={lapCounter}
            lapsArray={lapsArray}
            lapTime={lapTime}
            fastestL={minMaxlap.fastestLap}
            slowestL={minMaxlap.slowestLap}
          ></Laps>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Stopwatch></Stopwatch>
    </div>
  );
}

export default App;
