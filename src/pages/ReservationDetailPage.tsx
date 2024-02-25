import React, { useState } from 'react';
import { convertToDashFormat, getTomorrowDate } from '../services/utils';
import { ReservationData } from '../types/ReservationData';
import { submitReservationApi } from '../services/api';

const ReservationDetailPage: React.FC = (props: any) => {
  const date = props.match.params.date;
  const roomNumber = props.match.params.roomNumber;
  const [checkInDate, setCheckInDate] = useState(convertToDashFormat(date));
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowDate(date));
  const [checkInTime, setCheckInTime] = useState('18:00');
  const [checkOutTime, setCheckOutTime] = useState('10:00');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('エラーメッセージ');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const reservationData: ReservationData = {
      roomNumber,
      checkInDate,
      checkOutDate,
      name,
      address,
      phoneNumber,
      email,
    };

    const result = await submitReservationApi(reservationData);
    console.log(result);
  };

  // 60分ごとの時刻の選択肢を生成する関数
  function generateTimeOptions() {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  }

  return (
    <div>
      <h2>予約ページ</h2>
      <p>日付: {date}</p>
      <p>部屋番号: {roomNumber} </p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          チェックイン日:
          <input
            type='date'
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <select
            value={checkInTime}
            onChange={(e) => setCheckInDate(e.target.value)}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          チェックアウト日:
          <input
            type='date'
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <select
            value={checkOutTime}
            onChange={(e) => setCheckInDate(e.target.value)}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          名前:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          住所:
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          電話番号:
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          メールアドレス:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>送信</button>
      </form>
    </div>
  );
};

export default ReservationDetailPage;
