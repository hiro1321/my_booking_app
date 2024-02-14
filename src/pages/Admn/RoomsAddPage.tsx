import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    padding: '24px',
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '24px',
  },
  addButton: {
    marginBottom: '24px',
    padding: '12px 24px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '4px',
    textDecoration: 'none',
  },
};

const RoomsAddPage: React.FC = () => {
  return (
    <div style={styles.root}>
      <h4 style={styles.title}>客室追加</h4>
      <Link to='/admin/rooms' style={{ textDecoration: 'none' }}>
        <button style={styles.addButton}>戻る</button>
      </Link>
      {/* 追加フォームのコンポーネントをここに追加 */}
    </div>
  );
};

export default RoomsAddPage;
