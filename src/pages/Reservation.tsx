import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservation.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ReservationPage: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  // 選択した日付の空き部屋数を取得する関数
  const getRoomAvailability = (selectedDate: Date): number => {
    // ここに実際の空き部屋数を取得する処理を実装する
    // この例では仮の値としてランダムな数を返す
    return Math.floor(Math.random() * 10);
  };

  // カレンダーの日付ごとに空き部屋数を取得し、表示する
  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const availability = getRoomAvailability(date);
      return <p>空き{availability}</p>;
    }
    return null;
  };

  return (
    <div className='reservation-page'>
      <h2>予約ページ</h2>
      <div className='calendar-container'>
        <Calendar value={value} onChange={onChange} tileContent={tileContent} />
      </div>
    </div>
  );
};

export default ReservationPage;
