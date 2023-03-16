import { useToast } from "@chakra-ui/react";

const ToastComponent = () => {
  const toast = useToast({
    position: "top",
    isClosable: true,
    duration: 3000,
  });
  return toast;
};

export default ToastComponent;
