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
    <div>
      <p>{task.title}</p>

      <button onClick={() => onEdit(task)}>
        Editar
      </button>

      <button onClick={() => onDelete(task.id)}>
        Eliminar
      </button>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
    </div>
  );
}

export default TaskItem;