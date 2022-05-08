import { isPast, isToday, isTomorrow, format, startOfToday } from "date-fns";
export function DateSpan({ isFinished, date }) {
  let className = "datespan ",
    title;
  if (isToday(date)) {
    title = "Today";
    className += "urgent";
  } else if (isTomorrow(date)) {
    title = "Tomorrow";
    className += "attention";
  } else if (isPast(date)) {
    title = format(date, "LLLL, do");
    className += "expired";
  } else {
    className += "unimportant";
    title = format(date, "LLLL, do");
  }
  if (isFinished) className += " done";
  return <span className={className}>{title}</span>;
}
