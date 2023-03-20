import CartComponent from "@/components/Cart/CartComponent";
import { useRouter } from "next/router";
import useGetCartData from "@/hooks/useGetCartData";
import { getCart, getCartById } from "@/lib/getCartById";

const CartPage = ({ data }) => {
  const { query } = useRouter();

  const { data: cartData } = useGetCartData(query.cid, data);

  return <CartComponent cartData={cartData} />;
};
export default CartPage;

export async function getStaticPaths() {
  const data = await getCart();
  console.log(data);
  const paths = data?.result?.map((c) => {
    return {
      params: {
        cid: c.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const data = await getCartById();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}
