import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Lấy danh sách món ăn
  getMenuItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  },

  // Lấy đơn hàng theo bàn
  getOrdersByTable: async (tableNumber) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${tableNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}; 