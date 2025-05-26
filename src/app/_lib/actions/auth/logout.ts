"use server";

import { getUser } from "@/src/app/_utils/get-session";
import { signOut } from "@/src/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  await signOut({ redirectTo: "/auth/admin/login" });
}
