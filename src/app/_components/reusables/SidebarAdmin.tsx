"use client";

import { Skeleton } from "@/components/ui/skeleton";
import logoNoBg from "@/public/svg/logo-grayscale.svg";
import { useGetUser } from "@/src/app/_hooks/useGetUser";
import { useSidebar } from "@/src/app/_hooks/useSidebar";
import { signOutAction } from "@/src/app/_lib/actions/auth/logout";
import {
  getLayout,
  onToggleSidebar,
} from "@/src/app/_lib/redux/features/layoutSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import { CONTENTS, DASHBOARD, PAGES, TEAMS } from "@/src/app/_utils/constant";
import { LogOut, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin() {
  const { user } = useGetUser();

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
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          className="sidebar-overlay fixed z-30 w-full bg-black/30 backdrop-blur-[2px] md:static"
        >
          <div className="z-30 flex h-[100dvh] w-[260px] flex-col justify-between border-r border-neutral-200 bg-white backdrop-blur-[2px] md:h-screen">
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
              <div className="section-block sm:hidden">
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
            <footer className="flex h-[12vh] items-center justify-between gap-4 border-t border-neutral-200 px-3">
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Skeleton className="size-10" />
                  )}
                </div>
                <div className="">
                  {user?.name ? (
                    <p className="text-grey-800 text-[14.5px] font-medium">
                      {user?.name}
                    </p>
                  ) : (
                    <Skeleton className="h-3 w-20" />
                  )}
                  {user?.email ? (
                    <p className="text-grey-800 text-[11.5px] text-neutral-400">
                      {user?.email}
                    </p>
                  ) : (
                    <Skeleton className="mt-2 h-3 w-28" />
                  )}
                </div>
              </div>

              <button onClick={() => signOutAction()}>
                <LogOut className="size-[19px] text-neutral-700" />
              </button>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// start working on creating new article page
