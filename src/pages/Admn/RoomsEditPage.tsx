import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RoomsEditPage.css'; // 新しく作成するCSSファイルをインポート
import { Room } from '../../types/Room';
import { fetchRoomById, updateRoom } from '../../services/api'; // 更新関数をインポート

const RoomsEditPage: React.FC = (props: any) => {
  const id = props.match.params.id;

  const [room, setRoom] = useState<Room | null>(null);
  const [updatedRoomData, setUpdatedRoomData] = useState<Room | null>(null);

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
      <h4 className='title'>客室編集</h4>
      <h6 className='room-id'>部屋ID: {id}</h6>
      {/* 部屋情報が取得されたら表示 */}
      {room && (
        <form className='room-form'>
          <div className='form-group'>
            <label htmlFor='room_number'>部屋番号</label>
            <input
              type='text'
              id='room_number'
              value={updatedRoomData?.room_number || ''}
              onChange={(e) =>
                setUpdatedRoomData((prevData) => {
                  if (prevData === null) return null;
                  return {
                    ...prevData,
                    room_number: e.target.value,
                  };
                })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='room_type'>部屋のタイプ</label>
            <input
              type='text'
              id='room_type'
              value={updatedRoomData?.room_type || ''}
              onChange={(e) =>
                setUpdatedRoomData((prevData) => {
                  if (prevData === null) return null;
                  return {
                    ...prevData,
                    room_type: e.target.value,
                  };
                })
              }
            />
          </div>

          <div className='form-group'>
            <label htmlFor='price'>金額</label>
            <input
              type='number'
              id='price'
              value={updatedRoomData?.price || 0}
              onChange={(e) =>
                setUpdatedRoomData((prevData) => {
                  if (prevData === null) return null;
                  return {
                    ...prevData,
                    price: parseFloat(e.target.value),
                  };
                })
              }
            />
          </div>
          <button type='button' onClick={handleUpdateRoom}>
            更新
          </button>
        </form>
      )}
      <Link to='/admin/rooms' className='link'>
        <button className='cancel-button'>キャンセル</button>
      </Link>
    </div>
  );
};

export default RoomsEditPage;
