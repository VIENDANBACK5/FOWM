const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Lấy tất cả order items
router.get('/', orderItemController.getAllOrderItems);

// Lấy order items theo order_id
router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);

// Lấy order items theo restaurant_id
router.get('/restaurant/:restaurantId', orderItemController.getOrderItemsByRestaurantId);

// Tạo order item mới
router.post('/', orderItemController.createOrderItem);

// Cập nhật order item
router.put('/:id', orderItemController.updateOrderItem);

// Xóa order item
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router; 