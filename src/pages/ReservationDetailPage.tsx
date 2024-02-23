import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  date: string;
  roomNumber: string;
}

const ReservationDetailPage: React.FC = (props: any) => {
  const date = props.match.params.date;
  const roomNumber = props.match.params.roomNumber;
  return (
    <div>
      <h2>予約ページ</h2>
      <p>日付: {date}</p>
      <p>部屋番号: {roomNumber} </p>
      {/* ここに予約情報を表示するコンポーネントなどを追加 */}
    </div>
  );
};

export default ReservationDetailPage;
