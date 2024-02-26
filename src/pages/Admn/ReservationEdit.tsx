import React, { useEffect, useState } from 'react';

interface Reservation {
  id: number;
  // 他の予約情報を追加
}

interface Params {
  id: string;
}

const ReservationEdit: React.FC = () => {
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

  if (!reservation) {
    return <div>Loading...</div>;
  }

  // 予約の編集フォームを表示するためのコードを追加

  return (
    <div>
      <h2>予約編集</h2>
      <p>予約ID: {reservation.id}</p>
      {/* 他の編集フォームの要素を追加 */}
    </div>
  );
};

export default ReservationEdit;
