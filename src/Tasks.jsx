import { Task } from "./Task";

export function Tasks({ active, onCheckbox, onDelete, onSave, tasks }) {
  const handleDelete = (id) => {
    onDelete(id);
  };
  const handleSave = (task) => {
    onSave(task);
  };

  const unfinished = [];
  const finished = [];
  tasks.map((task) =>
    task.isFinished === true ? finished.push(task) : unfinished.push(task)
  );
  function handleChecked(id) {
    onCheckbox(id);
  }

  return (
    <div className="tasks">
      <ul>
        {unfinished.map((task) => (
          <Task
            isLabeled={active === "all" ? true : false}
            onCheckbox={handleChecked}
            key={task.id}
            onDelete={handleDelete}
            onSave={handleSave}
            task={task}
          />
        ))}
        {finished.map((task) => (
          <Task
            key={task.id}
            isLabeled={active === "all" ? true : false}
            onCheckbox={handleChecked}
            onDelete={handleDelete}
            onSave={handleSave}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
}
