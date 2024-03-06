import React from 'react';

/**
 * 予約情報のインタフェース　サーバー -> 画面
 */
export interface Reservation {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  room_id: string;
  room_number: string;
  room_type: string;
  room_price: string;
  room_availability: string;
  start_datetime: string;
  end_datetime: string;
  payment_info: string;
  is_paid: boolean;
}

/**
 * 予約情報のインタフェース 画面 -> サーバー
 */
export interface ReservationInputData {
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

/**
 * Reservation componentsへのprops
 */
export interface ReservationFormProps extends ReservationInputData {
  setRoomNumber: React.Dispatch<React.SetStateAction<string>>;
  setCheckInDate: React.Dispatch<React.SetStateAction<string>>;
  setCheckOutDate: React.Dispatch<React.SetStateAction<string>>;
  setCheckInTime: React.Dispatch<React.SetStateAction<string>>;
  setCheckOutTime: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: Boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
