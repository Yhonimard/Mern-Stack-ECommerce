import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";

const ProductHeader = () => {
  return (
    <Flex h={["50vh", null, "70vh"]} direction="column">
      <Heading m="auto">explore product</Heading>

      <Divider bgColor="lightgray" />
      <Box py={2} overflowX={["scroll", "auto"]}>
        <Flex
          justify="center"
          align="center"
          w={["fit-content", "auto"]}
          columnGap="10px"
          px={3}
        >
          <Button variant="ghost" size={["sm", "md"]}>
            men cloth
          </Button>
          <Button variant="ghost" size={["sm", "md"]}>
            woman cloth
          </Button>
          <Button variant="ghost" size={["sm", "md"]}>
            food
          </Button>
          <Button variant="ghost" size={["sm", "md"]}>
            jewelry
          </Button>
        </Flex>
      </Box>
      <Divider bgColor="lightgray" />
    </Flex>
  );
};

export default ProductHeader;
