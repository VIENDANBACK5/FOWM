import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FullScreenMenu from './components/FullScreenMenu';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import Order from './pages/Order/Order';

function App() {
  return (
    <Router>
      <div className="app-container" >
        <Routes>
          <Route path="/" element={<FullScreenMenu />} />
          <Route path="/home" element={<FullScreenMenu/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;