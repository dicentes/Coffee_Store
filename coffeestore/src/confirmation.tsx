import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Confirmation = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || []; // access selectedItems from the location state
  const navigate = useNavigate();
  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>You have ordered the following items:</p>
     <p> {selectedItems}</p>
      <p>Thank you for your order!</p>
      <button className="btn btn-primary" onClick={(event) => navigate("/")}> Home </button>
    </div>
    
  );
};
// test
export default Confirmation;