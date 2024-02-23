import React, { useEffect, useState } from 'react';
import './style.css';
import { Room } from '../types/Room';
import { cvNumToRoundStr } from '../services/utils';

interface RoomProps {
  room: Room;
  index: number;
}

export const RoomField: React.FC<RoomProps> = ({ room, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = 300 * (index + 0.1); // 0.3秒ごとの遅延
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`incomplete-area ${isVisible ? 'visible' : ''}`}>
      <p>{room.room_number}号室</p>
      <p>{room.room_type}</p>
      <p>{cvNumToRoundStr(room.price)}円</p>
    </div>
  );
};
