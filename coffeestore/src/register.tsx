import React, { useState } from 'react';
import axios from 'axios';
import userStore from './userStore';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //I'm going to remove this but I don't feel like testing it now. 
  const [alert, setAlert] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post('http://localhost:3500/api/register', { username, password })
      .then(response => {
        setAlert(true);
        setAlert(false);
        navigate('/login');
      })
      .catch(error => {
        console.error(error);
      });


    setUsername('');
    setPassword('');
  };

  return (
    <div>
        <p> If you're already registered, click <Link to="/login">here</Link> for the login page.</p>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
    </div>
  );
};

export default Register;