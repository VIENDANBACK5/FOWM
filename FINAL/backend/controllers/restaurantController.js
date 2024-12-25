const Restaurant = require('../models/Restaurant');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAll();
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách nhà hàng',
      error: error.message
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.getById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy nhà hàng'
      });
    }
    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin nhà hàng',
      error: error.message
    });
  }
};

exports.searchRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.search(req.query.keyword);
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm nhà hàng',
      error: error.message
    });
  }
}; 