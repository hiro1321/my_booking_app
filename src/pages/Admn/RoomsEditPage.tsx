import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RoomsEditPage.css'; // 新しく作成するCSSファイルをインポート
import { Room } from '../../types/Room';
import { useRoomContext } from '../../contexts/RoomContext';
import { fetchRoomById } from '../../services/api';

const RoomsEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { rooms, setRooms } = useRoomContext();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const roomData = rooms.find((room) => room.id === parseInt(id, 10));
    setRoom(roomData || null);
  }, [id]);

  return (
    <div className='container'>
      <h4 className='title'>客室編集</h4>
      <h6 className='room-id'>部屋ID: {id}</h6>
      <Link to='/admin/rooms' className='link'>
        <button className='update-button'>更新</button>
      </Link>
      <Link to='/admin/rooms' className='link'>
        <button className='cancel-button'>キャンセル</button>
      </Link>
      {/* 更新フォームのコンポーネントをここに追加 */}
    </div>
  );
};

export default RoomsEditPage;
