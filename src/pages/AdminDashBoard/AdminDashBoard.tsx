import React from 'react';
import './AdminDashBoard.css';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className='pt-20'>
      <h4 className='nb-10'>Dashboard</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/reservations' className='link-style'>
            <div className='card'>
              <h6 className='header-style'>予約管理</h6>
              <p className='description-text'>
                予約の一覧や詳細を管理します。受付時に帳票を出力します。
              </p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/rooms' className='link-style'>
            <div className='card'>
              <h6 className='nb-10'>客室管理</h6>
              <p className='description-text'>客室の追加や編集を行います。</p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1' }}>{}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
