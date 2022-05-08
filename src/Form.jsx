import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { createID } from "./App";

export function Form({ onSubmit }) {
  const [date, setDate] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const handleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle === "") return;
    const task = { title: taskTitle, id: createID(), projectID: ["all"] };
    if (date !== "") {
      task.date = date;
    }
    onSubmit(task);
    setDate("");
    setTaskTitle("");
  };
  function handleChangeDate(newDate) {
    setDate(newDate);
  }
  return (
    <form className="add-task-form">
      <label htmlFor="task-title">Task</label>
      <input
        id="task-title"
        value={taskTitle}
        onChange={handleChange}
        type="text"
        name="task-title"
      />
      <DatePicker date={date} onChangeDate={handleChangeDate} />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}
