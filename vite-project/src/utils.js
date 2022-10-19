export function parseTime(centis) {
  let seconds = Math.floor(centis / 100);
  let actualSeconds = seconds % 60;
  let minutes = Math.floor(seconds / 60);
  let milis = centis % 100;
  return `${minutes.toString().padStart(2, "0")}: ${actualSeconds
    .toString()
    .padStart(2, "0")}.${milis.toString().padStart(2, "0")} `;
}
