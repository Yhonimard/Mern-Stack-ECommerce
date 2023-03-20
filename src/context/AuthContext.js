import { getCookie } from "cookies-next";
import { createContext, useState, useEffect, useCallback } from "react";

export const authCtx = createContext({
  isLogin: null,
});

const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState();

  const loginHandler = useCallback((token) => {
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      loginHandler(token);
      return;
    }
    setIsLogin(null);
  }, [loginHandler]);

  const value = {
    isLogin,
  };
  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
};

export default AuthContextProvider;
