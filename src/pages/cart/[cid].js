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

export async function getStaticProps({ params }) {
  const data = await getCartById(params.cid);

  return {
    props: {
      data,
    },
  };
}
