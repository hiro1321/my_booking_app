import { API_URL } from '../config';
import { Room } from '../types/Room';

/**
 * ログインAPIを実行
 */
export const loginApi = async (username: string, password: string) => {
  return await executeApi('/admin/login', 'POST', {
    username,
    password,
  });
};

/**
 * 認証tokenの照合APIを実行
 */
export const verifyTokenApi = async (tokenValue: string) => {
  const bodyContent = { token: tokenValue };
  return await executeApi('/admin/verify-token', 'POST', bodyContent);
};

/**
 * ログアウトAPIを実行
 */
export const logoutApi = async (username: string, token: string) => {
  const bodyContent = {
    username: username,
    token: token,
  };
  return await executeApi('/admin/logout', 'POST', bodyContent);
};

/**
 * 部屋情報のリストをAPIで取得
 *
 * @returns 部屋データの配列
 * @throws 部屋情報が取得できない場合
 */
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const rooms: Room[] = await executeApi('/rooms', 'GET', null);
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
    const roomData: Room = await executeApi(`/rooms/${roomId}`, 'GET', null);
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
    const roomData: Room = await executeApi(
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
    const AvailabilityCnt: number = await executeApi(
      `/reservations/availability-cnt/${dateStr}/`,
      'GET',
      null
    );
    // return AvailabilityCnt as number;
    return 1;
  } catch (error) {
    throw new Error('予約情報の取得に失敗');
  }
};

/**
 * REST APIを実行する
 *
 * @param pathParameter URIのパスパラメータ
 * @param exeMethod　　　 メソッド(GET/POST etc.)
 * @param exeBody  　　　リクエストボディ
 * @returns　respons
 */
export const executeApi = async (
  pathParameter: string,
  exeMethod: string,
  exeBody: any
) => {
  //  csrfトークンを取得
  try {
    const csrfToken = await fetchCsrfToken();
    if (!csrfToken) {
      console.error('CSRFトークンを取得できませんでした');
      throw new Error();
    }

    // API呼び出し
    let response: Response = new Response();
    if (exeMethod == 'GET') {
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

    if (!response.ok) {
      throw new Error();
    }

    console.log(response.json);
    return await response.json();
  } catch (error) {
    throw new Error('API呼出しに失敗');
  }
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
