import CartComponent from "@/components/Cart/CartComponent";
import { useRouter } from "next/router";
import useGetCartData from "@/hooks/useGetCartData";
import cartSchema from "@/models/CartModels";
import connectMongo from "@/utils/connectMongo";
import productSchema from "@/models/ProductsModels";

const CartPage = ({ data }) => {
  const { query } = useRouter();

  const { data: cartData } = useGetCartData(query.cid, data);

  return <CartComponent cartData={cartData} />;
};
export default CartPage;

export async function getStaticPaths() {
  await connectMongo();

  const cart = await cartSchema.find();

  const carts = cart.map((cart) => cart?.toObject({ getters: true }));

  const paths = carts?.map((c) => {
    return {
      params: { cid: c.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const {} = params;

  await connectMongo();
  const cart = await cartSchema.findById(params.cid).populate({
    path: "cartList.product",
    model: productSchema,
  });

  const cartData = JSON.parse(JSON.stringify(cart.toObject({ getters: true })));

  return {
    props: {
      data: cartData,
    },
  };
}
