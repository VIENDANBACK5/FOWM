const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/table/:tableId', orderController.getOrdersByTable);
router.get('/:id', orderController.getOrderDetails);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router; 