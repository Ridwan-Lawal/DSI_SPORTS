import { auth } from "@/src/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Page() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}
