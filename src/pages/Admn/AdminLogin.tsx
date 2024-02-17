import React, { useState } from 'react';
import './AdminLogin.css';
import {
  CsrfTokenProvider,
  useCsrfToken,
} from '../../components/CsrfTokenProvider';
import { loginApi } from '../../services/api';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // ログイン成功時の処理
      const data = await loginApi(username, password);

      // ローカルストレージにトークンやユーザー情報を保存する
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 管理者ページへリダイレクト
      window.location.href = '/admin/dashboard';

      console.log('ログインに成功しました');
    } catch (error: any) {
      console.error('ログインエラー:', error.message);
      setError(
        'ログインに失敗しました。\nユーザー名とパスワードを確認してください。'
      );
    }
  };

  return (
    <div className='login-container'>
      <h2>管理者ログイン</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>ユーザー名:</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='password'>パスワード:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>ログイン</button>
      </form>
    </div>
  );
};

export default AdminLogin;
