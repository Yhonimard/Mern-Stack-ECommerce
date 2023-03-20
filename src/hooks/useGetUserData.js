import axios from "axios";
import { GetUserId } from "@/utils/getAuth";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const useGetUserData = () => {
  const uid = GetUserId();
  return useQuery({
    queryKey: ["user-data", uid],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${uid}`);
      return res.data;
    },
  });
};

export default useGetUserData;
