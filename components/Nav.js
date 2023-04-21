import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "@/lib/superbase";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link href="/" className=" cursor-pointer shrink-0">
          <h1 className="flex no-underline">
            <img
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
          {!session ? (
            <Link href="/auth" className=" cursor-pointer inline mx-3">
              Login
            </Link>
          ) : (
            <button
              className=" cursor-pointer inline mx-3"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Logout
            </button>
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
