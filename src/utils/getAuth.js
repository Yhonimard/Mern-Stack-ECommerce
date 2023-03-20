import { getCookie } from "cookies-next";

export function GetToken() {
  const token = getCookie("token");
  return token;
}

export function GetUserId() {
  const uid = getCookie("userid");
  return uid;
}
