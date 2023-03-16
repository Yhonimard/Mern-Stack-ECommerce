import CartComponent from "@/components/Cart/CartComponent";

const CartPage = ({ data }) => {
  console.log(data);
  return <CartComponent cartData={data} />;
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

export const getServerSideProps = async ({ params }) => {};
