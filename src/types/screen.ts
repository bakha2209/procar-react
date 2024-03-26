import { BoArticle } from "./boArticle";
import { Car } from "./car";
import { Dealer } from "./user";
import { Order } from "./order";

export interface AppRootState {
    homePage: HomePageState;
    dealerPage: DealerPageState;
    ordersPage: OrdersPageState
}

// HOMEPAGE
export interface HomePageState{
    topBrands: Car[]
    byCategories: Car[]
    bestDealers: Car[]
    bestBoArticles: BoArticle[]
    
}

// DEALER'S PAGE
export interface DealerPageState {
    targetDealers: Dealer[],
    chosenDealer: Dealer | null,
    targetCars: Car[],
    chosenCar: Car | null
}
/**ORDERS PAGE */
export interface OrdersPageState {
    pausedOrders: Order[],
    processOrders: Order[],
    finishedOrders: Order[]
  }