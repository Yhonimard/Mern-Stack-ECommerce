import ProductDetailComponent from "@/components/ProductDetail/ProductDetailComponent";
import productSchema from "@/models/ProductsModels";
import connectMongo from "@/utils/connectMongo";

const ProductDetails = ({ data }) => {
  console.log(data);
  return (
    <>
      <ProductDetailComponent data={data} />
    </>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  await connectMongo();

  const product = await productSchema.find({});

  const products = product.map((p) => p?.toObject({ getters: true }));

  const paths = products?.map((p) => {
    return {
      params: {
        pid: p.id,
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

  await connectMongo();

  const products = await productSchema.findById(pid);

  const productData = JSON.parse(
    JSON.stringify(products.toObject({ getters: true }))
  );

  return {
    props: {
      data: productData,
    },
  };
};
