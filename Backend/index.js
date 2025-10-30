const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/tasks.router');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

const allowedOrigins = ['https://th-work-task.onrender.com'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allows your frontend URL and tools like Postman (which have no origin)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

// You MUST pass the options to cors() here
app.use(cors(corsOptions));

app.use(express.json()); 
app.use('/tasks', taskRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});