"use client";

import logoNoBg from "@/public/svg/logo-grayscale.svg";
import { useSidebar } from "@/src/app/_hooks/useSidebar";
import {
  getLayout,
  onToggleSidebar,
} from "@/src/app/_lib/redux/features/layoutSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import { CONTENTS, DASHBOARD, PAGES, TEAMS } from "@/src/app/_utils/constant";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const { mobileSidebarIsOpen } = useAppSelector(getLayout);
  const dispatch = useAppDispatch();
  useSidebar();

  function onClickSidebarLinkOnMobile() {
    if (window.innerWidth <= 768) {
      dispatch(onToggleSidebar(false));
    }
  }

  return (
    <AnimatePresence>
      {mobileSidebarIsOpen && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
          className="sidebar-overlay fixed z-30 w-full bg-black/30 backdrop-blur-[2px] md:static"
        >
          <div className="z-30 flex h-screen w-[260px] flex-col justify-between border-r border-neutral-200 bg-white backdrop-blur-[2px]">
            {/* header */}
            <header className="p flex h-[9vh] w-full items-center justify-between border-b border-neutral-200 px-2">
              <div className="relative size-12">
                <Image
                  src={logoNoBg}
                  alt="logo"
                  quality={100}
                  fill
                  className="object-contain"
                  priority={true}
                />
              </div>

              <button
                className="md:hidden"
                onClick={() => dispatch(onToggleSidebar())}
              >
                <X className="size-[22px]" />
              </button>
            </header>

            {/* main */}

            <main className="scrollbar-thin scrollbar-thumb-neutral-500 h-[75vh] space-y-5 overflow-y-auto px-3">
              {/* pages */}
              <div className="section-block md:hidden">
                <p className="">pages</p>
                <ul className="">
                  {PAGES?.map((page) => (
                    <Link href={page?.link} key={page?.name}>
                      <li
                        className={`group ${pathname === page?.link && "bg-neutral-100 text-neutral-700"}`}
                        onClick={onClickSidebarLinkOnMobile}
                      >
                        <span>
                          <page.icon className="size-[18px] group-hover:text-neutral-700" />
                        </span>

                        <span className="group-hover:text-neutral-700">
                          {page?.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              {/* dashboard */}
              <div className="section-block">
                <p className="">dashboard</p>
                <ul className="">
                  {DASHBOARD?.map((page) => (
                    <Link href={page?.link} key={page?.name}>
                      <li
                        className={`group ${pathname === page?.link && "bg-neutral-100 text-neutral-700"}`}
                        onClick={onClickSidebarLinkOnMobile}
                      >
                        <span>
                          <page.icon className="size-[18px] group-hover:text-neutral-700" />
                        </span>

                        <span className="group-hover:text-neutral-700">
                          {page?.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              {/* contents */}
              <div className="section-block">
                <p className="">contents</p>
                <ul className="">
                  {CONTENTS?.map((page) => (
                    <Link href={page?.link} key={page?.name}>
                      <li
                        className={`group ${pathname === page?.link && "bg-neutral-100 text-neutral-700"}`}
                        onClick={onClickSidebarLinkOnMobile}
                      >
                        <span>
                          <page.icon className="size-[18px] group-hover:text-neutral-700" />
                        </span>

                        <span className="group-hover:text-neutral-700">
                          {page?.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              {/* teams */}
              <div className="section-block">
                <p className="">teams</p>
                <ul className="">
                  {TEAMS?.map((page) => (
                    <Link
                      href={page?.link}
                      key={page?.name}
                      onClick={onClickSidebarLinkOnMobile}
                    >
                      <li
                        className={`group ${pathname === page?.link && "bg-neutral-100 text-neutral-700"}`}
                        onClick={onClickSidebarLinkOnMobile}
                      >
                        <span>
                          <page.icon className="size-[18px] group-hover:text-neutral-700" />
                        </span>

                        <span className="group-hover:text-neutral-700">
                          {page?.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </main>

            {/* footer */}
            <footer className="flex h-[12vh] items-center gap-3 border-t border-neutral-200 px-3">
              <div className="flex size-10 items-center justify-center rounded-full border bg-neutral-100">
                <p className="text-sm font-medium uppercase">dsi</p>
              </div>
              <div className="">
                <p className="text-grey-800 text-[14.5px] font-medium">DSI</p>
                <p className="text-[13px] text-neutral-500">
                  official@dsi-sports.com
                </p>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// start working on creating new article page
