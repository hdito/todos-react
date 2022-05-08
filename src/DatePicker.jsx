import { useState } from "react";
import {
  format,
  isToday,
  isTomorrow,
  startOfDay,
  startOfToday,
  startOfTomorrow,
} from "date-fns";

export function DatePicker({ onChangeDate, date }) {
  const [isHidden, setIsHidden] = useState(true);
  function handleDateInput(e) {
    toggleOptions();
    onChangeDate(+new Date(e.target.value));
  }
  function toggleOptions() {
    setIsHidden((prev) => !prev);
  }
  function handlePick(e) {
    console.log(e.target.title);
    if (e.target.title === "") return;
    switch (e.target.title) {
      case "today":
        onChangeDate(+startOfToday());
        break;
      case "tomorrow":
        onChangeDate(+startOfTomorrow());
        break;
      default:
        onChangeDate(+startOfDay(date));
    }
    toggleOptions();
  }
  function handleClearDate() {
    onChangeDate("");
    toggleOptions();
  }

  return (
    <div className="date">
      <button type="button" onClick={toggleOptions}>
        {date === ""
          ? "Set date"
          : isToday(date)
          ? "Today"
          : isTomorrow(date)
          ? "Tomorrow"
          : format(date, "LLLL, do")}
      </button>
      <ul className={isHidden ? "hidden" : "options"}>
        <li title="today" onClick={handlePick}>
          Today
          <span>{format(startOfToday(), "cccccc")}</span>
        </li>
        <li title="tomorrow" onClick={handlePick}>
          Tomorrow
          <span>{format(startOfTomorrow(), "cccccc")}</span>
        </li>
        <li onClick={handlePick} title={date}>
          <input
            onInput={handleDateInput}
            value={date === "" ? "" : format(date, "yyyy-MM-dd")}
            type="date"
          />
        </li>
        <li style={{ color: "red" }} onClick={handleClearDate}>
          Clear
        </li>
      </ul>
    </div>
  );
}
