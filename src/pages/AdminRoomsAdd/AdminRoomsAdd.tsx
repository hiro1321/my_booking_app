import React, { useState } from 'react';
import { Room } from '../../types/Room';
import RoomForm from '../../components/Room/RoomForm';
import { submitRoom } from '../../services/api';

const RoomsAddPage: React.FC = () => {
  const initialRoomData: Room = {
    id: 0,
    room_number: '',
    room_type: '',
    room_image: null,
    price: 0,
  };
  const [roomData, setRoomData] = useState<Room | null>(initialRoomData);

  const handleUpdateRoom = async () => {
    if (!roomData) {
      console.error('登録データがありません');
      return;
    }
    await submitRoom(roomData);
    console.log('部屋情報を登録しました');
  };

  return (
    <div className='container'>
      <RoomForm
        roomData={roomData}
        setRoomData={setRoomData}
        handleSubmit={handleUpdateRoom}
      />
    </div>
  );
};

export default RoomsAddPage;
