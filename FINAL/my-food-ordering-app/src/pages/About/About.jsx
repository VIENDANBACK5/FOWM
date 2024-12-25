import BackButton from '../../components/BackButton';
import './About.css';

const About = () => {
  return (
    <div className="page about">
      <BackButton />
      <h1>Về Chúng Tôi</h1>

      <div className="about-container">
        <section className="about-section">
          <h2>Câu Chuyện Của Chúng Tôi</h2>
          <p>
            Chúng tôi là một nhà hàng với truyền thống lâu đời trong việc phục vụ các món ăn
            Việt Nam chất lượng cao. Được thành lập từ năm 2010, chúng tôi luôn đặt sự hài lòng
            của khách hàng lên hàng đầu.
          </p>
        </section>

        <section className="about-section">
          <h2>Sứ Mệnh</h2>
          <p>
            Mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt vời nhất với các món ăn
            được chế biến từ nguyên liệu tươi ngon và đảm bảo vệ sinh an toàn thực phẩm.
          </p>
        </section>

        <section className="about-section">
          <h2>Giá Trị Cốt Lõi</h2>
          <ul className="values-list">
            <li>Chất lượng món ăn luôn được đặt lên hàng đầu</li>
            <li>Phục vụ khách hàng tận tâm và chuyên nghiệp</li>
            <li>Môi trường làm việc thân thiện và chuyên nghiệp</li>
            <li>Luôn đổi mới và phát triển</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Liên Hệ</h2>
          <div className="contact-info">
            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Hà Nội, Việt Nam</p>
            <p><strong>Điện thoại:</strong> (+84) 1234 5678</p>
            <p><strong>Email:</strong> info@nhahang.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 