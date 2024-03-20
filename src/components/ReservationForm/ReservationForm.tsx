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
    <div className='container'>
      <table className='form-table'>
        <tbody>
          <tr>
            <th>部屋番号</th>
            {isAdmin ? (
              <td>
                <input
                  type='text'
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </td>
            ) : (
              <td> {roomNumber}</td>
            )}
          </tr>
          <tr>
            <th>チェックイン日</th>
            <td>
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
            </td>
          </tr>
          <tr>
            <th>チェックアウト日</th>
            <td>
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
            </td>
          </tr>
          <tr>
            <th>名前</th>
            <td>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>住所</th>
            <td>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>
              {' '}
              <input
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className='center-container mt-30'>
        <button type='submit' onClick={handleSubmit} className='btn'>
          送信
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
