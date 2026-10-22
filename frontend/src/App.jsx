import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  const loadTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask(title);

      setTasks((prevTasks) => [
        newTask,
        ...prevTasks,
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle completed
  const handleToggleTask = async (task) => {
    try {
      const updatedTask = await updateTask(
        task._id,
        {
          title: task.title,
          completed: !task.completed,
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === updatedTask._id
            ? updatedTask
            : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Run when page loads
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <div className="todo-box">

        <h1>MERN Todo App</h1>

        <TaskForm
          onAddTask={handleAddTask}
        />

        {loading ? (
          <p className="loading">
            Loading tasks...
          </p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

      </div>
    </div>
  );
}

export default App;
