const sqlite3 = require('sqlite3');


// this Arrow function for db insitation
const db =  new sqlite3.Database('./task_tracker.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
        createSchema();
        
    }

});

// this function for create table if not exists
function createSchema() {
    const TableCreateQuery = `
     CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium',
      status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) NOT NULL DEFAULT 'Open',
      due_date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `;

  // this function is used to create table in case any error occurs to display the error

    db.exec(TableCreateQuery, (err) => {
    if (err) {
      console.error(' Error creating TableCreateQuery ', err);
    } else {
      console.log(' Tasks table ready');
    }
  });
}


// finally this is for export the db connection and used in other files
module.exports = db;