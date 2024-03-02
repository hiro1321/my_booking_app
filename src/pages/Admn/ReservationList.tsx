import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteReservationApi,
  getReservationListApi,
} from '../../services/api';
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

  const handleDelete = async (reservationId: string) => {
    const isConfirmed = window.confirm('この予約を削除してもよろしいですか？');
    if (isConfirmed) {
      console.log('削除処理を実行します。');
      await deleteReservationApi(reservationId);
      // 予約を削除した後、再度予約一覧を取得して更新する
      const updatedReservations = await getReservationListApi();
      updatedReservations && setReservations(updatedReservations);
    }
  };

  return (
    <div>
      <div className='reservation-title action-buttons'>
        <h2>予約一覧</h2>
        <Link to='/admin/reservations/add'>予約追加</Link>
      </div>
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
                <Link to={`/admin/reservations/edit/${reservation.id}`}>
                  編集
                </Link>{' '}
                <a onClick={() => handleDelete(reservation.id)}>削除</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
