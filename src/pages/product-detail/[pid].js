import ProductDetailComponent from "@/components/ProductDetail/ProductDetailComponent";
import { getProduct, getProductById } from "@/lib/getProductByid";
import axios from "axios";

const ProductDetails = ({ data }) => {
  return (
    <>
      <ProductDetailComponent data={data} />
    </>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const data = await getProduct();

  const paths = data?.result?.map((i) => {
    return {
      params: {
        pid: i.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { pid } = params;

  const data = await getProductById(pid);

  return {
    props: {
      data,
    },
  };
};
