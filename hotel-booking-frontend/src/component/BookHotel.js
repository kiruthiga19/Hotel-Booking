import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookHotel() {
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleBooking = async () => {
    try {
      if(hotelName == ""){
        alert('Hotel name is required');
      }else if(checkIn == ""){
        alert('check in is required');
      }else if(checkOut == ''){
        alert('checkout is required');
      }else{
        const email = localStorage.getItem('email');
        const reqBody = {
          email,
          hotelName,
          checkIn,
          checkOut
        }
       await axios.post('http://localhost:5000/book', reqBody);
        alert('Hotel booked successfully!');
        navigate('/check-in');
      }
    } catch (error) {
      console.log("error",error)
    }
   
  };

  return (
    <div>
      <h2>Book Hotel</h2>
      <input type="text" placeholder="Hotel Name" onChange={(e) => setHotelName(e.target.value)} required/>
      <input type="date" onChange={(e) => setCheckIn(e.target.value)} required/>
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} required/>
      <button onClick={handleBooking}>Book</button>
    </div>
  );
}

export default BookHotel;
