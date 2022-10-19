function Buttons({
  toggleStopWatch,
  addToLapCounter,
  lapCounter,
  toggleOffStopwatch,
  running,
  totalTime,
  resetStopwatch,
  lapTime,
  updateLapsArray,
  setLapTimeToZero,
  lapsArray,
  setMinMaxLaps,
  resetTotalTime,
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
      resetWholeStopWatch();
    } else if (running) {
      insertRows();
    }
  }

  function resetWholeStopWatch() {
    resetStopwatch();
  }

  //1.NEED TO CHANGED VARIABLES TO APPROP. PROPS.
  function insertRows() {
    let newLapsArray = [{ lapCounter, timeStamp: lapTime }, ...lapsArray];
    addToLapCounter();
    let fastest = Math.min(...newLapsArray.map((lap) => lap.timeStamp));
    let slowest = Math.max(...newLapsArray.map((lap) => lap.timeStamp));
    if (lapCounter >= 2) {
      setMinMaxLaps(fastest, slowest);
    }

    updateLapsArray([...newLapsArray]);
    setLapTimeToZero();
  }

  const startStopButtonText = !running ? "Start" : "Stop";
  const lapButtonText = totalTime === 0 || running ? "Lap" : "Reset";

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
