import axios from "axios";
import { serverApi } from "../lib/config";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { SearchObj } from "../../types/others";
import { Event } from "../../types/others";

class EventApiService {
    private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  async getEvents(data: SearchObj)  {
    try {
      const url = "/events",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state", result.data.state);
     
      const events: Event[] = result.data.data;
      return events;
    } catch (err: any) {
      console.log(`ERROR ::: getEvents ${err.message}`);
      throw err;
    }
  }
}

export default EventApiService;