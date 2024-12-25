const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'fooddatabase'
});

db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Đã kết nối thành công với MySQL');
});

db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Database test failed:', err);
    return;
  }
  console.log('Database connection test successful');
});

process.on('SIGINT', () => {
  db.end(err => {
    if (err) console.error('Error closing MySQL connection:', err);
    console.log('MySQL connection closed');
    process.exit();
  });
});

module.exports = db; 