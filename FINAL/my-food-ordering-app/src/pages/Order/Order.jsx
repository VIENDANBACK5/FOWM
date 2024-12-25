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

// Thêm style cho animation
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

  // Xử lý scroll to top
  const scrollToTop = () => {
    restaurantGridRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Xử lý hiển thị nút scroll to top
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

  // Dữ liệu nhà hàng giữ nguyên
  
const restaurants = [
  {
    id: 1,
    name: "Cơm Rang Dưa Bò",
    price: 35000,
    ingredients: "Cơm, thịt bò xào, dưa chua, hành phi, đậu phộng",
    recipe: "Cơm được rang với dưa chua và thịt bò thái lát mỏng, thêm hành phi và đậu phộng giã nhỏ",
    calories: "450",
    protein: "22",
    carbs: "65",
    tags: ["Món chính", "Cơm", "Bò"],
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.362992a34d547b85118c97f2e1b95ab0&w=226&h=150&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1"
  },
  {
    id: 2,
    name: "Thịt Kho Tàu",
    price: 40000,
    ingredients: "Thịt ba chỉ, trứng vịt, nước dừa, nước mắm, đường phèn",
    recipe: "Thịt ba chỉ kho với nước dừa và trứng vịt, nêm nếm đậm đà kiểu Nam Bộ",
    calories: "520",
    protein: "28",
    carbs: "12",
    tags: ["Món mặn", "Kho", "Thịt heo"],
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.cffebba80ca2cb4a616899c0208213b6&w=226&h=131&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1"
  },
  {
    id: 3,
    name: "Cá Kho",
    price: 45000,
    ingredients: "Cá thu/cá ngừ, thơm, ớt, tỏi, nước mắm, đường",
    recipe: "Cá được kho với thơm và ớt tươi, có vị cay nhẹ và đậm đà",
    calories: "380",
    protein: "32",
    carbs: "8",
    tags: ["Món mặn", "Hải sản", "Kho"],
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.9f4c0839ceda751b02f92c9dfea4a57b&w=226&h=150&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1"
  },
  {
    id: 4,
    name: "Rau Muống Xào Tỏi",
    price: 25000,
    ingredients: "Rau muống tươi, tỏi băm, dầu ăn, nước mắm",
    recipe: "Rau muống được xào nhanh với tỏi băm, giữ độ giòn tự nhiên",
    calories: "85",
    protein: "3",
    carbs: "12",
    tags: ["Món chay", "Rau xào", "Ít calo"],
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.f5a0e8ff2504ba3b8f7847291a1f96c8&w=226&h=150&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1"
  },
  {
    id: 5,
    name: "Canh Cải Nấu Thịt",
    price: 30000,
    ingredients: "Cải thảo, thịt băm, hành khô, ngò rí",
    recipe: "Canh cải nấu với thịt băm, nước dùng trong và ngọt tự nhiên",
    calories: "120",
    protein: "10",
    carbs: "8",
    tags: ["Canh", "Rau củ", "Thanh đạm"],
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th/id/OIP.x1B3EFU2wbuFn52LCN94wQAAAA?w=227&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  },
  {
    id: 6,
    name: "Sườn Xào Chua Ngọt",
    price: 45000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.30a09cd8e4df1bccf7909c493d66b165&w=226&h=180&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Quang Minh",
      avatar: "https://i.pravatar.cc/150?img=6",
      comment: "Sườn mềm, sốt vừa ăn"
    },
    stats: {
      comments: 145,
      photos: 42
    }
  },
  {
    id: 7,
    name: "Đậu Phụ Sốt Cà Chua",
    price: 25000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.986c1a83de6c4c13e9d5c499f6fcd92c&w=226&h=226&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Thu Trang",
      avatar: "https://i.pravatar.cc/150?img=7",
      comment: "Đậu mềm, sốt cà chua đậm đà"
    },
    stats: {
      comments: 88,
      photos: 32
    }
  },
  {
    id: 8,
    name: "Thịt Gà Kho Gừng",
    price: 40000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th/id/OIP.FiA8SB7TUPX91TXABg2f6gHaEK?w=314&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    user: {
      name: "Văn Nam",
      avatar: "https://i.pravatar.cc/150?img=8",
      comment: "Gà mềm, vị gừng thơm"
    },
    stats: {
      comments: 167,
      photos: 45
    }
  },
  {
    id: 9,
    name: "Bí Xanh Xào Trứng",
    price: 25000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th/id/OIP.gq7OLquNBpIiYi6_fDr5vgHaFP?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    user: {
      name: "Mai Anh",
      avatar: "https://i.pravatar.cc/150?img=9",
      comment: "Bí tươi ngon, trứng béo"
    },
    stats: {
      comments: 92,
      photos: 28
    }
  },
  {
    id: 10,
    name: "Canh Chua Cá Lóc",
    price: 35000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.4f5b3a79c0fa23b8f4eac1e9f44b6dad&w=226&h=226&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Hoàng Long",
      avatar: "https://i.pravatar.cc/150?img=10",
      comment: "Canh chua đậm đà, cá tươi"
    },
    stats: {
      comments: 178,
      photos: 56
    }
  },
  {
    id: 11,
    name: "Thịt Bò Xào Cần Tây",
    price: 45000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.ea620d21b1c6d57c0090cfbd69f217e2&w=226&h=127&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Đức Anh",
      avatar: "https://i.pravatar.cc/150?img=11",
      comment: "Bò mềm, cần tây giòn ngọt"
    },
    stats: {
      comments: 156,
      photos: 48
    }
  },
  {
    id: 12,
    name: "Trứng Chiên Thịt Băm",
    price: 30000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th/id/OIP.oqPUh4EdFRL7cmNduHCXHAHaE8?w=245&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    user: {
      name: "Thanh Hương",
      avatar: "https://i.pravatar.cc/150?img=12",
      comment: "Trứng béo, thịt băm thơm"
    },
    stats: {
      comments: 112,
      photos: 35
    }
  },
  {
    id: 13,
    name: "Mướp Xào Tôm",
    price: 35000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.76419fde8ece07ec6731b4b9b7931fcb&w=226&h=120&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Minh Tú",
      avatar: "https://i.pravatar.cc/150?img=13",
      comment: "Mướp xanh, tôm tươi ngon"
    },
    stats: {
      comments: 95,
      photos: 30
    }
  },
  {
    id: 14,
    name: "Canh Bí Đỏ Nấu Tôm",
    price: 30000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://www.bing.com/th?id=OIP.pVRiJ1o2eiAeNMF-T8Y6SwHaEK&w=190&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    user: {
      name: "Hồng Nhung",
      avatar: "https://i.pravatar.cc/150?img=14",
      comment: "Bí ngọt, nước dùng thanh"
    },
    stats: {
      comments: 86,
      photos: 25
    }
  },
  {
    id: 15,
    name: "Đùi Gà Chiên Mắm",
    price: 40000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.b0b32c3a4417ebed88a8952a651fcb8b&w=226&h=118&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Quốc Anh",
      avatar: "https://i.pravatar.cc/150?img=15",
      comment: "Gà giòn, mắm đậm đà"
    },
    stats: {
      comments: 189,
      photos: 58
    }
  },
  {
    id: 16,
    name: "Cải Thìa Xào Nấm",
    price: 25000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.bdbaa61ba94de6a0cdca3127528228c3&w=226&h=226&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Thùy Linh",
      avatar: "https://i.pravatar.cc/150?img=16",
      comment: "Cải giòn, nấm thơm ngon"
    },
    stats: {
      comments: 78,
      photos: 24
    }
  },
  {
    id: 17,
    name: "Thịt Lợn Rang Cháy Cạnh",
    price: 40000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.912cf331cde2d6779f3ee578761127bd&w=226&h=153&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Đình Phúc",
      avatar: "https://i.pravatar.cc/150?img=17",
      comment: "Thịt thơm, cháy cạnh vừa phải"
    },
    stats: {
      comments: 167,
      photos: 45
    }
  },
  {
    id: 18,
    name: "Canh Rau Ngót Thịt Bằm",
    price: 30000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th/id/OIP.nlJk172oFm_8V16ew-3AOAHaE8?w=276&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    user: {
      name: "Thảo Vy",
      avatar: "https://i.pravatar.cc/150?img=18",
      comment: "Rau ngót xanh, canh ngọt"
    },
    stats: {
      comments: 92,
      photos: 28
    }
  },
  {
    id: 19,
    name: "Bún Đậu Mắm Tôm",
    price: 35000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OSK.b010611251e63a26e92d5e4452ba1bd9&w=226&h=150&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1",
    user: {
      name: "Hải Nam",
      avatar: "https://i.pravatar.cc/150?img=19",
      comment: "Đậu giòn, mắm tôm thơm"
    },
    stats: {
      comments: 134,
      photos: 42
    }
  },
  {
    id: 20,
    name: "Cà Tím Nướng Mỡ Hành",
    price: 25000,
    address: "122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội",
    image: "https://th.bing.com/th?id=OIP.baQDksU7IEB8O3w_W_VskwHaEK&w=310&h=198&c=12&rs=1&p=0&bgcl=5feb31&r=0&o=6&dpr=1.3&pid=23.1",
    user: {
      name: "Bảo Ngọc",
      avatar: "https://i.pravatar.cc/150?img=20",
      comment: "Cà tím mềm, mỡ hành thơm"
    },
    stats: {
      comments: 108,
      photos: 35
    }
  }
];

  const handleGoToCart = () => {
    navigate('/cart');
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách món ăn dựa trên tìm kiếm và danh mục
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || restaurant.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchProvince = restaurant.address.includes(selectedProvince);
    
    return matchSearch && matchCategory && matchProvince;
  });

  // Thêm hàm xử lý chọn món
  const handleSelectItem = (item, event) => {
    // Thêm animation khi click
    const card = event.currentTarget.closest('.restaurant-card');
    addToCartAnimation(card);

    // Lấy giỏ hàng hiện tại từ localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Tìm món đã tồn tại trong giỏ hàng
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // Nếu món đã tồn tại, tăng số lượng lên 1
      const updatedCart = currentCart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      // Hiển thị thông báo đã tăng số lượng
      toast.info(`Đã tăng số lượng ${item.name} lên ${existingItem.quantity + 1}`);
    } else {
      // Nếu món chưa có trong giỏ hàng, thêm mới với số lượng là 1
      const newItem = { ...item, quantity: 1 };
      const updatedCart = [...currentCart, newItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      // Hiển thị thông báo đã thêm món mới
      toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
    }

    // Thêm hiệu ứng rung cho icon giỏ hàng
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('cart-shake');
      setTimeout(() => {
        cartBtn.classList.remove('cart-shake');
      }, 500);
    }
  };

  // Thêm hàm cập nhật số lượng món
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


