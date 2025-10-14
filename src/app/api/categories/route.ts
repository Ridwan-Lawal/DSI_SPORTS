import { auth } from "@/src/auth";
import { db } from "@/src/db";
import { categories } from "@/src/db/schema/article";
import { DrizzleError } from "drizzle-orm/errors";

import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "You need to be signed to perform this operation",
        },
      },
      { status: 401 },
    );
  }

  try {
    const categoriesData = await db.select().from(categories);

    return NextResponse.json(
      {
        success: true,
        data: categoriesData,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("categorie (GET):", error);
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Something went wrong getting your categories",
        },
      },
      { status: 500 },
    );
  }
}
