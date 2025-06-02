import logo from "@/public/svg/logo-grayscale.svg";
import { bebasNeue } from "@/src/app/_styles/font";
import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { heading: "quick links", links: [{ name: "News", link: "/news" }] },
  {
    heading: "about us",
    links: [
      { name: "Company", link: "/company" },
      { name: "contact us", link: "/contactus" },
    ],
  },
  {
    heading: "socials",
    links: [
      {
        name: "X",
        link: "https://x.com/DSI_Football?t=r8tWSLLtInTf7z0SEE-r0g&s=09",
      },
      {
        name: "Instagram",
        link: "https://www.instagram.com/dsi_football?utm_source=qr&igsh=NmRoMnczM21jNGlt",
      },
      {
        name: "YouTube",
        link: "https://youtube.com/@dsi_football?si=v3bTBQwlTjzuDXKZ",
      },
      {
        name: "TikTok",
        link: "https://www.tiktok.com/@dsi_foootball?_t=ZM-8whhVbymj5y&_r=1",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="min-h-[200px] bg-neutral-800 px-4 pt-10 pb-5 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative size-10">
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain"
            quality={100}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {FOOTER_LINKS?.map((section, id) => (
            <div key={id} className="space-y-3">
              <h6 className={`${bebasNeue?.className} text-white`}>
                {section?.heading}
              </h6>

              <ul className="flex w-fit flex-col gap-2">
                {section?.links?.map((linkSet, id) => (
                  <Link key={id} href={linkSet?.link}>
                    <li className="w-fit text-[12px] text-neutral-200 capitalize hover:text-white">
                      {linkSet?.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 flex items-center justify-center text-xs font-medium text-white">
          Copyright &copy; {new Date().getFullYear()} DSI Football
        </p>
      </div>
    </footer>
  );
}
