import React, { useState } from 'react';
import { convertToDashFormat, getTomorrowDate } from '../services/utils';

import { submitReservationApi } from '../services/api';
import './ReservationDetailPage.css';
import { ReservationInputData } from '../types/Reservation';
import ReservationForm from '../components/Reservation/ReservationForm';

const ReservationDetailPage: React.FC = (props: any) => {
  const date = props.match.params.date ? props.match.params.date : '20240101';
  const roomNumber: string = props.match.params.roomNumber
    ? props.match.params.roomNumber
    : '';
  const [roomNumberInput, setRoomNumberInput] = useState(roomNumber);
  const [checkInDate, setCheckInDate] = useState(convertToDashFormat(date));
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowDate(date));
  const [checkInTime, setCheckInTime] = useState('18:00');
  const [checkOutTime, setCheckOutTime] = useState('10:00');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const reservationData: ReservationInputData = {
      roomNumber: roomNumberInput,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      name,
      address,
      phoneNumber,
      email,
    };

    const result: string[] = await submitReservationApi(reservationData);
    if (result[0] !== 'success') {
      setErrorMessages(result);
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div>
      <h2>予約ページ</h2>
      {errorMessages.length > 0 && (
        <div className='error-message'>
          {errorMessages.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>
              {error}
            </p>
          ))}
        </div>
      )}
      {isSuccess && (
        <div className='success-message'>
          <p>予約の登録が完了しました</p>
        </div>
      )}

      <ReservationForm
        roomNumber={roomNumberInput}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        name={name}
        address={address}
        phoneNumber={phoneNumber}
        email={email}
        setRoomNumber={setRoomNumberInput}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setCheckInTime={setCheckInTime}
        setCheckOutTime={setCheckOutTime}
        setName={setName}
        setAddress={setAddress}
        setPhoneNumber={setPhoneNumber}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ReservationDetailPage;
