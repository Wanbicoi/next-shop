import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./ProductPrice";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
    >
      <div className="h-72 border-b-2 border-palette-lighter relative">
        <Image
          fill
          src={product.thumbnails ? product.thumbnails[0] : ""}
          alt="Unknown"
          className="transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          {product.title}
        </div>
        <div className="text-lg text-gray-600 p-4 font-primary font-light">
          {product.description}
        </div>
        <ProductPrice product={product} />
      </div>
    </Link>
  );
}
