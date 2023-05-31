
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
      <div>
        <h1>Welcome to the home of Ferrara Beans</h1>
        <p><Link to="/shop">Shop</Link> </p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  
  export default Home;