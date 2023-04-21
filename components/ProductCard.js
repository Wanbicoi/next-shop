import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
    >
      <div className="h-72 border-b-2 border-palette-lighter relative">
        <Image
          //src={product.thumbnails[0]}
          alt="Unknown"
          layout="fill"
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
        {product.discount_price ? (
          <div className="flex justify-end items-center">
            <s>
              <Price currency="vnd" num={product.origin_price} />
            </s>
            <span
              className="text-palette-dark font-primary font-medium text-base ml-1 pl-8 pr-4 py-1 bg-palette-lighter 
            rounded-tl-sm triangle"
            >
              <Price
                currency="vnd"
                num={product.discount_price}
                numSize="text-lg"
              />
            </span>
          </div>
        ) : (
          <span
            className="text-palette-dark font-primary font-medium text-base ml-1 pl-8 pr-4 py-1 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <Price
              currency="vnd"
              num={product.discount_price}
              numSize="text-lg"
            />
          </span>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
