import {
  getAllOrders,
  getAllProductsFromOrder,
  getCurrentUserInfo,
} from "@/lib/supabase";
import Price from "@/components/Price";
import { useState, useEffect } from "react";
import AdminOnly from "@/components/AdminOnly";
import OrderDetail from "@/components/OrderDetail";

export async function getStaticProps() {
  const orders = await getAllOrders();
  return {
    props: {
      orders,
    },
  };
}

export default function Orders({ orders }) {
  const [orderId, setOrderId] = useState();
  const [products, setProducts] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      setProducts(await getAllProductsFromOrder(orderId));
    };
    asyncFunc();
  }, [orderId]);
  useEffect(() => {
    setIsLoading(false);
    const asyncFunc = async () => {
      setIsAdmin(await getCurrentUserInfo().is_admin);
    };
    asyncFunc();
    setIsLoading(true);
  }, []);
  if (!isLoading) return <p className="text-center">Loading...</p>;
  if (isAdmin) return <AdminOnly />;
  return (
    <div className="flex justify-stretch">
      <div
        style={{
          maxHeight: "calc(100vh - 125px)",
        }}
        className="overflow-y-auto  flex-1"
      >
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
                    <p>
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                    {item.user_info.name} <br />
                    {item.user_info.phone} <br />
                    {item.user_info.email} <br />
                  </td>
                  <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <Price currency="vnd" num={item.total} numSize="text-lg" />
                  </td>
                  <td className="font-primary font-medium px-4 sm:px-6 py-4">
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        setOrderId(item.id);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <OrderDetail products={products} />
    </div>
  );
}
