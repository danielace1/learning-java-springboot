import taskApi from "./taskApi";

export const getTasks = async () => {
  const response = await taskApi.get("/tasks");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await taskApi.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await taskApi.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await taskApi.patch(`/tasks/${id}/status`, null, {
    params: { status },
  });

  return response.data;
};

export const deleteTask = async (id) => {
  await taskApi.delete(`/tasks/${id}`);
};
