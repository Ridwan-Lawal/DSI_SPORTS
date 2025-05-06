import logo from "@/public/svg/logo-color.svg";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-3 px-4 md:px-6">
      {/* Dsi logo */}
      <div className="relative flex h-[50px] w-[50px] items-center justify-center">
        <Image
          src={logo}
          alt="logo"
          quality={100}
          priority={true}
          fill
          className="object-contain"
        />
      </div>

      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
}
