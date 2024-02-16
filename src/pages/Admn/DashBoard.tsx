import React from 'react';
import { Link } from 'react-router-dom';

const cardContainerStyle = {
  paddingTop: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  padding: '20px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#000',
};

const headerStyle = {
  marginBottom: '10px',
};

const descriptionStyle = {
  color: '#666',
};

const DashboardPage: React.FC = () => {
  return (
    <div style={cardContainerStyle}>
      <h4 style={headerStyle}>Dashboard</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/reservations' style={linkStyle}>
            <div style={cardStyle}>
              <h6 style={headerStyle}>予約管理</h6>
              <p style={descriptionStyle}>予約の一覧や詳細を管理します。</p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Link to='/admin/rooms' style={linkStyle}>
            <div style={cardStyle}>
              <h6 style={headerStyle}>客室管理</h6>
              <p style={descriptionStyle}>客室の追加や編集を行います。</p>
            </div>
          </Link>
        </div>
        <div style={{ flex: '1' }}>
          <Link to='/admin/users' style={linkStyle}>
            <div style={cardStyle}>
              <h6 style={headerStyle}>ユーザー管理</h6>
              <p style={descriptionStyle}>
                ユーザーアカウントの管理を行います。
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
