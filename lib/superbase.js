import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getAllProductsInCollection() {
  const { data: todos, error } = await supabase.from("todos").select("*");

  console.log("lsdkfj");
  if (error) console.log("error", error);
  else return todos;
}
