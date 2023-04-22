import { getCurrentUserInfo, updateCurrentUserInfo } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function User() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const asyncFunc = async () => {
      const user = await getCurrentUserInfo();
      setEmail(user.email);
      setName(user.name);
      setAddress(user.address);
      setPhone(user.phone);
    };
    asyncFunc();
  }, []);

  const onSaveChange = async (e) => {
    const succeed = await updateCurrentUserInfo({
      name,
      phone,
      address,
    });
    if (succeed) alert("Save changed!");
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-7xl">
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
          disabled="disabled"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>

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
          htmlFor="Phone"
        >
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Phone"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Address"
        >
          Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Address"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onSaveChange}
        >
          Save Change
        </button>
      </div>
    </div>
  );
}
