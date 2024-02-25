import { API_URL } from '../config';
import { ReservationData } from '../types/ReservationData';
import { Room } from '../types/Room';

/**
 * ログインAPIを実行
 */
export const loginApi = async (username: string, password: string) => {
  return await executeApiThrowOnError('/admin/login', 'POST', {
    username,
    password,
  });
};

/**
 * 認証tokenの照合APIを実行
 */
export const verifyTokenApi = async (tokenValue: string) => {
  const bodyContent = { token: tokenValue };
  return await executeApiThrowOnError(
    '/admin/verify-token',
    'POST',
    bodyContent
  );
};

/**
 * ログアウトAPIを実行
 */
export const logoutApi = async (username: string, token: string) => {
  const bodyContent = {
    username: username,
    token: token,
  };
  return await executeApiThrowOnError('/admin/logout', 'POST', bodyContent);
};

/**
 * 部屋情報のリストをAPIで取得
 *
 * @returns 部屋データの配列
 * @throws 部屋情報が取得できない場合
 */
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const rooms: Room[] = await executeApiThrowOnError('/rooms', 'GET', null);
    return rooms;
  } catch (error) {
    throw new Error('部屋情報の一覧を取得できませんでした');
  }
};

/**
 * 指定されたIDの部屋の情報を取得する関数
 *
 * @param roomId 取得したい部屋のID
 * @returns 取得した部屋の情報。取得に失敗した場合はnullを返す。
 */
export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  try {
    const roomData: Room = await executeApiThrowOnError(
      `/rooms/${roomId}`,
      'GET',
      null
    );
    return roomData as Room;
  } catch (error) {
    throw new Error('部屋情報を取得できませんでした');
  }
};

/**
 * 部屋情報を更新する関数。
 * @param roomId 更新する部屋のID
 * @param updatedRoom 更新される部屋情報の一部
 * @returns 更新された部屋情報
 * @throws 更新に失敗した場合はエラーをスロー
 */
export const updateRoom = async (
  roomId: string,
  updatedRoom: Partial<Room>
): Promise<Room> => {
  try {
    const roomData: Room = await executeApiThrowOnError(
      `/rooms/${roomId}/`,
      'PUT',
      updatedRoom
    );
    return roomData as Room;
  } catch (error) {
    throw new Error('部屋情報の更新に失敗');
  }
};

/**
 * 対象日付の空き部屋数取得のAPIを実行
 * @param dateStr 'YYYYMMDD'形式の日付の文字列
 * @returns 更新された部屋情報
 * @throws 更新に失敗した場合はエラーをスロー
 */
export const getRoomAvailabilityApi = async (
  dateStr: string
): Promise<number> => {
  try {
    const AvailabilityCnt = await executeApiThrowOnError(
      `/reservations/availability-cnt/${dateStr}/`,
      'GET',
      null
    );
    return AvailabilityCnt.result;
  } catch (error) {
    throw new Error('予約情報の取得に失敗');
  }
};

/**
 * 予約登録のAPIを実行
 * @param reservationData
 * @throws 登録に失敗した場合はエラーをスロー
 */
export const submitReservationApi = async (
  reservationData: ReservationData
): Promise<string> => {
  let result;
  try {
    result = await executeApiThrowOnError(
      `/reservations/submit`,
      'POST',
      reservationData
    );
  } catch (error: any) {}

  return result;
};

/**
 * REST APIを実行し、エラーが発生した場合に例外を投げる
 *
 * @param pathParameter URIのパスパラメータ
 * @param exeMethod メソッド(GET/POST etc.)
 * @param exeBody リクエストボディ
 * @returns レスポンスのJSONデータ
 * @throws エラーが発生した場合
 */
export const executeApiThrowOnError = async (
  pathParameter: string,
  exeMethod: string,
  exeBody: any
) => {
  const response = await executeApiHandleResponse(
    pathParameter,
    exeMethod,
    exeBody
  );
  if (!response.ok) {
    throw new Error('API呼出しに失敗');
  }

  return await response.json();
};

/**
 * REST APIを実行し、response.okのハンドリングを呼び元に委ねる
 *
 * @param pathParameter URIのパスパラメータ
 * @param exeMethod メソッド(GET/POST etc.)
 * @param exeBody リクエストボディ
 * @returns レスポンス
 */
export const executeApiHandleResponse = async (
  pathParameter: string,
  exeMethod: string,
  exeBody: any
) => {
  // CSRFトークンを取得
  const csrfToken = await fetchCsrfToken();
  if (!csrfToken) {
    throw new Error('CSRFトークンを取得できませんでした');
  }

  // API呼び出し
  let response: Response;
  if (exeMethod === 'GET') {
    response = await fetch(API_URL + pathParameter);
  } else {
    response = await fetch(API_URL + pathParameter, {
      method: exeMethod,
      credentials: 'include', // CORS認証で必須
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(exeBody),
    });
  }

  return response;
};

/**
 * csrfトークンを取得し、クッキーに設定する
 *
 * @returns csrfToken
 */
const fetchCsrfToken = async (): Promise<string | undefined> => {
  // トークンを取得
  const response = await fetch(`${API_URL}/csrf-token`);
  if (!response.ok) {
    throw new Error('CSRFトークンを取得できませんでした');
  }
  const data = await response.json();

  // クッキーの設定
  const date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie =
    'csrftoken' + '=' + data.csrfToken + ';' + expires + ';path=/';

  return data.csrfToken;
};
