// Home.tsx

import React, { useState, useEffect } from 'react';
import './Home.css';
import { RoomField } from '../components/RoomField';
import { compileFunction } from 'vm';
import { Room } from '../types/Room';
import { fetchRooms } from '../services/api';

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
        <h1>ようこそ、静寂と美しさに満ちた旅館へ。</h1>
        <p>
          当旅館では、日常から離れ、心身をリフレッシュできる究極の癒しの場を提供しています。美しい自然に囲まれた静かなロケーションで、贅沢な滞在をお楽しみください。
        </p>
        <p>
          私たちの客室は、快適さとエレガンスを兼ね備えたデザインで、あなたのくつろぎを最大限に引き出します。広々とした窓からは、美しい景色が広がり、季節ごとの自然の美しさを満喫することができます。また、モダンな設備が完備されており、快適な滞在をサポートします。
        </p>
      </div>

      {/* 空室一覧を表示 */}
      <h3>利用可能な客室</h3>

      <ul className='room-list'>
        {rooms.map((room, index) => {
          return <RoomField room={room} key={room.id} index={index} />;
        })}
      </ul>

      <div className='cta-buttons'>
        <a href='/reservation' className='btn btn-primary'>
          予約をする
        </a>
        <a href='/about' className='btn btn-secondary'>
          詳細を見る
        </a>
      </div>
    </div>
  );
};

export default Home;
