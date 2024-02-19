import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservation.css';
import { cvDateToStr } from '../services/utils';
import { getRoomAvailabilityApi } from '../services/api';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ReservationPage: React.FC = () => {
  const [value, onChange] = useState<Date>(new Date());
  const [tileContentData, setTileContentData] = useState<{
    [date: string]: number;
  }>({});

  useEffect(() => {
    const fetchAvailabilityData = async () => {
      const fetchData = async (date: Date) => {
        const dateStr = cvDateToStr(date);
        const availability = await getRoomAvailabilityApi(dateStr);
        return { [dateStr]: availability };
      };

      const newTileContentData: { [date: string]: number } = {};
      if (Array.isArray(value)) {
        for (const date of value) {
          Object.assign(newTileContentData, await fetchData(date));
        }
      } else {
        Object.assign(newTileContentData, await fetchData(value));
      }

      setTileContentData(newTileContentData);
    };

    fetchAvailabilityData();
  }, [value]);

  const handleChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (Array.isArray(value)) {
      // newValueがDate[]の場合の処理
      // 通常はこの場合には何もしないか、適切な処理を行います
    } else {
      onChange(value as Date); // 新しい値を設定
    }
  };

  // カレンダーの日付ごとに空き部屋数を取得し、表示する
  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const dateStr = cvDateToStr(date);
      const availability = tileContentData[dateStr] || 0; // タイルの内容から取得
      return <p>空き{availability}</p>;
    }
    return null;
  };

  return (
    <div className='reservation-page'>
      <h2>予約ページ</h2>
      <div className='calendar-container'>
        <Calendar
          value={value}
          onChange={handleChange}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
