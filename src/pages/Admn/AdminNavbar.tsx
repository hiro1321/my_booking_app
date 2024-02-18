import React from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import { logoutApi } from '../../services/api';

const AdminNavbar: React.FC = () => {
  const handleLogout = async () => {
    // ローカルリポジトリからユーザー名を取得
    const token = localStorage.getItem('token') || '';
    const user = JSON.parse(localStorage.getItem('user') || '');
    console.log(token);
    if (!user) {
      return;
    }
    await logoutApi(user.username, token);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  return (
    <>
      <h2>管理者ページ</h2>
      <div className='admin-nav-bar'>
        <Link to='/admin/dashboard' className='nav-link'>
          Dashboard
        </Link>
        <Link to='/admin/reservations' className='nav-link'>
          予約管理
        </Link>
        <Link to='/admin/rooms' className='nav-link'>
          客室管理
        </Link>
        <Link to='/admin/users' className='nav-link'>
          ユーザー管理
        </Link>
        <a className='nav-link' onClick={handleLogout}>
          ログアウト
        </a>
      </div>
    </>
  );
};

export default AdminNavbar;
