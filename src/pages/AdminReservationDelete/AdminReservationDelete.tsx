import React, { useState, useEffect } from 'react';

interface Reservation {
  id: number;
  // 他の予約情報を追加
}

interface Params {
  id: string;
}

const ReservationDelete: React.FC = () => {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      console.error('Reservation ID not found in URL');
      return;
    }
    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservation');
        }
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    fetchReservation();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reservations/${reservation?.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      // リダイレクトなどの処理を追加
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>予約削除</h2>
      <p>以下の予約を削除しますか？</p>
      <p>予約ID: {reservation.id}</p>
      {/* 他の予約情報の表示 */}
      <button onClick={handleDelete}>削除する</button>
    </div>
  );
};

export default ReservationDelete;
