import { createCheckout, updateCheckout } from "@/lib/shopify";

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME,
    JSON.stringify([cart, checkoutId, checkoutUrl])
  );
}

function getLocalData() {
  return JSON.parse(
    localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME)
  );
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData();

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]]);
    } else {
      setCart([localData[0]]);
    }
    setCheckoutId(localData[1]);
    setCheckoutUrl(localData[2]);
  }
}

export async function createShopifyCheckout(newItem) {
  const data = await createCheckout(
    newItem["variantId"],
    newItem["variantQuantity"]
  );
  return data;
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map((item) => {
    return {
      variantId: item["variantId"],
      quantity: item["variantQuantity"],
    };
  });
  await updateCheckout(checkoutId, lineItems);
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0;
  } else {
    let totalPrice = 0;
    cart.forEach(
      (item) =>
        (totalPrice +=
          parseInt(item.variantQuantity) * parseFloat(item.variantPrice))
    );
    return Math.round(totalPrice * 100) / 100;
  }
}

//https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
export function generateSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
