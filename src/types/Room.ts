export interface Room {
  id: number;
  room_number: string;
  room_type: string;
  room_image: string | null;
  price: number;
}

export interface RoomFormProps {
  roomData: Room | null;
  setRoomData: React.Dispatch<React.SetStateAction<Room | null>>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}
