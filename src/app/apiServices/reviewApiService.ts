import axios from "axios";
import { serverApi } from "../lib/config";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { Review, SearchReviews } from "../../types/others";


class ReviewApiService {
    private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async getMemberReviews(data: SearchReviews) {
    try {
      let url = `/member/reviews`;
      

      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state", result.data.state);

      const reviews: Review[] = result.data.data;
      return reviews;
    } catch (err: any) {
      console.log(`ERROR ::: getMemberReviews ${err.message}`);
      throw err;
    }
  }

  public async createReview(data: any) {
    try {
      const result = await axios.post(this.path + "/member-review", data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const comment: Review = result.data.data;
      return comment;
    } catch (err: any) {
      console.log(`ERROR::: getChosenComment ,${err.message}`);
      throw err;
    }
  }
}

export default ReviewApiService