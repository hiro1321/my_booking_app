import React from 'react';
import { Link } from 'react-router-dom';

const cardContainerStyle = {
  paddingTop: '20px',
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
};

const linkStyle = {
  textDecoration: 'none',
};

const DashboardPage: React.FC = () => {
  return (
    <div style={cardContainerStyle}>
      <h4>Dashboard</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/reservations' style={linkStyle}>
            <div style={cardStyle}>
              <h6>予約管理</h6>
              <p>予約の一覧や詳細を管理します。</p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/rooms' style={linkStyle}>
            <div style={cardStyle}>
              <h6>客室管理</h6>
              <p>客室の追加や編集を行います。</p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1' }}>
          <Link to='/admin/users' style={linkStyle}>
            <div style={cardStyle}>
              <h6>ユーザー管理</h6>
              <p>ユーザーアカウントの管理を行います。</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
