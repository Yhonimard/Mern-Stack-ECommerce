import ProductDetailComponent from "@/components/ProductDetail/ProductDetailComponent";
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
  const res = await fetch(`${process.env.HOST_URL}/api/products/get`);
  const data = await res.json();

  const paths = data.result.map((i) => {
    return {
      params: {
        pid: `${i.id}`,
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
  const res = await fetch(`${process.env.HOST_URL}/api/products/get/${pid}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
