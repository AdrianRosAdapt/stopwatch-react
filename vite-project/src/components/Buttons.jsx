function Buttons() {
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
        onClick={handleStartStopButton}
      >
        {startStopButtonText}
      </button>
    </div>
  );
}

export default Buttons;
