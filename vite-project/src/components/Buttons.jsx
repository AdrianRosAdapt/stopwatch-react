function Buttons({
  toggleStopWatch,
  addToLapCounter,
  lapCounter,
  toggleOffStopwatch,
  running,
  totalTime,
  resetStopwatch,
}) {
  function startStopWatch() {
    toggleStopWatch();
    if (lapCounter === 0) {
      addToLapCounter();
    } else if (running) {
      toggleOffStopwatch();
    }
  }
  //1.NEED TO CHANGE TO PROPS
  function handlelapsReset() {
    if (!running && totalTime > 0) {
      resetStopwatch();
    } else if (running) {
      insertRows();
    }
  }
  //1. STILL NEED TO CHANGE TO PROPS
  //   function resetStopwatch() {
  //     setTime(0);
  //     setLapsArray([]);
  //     setLapCounter(0);
  //     setLapTime(0);
  //     setMinMaxLap(
  //       (minMaxlap.fastestLap = -1),
  //       (minMaxlap.slowestLap = Infinity)
  //     );
  //   }

  //1.NEED TO CHANGED VARIABLES TO APPROP. PROPS.
  function insertRows() {
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

  return (
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
  );
}

export default Buttons;
