import { GetUserId } from "@/utils/getAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useAddtoCartHanlder({ onSuccess, onError }) {
  const userId = GetUserId();

  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: (data) => axios.post(`/api/cart/add/${userId}`, data),
    onSuccess,
    onError,
  });
}
