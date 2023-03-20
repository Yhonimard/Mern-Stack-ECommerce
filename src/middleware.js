const { NextRequest, NextResponse } = require("next/server");
import verifyAuth from "./utils/verifyAuth";

/**
 * @param {NextRequest} req
 */

const middlerware = async (req) => {
  const res = NextResponse.next();

  const token = req.cookies.get("token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (token && verifiedToken) {
    const userId = verifiedToken?.userId;
    res.cookies.set("userid", userId);
  }
  const isLogin = !!verifiedToken;

  if (req.nextUrl.pathname.startsWith("/auth") && isLogin) {
    return NextResponse.redirect(new URL("/cannot-access-this-page", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/cart") && !isLogin) {
    return NextResponse.redirect(new URL("/cannot-access-this-page", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/api/cart") && !isLogin) {
    return NextResponse.redirect(new URL("/cannot-access-this-page", req.url));
  }

  return res;
};

export default middlerware;
