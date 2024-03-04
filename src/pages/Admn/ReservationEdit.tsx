import React, { useState, useEffect } from 'react';
import ReservationForm from '../../components/Reservation/ReservationForm';
import { Reservation, ReservationInputData } from '../../types/Reservation';
import { convertToDashFormat, getTomorrowDate } from '../../services/utils';
import { getReservationDetailApi } from '../../services/api';

const ReservationEdit: React.FC = (props: any) => {
  const reservationId = props.match.params.id;
  // TODO:dateは仮の値_getTodayStr等の関数を用意

  const date = '20240101';
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
        // TODO:checkInDate - checkOutTimeも型を変換して設定する
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    try {
      // TODO:予約更新のapiを作成
      // await updateRoomDetails(formData);
      console.log('更新が完了しました');
    } catch (error) {
      console.error('更新エラー:', error);
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
