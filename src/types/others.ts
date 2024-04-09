export interface MemberLiken {
    like_group: string,
    like_status: number,
    like_ref_id: string
  }

  export interface CarSearchObj {
    page: number;
    limit: number;
    order: string;
    dealer_mb_id?: string;
    car_brand?: string;
    car_type?: string;
    car_engine_type?:string;
    car_color?:string;
    car_transmission?:string;
    produced_year?:number | undefined;
    car_price?:number | undefined
  } 

  export interface SearchObj {
    page: number;
    limit: number;
    order: string;
  }
  export interface CartItem {
    _id: string,
    quantity: number,
    brand: string,
    name: string,
    produced_year:number,
    discount:number,
    price: number,
    image: string,
  }

  export interface ChatMessage {
    msg: string;
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