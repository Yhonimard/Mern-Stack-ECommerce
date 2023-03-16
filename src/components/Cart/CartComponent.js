import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";

const CartComponent = ({ cartData }) => {
  console.log(cartData);
  return (
    <Container
      bgColor=""
      minH="110vh"
      display="flex"
      rowGap={5}
      flexDirection="column"
      alignItems="center"
      mt="3"
    >
      <Flex h={100} alignItems="center">
        <Heading textAlign="center">CART</Heading>
      </Flex>
      <Box bgColor="tomato" w={`full`} minH={450} px={5} py={10}>
        <Flex
          flexWrap="wrap"
          borderBottom="lightgray"
          borderBottomStyle="solid"
        >
          <Flex flexWrap="nowrap" direction="row" gap="2">
            <Img src="http://source.unsplash.com/300x300" w={20} h={20} />
            <Flex direction="column">
              <Heading size="sm" noOfLines={3} overflow="hidden">
                title title title titleti tititi tletletl etletitle asddsa d
                asdas das dasd as title title title titleti tititi tletletl
                etletitle
              </Heading>
              <Flex align="center" gap="2">
                <Text>$50</Text>
                <Heading size="sm">$100</Heading>
              </Flex>
            </Flex>
          </Flex>
          <Flex alignSelf="flex-end"> test</Flex>
        </Flex>
      </Box>
      <Box>buying cart</Box>
    </Container>
  );
};
export default CartComponent;
