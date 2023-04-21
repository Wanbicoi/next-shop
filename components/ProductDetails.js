import { useEffect, useState } from "react";
import BackToProductButton from "@/components/BackToProductButton";
import ProductForm from "@/components/ProductForm";
import Price from "./Price";
function ProductDetails({ product }) {
  const [variantPrice, setVariantPrice] = useState(product.origin_price);
  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <div className=" font-primary">
        <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
          {product.title}
        </h1>
        <p className="font-medium text-lg">{product.description}</p>
        <div className="text-xl text-palette-primary font-medium py-4 px-1">
          <Price currency="vnd" num={product.origin_price} numSize="text-2xl" />
        </div>
      </div>
      <ProductForm
        title={product.title}
        handle={product.handle}
        variants={product.variants.edges}
        mainImg={product.images.edges[0].node}
        setVariantPrice={setVariantPrice}
      />
    </div>
  );
}

export default ProductDetails;
