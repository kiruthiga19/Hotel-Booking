import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');  //  Added missing email state
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      //  Store token in localStorage (or httpOnly cookie in real app)
      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('email', response?.data?.email);

      alert(response?.data?.message); //  Show success message
      navigate('/book'); //  Redirect to booking page

    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };
  const handleRegister = () =>{
    navigate('/');
  }
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Login;
