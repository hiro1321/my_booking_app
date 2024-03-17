import React, { useEffect, useState } from 'react';
import './RoomCard.css';
import { Room } from '../../types/Room';
import { cvNumToRoundStr } from '../../services/utils';

interface RoomProps {
  room: Room;
  index: number;
}

export const RoomCard: React.FC<RoomProps> = ({ room, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  // 0.1秒ごとの遅延で、roomCardを表示する
  useEffect(() => {
    const delay = 100 * (index + 0.1);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`incomplete-area ${isVisible ? 'visible' : ''}`}>
      <p>{room.room_number}号室</p>
      <div className='img-container'>
        {room.room_image ? (
          <img src={room.room_image} alt='Room' />
        ) : (
          <a>イメージ画像なし</a>
        )}
      </div>
      <p>{room.room_type}</p>
      <p>{cvNumToRoundStr(room.price)}円</p>
    </div>
  );
};
