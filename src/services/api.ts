import { API_URL } from '../config';
import { Room } from '../types/Room';

/**
 * 部屋情報のリストをAPIで取得
 * @returns 部屋データの配列
 * @throws 部屋情報が取得できない場合
 */
export const fetchRoomss = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    const roomData: Room[] = await response.json();
    return roomData;
  } catch (error) {
    console.error('部屋情報を取得できませんでした:', error);
    throw new Error('Failed to fetch rooms');
  }
};

/**
 * 部屋情報のリストをAPIで取得
 * @returns 部屋データの配列
 * @throws 部屋情報が取得できない場合
 */
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const roomData: Room[] = await executeApi('/rooms', 'GET', null);
    return roomData;
  } catch (error) {
    console.error('部屋情報を取得できませんでした:', error);
    throw new Error();
  }
};

/**
 * 指定されたIDの部屋の情報を取得する関数。
 * @param roomId 取得したい部屋のID
 * @returns 取得した部屋の情報。取得に失敗した場合はnullを返す。
 */
export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  try {
    console.log('debug-----------------------------------');
    console.log(roomId);
    const response = await fetch(`${API_URL}/rooms/${roomId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch room');
    }
    const roomData = await response.json();
    console.log('debug-----------------------------------');
    console.log(roomData);
    return roomData as Room; // レスポンスから部屋の情報を取得し、Room型にキャストして返す
  } catch (error) {
    console.error('Failed to fetch room:', error);
    return null;
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
  const csrfResponse = await fetch(`${API_URL}/csrf-token`);
  const { csrfToken } = await csrfResponse.json();

  try {
    const response = await fetch(`${API_URL}/rooms/${roomId}/`, {
      method: 'PUT',
      credentials: 'include', // CORS認証で必須
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(updatedRoom),
    });

    if (!response.ok) {
      throw new Error('Failed to update room');
    }

    const updatedRoomData: Room = await response.json();
    return updatedRoomData;
  } catch (error) {
    console.error('部屋情報を更新できませんでした:', error);
    throw new Error('Failed to update room');
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
const executeApi = async (
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
    if ((exeMethod = 'GET')) {
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
