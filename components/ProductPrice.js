import Price from "./Price";

export default function ProductPrice({ product }) {
  return (
    <div className="flex justify-end items-center">
      {product.discount_price ? (
        <div className="flex justify-end items-center">
          <s>
            <Price currency="vnd" num={product.origin_price} />
          </s>
          <div className="relative">
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
            <span className="bg-red-600 absolute top-[-10px] right-[-3px] rounded-md text-white text-xs px-1">
              -
              {(
                (1 - product.discount_price / product.origin_price) *
                100
              ).toFixed(2)}{" "}
              %
            </span>
          </div>
        </div>
      ) : (
        <span
          className="text-palette-dark font-primary font-medium text-base ml-1 pl-8 pr-4 py-1 bg-palette-lighter 
        rounded-tl-sm triangle "
        >
          <Price currency="vnd" num={product.origin_price} numSize="text-lg" />
        </span>
      )}
    </div>
  );
}
