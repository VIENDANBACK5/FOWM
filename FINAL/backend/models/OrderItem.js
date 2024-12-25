const db = require('../config/database');

class OrderItem {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT oi.*, o.id as order_id, r.name as restaurant_name 
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN restaurants r ON oi.restaurant_id = r.id
        ORDER BY oi.order_id DESC
      `;
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

  static getByOrderId(orderId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT oi.*, r.name as restaurant_name, r.image as restaurant_image
        FROM order_items oi
        JOIN restaurants r ON oi.restaurant_id = r.id
        WHERE oi.order_id = ?
      `;
      console.log('Executing query:', query, [orderId]);
      
      db.query(query, [orderId], (err, results) => {
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

  static getByRestaurantId(restaurantId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT oi.*, o.status as order_status
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.restaurant_id = ?
        ORDER BY o.created_at DESC
      `;
      console.log('Executing query:', query, [restaurantId]);
      
      db.query(query, [restaurantId], (err, results) => {
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

  static create(orderItem) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO order_items (order_id, restaurant_id, quantity, price) VALUES (?, ?, ?, ?)';
      const params = [orderItem.orderId, orderItem.restaurantId, orderItem.quantity, orderItem.price];
      
      console.log('Executing query:', query, params);
      
      db.query(query, params, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query result:', result);
        resolve(result.insertId);
      });
    });
  }

  static update(id, orderItem) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE order_items SET quantity = ?, price = ? WHERE id = ?';
      const params = [orderItem.quantity, orderItem.price, id];
      
      console.log('Executing query:', query, params);
      
      db.query(query, params, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query result:', result);
        resolve(result.affectedRows > 0);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM order_items WHERE id = ?';
      console.log('Executing query:', query, [id]);
      
      db.query(query, [id], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Query result:', result);
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = OrderItem; 