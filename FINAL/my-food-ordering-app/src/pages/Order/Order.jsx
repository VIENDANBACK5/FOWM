import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Order.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../services/api';

const provinces = [
  "Hà Nội", "TP HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ", 
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn",
  "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương",
  "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk",
  "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
  "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang",
  "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum",
  "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An",
  "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ",
  "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
  "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
  "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
  "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const categories = [
  { id: 1, name: "Cơm", items: ["Cơm rang", "Cơm tấm", "Cơm văn phòng"] },
  { id: 2, name: "Món thịt", items: ["Thịt kho", "Thịt rang", "Sườn xào"] },
  { id: 3, name: "Món gà", items: ["Gà kho", "Gà rang", "Gà chiên"] },
  { id: 4, name: "Món cá", items: ["Cá kho", "Cá chiên", "Cá sốt"] },
  { id: 5, name: "Rau - Canh", items: ["Rau xào", "Canh chua", "Canh rau"] },
  { id: 6, name: "Đồ xào", items: ["Mì xào", "Bún xào", "Miến xào"] }
];

const addToCartAnimation = (element) => {
  element.classList.add('item-added');
  setTimeout(() => {
    element.classList.remove('item-added');
  }, 500);
};

const Order = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const restaurantGridRef = useRef(null);
  const [tableNumber, setTableNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Hà Nội');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const scrollToTop = () => {
    restaurantGridRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.querySelector('.scroll-to-top');
      if (scrollButton) {
        if (restaurantGridRef.current.scrollTop > 300) {
          scrollButton.style.display = 'block';
        } else {
          scrollButton.style.display = 'none';
        }
      }
    };

    const gridElement = restaurantGridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/restaurants');
        const data = await response.json();
        if (data.success) {
          setRestaurants(data.data);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast.error('Không thể tải danh sách món ăn');
      }
    };

    fetchRestaurants();
  }, []);

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || restaurant.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchProvince = restaurant.address.includes(selectedProvince);
    
    return matchSearch && matchCategory && matchProvince;
  });

  const handleSelectItem = (item, event) => {
    const card = event.currentTarget.closest('.restaurant-card');
    addToCartAnimation(card);

    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = currentCart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      toast.info(`Đã tăng số lượng ${item.name} lên ${existingItem.quantity + 1}`);
    } else {
      const newItem = { ...item, quantity: 1 };
      const updatedCart = [...currentCart, newItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
    }

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('cart-shake');
      setTimeout(() => {
        cartBtn.classList.remove('cart-shake');
      }, 500);
    }
  };

  const updateCartCount = (count) => {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      const badge = cartBtn.querySelector('.cart-count') || document.createElement('span');
      badge.className = 'cart-count';
      badge.textContent = count;
      if (!cartBtn.querySelector('.cart-count')) {
        cartBtn.appendChild(badge);
      }
    }
  };

  return (
    <div className="home-container" ref={mainRef}>
      {/* Thêm ToastContainer */}
      <ToastContainer />
      
      {/* Header Navigation */}
      <nav className="main-nav">
        <div className="nav-left">
          <img 
            src="https://ript.vn/wp-content/uploads/2023/08/RIPT-Logo-2-removebg-preview.png" 
            alt="RIPT Logo" 
            className="logo" 
          />
          <div className="restaurant-name">
            <i className="fas fa-utensils"></i>
            Quán cơm Viện Bưu Điện
          </div>
          <select 
            className="city-select"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả món ăn</option>
            {categories.map(category => (
              <optgroup key={category.id} label={category.name}>
                {category.items.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Tìm kiếm món ăn..." 
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>
        <div className="nav-right">
          <button className="apps-btn">
            <i className="fas fa-download"></i>
            Tải Apps
          </button>
          <button className="cart-btn" onClick={handleGoToCart}>
            <i className="fas fa-shopping-cart"></i>
            Thanh toán
          </button>
          <button className="table-btn">Bàn số {tableNumber}</button>
        </div>
      </nav>


      <div className="content">
        <aside className="sidebar">
          <div className="sidebar-menu">
            <Link to="/" className="menu-item">Làm tí trà đá quán bên </Link>
            <Link to="/" className="menu-item">Giao hàng</Link>
            <Link to="/" className="menu-item">Ăn gì</Link>
            <Link to="/" className="menu-item">Sưu tập</Link>
            <Link to="https://vtvgo.vn/trang-chu.html" className="menu-item">TV</Link>
            <Link to="/" className="menu-item">Bình luận</Link>
            <Link to="https://www.blogamthuc.com/" className="menu-item">Blogs</Link>
            <Link to="https://luatvietnam.vn/doanh-nghiep/cach-phan-biet-khuyen-mai-va-khuyen-mai-561-21602-article.html" className="menu-item">Khuyến mãi</Link>
          </div>
        </aside>

      
        <main className="restaurant-grid">
          <div className="restaurants-list">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="card-content">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                  <div className="restaurant-info">
                    <div className="name-price">
                      <h3>{restaurant.name}</h3>
                      <span className="price">{restaurant.price.toLocaleString()}₫</span>
                    </div>
                    <p>{restaurant.address}</p>
                    <div className="user-review">
                      <img src={restaurant.user?.avatar} alt={restaurant.user?.name} className="user-avatar" />
                      <span className="user-name">{restaurant.user?.name}</span>
                      <p className="user-comment">{restaurant.user?.comment}</p>
                    </div>
                    <div className="stats">
                      <span>{restaurant.stats?.comments} bình luận</span>
                      <span>{restaurant.stats?.photos} hình ảnh</span>
                      <button 
                        className="save-btn"
                        onClick={(e) => handleSelectItem(restaurant, e)}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          background: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'none',
          zIndex: 1000
        }}
      >
        ↑
      </button>
    </div>
  );
};

export default Order;


