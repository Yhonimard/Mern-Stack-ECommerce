import Link from "next/link";
import { useRouter } from "next/router";
import { SignupSchema } from "@//models/AuthSchema";
import axios from "axios";
import { setCookie } from "cookies-next";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import ToastComponent from "../UI/ToastComponent";

const SignupComponent = () => {
  const router = useRouter();

  const { errors, handleSubmit, register } = SignupSchema();

  const toast = ToastComponent();

  const signupHandler = async (data) => {
    const { confirmPassword, username, email, age, address } = data;

    const signupData = {
      username,
      email,
      password: confirmPassword,
      age,
      address,
    };
    try {
      const res = await axios
        .post("/api/auth/signup", signupData)
        .catch((err) => {
          throw err.response.data.message || "something went wrong ";
        });
      if (res.data.token) {
        setCookie("token", res.data.token);
        toast({ title: "signup success!!!", status: "success" });
      }
    } catch (error) {
      toast({ title: "signup failed, pls try again", status: "error" });
      return;
    }

    router.push("/");
  };

  return (
    <Container
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={10}
    >
      <Box
        w="full"
        border="lightgray 1px solid"
        py={4}
        px={5}
        shadow="base"
        borderRadius="lg"
        maxW="sm"
        minH="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading textAlign="center" lineHeight="short" mb={3}>
          SIGNUP
        </Heading>
        <Divider bgColor="blackAlpha.900" mb={7} />

        <form onSubmit={handleSubmit(signupHandler)}>
          <Stack spacing={3}>
            <FormControl isInvalid={errors?.email}>
              <Input
                shadow="sm"
                {...register("username")}
                placeholder="username"
              />
              {errors.username && (
                <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors?.email}>
              <Input {...register("email")} placeholder="email" />
              {errors.email && (
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              )}
            </FormControl>

            <NumberInput
              isInvalid={errors?.age}
              min={17}
              max={70}
              defaultValue={17}
            >
              <NumberInputField
                shadow="sm"
                {...register("age")}
                placeholder="age"
              />
              <Text color="red.500" fontSize="sm" mt="1.5">
                {errors.age && errors.age.message}
              </Text>
            </NumberInput>

            <FormControl isInvalid={errors?.address}>
              <Input
                shadow="sm"
                {...register("address")}
                placeholder="address"
              />
              {errors.address && (
                <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors?.password}>
              <Input
                type="password"
                shadow="sm"
                {...register("password")}
                placeholder="password"
              />
              {errors.password && (
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors?.confirmPassword}>
              <Input
                type="password"
                shadow="sm"
                {...register("confirmPassword")}
                placeholder="confirm password"
              />
              {errors.confirmPassword && (
                <FormErrorMessage>
                  {errors?.confirmPassword?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit">SIGNUP</Button>
            <Text>
              have an account ?{" "}
              <Button
                as={Link}
                href="/auth/login"
                variant="link"
                color="blue.600"
              >
                login
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
export default SignupComponent;
