import { getCurrentUserId } from "@/lib/superbase";
import { useRouter } from "next/router";
import { useState } from "react";
import { addOrder } from "@/lib/superbase";
import { useCartContext } from "@/context/Store";
import { getCartSubTotal } from "@/utils/helpers";
import { useDeleteCartContext } from "@/context/Store";

export default function CheckOut() {
  const cart = useCartContext()[0];
  const deleteCart = useDeleteCartContext();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const router = useRouter();
  const onCheckOut = (e) => {
    const insertAsync = async () => {
      const succeed = await addOrder(cart, {
        // user_id: getCurrentUserId(),
        user_info: {
          name,
          phone,
          email,
        },
        total: getCartSubTotal(cart),
      });
      if (succeed) {
        deleteCart();
        router.push("/");
      }
    };
    insertAsync();
  };
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
