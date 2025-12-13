import { getUser } from "@/src/app/_utils/get-session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getMatches = cache(async function () {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  // const currentDate = new Date().toISOString().split("T")[0];

  // /matches?competitions=PL,SA,FL1,CL,BL1,ES
  try {
    const response = await fetch(`${process.env.LIVE_SCORES_URL}/v4/matches`, {
      method: "GET",
      headers: {
        "X-Auth-Token": process.env.LIVE_SCORES_API_KEY!,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds to reduce load
    });

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return []; // Return empty array on bad status
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // 2. Log the error internally, but DO NOT throw it up to the UI
    console.error("Failed to fetch live scores:", error);

    // 3. Return a "safe" fallback value (e.g., empty array or null)
    return [];
  }
});
