import { db } from "@/src/db";
import { categories } from "@/src/db/schema/article";
import { DrizzleError } from "drizzle-orm/errors";

import { NextResponse } from "next/server";

export async function GET() {
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
      console.log("categorie (GET):", error.message);
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
