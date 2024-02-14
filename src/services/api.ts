import { Room } from '../types/Room';

/**
 * 部屋情報のリストをAPIで取得
 * @returns 部屋データの配列
 * @throws 部屋情報が取得できない場合
 */
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch('http://localhost:8000/api/rooms');
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
 * 指定されたIDの部屋の情報を取得する関数。
 * @param roomId 取得したい部屋のID
 * @returns 取得した部屋の情報。取得に失敗した場合はnullを返す。
 */
export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  try {
    // 実際のAPIエンドポイントにリクエストを送信し、部屋の情報を取得する
    const response = await fetch(`http://example.com/api/rooms/${roomId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch room');
    }
    const roomData = await response.json();
    return roomData as Room; // レスポンスから部屋の情報を取得し、Room型にキャストして返す
  } catch (error) {
    console.error('Failed to fetch room:', error);
    return null;
  }
};
