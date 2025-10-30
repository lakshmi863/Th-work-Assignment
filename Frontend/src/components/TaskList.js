import { updateTask } from '../apiService';

const TaskList = ({ tasks, onTaskUpdated }) => {
    const handleStatusChange = async (task, newStatus) => {
        try {
            await updateTask(task.id, { status: newStatus });
            onTaskUpdated();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Could not update task status.');
        }
    };

    if (tasks.length === 0) {
        return <p>No tasks match the current filters. Create one to get started!</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className={`task-card priority-${task.priority.toLowerCase()}`}>
                    <div className="task-header">
                        <h3>{task.title}</h3>
                        <span className="task-priority">{task.priority} Priority</span>
                    </div>
                    <p className="task-description">{task.description || 'No description provided.'}</p>
                    <p><strong>Due Date:</strong> {task.due_date}</p>
                    <div className="task-footer">
                        <span><strong>Status:</strong> {task.status}</span>
                        <div className="task-actions">
                            {task.status === 'Open' && <button onClick={() => handleStatusChange(task, 'In Progress')}>Start Task</button>}
                            {task.status === 'In Progress' && <button onClick={() => handleStatusChange(task, 'Done')}>Mark as Done</button>}
                            {task.status === 'Done' && <button onClick={() => handleStatusChange(task, 'Open')}>Re-Open</button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;