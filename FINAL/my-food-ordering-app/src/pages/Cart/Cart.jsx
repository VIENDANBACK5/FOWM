import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import qrImage from '../../assets/qr-payment.jpg';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';
import { api } from '../../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditingTable, setIsEditingTable] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState(tableNumber);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
    
    const savedTable = localStorage.getItem('tableNumber');
    if (savedTable) {
      setTableNumber(parseInt(savedTable));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Vui lòng chọn món trước khi đặt hàng!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#ff4d4d",
          color: "white"
        }
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setShowPaymentModal(false);
      setIsProcessing(false);
      localStorage.removeItem('cartItems');
      setCartItems([]);
      navigate('/');
    }, 5000);
  };


  const handleTableChange = () => {
    if (newTableNumber < 1 || newTableNumber > 20) {
      toast.error('Số bàn phải từ 1-20', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#ff4d4d",
          color: "white"
        }
      });
      return;
    }
    setTableNumber(newTableNumber);
    localStorage.setItem('tableNumber', newTableNumber);
    setIsEditingTable(false);
    toast.success(`Đã chuyển sang bàn ${newTableNumber}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "#4CAF50",
        color: "white"
      }
    });
  };

  return (
    <div className="page cart">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BackButton />
      <div className="cart-header">
        <h1>Giỏ hàng</h1>
        <div className="table-selector">
          {isEditingTable ? (
            <div className="table-edit">
              <input
                type="number"
                min="1"
                max="20"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(parseInt(e.target.value))}
                className="table-input"
              />
              <button onClick={handleTableChange} className="save-btn">
                <i className="fas fa-check">Lưu</i>
              </button>
              <button 
                onClick={() => {
                  setIsEditingTable(false);
                  setNewTableNumber(tableNumber);
                }} 
                className="cancel-btn"
              >
                <i className="fas fa-times">Hủy</i>
              </button>
            </div>
          ) : (
            <div className="table-display" onClick={() => setIsEditingTable(true)}>
              <span>Bàn {tableNumber}</span>
              <i className="fas fa-edit"></i>
            </div>
          )}
        </div>
      </div>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <p>Giỏ hàng trống</p>
            <button onClick={() => navigate('/order')} className="continue-shopping">
              Tiếp tục chọn món
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <div className="item-header">
                      <h3>{item.name}</h3>
                      <p className="price">{item.price.toLocaleString()}đ</p>
                    </div>

                    <div className="item-details">
                      <div className="ingredients">
                        <h4><i className="fas fa-mortar-pestle"></i> Nguyên liệu chính:</h4>
                        <p>{item.ingredients || 'Thịt heo, nước mắm, đường, tỏi, ớt'}</p>
                      </div>

                      <div className="cooking-info">
                        <h4><i className="fas fa-fire"></i> Cách chế biến:</h4>
                        <p>{item.recipe || 'Kho rim với nước màu đường, nêm nếm vừa ăn'}</p>
                      </div>

                      <div className="nutrition-info">
                        <h4><i className="fas fa-heartbeat"></i> Dinh dưỡng:</h4>
                        <div className="nutrition-grid">
                          <span><i className="fas fa-burn"></i> {item.calories || '300'} kcal</span>
                          <span><i className="fas fa-drumstick-bite"></i> Protein: {item.protein || '20'}g</span>
                          <span><i className="fas fa-bread-slice"></i> Carbs: {item.carbs || '15'}g</span>
                        </div>
                      </div>
                    </div>

                    <div className="quantity-controls">
                      <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>
                    
                    <button 
                      className="remove-btn" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p>Tổng tiền: {total.toLocaleString()}đ</p>
              <button onClick={handleCheckout}>Đặt món</button>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={showPaymentModal}
        onRequestClose={() => setShowPaymentModal(false)}
        className="payment-modal"
        overlayClassName="payment-overlay"
      >
        <div className="payment-content">
          <div className="payment-header">
            <h2>Thanh toán đơn hàng</h2>
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
          </div>

          <div className="order-details">
            <h3>Thông tin đơn hàng</h3>
            <div className="order-info">
              <p><strong>Bàn số:</strong> {tableNumber}</p>
              <p><strong>Tổng tiền:</strong> {total.toLocaleString()}đ</p>
              <p><strong>Thời gian:</strong> {new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Phương thức thanh toán</h3>
            <div className="methods-grid">
              <div 
                className={`method-item ${paymentMethod === 'cash' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <i className="fas fa-money-bill-wave"></i>
                <span>Tiền mặt</span>
              </div>
              <div 
                className={`method-item ${paymentMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <i className="fas fa-university"></i>
                <span>Chuyển khoản</span>
              </div>
              <div 
                className={`method-item ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <i className="fas fa-credit-card"></i>
                <span>Thẻ nội địa</span>
              </div>
              <div 
                className={`method-item ${paymentMethod === 'visa' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('visa')}
              >
                <i className="fab fa-cc-visa"></i>
                <span>Visa/Master</span>
              </div>
            </div>
          </div>

          {paymentMethod === 'bank' && (
            <>
              <div className="bank-details">
                <h3>Thông tin chuyển khoản</h3>
                <div className="bank-info">
                  <p><strong>Ngân hàng:</strong> MB Bank</p>
                  <p><strong>Số tài khoản:</strong> 0123456789</p>
                  <p><strong>Chủ tài khoản:</strong> QUAN COM BUU DIEN</p>
                  <p><strong>Nội dung CK:</strong> BAN{tableNumber}</p>
                </div>
              </div>

              <div className="qr-section">
                <h3>Quét mã QR để thanh toán</h3>
                <div className="qr-container">
                  <img src={qrImage} alt="QR Code" className="qr-image" />
                </div>
              </div>
            </>
          )}

          <div className="payment-actions">
            {isProcessing ? (
              <div className="processing">
                <div className="spinner"></div>
                <p>Đang xử lý thanh toán...</p>
              </div>
            ) : (
              <>
                <button 
                  className="confirm-btn" 
                  onClick={handlePaymentComplete}
                >
                  Xác nhận thanh toán
                </button>
                <button 
                  className="cancel-btn" 
                  onClick={() => setShowPaymentModal(false)}
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;