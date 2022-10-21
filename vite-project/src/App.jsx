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

  function resetTotalTime() {
    setTime(0);
  }

  function setMinMaxLaps(fastest, slowest) {
    setMinMaxLap({ ...minMaxlap, fastestLap: fastest, slowestLap: slowest });
  }

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

  function updateLapsArray(lapsList) {
    setLapsArray([...lapsList]);
  }

  function setLapTimeToZero() {
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

  return (
    <div className="container">
      <div className="stopwatch">
        <div className="timer-section">
          <Timer runningTime={time}></Timer>
        </div>

        <Buttons
          toggleStopWatch={toggleStopWatchOn}
          addToLapCounter={addToLapCounter}
          lapCounter={lapCounter}
          toggleOffStopwatch={toggleOffStopwatch}
          running={running}
          totalTime={time}
          resetStopwatch={resetStopwatch}
          lapTime={lapTime}
          updateLapsArray={updateLapsArray}
          setLapTimeToZero={setLapTimeToZero}
          lapsArray={lapsArray}
          setMinMaxLaps={setMinMaxLaps}
          resetTotalTime={resetTotalTime}
        ></Buttons>
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
