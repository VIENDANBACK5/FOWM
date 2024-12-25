const OrderItem = require('../models/OrderItem');

exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.getAll();
    res.json({
      success: true,
      data: orderItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách order items',
      error: error.message
    });
  }
};

exports.getOrderItemsByOrderId = async (req, res) => {
  try {
    const orderItems = await OrderItem.getByOrderId(req.params.orderId);
    res.json({
      success: true,
      data: orderItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy order items theo đơn hàng',
      error: error.message
    });
  }
};

exports.getOrderItemsByRestaurantId = async (req, res) => {
  try {
    const orderItems = await OrderItem.getByRestaurantId(req.params.restaurantId);
    res.json({
      success: true,
      data: orderItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy order items theo nhà hàng',
      error: error.message
    });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const id = await OrderItem.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Tạo order item thành công',
      data: { id }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo order item',
      error: error.message
    });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const success = await OrderItem.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy order item'
      });
    }
    res.json({
      success: true,
      message: 'Cập nhật order item thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật order item',
      error: error.message
    });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const success = await OrderItem.delete(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy order item'
      });
    }
    res.json({
      success: true,
      message: 'Xóa order item thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa order item',
      error: error.message
    });
  }
}; 