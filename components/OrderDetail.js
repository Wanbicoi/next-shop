import { getAllProductsFromOrder } from "@/lib/supabase";

export async function getStaticProps({ params }) {
  return {
    props: {
      products,
    },
  };
}

export default function OrderDetail({ products }) {
  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
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
          {cartItems
            .filter((item) => item.quantity != 0)
            .map((item) => (
              <tr
                key={item.id}
                className="text-sm sm:text-base text-gray-600 text-center"
              >
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <Image
                    src={item.thumbnail}
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
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    className=""
                    onClick={() => updateOrderItemQuantity(item.id, 0)}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                    />
                  </button>
                </td>
              </tr>
            ))}
          {subtotal === 0 ? null : (
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <Price currency="vnd" num={subtotal} numSize="text-xl" />
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
