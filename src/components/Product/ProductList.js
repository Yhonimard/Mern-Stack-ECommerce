import { CartPlusIcon } from "@/assets/Icon";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Container,
  Text,
  Heading,
  Img,
  SimpleGrid,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

const ProductList = ({ data }) => {
  const router = useRouter();
  const { id } = useSelector((state) => state.auth.userData);

  const handleNavigate = (id) => {
    router.push(`/product-detail/${id}`);
  };

  const addToCartHanlder = async (data) => {
    try {
      const res = await axios.post(`/api/cart/add/${id}`, data).catch((err) => {
        const errorMsg = err.response.data.message;
        throw (
          errorMsg ||
          "something went wrong, cant add product to cart, pls try again"
        );
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { result: datas } = data;

  return (
    <Container maxW="container.xl" mt={2}>
      <SimpleGrid columns={[2, 3, null, 4]} spacing={5}>
        {datas.map((i) => (
          <Card
            overflow="hidden"
            borderRadius="md"
            boxShadow="lg"
            key={i.id}
            transition="all 300ms"
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => handleNavigate(i.id)}
          >
            <Img
              src={`https://source.unsplash.com/1000x1000?${i.name}`}
              objectFit="cover"
            />
            <CardBody>
              <Heading size="sm" noOfLines={1}>
                {i.name}
              </Heading>
              <Text noOfLines={1} lineHeight="taller">
                {i.description}
              </Text>
              <HStack justify="space-between">
                <Text fontWeight="medium">${i.price}</Text>
                <IconButton
                  icon={<CartPlusIcon size={18} />}
                  isRound
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartHanlder({
                      productId: i.id,
                      quantity: 1,
                      price: i.price,
                    });
                  }}
                  zIndex={200000}
                />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
export default ProductList;
