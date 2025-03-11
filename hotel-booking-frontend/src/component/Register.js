import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Register() {
const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      console.log("response",response)
      if(response?.data?.statusCode == 200){
        alert('Registered successfully!');
        navigate('/book');
      }else if(response?.data?.statusCode == 400){
        alert(response?.data?.message);
        navigate('/login');
      }
    } catch (error) {
      console.log("error",error)
    }

 
  };
  const handleLogin = () =>{
    navigate('/');
  }

  return (
    <div>
     <h1>Welcome to hotel booking application</h1>
      <h2>Register</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Register;
