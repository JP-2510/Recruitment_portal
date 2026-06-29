const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "roobaroo_db"
});

db.connect((err) => {
    if(err){
        console.log("Database Connection Failed");
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});

module.exports = db;

// +-----------+--------------+--------------------------+----------+---------------+-------------+-----------------+-----------+---------------------+----------------------+
// | member_id | full_name    | email                    | password | academic_year | vertical_id | role            | is_active | created_at          | must_change_password |
// +-----------+--------------+--------------------------+----------+---------------+-------------+-----------------+-----------+---------------------+----------------------+
// |         1 | Jatin Parmar | coordinator@roobaroo.com | temp123  |             4 |           1 | Coordinator     |         1 | 2026-06-29 13:40:27 |                    1 |
// |         2 | Rahul Sharma | music.head@roobaroo.com  | temp123  |             4 |           1 | Head            |         1 | 2026-06-29 13:40:27 |                    1 |
// |         3 | Priya Verma  | dance.head@roobaroo.com  | temp123  |             4 |           2 | Head            |         1 | 2026-06-29 13:40:27 |                    1 |
// |         4 | Aditya Singh | anchor.head@roobaroo.com | temp123  |             4 |           3 | Head            |         1 | 2026-06-29 13:40:27 |                    1 |
// |         5 | Sneha Patel  | others.head@roobaroo.com | temp123  |             4 |           4 | Head            |         1 | 2026-06-29 13:40:27 |                    1 |
// |         6 | Yash Gupta   | yash@roobaroo.com        | temp123  |             4 |           7 | Head            |         1 | 2026-06-29 13:40:27 |                    1 |
// |         7 | Riya Shah    | riya@roobaroo.com        | temp123  |             3 |           3 | 3rd Year Member |         1 | 2026-06-29 13:40:27 |                    1 |
// |         8 | Karan Jain   | karan@roobaroo.com       | temp123  |             3 |           1 | 3rd Year Member |         1 | 2026-06-29 13:40:27 |                    1 |
// |         9 | Neha Joshi   | neha@roobaroo.com        | temp123  |             2 |           4 | 2nd Year Member |         1 | 2026-06-29 13:40:27 |                    1 |
// |        10 | Mohit Patel  | mohit@roobaroo.com       | temp123  |             2 |           9 | 2nd Year Member |         1 | 2026-06-29 13:40:27 |                    1 |
// +-----------+--------------+--------------------------+----------+---------------+-------------+-----------------+-----------+---------------------+----------------------+

