import { useContext, useState } from "react";
import { DateSpan } from "./DateSpan";
import { DatePicker } from "./DatePicker";
import { ProjectsContext } from "./App";

export function Task({ onCheckbox, task, onSave, onDelete, isLabeled }) {
  const projects = useContext(ProjectsContext);
  let dateState;
  if ("date" in task) {
    dateState = task.date;
  } else dateState = "";
  const [date, setDate] = useState(dateState);
  const [editInput, setEditInput] = useState(task.title);
  const [mode, setMode] = useState("show");
  const handleInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleSave = () => {
    if (editInput === task.title && date === dateState) {
      setMode("show");
      return;
    }
    const newTask = { ...task, title: editInput };
    if (date !== dateState) newTask.date = date;
    onSave(newTask);
    setMode("show");
  };
  const handleEdit = () => {
    setMode("edit");
  };
  const handleCancel = () => {
    setEditInput(task.title);
    setMode("show");
  };
  const handleDelete = () => {
    onDelete(task.id);
  };

  let taskContent;
  if (mode === "show") {
    taskContent = (
      <>
        <div>
          <label htmlFor={task.id}>{task.title}</label>
          {isLabeled && (
            <span className="project-title">
              {projects.map((project) => {
                if (task.projectID.includes(project.id) && project.id !== "all")
                  return project.title;
              })}
            </span>
          )}
        </div>

        {task.date && (
          <DateSpan isFinished={task.isFinished} date={task.date} />
        )}
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  } else
    taskContent = (
      <>
        <input onChange={handleInputChange} value={editInput} type="text" />
        <DatePicker onChangeDate={handleChangeDate} date={date} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    );

  function handleChangeDate(newDate) {
    setDate(newDate);
  }

  function handleCheckbox(e) {
    onCheckbox(task.id);
  }
  return (
    <li className="task bottom-line">
      <input
        id={task.id}
        checked={task.isFinished}
        onChange={handleCheckbox}
        type="checkbox"
        disabled={mode !== "show"}
      />
      {taskContent}
    </li>
  );
}
