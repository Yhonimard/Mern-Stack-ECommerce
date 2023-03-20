import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCartData = (id, data) => {
  return useQuery({
    queryKey: ["cart-data", id],
    queryFn: async () => {
      const res = await axios.get(`/api/cart/get/${id}`);
      return res.data;
    },
    initialData: data,
  });
};
export default useGetCartData;
