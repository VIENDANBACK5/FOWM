const db = require('../config/database');

class Order {
  static create(orderData) {
    return new Promise((resolve, reject) => {
      db.beginTransaction(err => {
        if (err) return reject(err);

        db.query(
          'INSERT INTO orders (table_id, total_amount) VALUES (?, ?)',
          [orderData.tableId, orderData.totalAmount],
          (err, result) => {
            if (err) {
              return db.rollback(() => reject(err));
            }

            const orderId = result.insertId;
            const itemValues = orderData.items.map(item => 
              [orderId, item.restaurantId, item.quantity, item.price]
            );

            db.query(
              'INSERT INTO order_items (order_id, restaurant_id, quantity, price) VALUES ?',
              [itemValues],
              (err) => {
                if (err) {
                  return db.rollback(() => reject(err));
                }

                db.query(
                  'UPDATE tables SET status = "occupied" WHERE id = ?',
                  [orderData.tableId],
                  (err) => {
                    if (err) {
                      return db.rollback(() => reject(err));
                    }

                    db.commit(err => {
                      if (err) {
                        return db.rollback(() => reject(err));
                      }
                      resolve(orderId);
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  }

  static getByTable(tableId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT o.*, oi.*, r.name as restaurant_name
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN restaurants r ON oi.restaurant_id = r.id
        WHERE o.table_id = ? AND o.status != 'completed'
      `;
      
      db.query(query, [tableId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static updateStatus(orderId, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, orderId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static getOrderDetails(orderId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT o.*, oi.*, r.name as restaurant_name, r.image
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN restaurants r ON oi.restaurant_id = r.id
        WHERE o.id = ?
      `;
      
      db.query(query, [orderId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Order; 