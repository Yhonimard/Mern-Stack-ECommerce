import { Box, Container, Flex, Heading } from "@chakra-ui/react";

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
      <Heading flexGrow={0.5} textAlign="center">
        CART
      </Heading>
      <Box flexGrow={2} bgColor="tomato" w={`full`}>
        testingbox
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
        <div>testing</div>
      </Box>
      <Box flexGrow={1.5}>buying cart</Box>
    </Container>
  );
};
export default CartComponent;
