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
}
