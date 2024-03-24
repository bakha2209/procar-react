import axios from "axios";
import assert from "assert";

import { Definer } from "../lib/Definer";
import { serverApi } from "../lib/config";
import { Dealer } from "../../types/user";
import { SearchObj } from "../../types/others";

class DealerApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getDealers(data: SearchObj): Promise<Dealer[]> {
    try {
      const url = `/dealers?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state", result.data.state);

      const dealers: Dealer[] = result.data.data;
      return dealers;
    } catch (err: any) {
      console.log(`ERROR ::: getDealers ${err.message}`);
      throw err;
    }
  }

  async getChosenDealer(id: string) {
    try {
      const url = `/dealer/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state", result.data.state);
      
      const dealer: Dealer = result.data.data;
      return dealer;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenDealer ${err.message}`);
      throw err;
    }
  }
}
export default DealerApiService;
