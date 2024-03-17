import React from 'react';
import { RoomFormProps } from '../../types/Room';
import { fileToBase64 } from '../../services/utils';

const RoomForm: React.FC<RoomFormProps> = ({
  roomData,
  setRoomData,
  handleSubmit,
}) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const base64String = await fileToBase64(files[0]);

    setRoomData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        room_image: base64String,
      };
    });
  };

  return (
    <div className='room_form'>
      <h4 className='title'>客室編集</h4>

      <form className='room-form'>
        <div className='form-group'>
          <label htmlFor='room_number'>部屋番号</label>
          <input
            type='text'
            id='room_number'
            value={roomData?.room_number || ''}
            onChange={(e) =>
              setRoomData((prevData) => {
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
            value={roomData?.room_type || ''}
            onChange={(e) =>
              setRoomData((prevData) => {
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
            value={roomData?.price || 0}
            onChange={(e) =>
              setRoomData((prevData) => {
                if (prevData === null) return null;
                return {
                  ...prevData,
                  price: parseFloat(e.target.value),
                };
              })
            }
          />
        </div>

        <div className='form-group'>
          <label htmlFor='image'>画像</label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
          />
        </div>

        <button type='button' onClick={handleSubmit} className='btn'>
          更新
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
