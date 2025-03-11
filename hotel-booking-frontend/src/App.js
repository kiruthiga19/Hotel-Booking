import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import BookHotel from './component/BookHotel';
import CheckIn from './component/CheckIn';
import Login from './component/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/book" element={<BookHotel />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
