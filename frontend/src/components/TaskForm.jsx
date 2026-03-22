import { useState, useEffect } from "react";

function TaskForm({ onTaskCreated, taskToEdit, onUpdate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
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
        onUpdate({
            ...taskToEdit,
            title,
            description,
        });
        } else {
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
        <form onSubmit={handleSubmit} className="mb-4">
            <small className="text-white mb-2 d-block text-center display-6 mb-4">
                {taskToEdit ? "Puedes editar tu tarea" : "Puedes agregar una nueva tarea"}
            </small>

            <div className="row g-2 align-items-center">
                <div className="col-md-4">
                    <input
                    type="text"
                    className="form-control p-2"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError("");
                    }}
                    />
                </div>

                <div className="col-md-5">
                    <input
                    type="text"
                    className="form-control p-2"
                    placeholder="Descripción de la tarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col-md-3 d-grid">
                    <button
                    type="submit"
                    className="btn btn-primary p-2"
                    disabled={!title.trim()}
                    >
                    {taskToEdit ? "Actualizar" : "Agregar"}
                    </button>
                </div>
            </div>

            {error && <p className="text-danger mt-2 text-center">{error}</p>}
        </form>
        );
}

export default TaskForm;