import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ToastComponent = () => {
  const { title, status } = useSelector((state) => state.global.showToast);

  const toast = useToast({
    position: "top",
    title,
    status,
    duration: 3000,
    isClosable: true,
  });

  return toast;
};

export default ToastComponent;
