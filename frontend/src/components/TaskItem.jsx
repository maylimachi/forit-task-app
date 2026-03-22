function TaskItem({ task, onDelete, onEdit, onUpdate }) {

    const handleToggle = () => {
        fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...task,
            completed: !task.completed,
        }),
        })
        .then((res) => res.json())
        .then((updatedTask) => {
            onUpdate(updatedTask);
        });
    };

    return (
        <div className="d-flex align-items-center justify-content-between">

        <div className="flex-grow-1 d-flex align-items-center border border-primary rounded p-3 color-card text-white">
            
            <input
            type="checkbox"
            className="form-check-input me-3"
            checked={task.completed}
            onChange={handleToggle}
            />

            <div>
                <h5
                    className={`mb-1 ${
                    task.completed ? "text-decoration-line-through opacity-50" : ""
                    }`}
                >
                    {task.title}
                </h5>

                <small className="text-white text-opacity-75">
                    {task.description}
                </small>
            </div>
        </div>

        <div className="ms-3 d-flex">
            <button
            className="btn btn-hover btn-sm border me-2"
            onClick={() => onEdit(task)}
            >
                <i className="bi bi-pencil text-white p-1"></i>
            </button>

            <button
            className="btn btn-hover btn-sm border"
            onClick={() => onDelete(task.id)}
            >
                <i className="bi bi-trash text-white p-1"></i>
            </button>
        </div>

        </div>
    );
}

export default TaskItem;