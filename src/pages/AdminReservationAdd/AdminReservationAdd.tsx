import React, { useState } from 'react';

const ReservationAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    // フォームの各フィールドの初期値を設定
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    // 他のフォームフィールドを追加
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add reservation');
      }
      // 成功時の処理
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>予約追加</h2>
      <form onSubmit={handleSubmit}>
        {/* フォームの各フィールドを入力 */}
        <div>
          <label>部屋番号:</label>
          <input
            type='text'
            name='roomNumber'
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </div>
        {/* 他のフォームフィールドを追加 */}
        <button type='submit'>予約追加</button>
      </form>
    </div>
  );
};

export default ReservationAdd;
