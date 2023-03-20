import { CartPlusIcon } from "@/assets/Icon";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  IconButton,
  Img,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ToastComponent from "../UI/ToastComponent";
import useAddtoCartHanlder from "@/hooks/useAddToCartHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const ProductList = ({ data }) => {
  const [loadPage, setLoadPage] = useState(8);
  const router = useRouter();
  const toast = ToastComponent();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast({ title: "product have been add to your cart", status: "success" });
    queryClient.invalidateQueries({ queryKey: ["cart-data"] });
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  const onError = () => {
    toast({
      title: "something went wrong. cant add product to cart, pls try again",
      status: "error",
    });
  };
  const { mutate } = useAddtoCartHanlder({ onSuccess, onError });

  const addToCartHanlder = async (data) => {
    mutate(data);
  };

  const handleNavigate = (id) => {
    router.push(`/product-detail/${id}`);
  };

  const loadMoreHandler = useCallback(() => {
    setLoadPage((prev) => (prev += 8));
  }, []);

  const { result: datas } = data;
  return (
    <Container maxW="container.xl" mt={2}>
      <SimpleGrid columns={[2, 3, null, 4]} spacing={5}>
        {datas.slice(0, loadPage).map((i) => (
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
      <Box w="full" display="flex" justifyContent="center" my={2}>
        {datas.length - 1 < datas.length ? (
          <Button variant="ghost" onClick={loadMoreHandler}>
            LOAD MORE
          </Button>
        ) : null}
      </Box>
    </Container>
  );
};
export default ProductList;
