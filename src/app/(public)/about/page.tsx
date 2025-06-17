import AboutHero from "@/src/app/_components/public/company/AboutHero";
import AboutStory from "@/src/app/_components/public/company/AboutStory";
import SocialsMediaDetails from "@/src/app/_components/public/home/SocialsMediaDetails";
import { bebasNeue } from "@/src/app/_styles/font";
import { Mail, Phone } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-[1440px] py-12">
        <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8 lg:px-11">
          <AboutHero />
          <AboutStory />
          <div className="space-y-4">
            <h4 className={`${bebasNeue?.className} `}>Contact us</h4>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-800">
                <Phone className="size-4" />

                <a className="underline" href="tel:+2349058033534">
                  +234 (090) 5803-3534
                </a>
              </div>

              <div className="flex items-center gap-3 text-neutral-800">
                <Mail className="size-4" />

                <a
                  className="underline"
                  href="mailto: ibidunnnidoyinsola@gmail.com"
                >
                  ibidunnnidoyinsola@gmail.com
                </a>
              </div>
            </div>
          </div>

          <SocialsMediaDetails />
        </div>
      </div>
    </div>
  );
}
