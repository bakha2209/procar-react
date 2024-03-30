import { Car } from "./car";

export interface OrderItem {
  _id: string;
  item_quantity: number;
  item_price: number;
  item_discount: number;
  order_id: string;
  car_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  order_total_amount: number;
  order_status: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  /**from aggregation */
  order_items: OrderItem[];
  car_data: Car[];
}
