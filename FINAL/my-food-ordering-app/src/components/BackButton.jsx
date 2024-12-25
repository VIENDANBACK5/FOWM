import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <i className="fas fa-arrow-left"></i> Quay lại
    </button>
  );
};

export default BackButton;