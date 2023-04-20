import { useRouter } from "next/router";
import { useState } from "react";
import { addProduct } from "@/lib/superbase";
export default function CreateProductForm() {
  const [title, setTitle] = useState();
  const [discription, setDiscription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [discountPrice, setDiscountPrice] = useState();

  const router = useRouter();
  const onCreate = (e) => {
    const insertAsync = async () => {
      const succeed = await addProduct({
        title,
        discription,
        origin_price: price,
        discount_price: discountPrice,
        quantity,
      });
      if (succeed) router.push("/dashboard");
    };
    insertAsync();
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-7xl">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Discription"
        >
          Discription
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Discription"
          type="text"
          placeholder="Discription"
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        ></input>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Price"
        >
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Discount Price"
        >
          Discount Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Discount Price"
          type="text"
          placeholder="Discount Price"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Quantity"
        >
          Quantity
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Quantity"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
