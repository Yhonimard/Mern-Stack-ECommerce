import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../redux/AuthState";
import { CartIcon } from "../assets/Icon";
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Divider,
  Img,
} from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback } from "react";

const Nav = () => {
  const { isLogin, userData } = useSelector((state) => state.auth);

  const { cart } = userData;

  const router = useRouter();

  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    deleteCookie("token");
    deleteCookie("userid");
    deleteCookie("userData");
    dispatch(isAuth(false));
  }, [dispatch]);

  const handleNavigate = () => {
    router.push(`/cart/${cart.id}`);
  };

  return (
    <Flex h="60px" align="center" px={4} boxShadow="lg">
      <Heading size="sm">YHONIMARD</Heading>
      <Spacer />
      {!isLogin && (
        <Button
          as={Link}
          href="/auth/login"
          variant="ghost"
          colorScheme="blackAlpha"
          color="black"
        >
          LOGIN
        </Button>
      )}
      {isLogin && (
        <>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              isRound={true}
              icon={<CartIcon size={25} />}
              mr={3}
            />
            <MenuList overflowY="scroll" h="300px" boxShadow="lg">
              <HStack
                justifyContent="space-between"
                align="center"
                px={3}
                py={2}
              >
                <Text>My Cart (10)</Text>
                <Button
                  variant="link"
                  size="sm"
                  color="blue.700"
                  onClick={handleNavigate}
                >
                  see all my cart
                </Button>
              </HStack>
              <Divider colorScheme="blackAlpha" size={30} />
              {userData.cart &&
                cart?.cartList?.map((c) => (
                  <MenuItem justifyContent="space-between" key={c.id} w={300}>
                    <Img
                      src={`https://source.unsplash.com/300x300?${c.product.name}`}
                      boxSize="30px"
                      objectFit="cover"
                    />
                    <Flex w="50%" direction="column">
                      <Text fontSize="sm" as="h6" noOfLines={1}>
                        {c.product.name}
                      </Text>
                      <Text fontSize="xs" as="h6">
                        Quantity : {c.quantity}
                      </Text>
                    </Flex>
                    <Text>${c.price}</Text>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              isRound={true}
              colorScheme="blackAlpha"
            >
              <Avatar w={8} h={8} />
            </MenuButton>
            <MenuList>
              <MenuItem>settings</MenuItem>
              <MenuItem onClick={logoutHandler}>logout</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  );
};

export default Nav;
