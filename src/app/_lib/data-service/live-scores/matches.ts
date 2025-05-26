import { getUser } from "@/src/app/_utils/get-session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getMatches = cache(async function () {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  const currentDate = new Date().toISOString().split("T")[0];

  // /matches?competitions=PL,SA,FL1,CL,BL1,ES
  try {
    const response = await fetch(`${process.env.LIVE_SCORES_URL}/v4/matches`, {
      method: "GET",
      headers: {
        "X-Auth-Token": process.env.LIVE_SCORES_API_KEY!,
        "Content-Type": "application/json",
      },

      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Something went wrong. Status: ${response?.status}`);
    }

    const matches = await response.json();

    return matches;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});
