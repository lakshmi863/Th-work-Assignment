// This file connects all the components together.
import { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';
import { getTasks } from './apiService';
import './App.css'; // Import the stylesheet

function App() {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({ status: '', priority: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([, value]) => value !== '')
            );
            const fetchedTasks = await getTasks(activeFilters);
            setTasks(fetchedTasks);
        } catch (error) {
            setError('Could not connect to the server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="app-container">
            <header>
                <h1>Task Tracker Dashboard</h1>
            </header>
            <main>
                <div className="main-content">
                    <div className="tasks-section">
                        <h2>My Tasks</h2>
                        <div className="filter-controls">
                            <select name="status" value={filters.status} onChange={handleFilterChange}>
                                <option value="">Filter by Status...</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                                <option value="">Filter by Priority...</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        {loading && <p>Loading tasks...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error && <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />}
                    </div>
                    <aside className="sidebar">
                        <TaskForm onTaskCreated={fetchTasks} />
                        <InsightsPanel tasks={tasks} />
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default App;