import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Laps from "./components/Laps";
import Timer from "./components/Timer";
import Buttons from "./components/Buttons";

function App() {
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
  function toggleStopWatchOn() {
    setRunning(true);
  }

  function addToLapCounter() {
    setLapCounter((prevLapCount) => prevLapCount + 1);
  }

  function toggleOffStopwatch() {
    setRunning(false);
  }

  function setTimeToNull() {
    setTime(0);
  }

  function startStopWatch() {
    toggleStopWatchOn();
    if (lapCounter === 0) {
      addToLapCounter();
    } else if (running) {
      setRunning(false);
    }
  }

  // function handleStartStopButton() {
  //   // setRunning(true);
  //   if (!running) {
  //     if (lapCounter === 0) {
  //       setLapCounter(lapCounter + 1);
  //     }
  //   } else if (!running) {
  //     setRunning(false);
  //   }
  // }
  function handlelapsReset() {
    if (!running && time > 0) {
      resetStopwatch();
    } else if (running) {
      insertRows();
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
    addToLapCounter();
    let fastest = Math.min(...newLapsArray.map((lap) => lap.timeStamp));
    let slowest = Math.max(...newLapsArray.map((lap) => lap.timeStamp));
    if (lapCounter >= 2) {
      setMinMaxLap({ slowestLap: slowest, fastestLap: fastest });
    }
    setLapsArray([{ lapCounter, timeStamp: lapTime }, ...lapsArray]);
    setLapTime(0);
  }

  function resetStopwatch() {
    setTime(0);
    setLapsArray([]);
    setLapCounter(0);
    setLapTime(0);
    setMinMaxLap(
      (minMaxlap.fastestLap = -1),
      (minMaxlap.slowestLap = Infinity)
    );
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
        <Buttons
          toggleStopWatch={toggleStopWatchOn}
          addToLapCounter={addToLapCounter}
          lapCunter={lapCounter}
          toggleOffStopwatch={toggleOffStopwatch}
          running={running}
          totalTime={time}
          resetStopWatch={resetStopwatch}
        ></Buttons>

        <div className="buttons-section">
          <button
            className={running ? "active-lap-button" : "inactive-lap-button"}
            onClick={handlelapsReset}
          >
            {lapButtonText}
          </button>
          <button
            className={running ? "stop-button" : "start-button"}
            onClick={startStopWatch}
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
}

export default App;
