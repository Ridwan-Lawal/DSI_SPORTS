"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/svg/logo-grayscale-inverted.svg";
import NavMenu from "@/src/app/_components/public/NavMenu";
import RoleGate from "@/src/app/_components/public/RoleGate";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";

export default function NavBar() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsFixed, setNavIsFixed] = useState(false);

  const onToggleNav = () => setNavIsOpen((cur) => !cur);

  const closeNavOnMobile = () => setNavIsOpen(false);

  useEffect(() => {
    function onBlurNav(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;

      console.log(targetEl.closest("nav"));

      if (navIsOpen && !targetEl.closest("#user-nav")) {
        closeNavOnMobile();
      }
    }

    document.addEventListener("click", onBlurNav);

    return () => document.removeEventListener("click", onBlurNav);
  });

  useEffect(() => {
    function onFixingNav() {
      if (window.scrollY > 200) {
        setNavIsFixed(true);
      } else {
        setNavIsFixed(false);
      }
    }

    window.addEventListener("scroll", onFixingNav);

    return () => document.removeEventListener("scroll", onFixingNav);
  }, []);

  return (
    <nav
      className={`${navIsFixed ? "fixed border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-md" : "relative border-b border-neutral-200 bg-transparent"} z-40 w-full`}
    >
      <div
        className={`admin-nav user mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between px-6 py-2 transition-all md:py-[15px]`}
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

        <div className="flex items-center gap-2 sm:hidden">
          <Link href="/search">
            <button className="rounded-full bg-neutral-100 p-1.5">
              <Search className="size-[17px]" />
            </button>
          </Link>
          <div className="h-5 border-r" />
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

        <NavMenu
          visibility="hidden sm:flex "
          onCloseMobileNav={closeNavOnMobile}
        />

        <div
          id="user-nav"
          className={`flex w-full flex-col items-center border-neutral-200 bg-white sm:flex-row sm:border-0 ${navIsOpen ? "mt-5 h-fit gap-10 border-t py-10 shadow-md shadow-neutral-300" : "h-0 gap-0 py-0 sm:h-fit sm:gap-5"} absolute top-9 left-0 z-30 overflow-hidden transition-all duration-100 sm:static sm:w-fit sm:bg-transparent`}
        >
          <NavMenu
            visibility="sm:hidden "
            onCloseMobileNav={closeNavOnMobile}
          />

          <Link href="/search" className="hidden sm:block">
            <button className="rounded-full bg-neutral-100 p-1.5">
              <Search className="size-[17px]" />
            </button>
          </Link>

          <RoleGate>
            <Link href="/admin/overview">
              <Button>Admin Dashboard</Button>
            </Link>
          </RoleGate>
        </div>
      </div>
    </nav>
  );
}
