import { Member } from "./user"

export interface MemberLiken {
  like_group: string
  like_status: number
  like_ref_id: string
}

export interface CarSearchObj {
  page: number
  limit: number
  order: string
  dealer_mb_id?: string
  car_brand?: string
  car_type?: string
  car_engine_type?: string
  car_color?: string
  car_transmission?: string
  produced_year?: number | undefined
  car_price?: number | undefined
}

export interface SearchObj {
  page: number
  limit: number
  order: string
}
export interface CartItem {
  _id: string
  quantity: number
  brand: string
  name: string
  produced_year: number
  discount: number
  price: number
  image: string
}

export interface ChatMessage {
  msg: string
  mb_id: string
  mb_nick: string
  mb_image: string
}

export interface ChatGreetMsg {
  text: string
}

export interface ChatInfoMsg {
  total: number
}
export interface Caren {
  image: string
  model: string
}
export interface VehicleType {
  name: string
  image: string
}

export interface Event {
  event_name: string
  event_date: string
  event_content: string
  event_address: string
  event_image: string
  member_data: Member
}

export interface Review {
  review_ref_id: string
  review_group: string
  review_content: string
  rating:number
  createdAt:Date
  member_data: Member
}

export interface SearchReviews {
  limit:number
  page:number
  review_ref_id:string | null
  group_type: string
  order:string
}
