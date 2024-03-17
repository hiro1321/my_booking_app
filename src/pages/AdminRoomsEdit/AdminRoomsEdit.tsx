import React, { useEffect, useState } from 'react';
import './AdminRoomsEdit.css';
import { Room } from '../../types/Room';
import { deleteRoomApi, fetchRoomById, updateRoom } from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import RoomForm from '../../components/Room/RoomForm';

const RoomsEditPage: React.FC = (props: any) => {
  const id = props.match.params.id;
  const history = useHistory();
  const [room, setRoom] = useState<Room | null>(null);
  const [updatedRoomData, setUpdatedRoomData] = useState<Room | null>(room);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const handleDeleteRoom = async () => {
    const isConfirmed = window.confirm('本当に削除してもよろしいでしょうか？');
    if (isConfirmed) {
      await deleteRoomApi(id);
      setShowSuccessMessage(true);
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        history.push('/admin/rooms/');
      }, 3000);
    }
  }, [showSuccessMessage, history]);

  return (
    <div className='container'>
      {showSuccessMessage && (
        <div className='success-message'>
          <p>削除処理に成功しました</p>
          <p>前のページへ遷移します。</p>
        </div>
      )}
      {room && (
        <RoomForm
          roomData={updatedRoomData}
          setRoomData={setUpdatedRoomData}
          handleSubmit={handleUpdateRoom}
        />
      )}
      <div style={{ marginTop: '30px' }}></div>
      <button onClick={handleDeleteRoom} className='btn'>
        削除
      </button>
      <Link to='/admin/rooms' className='link'>
        <button className='btn'>戻る</button>
      </Link>
    </div>
  );
};

export default RoomsEditPage;
