import { useState, createContext, useEffect } from "react";
import "./App.css";
import { Nav } from "./Nav";
import { Form } from "./Form";
import { Tasks } from "./Tasks";

export function createID() {
  return (
    Math.random().toString(36).slice(2, 7) +
    Number(new Date()).toString(36).slice(3)
  );
}
function storeTasks(tasks) {
  localStorage.tasks = JSON.stringify(tasks);
}
function storeProjects(projects) {
  localStorage.projects = JSON.stringify(projects);
}
export const ProjectsContext = createContext();

function App() {
  let projectsInit, tasksInit;
  try {
    projectsInit = JSON.parse(localStorage.projects);
  } catch {
    projectsInit = [{ id: "all", title: "All tasks" }];
  }
  try {
    tasksInit = JSON.parse(localStorage.tasks);
  } catch {
    tasksInit = [];
  }
  const [projects, setProjects] = useState(projectsInit);
  const [tasks, setTasks] = useState(tasksInit);
  const [activeProject, setActiveProject] = useState("all");

  useEffect(() => storeTasks(tasks), [tasks]);
  useEffect(() => storeProjects(projects), [projects]);

  const handleAddTask = (task) => {
    if (activeProject !== "all")
      task.projectID.push(
        projects.find((project) => project.id === activeProject).id
      );

    setTasks([task, ...tasks]);
  };
  const handleChangeProject = (i) => {
    setActiveProject(i);
  };
  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const handleSaveTask = (changedTask) => {
    const newTasks = tasks.map((task) => {
      if (task.id === changedTask.id) {
        return changedTask;
      }
      return task;
    });
    setTasks(newTasks);
  };
  function handleAddProject(project) {
    setProjects((projects) => [...projects, project]);
  }
  function handleChecked(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, isFinished: !task.isFinished };
      return task;
    });
    setTasks(newTasks);
  }
  function handleDeleteProject() {
    const newProjects = projects.filter(
      (project) => project.id !== activeProject
    );
    const newTasks = tasks.filter(
      (task) => !task.projectID.includes(activeProject)
    );
    setProjects(newProjects);
    setTasks(newTasks);
    setActiveProject("all");
  }

  return (
    <div className="app">
      <Form onSubmit={handleAddTask} />
      <Nav
        onDelete={handleDeleteProject}
        onAdd={handleAddProject}
        onChangeProject={handleChangeProject}
        active={activeProject}
        projects={projects}
      />
      <ProjectsContext.Provider value={projects}>
        <Tasks
          active={activeProject}
          onCheckbox={handleChecked}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          tasks={tasks.filter((task) => task.projectID.includes(activeProject))}
        />
      </ProjectsContext.Provider>

      {activeProject !== "all" && (
        <button onClick={handleDeleteProject} className="delete-project">
          Delete project
        </button>
      )}
    </div>
  );
}

export default App;
