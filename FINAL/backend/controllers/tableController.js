const Table = require('../models/Table');

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.getAll();
    res.json({
      success: true,
      data: tables
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách bàn',
      error: error.message
    });
  }
};

exports.getTableById = async (req, res) => {
  try {
    const table = await Table.getById(req.params.id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bàn'
      });
    }
    res.json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin bàn',
      error: error.message
    });
  }
};

exports.updateTableStatus = async (req, res) => {
  try {
    const result = await Table.updateStatus(req.params.id, req.body.status);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bàn'
      });
    }
    res.json({
      success: true,
      message: 'Cập nhật trạng thái bàn thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái bàn',
      error: error.message
    });
  }
}; 