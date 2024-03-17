import React, { useContext, useEffect, useState } from 'react';
import './AdminLogin.css';
import { loginApi } from '../../services/api';
import { AuthContext } from '../../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
      setError('');
      setShowSuccessMessage(true);
    } catch (error: any) {
      console.error('ログインエラー:', error.message);
      setError(
        'ログインに失敗しました。\nユーザー名とパスワードを確認してください。'
      );
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        history.push('/admin/dashboard');
      }, 3000);
    }
  }, [showSuccessMessage, history]);

  return (
    <div className='login-container'>
      <h2>管理者ログイン</h2>
      {error && <div className='error-message'>{error}</div>}
      {showSuccessMessage && (
        <div className='success-message'>
          <p>ログインに成功しました</p>
          <p>ページを遷移します。</p>
        </div>
      )}
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
        <button type='submit' className='btn-primary'>
          ログイン
        </button>
      </form>

      <p style={{ color: 'red' }}>ユーザー名、パスワードを公開します。</p>
      <p style={{ color: 'red' }}>自由に動作確認して大丈夫です。</p>
      <p style={{ color: 'red' }}>ユーザー名:admin, パスワード:password</p>
    </div>
  );
};

export default AdminLogin;
