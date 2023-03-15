/**
 *
 * @param {import("next").GetStaticProps} getStaticProps
 * @param {import("next").GetStaticPaths} getStaticPaths
 *
 *
 */

import CartComponent from "@/components/Cart/CartComponent";

const CartPage = ({ data }) => {
  return <CartComponent cartData={data.result} />;
};
export default CartPage;

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/cart/get`);
  const data = await res.json();
  const paths = data.result.map((c) => {
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
};

export const getStaticProps = async ({ params }) => {
  const { cid } = params;
  const res = await fetch(`${process.env.HOST_URL}/api/cart/get/${cid}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
