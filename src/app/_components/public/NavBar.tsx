"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/svg/logo-grayscale-inverted.svg";
import RoleGate from "@/src/app/_components/public/RoleGate";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav flex w-full items-center justify-between border-b border-neutral-200 px-6 py-2 md:py-[15px]">
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

      <ul className="hidden sm:flex">
        {[
          { name: "home", link: "/" },
          { name: "news", link: "/news" },
        ]?.map((page) => (
          <Link href={page?.link} key={page?.name}>
            <li
              className={`capitalize ${pathname === page?.link && "text-neutral-900"} transition-all`}
            >
              {page?.name}
            </li>
          </Link>
        ))}
      </ul>

      <div className="sm:hidden">
        <button className="">
          <RiMenu4Fill className="text-xl" />
        </button>
      </div>

      <div className="hidden sm:block">
        <RoleGate>
          <Link href="/admin/overview">
            <Button>Admin Dashboard</Button>
          </Link>
        </RoleGate>
      </div>
    </nav>
  );
}
