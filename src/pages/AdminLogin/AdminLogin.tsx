import React, { useContext, useState } from 'react';
import './AdminLogin.css';
import { loginApi } from '../../services/api';
import { AuthContext } from '../../contexts/AuthProvider';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginApi(username, password);

      // ローカルストレージにトークンやユーザー情報を保存する
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      login();
      setIsLoggedIn(true);

      // 管理者ページへリダイレクト

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
