import NavBarAdmin from "@/src/app/_components/reusables/NavBar";
import SidebarAdmin from "@/src/app/_components/reusables/SidebarAdmin";
import { auth } from "@/src/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex w-full">
      {/* side bar */}
      <div className="shrink-0 md:w-[260px]">
        <SessionProvider session={session}>
          <SidebarAdmin />
        </SessionProvider>
      </div>

      {/* nav and content */}
      <div className="no-scrollbar h-screen w-full min-w-0 overflow-auto md:flex-1">
        <NavBarAdmin />
        <div>{children}</div>
      </div>
    </div>
  );
}
