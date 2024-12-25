const db = require('../config/database');

class Restaurant {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM restaurants';
      console.log('Executing query:', query);
      
      db.query(query, (err, results) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query results:', results);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM restaurants WHERE id = ?';
      console.log('Executing query:', query, [id]);
      
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query results:', results);
        resolve(results[0]);
      });
    });
  }

  static search(keyword) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM restaurants WHERE name LIKE ? OR address LIKE ?';
      const params = [`%${keyword}%`, `%${keyword}%`];
      console.log('Executing query:', query, params);
      
      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query results:', results);
        resolve(results);
      });
    });
  }
}

module.exports = Restaurant; 