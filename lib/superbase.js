import { faL } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.log("error", error);
    return error;
  } else return products;
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
