import React from 'react';
import './AdminNavbar.css';
import { Link, useHistory } from 'react-router-dom';
import { logoutApi } from '../../services/api';

const AdminNavbar: React.FC = () => {
  const history = useHistory();
  const handleLogout = async () => {
    // ローカルリポジトリからユーザー名を取得
    const token = localStorage.getItem('token') || '';
    const user = localStorage.getItem('user');
    if (!user) {
      history.push('/admin/login/');
      return;
    }
    const username = JSON.parse(user).username;
    await logoutApi(username, token);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/admin/login/');
  };
  return (
    <>
      <h2>管理者ページ</h2>
      <div className='admin-nav-bar'>
        <Link to='/admin/dashboard' className='nav-link'>
          ダッシュボード
        </Link>
        <Link to='/admin/reservations' className='nav-link'>
          予約管理
        </Link>
        <Link to='/admin/rooms' className='nav-link'>
          客室管理
        </Link>
        <button className='nav-link' onClick={handleLogout}>
          ログアウト
        </button>
      </div>
    </>
  );
};

export default AdminNavbar;
