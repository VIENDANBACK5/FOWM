const db = require('../config/database');

class Table {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tables ORDER BY table_number', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tables WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE tables SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = Table; 