"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  visibility: string;
  onCloseMobileNav: () => void;
}

export default function NavMenu({
  visibility,
  onCloseMobileNav,
}: NavMenuProps) {
  const pathname = usePathname();
  return (
    <ul
      className={`${visibility} flex flex-col items-center sm:flex-row sm:gap-12`}
    >
      {[
        { name: "home", link: "/" },
        { name: "news", link: "/news" },
      ]?.map((page) => (
        <Link href={page?.link} key={page?.name} onClick={onCloseMobileNav}>
          <div className="group">
            <li
              className={`capitalize ${pathname === page?.link && "text-neutral-900"} text-base font-semibold transition-all sm:text-[15px] sm:font-medium`}
            >
              {page?.name}
            </li>
            <div className="w-0 rounded-md border-[1.5px] border-b opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100 sm:hidden" />
          </div>
        </Link>
      ))}
    </ul>
  );
}
