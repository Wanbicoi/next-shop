import { getAllOrders } from "@/lib/superbase";

export async function getStaticProps() {
  const orders = await getAllOrders();
  return {
    props: {
      orders,
    },
  };
}

export default function Orders({ products: orders }) {
  return (
    <div className="flex justify-center">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            {/* <th className="font-primary font-normal px-6 py-4"></th> */}
            <th className="font-primary font-normal px-6 py-4">Date Order</th>
            <th className="font-primary font-normal px-6 py-4">User Info</th>
            <th className="font-primary font-normal px-6 py-4">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {orders &&
            orders.map((item) => (
              <tr
                key={item.id}
                className="text-sm sm:text-base text-gray-600 text-center"
              >
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <p>{item.date}</p>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <img
                    src={item.thumbnails ? item.thumbnails.main : ""}
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
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <Price
                    currency="vnd"
                    num={item.origin_price}
                    numSize="text-lg"
                  />
                </td>
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <Price
                    currency="vnd"
                    num={item.discount_price}
                    numSize="text-lg"
                  />
                </td>
                {/* <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  className=""
                  onClick={() => onDeleteOrder(item.id)}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                  />
                </button>
              </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
