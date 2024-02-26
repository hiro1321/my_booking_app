import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReservationListApi } from '../../services/api';
import { Reservation } from '../../types/Reservation';
import { formatDatetime } from '../../services/utils';
import './ReservationList.css';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationList = await getReservationListApi();
        if (reservationList) {
          setReservations(reservationList);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  return (
    <div>
      <h2>予約一覧</h2>
      <table className='reservation-table'>
        <thead>
          <tr>
            <th>部屋番号</th>
            <th>予約開始日</th>
            <th>予約終了日</th>
            <th>お客様名</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.room_number}</td>
              <td>{formatDatetime(reservation.start_datetime)}</td>
              <td>{formatDatetime(reservation.end_datetime)}</td>
              <td>{reservation.customer_name}</td>
              <td className='action-buttons'>
                <Link to={`/edit/${reservation.id}`}>編集</Link>{' '}
                <Link to={`/delete/${reservation.id}`}>削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
