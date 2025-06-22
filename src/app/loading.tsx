import logo from "@/public/svg/logo-grayscale.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="spinner-container relative h-[60px] w-[60px]">
        <Image
          src={logo}
          alt="logo"
          quality={100}
          priority={true}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
