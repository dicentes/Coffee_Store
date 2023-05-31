import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import userStore from './userStore';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post('http://localhost:3500/api/login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('jwtToken', response.data.token); // store the JWT token in local storage
          userStore.setToken(localStorage.jwtToken);
          userStore.setUserInitial(username);
          navigate('/shop'); //needs to include the AUTH stored in state
        }  
      })
      .catch(error => {
        console.error(error);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
        <p> If you haven't registered, click <Link to="/register"> here</Link> for the registration page.</p>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
  );
};

export default Login;