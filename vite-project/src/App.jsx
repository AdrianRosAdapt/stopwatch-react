import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";

// function FavoriteColor() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>My current count is {count}!</h1>
//       <button type="button" onClick={() => setCount(count + 1)}>
//         Add one
//       </button>
//       <button onClick={() => setCount(count - 1)}>Minus one</button>
//     </>
//   );
// }
// function MyButtonStart() {
//   const [count, setCount] = useState(0);
//   function Timer() {
//     useEffect(() => {
//       setTimeout(() => {
//         setCount((count) => count + 1);
//       }, 10);
//     });

//     return count;
//   }
//   return <button onClick={Timer}>Start Counting</button>;
// }

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  function runTimer() {
    setTime((previousTime) => previousTime + 1);
  }
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(runTimer, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-3)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Stopwatch></Stopwatch>
      {/* <TimerDisplay></TimerDisplay>
      <MyButtonLap></MyButtonLap>
      <MyButtonStart></MyButtonStart> */}
    </div>
  );
}

export default App;
