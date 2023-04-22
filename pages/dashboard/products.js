import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getAllProducts,
  getCurrentUserId,
  deleteProduct,
  checkUserIsAdmin,
} from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AdminOnly from "@/components/AdminOnly";

export async function getStaticProps() {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
}

export default function Dashboard({ products }) {
  // const [session, setSession] = useState(null);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function onDeleteProduct(index) {
    const succeed = await deleteProduct(index);
    if (succeed) router.push("/dashboard");
  }

  useEffect(() => {
    setIsLoading(false);
    const asyncFunc = async () => {
      setIsAdmin(await checkUserIsAdmin(await getCurrentUserId()));
    };
    asyncFunc();
    setIsLoading(true);
  }, []);
  if (!isLoading) return <p>Loading...</p>;
  if (!isAdmin) return <AdminOnly />;
  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            {/* <th className="font-primary font-normal px-6 py-4"></th> */}
            <th className="font-primary font-normal px-6 py-4">Title</th>
            <th className="font-primary font-normal px-6 py-4">Description</th>
            <th className="font-primary font-normal px-6 py-4">Price </th>
            <th className="font-primary font-normal px-6 py-4">
              Discount Price
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
                  <p>{item.description}</p>
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
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    className=""
                    onClick={() => onDeleteProduct(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          href="/dashboard/create"
        >
          Create
        </Link>
      </div>
    </div>
  );
}
