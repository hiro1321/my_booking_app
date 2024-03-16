// Home.tsx

import React, { useState, useEffect } from 'react';
import './Home.css';
import { compileFunction } from 'vm';
import { Room } from '../../types/Room';
import { fetchRooms } from '../../services/api';
import { RoomCard } from '../../components/RoomCard/RoomCard';

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

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

  return (
    <div className='home-container'>
      <div className='welcome-section'>
        <h1>旅館向けの予約システム</h1>
        <ul>
          <li>日付と部屋を選択し、客室情報を予約します。</li>
          <li>部屋の空き状況はカレンダーで確認できます。</li>
          <li>予約時には、お名前などの情報をご入力ください。</li>
          <li style={{ color: 'red' }}>本システムは試作品です。</li>
          <li style={{ color: 'red' }}>
            初回はサーバーサイドとの連携に1分間程度の時間がかかります。
          </li>
        </ul>
      </div>
      <div className='cta-buttons'>
        <a href='/reservation' className='btn btn-primary'>
          予約をする
        </a>
      </div>

      <h3>客室一覧</h3>
      <ul className='room-list'>
        {rooms.map((room, index) => {
          return <RoomCard room={room} key={room.id} index={index} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
