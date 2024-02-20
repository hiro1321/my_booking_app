import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservation.css';
import { checkYmdstr, cvDateStrPattern, cvDateToStr } from '../services/utils';
import { getRoomAvailabilityApi } from '../services/api';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ReservationPage: React.FC = () => {
  useEffect(() => {
    // 空き部屋数を取得し画面を編集
    const showAvailability = async () => {
      const labelList = document.querySelectorAll('abbr');
      for (const e of labelList) {
        const dateString = e.getAttribute('aria-label');
        if (dateString != null && checkYmdstr(dateString)) {
          // targetの値が文字列の日付の場合、APIで対象日付の空き部屋数を取得
          const changedFommatDate = cvDateStrPattern(dateString);
          const availability = await getRoomAvailabilityApi(changedFommatDate);
          const nextElement = e.nextElementSibling;
          if (nextElement) {
            nextElement.textContent = '空き' + availability;
          }
        }
      }
    };

    // クリックの都度実行する
    document.addEventListener('click', showAvailability);
    showAvailability();
  }, []);

  // カレンダーの日付ごとにフォーマット
  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      return <p>空き:</p>;
    }
    return null;
  };

  return (
    <div className='reservation-page'>
      <h2>予約ページ</h2>
      <div className='calendar-container'>
        <Calendar tileContent={tileContent} />
      </div>
    </div>
  );
};

export default ReservationPage;
