import { faL } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { uuidv4 } from "@/utils/helpers";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function getAllProductsFromOrder(orderId) {
  const { data: products, error } = await supabase
    .from("orders")
    .select("*, orders_products(orderId)")
    .eq("orders_products.order_id", orderId);

  if (error) {
    console.log("error", error);
    return error;
  } else return products;
}
export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.log("error", error);
    return error;
  } else return products;
}

export async function uploadThumbnails(productSlug, thumbnails) {
  let thumbnailUrls = [];
  for (const item of thumbnails) {
    const fileName = productSlug + "/" + uuidv4() + "_" + item.name;
    const { error } = await supabase.storage
      .from("thumbnails")
      .upload(fileName, item);
    if (error) {
      console.log("error", error);
    }
    const { data: url } = await supabase.storage
      .from("thumbnails")
      .getPublicUrl(fileName);
    thumbnailUrls = [...thumbnailUrls, url.publicUrl];
  }
  return thumbnailUrls;
}

export async function addProduct(product) {
  const { error } = await supabase.from("products").insert(product);
  if (error) {
    console.log("error", error);
    return false;
  }
  return true;
}
export async function deleteProduct(index) {
  const { error } = await supabase.from("products").delete().eq("id", index);

  if (error) {
    console.log("error", error);
    return false;
  }
  return true;
}

export async function getAllOrders() {
  const { data: data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.log("error", error);
    return error;
  } else return data;
}

export async function getProductSlugs() {
  const { data: data, error } = await supabase.from("products").select("slug");

  if (error) {
    console.log("error", error);
    return error;
  } else return data;
}

export async function getProductBySlug(slug) {
  const { data: data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug);

  if (error) {
    console.log("error", error);
    return error;
  } else return data[0];
}

export async function addOrder(cart, order) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select("id");
  await supabase.from("orders_products").insert(
    cart
      .filter((item) => item.quantity != 0)
      .map(function (item) {
        return {
          order_id: data.id,
          product_id: item.id,
          product_title: item.title,
          quantity: item.quantity,
          total: item.total,
        };
      })
  );

  if (error) {
    console.log("error", error);
    return false;
  }
  return true;
}
export async function getCurrentUserId() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session.user.id;
  else return undefined;
}
export async function checkUserIsAdmin(user_id) {
  if (!user_id) return false;
  const { data, error } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user_id);

  if (error) {
    console.log("error", error);
    return false;
  }
  return data.length > 0 ? data[0].is_admin : false;
}
