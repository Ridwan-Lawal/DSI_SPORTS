"use client";

import logo from "@/public/svg/logo-grayscale-inverted.svg";
import { onToggleSidebar } from "@/src/app/_lib/redux/features/layoutSlice";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { Bolt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";

export default function NavBarAdmin() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <nav className="admin-nav flex w-full items-center justify-between border-b border-neutral-200 px-6 py-2 md:py-[15px]">
      <div className="relative size-10 md:hidden">
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

      <div>
        <button
          className="md:hidden"
          onClick={() => dispatch(onToggleSidebar())}
        >
          <RiMenu4Fill className="text-xl" />
        </button>

        <Link href="/admin/settings">
          <button className="hidden md:block">
            <Bolt className="size-6 text-neutral-700" />
          </button>
        </Link>
      </div>
    </nav>
  );
}
