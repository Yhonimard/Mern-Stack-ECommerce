import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@/assets/Icon";
import useAddtoCartHanlder from "@/hooks/useAddToCartHandler";
import { useQueryClient } from "@tanstack/react-query";
import ToastComponent from "../UI/ToastComponent";

const CartComponent = ({ cartData }) => {
  const toast = ToastComponent();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries("cart-data", "user-data");
  };
  const onError = () => {
    toast({ title: "something went wrong pls try again", status: "error" });
  };

  const { mutate } = useAddtoCartHanlder({ onSuccess, onError });
  const { result } = cartData;

  const addQtyHandler = (id) => {
    const data = {
      productId: id,
      quantity: 1,
    };
    mutate(data);
  };

  return (
    <Container
      bgColor=""
      minH="110vh"
      display="flex"
      rowGap={5}
      flexDirection="column"
      alignItems="center"
      mt="3"
      maxW={[null, "container.sm", "container.lg"]}
    >
      <Flex h={200} alignItems="center">
        <Heading textAlign="center" mt="3">
          MY CART
        </Heading>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box
          w={`full`}
          minH={500}
          px={5}
          py={10}
          shadow="md"
          display="flex"
          flexWrap="wrap"
          rowGap={10}
          borderRadius="md"
          border="1px solid lightgray"
        >
          {result &&
            result?.cartList?.map((item) => (
              <Flex
                key={item.id}
                flexWrap="wrap"
                borderBottom="lightgray"
                borderBottomStyle="solid"
                h={130}
                w="full"
              >
                <Flex flexWrap="nowrap" direction="row" gap="2">
                  <Img
                    src="http://source.unsplash.com/300x300"
                    w={20}
                    h={20}
                    borderRadius="md"
                  />
                  <Stack direction="column">
                    <Heading size="sm" noOfLines={3} overflow="hidden">
                      {item?.product?.name}
                    </Heading>
                    <Stack spacing={2} direction="row" align="center">
                      <Text fontSize="sm">${item?.product?.price}</Text>
                      <Heading size="sm">${item?.price}</Heading>
                    </Stack>
                  </Stack>
                </Flex>
                <Stack
                  w="full"
                  mb={3}
                  spacing="4"
                  direction={"row"}
                  justifyContent="flex-end"
                >
                  <MinusIcon />
                  <span>{item.quantity}</span>
                  <PlusIcon onClick={() => addQtyHandler(item.product.id)} />
                </Stack>
              </Flex>
            ))}
        </Box>

        <Box
          h={300}
          w="full"
          border="1px solid lightgray"
          mb={200}
          px={8}
          py={2}
          display="flex"
          flexDir="column"
          justifyContent="space-around"
          borderRadius="md"
          shadow="md"
          maxW={{ md: "400px" }}
        >
          <Box>
            <Heading size="md" lineHeight="taller">
              shopping summary
            </Heading>
            <HStack align="center" justifyContent="space-between">
              <Text>total spending</Text>
              <Text>{result?.cartList?.length}</Text>
            </HStack>
            <HStack align="center" justifyContent="space-between">
              <Text>total discount</Text>
              <Text>0</Text>
            </HStack>
          </Box>

          <Divider border="1px solid gray" />

          <Flex flexDir="column" rowGap="5">
            <HStack align="center" justify="space-between">
              <Heading size="sm">Total Price</Heading>
              <Heading size="sm">${result?.totalPrice}</Heading>
            </HStack>
            <Button>buy now</Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
export default CartComponent;
