import NavBarAdmin from "@/src/app/_components/reusables/NavBar";
import SidebarAdmin from "@/src/app/_components/reusables/SidebarAdmin";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full border-4 border-green-500">
      {/* side bar */}
      <div className="shrink-0 md:w-[260px]">
        <SidebarAdmin />
      </div>

      {/* nav and content */}
      <div className="no-scrollbar h-screen w-full min-w-0 overflow-auto border border-blue-500 md:flex-1">
        <NavBarAdmin />
        <div>{children}</div>
      </div>
    </div>
  );
}
