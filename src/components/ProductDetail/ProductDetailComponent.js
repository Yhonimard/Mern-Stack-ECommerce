import { CartPlusIcon } from "@/assets/Icon";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  IconButton,
  Img,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const ProductDetailComponent = ({ data }) => {
  const { result: productData } = data;
  const img = "https://source.unsplash.com/500x500";
  return (
    <Container
      minH={["100vh"]}
      sx={{ display: "flex", justifyContent: "center" }}
      py={5}
      maxW={["conatiner.sm", "fit-content"]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        shadow="lg"
        overflow="hidden"
        direction={["column", null, "row"]}
        maxW={["600px", null, "none"]}
      >
        <Img src={`${img}`} objectFit="cover" maxH={["450px", null, "none"]} />
        <Stack divider={<StackDivider bgColor="lightgray" />}>
          <CardBody
            display={{ md: "flex" }}
            flexDirection={{ md: "column" }}
            justifyContent={{ md: "center" }}
          >
            <Heading size="md" lineHeight="short">
              {productData.name}
            </Heading>
            <Text mt="2" h={"150px"} overflowY="auto">
              {productData.description}
            </Text>
          </CardBody>
          <CardFooter display="flex" alignItems="center" justify="space-around">
            <Text fontSize="lg" fontWeight="bold">
              ${productData.price}
            </Text>
            <Stack direction={["row"]}>
              <IconButton
                icon={<CartPlusIcon size={23} />}
                isRound
                variant="ghost"
              />
              <Button
                variant="ghost"
                colorScheme="blackAlpha"
                color="blackAlpha.900"
              >
                buy now
              </Button>
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
};

export default ProductDetailComponent;
