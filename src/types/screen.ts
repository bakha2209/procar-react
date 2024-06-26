import { BoArticle } from "./boArticle";
import { Car } from "./car";
import { Dealer, Member } from "./user";
import { Order } from "./order";
import { Follower, Following } from "./follow";
import {Event, Review} from "./others"

export interface AppRootState {
  homePage: HomePageState;
  dealerPage: DealerPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState
}

// HOMEPAGE
export interface HomePageState {
  topBrands: Car[];
  byCategories: Car[];
  bestDealers: Car[];
  bestBoArticles: BoArticle[];
  events: Event[]
}

// DEALER'S PAGE
export interface DealerPageState {
  targetDealers: Dealer[];
  chosenDealer: Dealer | null;
  targetCars: Car[];
  chosenCar: Car | null;
  memberReviews: Review[] | null
}
/**ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

/**COMMUNITY PAGE */
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
  recentArticles: BoArticle[]
}

/**MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
