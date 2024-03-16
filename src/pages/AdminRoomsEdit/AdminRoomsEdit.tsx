import React, { useEffect, useState } from 'react';
import './AdminRoomsEdit.css';
import { Room } from '../../types/Room';
import { fetchRoomById, updateRoom } from '../../services/api';
import RoomForm from '../../components/Room/RoomForm';

const RoomsEditPage: React.FC = (props: any) => {
  const id = props.match.params.id;

  const [room, setRoom] = useState<Room | null>(null);
  const [updatedRoomData, setUpdatedRoomData] = useState<Room | null>(room);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData: Room | null = await fetchRoomById(id);
        setRoom(roomData);
        setUpdatedRoomData(roomData);
      } catch (error) {
        console.error('対象部屋情報を取得できませんでした:', error);
      }
    };

    fetchRoomData();
  }, [id]);

  const handleUpdateRoom = async () => {
    if (!updatedRoomData) {
      console.error('更新データがありません');
      return;
    }

    try {
      await updateRoom(id, updatedRoomData);
      console.log('部屋情報が更新されました');
    } catch (error) {
      console.error('部屋情報を更新できませんでした:', error);
    }
  };

  return (
    <div className='container'>
      {room && (
        <RoomForm
          roomData={updatedRoomData}
          setRoomData={setUpdatedRoomData}
          handleSubmit={handleUpdateRoom}
        />
      )}
    </div>
  );
};

export default RoomsEditPage;
