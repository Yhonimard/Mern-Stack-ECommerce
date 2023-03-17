import ProductHeader from "@/components/Product/ProductHeader";
import ProductList from "@/components/Product/ProductList";
import { useSelector } from "react-redux";

export default function Home({ data }) {
  return (
    <>
      <ProductHeader />
      <ProductList data={data} />
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/products/get`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
