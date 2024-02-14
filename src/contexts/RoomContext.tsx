import React, { createContext, useContext, useState } from 'react';
import { Room } from '../types/Room';

// RoomContext の型を定義
type RoomContextType = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

// createContext を使用して RoomContext を作成
const RoomContext = createContext<RoomContextType | null>(null);

// RoomContext を使用するための custom hook を定義
const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomContextProvider');
  }
  return context;
};

// RoomContextProvider コンポーネントを定義
const RoomContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

// RoomContextProviderをエクスポート
export { RoomContextProvider, useRoomContext };
