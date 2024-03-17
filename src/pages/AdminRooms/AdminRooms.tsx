import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRooms } from '../../services/api';
import { Room } from '../../types/Room';
import './AdminRooms.css';

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const roomData = await fetchRooms();
        setRooms(roomData);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchRoomsData();
  }, []);

  return (
    <div className='container'>
      <h4 className='title'>客室管理</h4>
      <Link to='/admin/rooms/add' className='link'>
        <button className='btn'>客室追加</button>
      </Link>
      <div className='grid mt-30'>
        {rooms.map((room) => (
          <div key={room.id} className='room-card'>
            <Link to={`/admin/rooms/edit/${room.id}`} className='link'>
              <div>
                <h6>{room.room_number}</h6>
                <p>{room.room_type}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
