import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onEdit, onUpdate }) {
    return (
        <div className="container">
            <div className="card shadow-sm border-0">

                <div className="card-body color-fondo">
                    {tasks.length === 0 ? (
                        <p className="text-center text-white">
                            No hay tareas todavía 😴
                        </p>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {tasks.map((task) => (
                                <li key={task.id} className="mb-2">
                                    <TaskItem
                                        task={task}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                        onUpdate={onUpdate}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskList;