 Full-Stack Task Tracker 

As per my I complete full-stack task management application built with Node.js, Express, React, and SQLite. This project was developed to demonstrate core competencies in backend API design, database management, frontend state handling, and deployment to a cloud platform.

The application allows users to create, view, and manage tasks, and provides a simple, rule-based "smart insights" summary of their current workload.

### Live Demo

*   **Frontend (React App):** [https://th-work-task.onrender.com](https://th-work-task.onrender.com)

Vedio Demo ( https://drive.google.com/file/d/1nYjV3yQhQsrbR5ckH9KwY5_kJVphr1eH/view )


### Application Screenshot

<img width="4986" height="2368" alt="th-work-task onrender com_" src="https://github.com/user-attachments/assets/ae002296-85a6-4b5a-9477-04b955e4166e" />



## Technology Stack

| Component      | Technology                                    |
| -------------- | --------------------------------------------- |
| **Frontend**   | React.js, JavaScript (ES6+), CSS3, Fetch API  |
| **Backend**    | Node.js, Express.js, CORS                     |
| **Database**   | SQLite3                                       |
| **Deployment** | Render.com (Static Site & Web Service)        |


Set Up the Backend
# Navigate to the backend folder
cd Backend

# Install dependencies
npm install

# Start the server
npm start

Set Up the Frontend

cd task

# Install dependencies
npm install

# Start the React development server
npm start

Deployment on Render.com

This project is deployed using a two-service strategy on Render:
Backend (Web Service):
Root Directory: Backend

Build Command: npm install

Start Command: npm start

Render Disk: A persistent disk is attached to store the task_tracker.db SQLite file, ensuring data persistence across deploys.

Frontend (Static Site):

Root Directory: task

Build Command: npm run build

Publish Directory: build
