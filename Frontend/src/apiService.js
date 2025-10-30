const API_BASE_URL = 'https://th-work-backend.onrender.com/tasks';

// Fetches tasks from the backend
export const getTasks = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}?${query}`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

// Creates a new task
export const createTask = async (taskData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

// Updates an existing task
export const updateTask = async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

// Fetches the smart insights
export const getInsights = async () => {
    const response = await fetch(`${API_BASE_URL}/insights`);
    if (!response.ok) throw new Error('Failed to fetch insights');
    return response.json();
};