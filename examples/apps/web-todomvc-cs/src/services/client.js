const API_ENDPOINT = "http://localhost:3000/tasks"

export async function fetchTasks() {
  const response = await fetch(API_ENDPOINT)
  const data = await response.json()
  return data
}

export async function createTask(body) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return data
}

export async function updateTask(id, body) {
  const response = await fetch(`${API_ENDPOINT}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return data
}

export async function deleteTask(id) {
  const response = await fetch(`${API_ENDPOINT}/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

export async function clearCompleted(tasks) {
  const completedTaskIds = tasks
    .filter((task) => task.completed)
    .map(({ id }) => id)
  return Promise.all(completedTaskIds.map(deleteTask))
}
