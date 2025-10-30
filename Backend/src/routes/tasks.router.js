const express = require('express');
const db = require('../db/database');
const router = express.Router();
const  getInsights  =  require ('../services/task.service')  


router.post('/', (req, res) => {
  const { title, description, priority, due_date } = req.body;
  const status = req.body.status || 'Open';

  if (!title || !priority || !due_date) {
    return res.status(400).json({ error: 'Missing required fields: title, priority, due_date.' });
  }

  const insertQuery = `INSERT INTO tasks (title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, description, priority, status, due_date];

  db.run(insertQuery, params, function(err) {
    if (err) {
      console.error('Error inserting task:', err.message);
      return res.status(500).json({ error: 'Failed to create task' });
    }
    db.get(`SELECT * FROM tasks WHERE id = ?`, [this.lastID], (err, newTask) => {
        if (err) return res.status(500).json({ error: 'Task created, but could not be retrieved.'});
        res.status(201).json(newTask);
    });
  });
});

// GET /tasks - Get all tasks
router.get('/', (req, res) => {
    const { status, priority, sortBy = 'due_date' } = req.query;
    let sql = 'SELECT * FROM tasks';
    const conditions = [], params = [];

    if (status) { conditions.push('status = ?'); params.push(status); }
    if (priority) { conditions.push('priority = ?'); params.push(priority); }
    if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
    
    const sortColumn = sortBy === 'created_at' ? 'created_at' : 'due_date';
    sql += ` ORDER BY ${sortColumn} ASC`;

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch tasks.' });
        res.status(200).json(rows);
    });
});

// GET /tasks/insights
router.get('/insights', (req, res) => {
    getInsights((err, insights) => {
        if (err) {
            console.error('Error getting insights:', err.message);
            return res.status(500).json({ error: 'Failed to calculate insights.' });
        }
        res.status(200).json(insights);
    });
});

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
    const { status, priority } = req.body;
    const { id } = req.params;

    if (!status && !priority) return res.status(400).json({ error: 'No fields to update.' });
    
    const fields = [], params = [];
    if (status) { fields.push('status = ?'); params.push(status); }
    if (priority) { fields.push('priority = ?'); params.push(priority); }
    params.push(id);

    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: 'Failed to update task.' });
        if (this.changes === 0) return res.status(404).json({ error: `Task ${id} not found.` });
        
        db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, updatedTask) => {
             if (err) return res.status(500).json({ error: 'Could not retrieve updated task.' });
            res.status(200).json(updatedTask);
        });
    });
});

module.exports = router;