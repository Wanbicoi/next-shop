import { getProductBySlug, getProductSlugs } from "@/lib/supabase";
import ProductDetails from "@/components/ProductDetails";
import ProductImage from "@/components/ProductImage";

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs();
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

export async function getServerSideProps({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    props: { product },
  };
}

export default function ProductPage({ product }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <ProductImage thumbnailUrls={product.thumbnails} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
