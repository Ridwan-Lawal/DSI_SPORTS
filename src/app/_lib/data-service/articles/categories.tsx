import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { redirect } from "next/navigation";

export async function getCategories() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/admin/login");
  }

  const categories = await db.query.categories.findMany();

  return categories;
}
