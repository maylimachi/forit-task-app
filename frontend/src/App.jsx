import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
export default App;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.error(err));
  };
  const handleEdit = (task) => {
    setTaskToEdit(task);
  };
  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3000/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map(t => t.id === data.id ? data : t));
        setTaskToEdit(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-primary">
      <h1 className="text-center">To-Do App</h1>
      <TaskForm
        onTaskCreated={addTask}
        taskToEdit={taskToEdit}
        onUpdate={updateTask}
      />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={handleEdit}
        onUpdate={updateTask}
      />
    </div>
  );
}