import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function CheckIn() {
  const [bookingId, setBookingId] = useState('');
  const [guests, setGuests] = useState([{ name: '', aadhaar: '' }]);
  const navigate = useNavigate();

  const handleGuestChange = (index, field, value) => {
    const newGuests = [...guests];
    newGuests[index][field] = value;
    setGuests(newGuests);
  };

  const addGuest = () => {
    setGuests([...guests, { name: '', aadhaar: '' }]);
  };

  const handleCheckIn = async () => {
    try {
      if (guests[0]?.name == "") {
        alert('Guest name is required');
      } else if (guests[0]?.aadhaar == "") {
        alert('Guest name is aadhaar is required');
      } else {
        const email = localStorage.getItem('email');
        const response = await axios.post('http://localhost:5000/check-in', {
          guests,
          email
        });

        if (response.status === 200) {
          alert('Check-in Successful! you may logout now');
        } else {
          alert('Check-in Failed!');
        }
      }
    } catch (error) {
      console.log("error", error)
    }
  };
  const handleRegister = () => {
    navigate('/');
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{ marginTop: "10px",marginRight:"50px" }} onClick={handleRegister}>
          Logout
        </button>
      </div>
      <h2>Web Check-in</h2>
      <h3>Family Members</h3>
      {guests.map((guest, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Guest Name"
            value={guest.name}
            onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Aadhaar Number"
            value={guest.aadhaar}
            onChange={(e) => handleGuestChange(index, 'aadhaar', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addGuest}>Add Another Guest</button>
      <button onClick={handleCheckIn}>Submit Check-in</button>
    </div>
  );
}

export default CheckIn;
