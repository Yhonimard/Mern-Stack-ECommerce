import ToastComponent from "@/components/Notif/ToastComponent";
import { showToastHandler } from "@/redux/GlobalState";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
const { useSelector, useDispatch } = require("react-redux");

const UseToast = () => {
  const { show } = useSelector((state) => state.global.showToast);

  const Toast = ToastComponent();
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  useEffect(() => {
    dispatch(showToastHandler({ show: false }));
  }, [pathname, dispatch]);

  const showToast = useCallback(() => {
    Toast();
  }, [Toast]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(showToastHandler({ show: false }));
    }, 3000);

    if (show) {
      showToast();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showToast, show, dispatch]);
};

export default UseToast;
