import ProductSection from "@/components/ProductSection";
import { getProductBySlug, getProductSlugs } from "@/lib/superbase";
import ProductDetails from "@/components/ProductDetails";
export default function ProductPage({ product }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        {/* <ProductImage images={product.images.edges} /> */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs();

  console.log(productSlugs);
  const paths = productSlugs.map((item) => {
    const slug = item.slug;
    return {
      params: { slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    props: { product },
  };
}
