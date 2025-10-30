const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/tasks.router');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 


app.use('/tasks', taskRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});