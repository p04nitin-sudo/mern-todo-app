function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <p className="no-task">
        No tasks found. Add your first task!
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-item" key={task._id}>
          
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task)}
            />

            <span
              className={task.completed ? "completed" : ""}
            >
              {task.title}
            </span>
          </div>

          <button
            className="delete-btn"
            onClick={() => onDeleteTask(task._id)}
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default TaskList;
