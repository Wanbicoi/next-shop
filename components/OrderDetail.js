import { useEffect, useState } from "react";
import Price from "./Price";
import Link from "next/link";
import Image from "next/image";
export default function OrderDetail({ products }) {
  const [total, setTotal] = useState();
  useEffect(() => {
    let sum = 0;
    if (products) products.forEach((product) => (sum += product.total));
    setTotal(sum);
  }, []);
  return (
    <div className="min-h-80 min-w-[35rem] my-4 sm:my-8 mx-auto">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {products &&
            products.map((item) => (
              <tr
                key={item.id}
                className="text-sm sm:text-base text-gray-600 text-center"
              >
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <Image
                    src={item.thumbnails ? item.thumbnails[0] : ""}
                    alt="Unknown"
                    height={64}
                    width={64}
                    className={`hidden sm:inline-flex`}
                  />
                  <Link
                    className="pt-1 hover:text-palette-dark"
                    href={`/products/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  {item.quantity}
                </td>
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  {item.price}
                </td>
              </tr>
            ))}
          {total != 0 && (
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Total
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <Price currency="vnd" num={total} numSize="text-xl" />
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
