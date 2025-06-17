import aboutBanner from "@/public/top1.webp";
import { bebasNeue } from "@/src/app/_styles/font";
import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden rounded-md">
      <Image
        src={aboutBanner}
        alt="about"
        quality={100}
        placeholder="blur"
        className="object-cover object-top md:h-[400px]"
        priority={true}
      />

      <div className="i absolute bottom-0 flex h-full w-full flex-col justify-end overflow-hidden bg-black/70 p-6 text-white">
        <h3
          className={`${bebasNeue?.className} text-[33.18px] text-white md:text-[39.81px] lg:text-[47px]`}
        >
          About dsi football
        </h3>

        <p className="text-[15px] sm:text-base md:text-[17px] lg:text-[19px]">
          Your trusted source for football news, analysis, and insights.
        </p>
      </div>
    </div>
  );
}
