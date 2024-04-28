export interface MeLiked {
    mb_id: string
    like_ref_id: string
    my_favorite: boolean
}

export interface Car {
    _id: string;
    car_name: string;
    car_brand: string;
    car_model: string;
    car_engine_type: string;
    car_type: string;
    car_color: string;
    car_transmission: string;
    petrol_consumption: number;
    acceleration: number;
    produced_year:number;
    car_status: string;
    car_price: number;
    car_discount: number;
    car_left_cnt: number;
    car_description: string;
    car_images: string[];
    car_likes: number;
    car_views: number;
    dealer_mb_id: string;
    car_rating?:number;
    car_reviews?:string[];
    createdAt: Date;
    updatedAt: Date;
    me_liked: MeLiked[]; 
  }