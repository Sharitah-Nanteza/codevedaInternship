const BASE_URL = 'http://127.0.0.1:8000/api';

// Helper to get authorization headers if token exists
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Token ${token}` } : {}),
  };
};

export const api = {
  // --- AUTHENTICATION ---
  async register(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async login(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  // --- TASKS (CRUD) ---
  async getTasks() {
    const res = await fetch(`${BASE_URL}/tasks/`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  async createTask(title: string, description: string = '') {
    const res = await fetch(`${BASE_URL}/tasks/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ title, description, completed: false }),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  async updateTask(id: number, updates: { title?: string; completed?: boolean }) {
    const res = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  async deleteTask(id: number) {
    const res = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return true;
  }
};