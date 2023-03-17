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
import { PlusIcon, MinusIcon } from "@/assets/Icon";

const CartComponent = ({ cartData }) => {
  console.log(cartData);

  const { result, totalPrice } = cartData;

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
                      title title title titleti tititi tletletl etletitle asddsa
                      d asdas das dasd as title title title titleti tititi
                      tletletl etletitle
                    </Heading>
                    <Stack spacing={2} direction="row" align="center">
                      <Text fontSize="sm">$50</Text>
                      <Heading size="sm">$100</Heading>
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
                  <span>12</span>
                  <PlusIcon />
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
              <Text>0</Text>
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
              <Heading size="sm">${totalPrice}</Heading>
            </HStack>
            <Button>buy now</Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
export default CartComponent;
