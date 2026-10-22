import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create task
export const createTask = async (title) => {
  const response = await axios.post(API_URL, {
    title,
  });

  return response.data;
};

// Update task
export const updateTask = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
