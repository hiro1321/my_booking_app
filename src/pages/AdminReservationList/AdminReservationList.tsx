import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteReservationApi,
  getRecepitionFileApi,
  getReservationListApi,
  updateReservationPaidApi,
} from '../../services/api';
import { Reservation } from '../../types/Reservation';
import { formatDatetime } from '../../services/utils';
import './AdminReservationList.css';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchRoomNumber, setSearchRoomNumber] = useState<string>('');
  const [searchCheckIn, setSearchCheckIn] = useState<string>('');
  const [searchCheckOut, setSearchCheckOut] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [isPaidOnly, setIsPaidOnly] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationList = await getReservationListApi();
        if (reservationList) {
          setReservations(reservationList);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchReservations();
  }, []);

  const handleReception = async (reservationId: string) => {
    // TODO:受付取消の処理も実装する
    const isConfirmed = window.confirm(
      '受付します。料金を支払済であることを確認してください。'
    );
    if (isConfirmed) {
      // is_paidを更新
      await updateReservationPaidApi(reservationId, true);

      // 受付帳票を取得
      const response = await getRecepitionFileApi(reservationId);
      // BlobからURLを生成
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      // ダウンロードリンクを生成・クリックしてダウンロード開始
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reception-template.xlsx';
      document.body.appendChild(a);
      a.click();
      // 不要になった要素を削除
      window.URL.revokeObjectURL(url);

      window.confirm('受付票を出力しました。お客様へお渡しください');
      // 更新後の予約情報を再表示
      const updatedReservations = await getReservationListApi();
      updatedReservations && setReservations(updatedReservations);
    }
  };

  const handleCancel = async (reservationId: string) => {
    const isConfirmed = window.confirm(
      '受付を取り消します、よろしいでしょうか？'
    );
    if (isConfirmed) {
      // is_paidを更新
      await updateReservationPaidApi(reservationId, false);

      // 更新後の予約情報を再表示
      const updatedReservations = await getReservationListApi();
      updatedReservations && setReservations(updatedReservations);
    }
  };

  const handleDelete = async (reservationId: string) => {
    const isConfirmed = window.confirm('この予約を削除してもよろしいですか？');
    if (isConfirmed) {
      console.log('削除処理を実行します。');
      await deleteReservationApi(reservationId);
      // 予約を削除した後、再度予約一覧を取得して更新する
      const updatedReservations = await getReservationListApi();
      updatedReservations && setReservations(updatedReservations);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPaidOnly(event.target.checked);
  };

  // 検索ウィンドウで指定した文字でフィルター
  const filteredReservations = reservations.filter((reservation) => {
    if (
      searchRoomNumber !== '' &&
      !reservation.room_number.includes(searchRoomNumber)
    ) {
      return false;
    }

    if (
      searchCheckIn !== '' &&
      !reservation.start_datetime.includes(searchCheckIn)
    ) {
      return false;
    }
    if (
      searchCheckOut !== '' &&
      !reservation.end_datetime.includes(searchCheckOut)
    ) {
      return false;
    }
    if (searchName !== '' && !reservation.customer_name.includes(searchName)) {
      return false;
    }
    if (isPaidOnly && reservation.is_paid) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <div className='reservation-title'>
        <h2>予約一覧</h2>
        <Link to='/admin/reservations/add' className='btn mr-50'>
          予約追加
        </Link>
        <div>
          <button
            className='search-btn'
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? '検索ウィンドウを閉じる▼' : '検索ウィンドウを開く▼'}
          </button>
        </div>
      </div>
      <div
        className={
          showSearch
            ? 'search-window center-container'
            : 'search-window novisible'
        }
      >
        <table className='form-table' style={{ width: '600px' }}>
          <tbody>
            <tr>
              <th>部屋番号</th>
              <td>
                <input
                  type='text'
                  placeholder='部屋番号で検索'
                  value={searchRoomNumber}
                  onChange={(e) => setSearchRoomNumber(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>予約開始日</th>
              <td>
                <input
                  type='date'
                  placeholder='予約開始日で検索'
                  value={searchCheckIn}
                  onChange={(e) => setSearchCheckIn(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>予約終了日</th>
              <td>
                <input
                  type='date'
                  placeholder='予約終了日で検索'
                  value={searchCheckOut}
                  onChange={(e) => setSearchCheckOut(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>名前</th>
              <td>
                <input
                  type='text'
                  placeholder='名前で検索'
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>未受付の予約のみ表示</th>
              <td>
                <input
                  style={{ textAlign: 'left' }}
                  type='checkbox'
                  id='isPaidOnlyCheckbox'
                  checked={isPaidOnly}
                  onChange={(e) => setIsPaidOnly(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className='reservation-table'>
        <thead>
          <tr>
            <th>部屋番号</th>
            <th>予約開始日</th>
            <th>予約終了日</th>
            <th>お客様名</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.room_number}</td>
              <td>{formatDatetime(reservation.start_datetime)}</td>
              <td>{formatDatetime(reservation.end_datetime)}</td>
              <td>{reservation.customer_name}</td>
              <td>
                <a
                  className='btn wi-80'
                  onClick={() =>
                    reservation.is_paid
                      ? handleCancel(reservation.id)
                      : handleReception(reservation.id)
                  }
                >
                  {reservation.is_paid ? '受付取消' : '受付'}
                </a>
                <Link
                  className='btn wi-50'
                  to={`/admin/reservations/edit/${reservation.id}`}
                >
                  編集
                </Link>{' '}
                <a
                  className='btn wi-50'
                  onClick={() => handleDelete(reservation.id)}
                >
                  削除
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
