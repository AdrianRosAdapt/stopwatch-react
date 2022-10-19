import { parseTime } from "../utils";

function Timer(props) {
  return <span className="displayed-time">{parseTime(props.runningTime)}</span>;
}

export default Timer;
