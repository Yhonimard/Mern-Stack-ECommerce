import axios from "axios";
import { isUserdata } from "./AuthState";
export default function DataUserThunk(userId) {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/user/${userId}`).catch((err) => {
      const errorMsg = err.response.data.message;
      throw errorMsg || "something went wrong, pls try again";
    });

    dispatch(isUserdata(data.result));
  };
}
