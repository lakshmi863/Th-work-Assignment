import { useState } from 'react';
import { createTask } from '../apiService';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert('Title and Due Date are required fields.');
            return;
        }
        try {
            await createTask({ title, description, priority, due_date: dueDate });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setDueDate('');
            onTaskCreated();
        } catch (error) {
            console.error(error);
            alert('Failed to create the task.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3>Add New Task</h3>
            <input type="text" placeholder="Task Title*" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;