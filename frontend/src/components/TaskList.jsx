import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onEdit, onUpdate }) {
  return (
    <div>
      <h2>Lista de tareas</h2>

      {tasks.map((task) => (
        <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;