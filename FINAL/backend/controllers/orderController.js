const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const orderId = await Order.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Tạo đơn hàng thành công',
      data: { orderId }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message
    });
  }
};

exports.getOrdersByTable = async (req, res) => {
  try {
    const orders = await Order.getByTable(req.params.tableId);
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy đơn hàng',
      error: error.message
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.getOrderDetails(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết đơn hàng',
      error: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const result = await Order.updateStatus(req.params.id, req.body.status);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }
    res.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nh��t đơn hàng',
      error: error.message
    });
  }
}; 