import { faL } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { uuidv4 } from "@/utils/helpers";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function getAllProductsFromOrder(orderId) {
  if (!orderId) return [];
  const { data: products, error } = await supabase
    .from("products")
    .select("*, orders_products!inner(order_id, quantity)")
    .eq("orders_products.order_id", orderId);
  if (error) {
    console.log("error", error);
    return [];
  } else
    return products.map((item) => ({
      ...item,
      quantity: item.orders_products[0].quantity,
      price: item.discount_price ?? item.origin_price,
    }));
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
  //insert to orders table
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select("id");
  //insert to orders_products table
  const insertItems = cart.map(function (item) {
    return {
      order_id: data[0].id,
      product_id: item.id,
      product_title: item.title,
      quantity: item.quantity,
    };
  });
  await supabase.from("orders_products").insert(insertItems);

  if (error) {
    console.log("error", error);
    return false;
  }
  return true;
}

export async function getCurrentUserInfo() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id);

  if (error) {
    console.log("error", error);
    return null;
  }
  return { ...data[0], email: session.user.email };
}
export async function updateCurrentUserInfo(userInfo) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase
    .from("users")
    .update(userInfo)
    .eq("id", session.user.id);

  if (error) {
    console.log("error", error);
    return false;
  }
  return true;
}
