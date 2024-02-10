// Reservation.tsx

import React, { useState } from 'react';

const Reservation: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 予約の処理をここに追加する
    console.log('Reservation submitted:', {
      name,
      email,
      checkInDate,
      checkOutDate,
    });
    // 送信後の処理を行う
  };

  return (
    <div className='reservation-container'>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Check-in Date:</label>
          <input
            type='date'
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Check-out Date:</label>
          <input
            type='date'
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reservation;
