const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurants');
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/tables');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Có lỗi xảy ra!' });
});

module.exports = app;
