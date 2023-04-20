import StoreHeading from "@/components/StoreHeading";
import ProductListings from "@/components/ProductListings";
import { getAllProducts } from "@/lib/superbase";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
}

export default IndexPage;
