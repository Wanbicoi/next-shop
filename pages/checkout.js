import { getCurrentUserInfo } from "@/lib/supabase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addOrder } from "@/lib/supabase";
import { useCartContext } from "@/context/Store";
import { getCartSubTotal } from "@/utils/helpers";
import { useDeleteCartContext } from "@/context/Store";
import CheckOutSucceed from "@/components/CheckOutSucceed";

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckOutSucceed, setIsCheckOutSucceed] = useState(false);

  const cart = useCartContext()[0];
  const deleteCart = useDeleteCartContext();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const router = useRouter();

  //If user logged in then check out succeed
  useEffect(() => {
    setIsLoading(true);
    const asyncFunc = async () => {
      const user_info = await getCurrentUserInfo();
      if (user_info) {
        const succeed = await addOrder(cart, {
          user_id: user_info.id,
          user_info: {
            name: user_info.name,
            phone: user_info.phone,
            email: user_info.email,
          },
          total: getCartSubTotal(cart),
        });
        if (succeed) {
          deleteCart();
          setIsCheckOutSucceed(true);
        }
      }
      setIsLoading(false);
    };
    asyncFunc();
  }, []);

  const onCheckOut = async () => {
    console.log("sd;lfk");
    const succeed = await addOrder(cart, {
      user_info: {
        name,
        phone,
        email,
      },
      total: getCartSubTotal(cart),
    });
    if (succeed) {
      deleteCart();
      setIsCheckOutSucceed(true);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isCheckOutSucceed) return <CheckOutSucceed />;
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-7xl">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
