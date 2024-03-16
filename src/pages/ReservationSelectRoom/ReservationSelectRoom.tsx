import React, { useEffect, useState } from 'react';
import { fetchRooms } from '../../services/api';
import { Room } from '../../types/Room';
import { cvNumToRoundStr } from '../../services/utils';
import './ReservationSelectRoom.css';

interface RouteParams {
  date: string;
}

const ReservationSelectRoomPage = (props: any) => {
  const date = props.match.params.date;
  const [rooms, setRooms] = useState<Room[]>([]);

  // TODO:予約可能な部屋のみを取得できるように修正する
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await fetchRooms();
        setRooms(roomData);
      } catch (error) {
        console.error('空き状況を取得できませんでした:', error);
      }
    };

    fetchRoomData();
  }, []);

  const handleRoomClick = (roomNumber: string) => {
    const url = `/reservation/${date}/${roomNumber}`;
    window.location.href = url;
  };

  return (
    <div>
      <h2>{date}</h2>
      <p>予約するお部屋を選択してください</p>
      <ul className='room-list'>
        {rooms.map((room, index) => {
          return (
            <div
              className='roomdetail'
              key={index}
              onClick={() => handleRoomClick(room.room_number)}
            >
              <p>{room.room_number}号室</p>
              <p>{room.room_type}</p>
              <p>{cvNumToRoundStr(room.price)}円</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ReservationSelectRoomPage;
