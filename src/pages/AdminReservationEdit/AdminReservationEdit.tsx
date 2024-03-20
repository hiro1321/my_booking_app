import React, { useState, useEffect } from 'react';
import ReservationForm from '../../components/ReservationForm/ReservationForm';
import { Reservation, ReservationInputData } from '../../types/Reservation';
import {
  convertToDashFormat,
  getTimeFromIsoStr,
  getTodayStr,
  getTomorrowDate,
  getYmdFromIsoStr,
} from '../../services/utils';
import {
  getReservationDetailApi,
  updateReservationApi,
} from '../../services/api';

const ReservationEdit: React.FC = (props: any) => {
  const reservationId = props.match.params.id;
  const date = getTodayStr();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
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

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data: Reservation = await getReservationDetailApi(reservationId);
        setRoomNumber(data.room_number);
        setCheckInDate(getYmdFromIsoStr(data.start_datetime));
        setCheckInTime(getTimeFromIsoStr(data.start_datetime));
        setCheckOutDate(getYmdFromIsoStr(data.end_datetime));
        setCheckOutTime(getTimeFromIsoStr(data.end_datetime));
        setName(data.customer_name);
        setAddress(data.customer_address);
        setPhoneNumber(data.customer_phone);
        setEmail(data.customer_email);
        setLoading(false);
      } catch (error) {
        setError('部屋情報の取得に失敗しました。');
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    const reservationData: ReservationInputData = {
      roomNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      name,
      address,
      phoneNumber,
      email,
    };

    const result: string[] = await updateReservationApi(
      reservationId,
      reservationData
    );
    if (result[0] !== 'success') {
      setErrorMessages(result);
      setIsSuccess(false);
    } else {
      setErrorMessages([]);
      setIsSuccess(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>予約の編集</h2>
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
          <p>予約の更新が完了しました</p>
        </div>
      )}

      <ReservationForm
        roomNumber={roomNumber}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        name={name}
        address={address}
        phoneNumber={phoneNumber}
        email={email}
        setRoomNumber={setRoomNumber}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setCheckInTime={setCheckInTime}
        setCheckOutTime={setCheckOutTime}
        setName={setName}
        setAddress={setAddress}
        setPhoneNumber={setPhoneNumber}
        setEmail={setEmail}
        isAdmin={true}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ReservationEdit;
