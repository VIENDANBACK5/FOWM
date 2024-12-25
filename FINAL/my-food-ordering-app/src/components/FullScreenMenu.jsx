import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import './FullScreenMenu.styles.css';

gsap.registerPlugin(CSSRulePlugin);

const FullScreenMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const hamburgerRef = useRef(null);
  const pathRef = useRef(null);
  const spanBeforeRef = useRef(null);

  useEffect(() => {
    const tl = timeline.current;
    const hamburger = hamburgerRef.current;
    const path = pathRef.current;
    const spanBefore = spanBeforeRef.current;

    // Reset timeline nếu đã tồn tại
    tl.clear();

    // Thiết lập giá trị ban đầu
    gsap.set(hamburger, { x: 0, y: 0, marginTop: "0px" });
    gsap.set(spanBefore, { background: "#000" });
    gsap.set(path, { attr: { d: "M0 2S175 1 500 1s500 1 500 1V0H0Z" } });
  
    // Định nghĩa hoạt ảnh
    const start = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const end = "M0, 1005S175, 995, 500, 995s500, 5, 500, 5V0H0Z";
  
    const power2 = "power2.inOut";
    const power4 = "power4.inOut";
  
    tl.to(hamburger, {
      duration: 1.25,
      marginTop: "-5px",
      x: -40,
      y: 40,
      ease: power4
    })
      .to(".line", {
        duration: 1,
        background: "#fff",
        ease: power2
      }, "<")
      .to(spanBefore, {
        duration: 1,
        background: "#fff",
        ease: power2
      }, "<")
      .to(".btn-outline", {
        duration: 1.25,
        x: -40,
        y: 40,
        width: "140px",
        height: "140px",
        border: "1px solid #e2e2dc",
        ease: power4
      }, "<")
      .to(path, {
        duration: 0.8,
        attr: { d: start },
        ease: power2
      }, "<")
      .to(path, {
        duration: 0.8,
        attr: { d: end },
        ease: power2
      }, "-=0.5")
      .to(".menu-item>a", {
        duration: 1,
        top: 0,
        ease: "power3.out",
        stagger: {
          amount: 0.5
        }
      }, "-=1")
      // Thay vì gọi reverse() ở đây, chỉ set progress về 0
    tl.progress(0);

    }, []);


    const handleToggle = () => {
      const tl = timeline.current;
      setIsOpen(!isOpen);
      
      // Kiểm tra trạng thái hiện tại và play/reverse tương ứng
      if (!isOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
    };

  return (
    <>
      <h1 className="title"> Viết gì đó .... slogan chẳng hạn..... </h1>

      <div id="toggle-btn" className="btn" onClick={handleToggle}>
        <div className="btn-outline btn-outline-1"></div>
        <div className="btn-outline btn-outline-2"></div>
        <div id="hamburger" ref={hamburgerRef} className={isOpen ? 'active' : ''}>
          <span className="line line-1"></span>
          <span className="line line-2" ref={spanBeforeRef}></span>
        </div>
      </div>

      <div className="overlay">
        <svg viewBox="0 0 1000 1000">
          <path ref={pathRef} d="M0 2S175 1 500 1s500 1 500 1V0H0Z"></path>
        </svg>
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <PrimaryMenu />
        <SecondaryMenu />
      </div>
    </>
  );
};

const PrimaryMenu = () => (
  <div className="primary-menu">
    <div className="menu-container">
      <div className="wrapper">
        {[
          { id: 'I', text: 'HOME' },
          { id: 'II', text: 'ORDER' },
          { id: 'III', text: 'CART' },
          { id: 'IV', text: 'ABOUT' }
        ].map(item => (
          <MenuItem key={item.id} prefix={item.id} text={item.text} />
        ))}
      </div>
    </div>
  </div>
);

const SecondaryMenu = () => (
  <div className="secondary-menu">
    <div className="menu-container">
      <div className="wrapper">
        {['Blog', 'Feedback', 'Contact', 'Info'].map(text => (
          <MenuItem key={text} text={text} />
        ))}
      </div>
    </div>
  </div>
);

const MenuItem = ({ prefix, text }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // Nếu là menu Home thì reload trang
    if (text.toLowerCase() === 'home') {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return;
    }

    // Các menu khác vẫn giữ nguyên logic cũ
    setTimeout(() => {
      navigate(`/${text.toLowerCase()}`);
    }, 1500);
  };

  return (
    <div className="menu-item">
      <a href={`/${text.toLowerCase()}`} onClick={handleClick}>
        {prefix && <span>{prefix}</span>}
        {text}
      </a>
      <div className="menu-item-revealer"></div>
    </div>
  );
};

MenuItem.propTypes = {
  prefix: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default FullScreenMenu;