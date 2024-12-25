const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);
router.patch('/:id/status', tableController.updateTableStatus);

module.exports = router; 