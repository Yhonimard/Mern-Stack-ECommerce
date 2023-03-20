import Layout from "@/layout/Layout";
import "@/style/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import theme from "@/utils/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuth = router.pathname.startsWith("/auth");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          {isAuth && <Component />}
          {!isAuth && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
