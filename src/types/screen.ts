import { BoArticle } from "./boArticle";
import { Car } from "./car";
import { Dealer } from "./user";

export interface AppRootState {
    homePage: HomePageState;
    dealerPage: DealerPageState
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