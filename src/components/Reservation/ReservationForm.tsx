import React from 'react';
import { ReservationFormProps } from '../../types/Reservation';

const ReservationForm: React.FC<ReservationFormProps> = ({
  roomNumber,
  checkInDate,
  checkOutDate,
  checkInTime,
  checkOutTime,
  name,
  address,
  phoneNumber,
  email,
  setRoomNumber,
  setCheckInDate,
  setCheckOutDate,
  setCheckInTime,
  setCheckOutTime,
  setName,
  setAddress,
  setPhoneNumber,
  setEmail,
  isAdmin,
  handleSubmit,
}) => {
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
    <form onSubmit={handleSubmit}>
      {isAdmin ? (
        <label>
          部屋番号:
          <input
            type='text'
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </label>
      ) : (
        <p>部屋番号: {roomNumber}</p>
      )}
      <label>
        チェックイン日:
        <input
          type='date'
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <select
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
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
          onChange={(e) => setCheckOutTime(e.target.value)}
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
  );
};

export default ReservationForm;
