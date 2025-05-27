"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/svg/logo-grayscale-inverted.svg";
import NavMenu from "@/src/app/_components/public/NavMenu";
import RoleGate from "@/src/app/_components/public/RoleGate";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";

export default function NavBar() {
  const pathname = usePathname();
  const [navIsOpen, setNavIsOpen] = useState(false);

  const onToggleNav = () => setNavIsOpen((cur) => !cur);

  return (
    <nav
      className={`admin-nav relative flex w-full flex-wrap items-center justify-between border-b border-neutral-200 px-6 py-2 md:py-[15px]`}
    >
      <div className="relative size-10">
        <Image
          src={logo}
          alt="logo"
          quality={100}
          priority={true}
          fill
          className="object-contain"
        />
      </div>

      <div className="sm:hidden">
        <button
          onClick={onToggleNav}
          className={`${navIsOpen ? "rotate-180" : "rotate-0"} transition-transform`}
        >
          {navIsOpen ? (
            <X className="size-5" />
          ) : (
            <RiMenu4Fill className="text-xl" />
          )}
        </button>
      </div>

      <NavMenu visibility="hidden sm:flex" />

      <div
        className={`flex w-full flex-col items-center border-neutral-200 bg-white sm:flex-row sm:border-0 ${navIsOpen ? "mt-5 h-fit gap-10 border-t py-10 shadow-lg shadow-neutral-300" : "h-0 gap-0 py-0 sm:h-fit sm:gap-10"} absolute top-9 left-0 z-30 overflow-hidden transition-all duration-100 sm:static sm:w-fit`}
      >
        <NavMenu visibility="sm:hidden" />
        <RoleGate>
          <Link href="/admin/overview">
            <Button>Admin Dashboard</Button>
          </Link>
        </RoleGate>
      </div>
    </nav>
  );
}
