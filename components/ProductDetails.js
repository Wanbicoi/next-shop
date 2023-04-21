import { useEffect, useState } from "react";
import BackToProductButton from "@/components/BackToProductButton";
import ProductForm from "@/components/ProductForm";
import ProductPrice from "./ProductPrice";

function ProductDetails({ product }) {
  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <div className=" font-primary">
        <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
          {product.title}
        </h1>
        <p className="font-medium text-lg">{product.description}</p>
        <ProductPrice product={product} />
      </div>

      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetails;
