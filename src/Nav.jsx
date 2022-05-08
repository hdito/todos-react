import { useState } from "react";
import { createID } from "./App";

export function Nav({ onAdd, onChangeProject, active, projects }) {
  const [mode, setMode] = useState("show");
  const [projectInput, setProjectInput] = useState("");
  const handleChangeProject = (id) => {
    onChangeProject(id);
  };
  function toggleMode() {
    setMode((prev) => {
      if (prev === "show") return "edit";
      return "show";
    });
  }
  function handleChange(e) {
    setProjectInput(e.target.value);
  }
  function addProject() {
    if (projectInput === "") return;
    onAdd({ title: projectInput, id: createID() });
    toggleMode();
    setProjectInput("");
  }
  function handleCancel() {
    setProjectInput("");
    setMode("show");
  }
  return (
    <nav className="projects-panel">
      <ul>
        {projects.map((project) => (
          <li
            onClick={handleChangeProject.bind(null, project.id)}
            className={project.id === active ? "selected project" : "project"}
            key={project.id}
          >
            {project.title}
          </li>
        ))}
        <li className="li-form">
          {mode === "show" ? (
            <button onClick={toggleMode}>Add project</button>
          ) : (
            <>
              <input onChange={handleChange} value={projectInput} type="text" />
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" onClick={addProject}>
                Add
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
