import NavBarAdmin from "@/src/app/_components/reusables/NavBar";
import SidebarAdmin from "@/src/app/_components/reusables/SidebarAdmin";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* side bar */}
      <div>
        <SidebarAdmin />
      </div>

      {/* nav and content */}
      <div className="w-full">
        <NavBarAdmin />
        <div>{children}</div>
      </div>
    </div>
  );
}
