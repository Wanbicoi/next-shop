import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase, getCurrentUserInfo } from "@/lib/supabase";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  useEffect(() => {
    const asyncFunc = async () => {
      setUser(await getCurrentUserInfo());

      //update user when authstate change
      const {
        data: { subscription },
      } = await supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) setUser(await getCurrentUserInfo());
        else setUser(null);
      });
      return () => subscription.unsubscribe();
    };
    asyncFunc();
  }, []);

  if (!isLoading) return <p className="text-center">Loading...</p>;

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link href="/" className=" cursor-pointer shrink-0">
          <h1 className="flex no-underline">
            <Image
              height="32"
              width="32"
              alt="logo"
              className="h-8 w-8 mr-1 object-contain"
              src="/icon.svg"
            />
            <span className="text-xl font-primary font-bold tracking-tight pt-1">
              {process.env.siteTitle}
            </span>
          </h1>
        </Link>
        <span className="flex">
          {!user ? (
            <Link href="/auth" className=" cursor-pointer inline mx-3">
              Login
            </Link>
          ) : (
            <div className="flex">
              {user.is_admin && (
                <div>
                  Dashboard
                  <Link
                    href="/dashboard/products"
                    className="text-blue-500 hover:text-blue-800 mx-3"
                  >
                    Products
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className="text-blue-500 hover:text-blue-800"
                  >
                    Orders
                  </Link>{" "}
                  |
                </div>
              )}
              <Link className="ml-3" href={"/user"}>
                {user.email}
              </Link>
              <button
                className=" cursor-pointer inline mx-3 text-blue-500 hover:text-blue-800"
                onClick={() => {
                  supabase.auth.signOut();
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
          <span>
            <Link className="relative inline" href="/cart" aria-label="cart">
              <FontAwesomeIcon
                className="text-palette-primary w-6 m-auto"
                icon={faShoppingCart}
              />
              {cartItems === 0 ? null : (
                <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-10 -translate-y-3">
                  {cartItems}
                </div>
              )}
            </Link>
          </span>
        </span>
      </div>
    </header>
  );
}

export default Nav;
