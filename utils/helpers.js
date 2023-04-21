export function saveLocalData(cart) {
  localStorage.setItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME,
    JSON.stringify(cart)
  );
}

function getLocalData() {
  return JSON.parse(
    localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME)
  );
}

export function setLocalData(setCart) {
  const localData = getLocalData();

  if (localData) {
    if (Array.isArray(localData)) {
      setCart([...localData]);
    } else {
      setCart([localData]);
    }
  }
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0;
  } else {
    let totalPrice = 0;
    cart.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
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
