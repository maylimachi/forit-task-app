import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
export default App;

function App() {
	const [tasks, setTasks] = useState([]);
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [filter, setFilter] = useState("all"); 
	const [search, setSearch] = useState("");

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
	const filteredTasks = tasks.filter((task) => {
		if (search.trim() !== "") {
			return task.title.toLowerCase().includes(search.toLowerCase());
		}

		if (filter === "completed") return task.completed;
		if (filter === "pending") return !task.completed;

		return true;
	});

	return (
		<div className="color-fondo min-vh-100 p-5">
			<div className="container">
				<h1 className="text-center text-primary titulo-grande p-3">To-Do App</h1>

				<div className="card mb-4 shadow-sm border-0">
				<div className="card-body color-fondo text-white">
					<TaskForm
					onTaskCreated={addTask}
					taskToEdit={taskToEdit}
					onUpdate={updateTask}
					/>
				</div>
				</div>
				<div className="d-flex mb-3">
					<button
						className={`btn w-100 me-2 ${
						filter === "all" ? "btn-primary" : "btn-outline-primary"
						}`}
						onClick={() => setFilter("all")}
					>
						Todas
					</button>
					<button
						className={`btn w-100 me-2 ${
						filter === "pending" ? "btn-danger" : "btn-outline-danger"
						}`}
						onClick={() => setFilter("pending")}
					>
						Pendientes
					</button>

					<button
						className={`btn w-100 me-2 ${
						filter === "completed" ? "btn-success" : "btn-outline-success"
						}`}
						onClick={() => setFilter("completed")}
					>
						Completas
					</button>

					<input
						type="text"
						className="form-control "
						placeholder="Buscar tarea..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<TaskList
				tasks={filteredTasks}
				onDelete={deleteTask}
				onEdit={handleEdit}
				onUpdate={updateTask}
				/>
				
			</div>
		</div>
	);
}