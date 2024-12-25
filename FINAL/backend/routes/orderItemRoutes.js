const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.get('/', orderItemController.getAllOrderItems);

router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);

router.get('/restaurant/:restaurantId', orderItemController.getOrderItemsByRestaurantId);

router.post('/', orderItemController.createOrderItem);

router.put('/:id', orderItemController.updateOrderItem);

router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router; 