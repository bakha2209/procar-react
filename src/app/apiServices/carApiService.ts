import axios from "axios";
import assert from "assert";

import { Definer } from "../lib/Definer";
import { serverApi } from "../lib/config";
import { Dealer } from "../../types/user";
import { CarSearchObj } from "../../types/others";
import { Car } from "../../types/car";

class CarApiService {
    private readonly path: string;

      constructor() {
        this.path=serverApi
    }

    async getTargetCars(data: CarSearchObj): Promise<Car[]> {
        try {
          const url = "/cars",
            result = await axios.post(this.path + url, data, {
              withCredentials: true,
            });
          
    
          assert.ok(result?.data, Definer.general_err1);
          assert.ok(result?.data?.state != "fail", result?.data?.message);
          console.log("state", result.data.state);
         
          const cars: Car[] = result.data.data;
          return cars;
        } catch (err: any) {
          console.log(`ERROR ::: getTargetCars ${err.message}`);
          throw err;
        }
      }

      async getChosenCar(car_id: string) {
        try {
          const url = `/cars/${car_id}`,
            result = await axios.get(this.path + url, {
              withCredentials: true,
            });
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            console.log("state:", result.data.state)
    
          console.log("state", result.data.state);
          const car: Car = result.data.data;
          return car;
        } catch (err: any) {
          console.log(`ERROR ::: getChosenCar ${err.message}`);
          throw err;
        }
      }
}

export default CarApiService;