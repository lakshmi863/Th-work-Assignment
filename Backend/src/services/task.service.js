const db = require('../db/database');

const getInsights = (callback) => {
    let insights = {};
    const prioritySql = `SELECT priority, COUNT(*) as count FROM tasks WHERE status != 'Done' GROUP BY priority`;

    // 1. First database call to get priority counts
    db.all(prioritySql, [], (err, priorities) => {
        if (err) {
       
            return callback(err, null);
        }
        insights.priorityCounts = priorities;

        const dueSoonSql = `
        SELECT COUNT(*) as count FROM tasks
         WHERE status != 'Done' AND due_date BETWEEN date('now') AND date('now', '+7 days')`;
        
        // 2. Second database call (nested inside the first)
        db.get(dueSoonSql, [], (err, dueSoon) => {
            if (err) {
                return callback(err, null);
            }
            insights.dueSoonCount = dueSoon.count;

            const busiestDaySql = `
            SELECT due_date, COUNT(*) as task_count FROM tasks 
            WHERE status != 'Done' GROUP BY due_date ORDER BY task_count DESC, due_date ASC LIMIT 1`;
            
            // 3. Third database call (nested inside the second)
            db.get(busiestDaySql, [], (err, busiestDay) => {
                if (err) {
                    return callback(err, null);
                }
                insights.busiestDay = busiestDay;
                
                // 4. All data is gathered, now build the summary
                const totalOpen = insights.priorityCounts.reduce((acc, p) => acc + p.count, 0);
                let summary = `You have ${totalOpen} open tasks.`;

                if (insights.dueSoonCount > 0) {
                    summary += `**${insights.dueSoonCount}** are due in the next 7 days.`;
                }
                
                const highPriority = insights.priorityCounts.find(p => p.priority === 'High');
                if (highPriority && highPriority.count > 0) {
                    summary += ` Watch out for **${highPriority.count}** high-priority item(s).`;
                }
                
                if (insights.busiestDay) {
                    summary += ` Your busiest day looks to be **${insights.busiestDay.due_date}** with ${insights.busiestDay.task_count} tasks due.`;
                }

                insights.summary = summary;
                
                // 5. Finally, call the callback with the complete, successful result
                callback(null, insights);
            });
        });
    });
};


module.exports = { getInsights };
