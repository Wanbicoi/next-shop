import Price from "./Price";

export default function ProductPrice({ product }) {
  return (
    <div>
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
          <Price currency="vnd" num={product.origin_price} numSize="text-lg" />
        </span>
      )}
    </div>
  );
}
