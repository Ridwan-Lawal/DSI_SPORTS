"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/svg/logo-grayscale-inverted.svg";
import RoleGate from "@/src/app/_components/public/RoleGate";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";

export default function NavBar() {
  const pathname = usePathname();
  const [navIsOpen, setNavIsOpen] = useState();

  return (
    <nav className="admin-nav flex w-full flex-wrap items-center justify-between border-b border-neutral-200 px-6 py-2 md:py-[15px]">
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
        <button className="">
          <RiMenu4Fill className="text-xl" />
        </button>
      </div>

      <div className="top-0 left-0 mt-5 flex w-full flex-col items-center gap-10 border border-blue-500 bg-white py-10 sm:flex-row">
        <ul className="flex flex-col sm:flex-row">
          {[
            { name: "home", link: "/" },
            { name: "news", link: "/news" },
          ]?.map((page) => (
            <Link href={page?.link} key={page?.name}>
              <div className="group">
                <li
                  className={`capitalize ${pathname === page?.link && "text-neutral-900"} transition-all`}
                >
                  {page?.name}
                </li>
                <div className="w-0 rounded-md border-[1.5px] border-b opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </ul>

        <RoleGate>
          <Link href="/admin/overview">
            <Button>Admin Dashboard</Button>
          </Link>
        </RoleGate>
      </div>
    </nav>
  );
}
