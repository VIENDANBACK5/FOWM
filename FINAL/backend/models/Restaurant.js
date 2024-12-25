const db = require('../config/database');

class Restaurant {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM restaurants';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        // Transform data to frontend format
        const transformedResults = results.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          address: item.address,
          image: item.image,
          description: item.description,
          user: {
            name: item.user_name,
            avatar: item.user_avatar,
            comment: item.user_comment
          },
          stats: {
            comments: item.stats_comments,
            photos: item.stats_photos
          }
        }));
        resolve(transformedResults);
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

  static create(data) {
    return new Promise((resolve, reject) => {
      const restaurantData = {
        name: data.name,
        price: data.price,
        address: data.address,
        image: data.image,
        description: data.description,
        user_name: data.user?.name,
        user_avatar: data.user?.avatar,
        user_comment: data.user?.comment,
        stats_comments: data.stats?.comments || 0,
        stats_photos: data.stats?.photos || 0
      };

      const query = 'INSERT INTO restaurants SET ?';
      db.query(query, restaurantData, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        // Transform data back to frontend format
        resolve({
          id: result.insertId,
          ...data,
          user: {
            name: data.user?.name,
            avatar: data.user?.avatar,
            comment: data.user?.comment
          },
          stats: {
            comments: data.stats?.comments || 0,
            photos: data.stats?.photos || 0
          }
        });
      });
    });
  }
}

module.exports = Restaurant; 