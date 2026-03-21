import { useState, useEffect } from "react";

function TaskForm({ onTaskCreated, taskToEdit, onUpdate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [taskToEdit]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskToEdit) {
        // EDITAR
        onUpdate({
            ...taskToEdit,
            title,
            description,
        });
        } else {
        // CREAR
        fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title,
            description,
            completed: false,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            onTaskCreated(data);
            });
        }

        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{taskToEdit ? "Editar tarea" : "Crear tarea"}</h2>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(""); }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" disabled={!title.trim()}>
                {taskToEdit ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
}

export default TaskForm;