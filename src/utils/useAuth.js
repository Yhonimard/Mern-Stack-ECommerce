import { isAuth } from "@/redux/AuthState";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { getCookie, removeCookies } from "cookies-next";
import DataUserThunk from "@/redux/data-user-thunk";
const UseAuth = () => {
  const dispatch = useDispatch();

  const loginHandler = useCallback(
    (token, userId) => {
      dispatch(isAuth(!!token));
      dispatch(DataUserThunk(userId));
      console.log("running from useAuth login handler");
    },
    [dispatch]
  );
  useEffect(() => {
    const userId = getCookie("userid");
    const token = getCookie("token");
    console.log("running from useAuth useEffect");

    if (token) {
      loginHandler(token, userId);
      return;
    }
  }, [loginHandler]);
};
export default UseAuth;
