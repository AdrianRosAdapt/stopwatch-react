import { parseTime } from "../utils";

function Laps(props) {
  function getMinMaxLapClassName(lap) {
    if (props.lapCounter >= 2) {
      if (lap.timeStamp === props.fastestL) {
        return "fastest-lap";
      } else if (lap.timeStamp === props.slowestL) {
        return "slowest-lap";
      }
    }
    return "";
  }
  return (
    <div>
      <div className="laps-section">
        <table className="table-of-laps" id="laps">
          <tbody id="table-body">
            <tr>
              {props.lapCounter > 0 && (
                <>
                  <td>{"Lap " + props.lapCounter}</td>
                  <td>{parseTime(props.lapTime)}</td>
                </>
              )}
            </tr>
            {props.lapsArray.map((lap) => (
              <tr className={getMinMaxLapClassName(lap)} key={lap.lapCounter}>
                <td>{"Lap " + lap.lapCounter}</td>
                <td>{parseTime(lap.timeStamp)}</td>
              </tr>
            ))}
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
            <tr className="initial-table-row">
              <td className="initial-table-data"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Laps;
