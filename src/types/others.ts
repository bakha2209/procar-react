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
    car_transmission?:string
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