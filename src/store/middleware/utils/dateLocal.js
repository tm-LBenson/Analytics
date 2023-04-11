export function utcToLocalDateString(utcDateString) {
  const utcDate = new Date(utcDateString);
  const localDate = new Date(utcDate.toLocaleString());
  const localDateString = localDate.toISOString().slice(0, 10);
  const localTimeString = localDate.toTimeString().split(' ')[0];

  return `${localDateString} ${localTimeString}`;
}
