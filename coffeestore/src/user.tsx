import { observer } from 'mobx-react-lite';
import userStore from './userStore';
import { observable, action } from 'mobx';
import { useNavigate, Link } from 'react-router-dom';

const User = observer(() => {
    //I think we need logic here that basically hits the api/validate route every time we don't have user authenticated - and if not, then we basically
    //just dont show anything other than the shop
    const navigate = useNavigate();
    console.log("User here!");
  return (

     <nav className="container navbar navbar-expand-lg navbar-light bg-light">{userStore.user && <p>Welcome, {userStore.user}!</p>}
      <Link className="navbar-brand" to="/">Home </Link>
      <Link className="navbar-brand" to="/shop">Shop </Link>
      {!userStore.user && <Link className="navbar-brand" to="/login">Login </Link>}
      {userStore.user && <Link className='navbar-brand' to="/logout">Logout</Link>}
      {!userStore.user && <Link className="navbar-brand" to="/register">Register </Link>}
      {userStore.userRole === "admin" && (<Link className="navbar-brand" to="/admin">Admin Portal</Link>)}

     </nav>
        
  );
});

export default User;