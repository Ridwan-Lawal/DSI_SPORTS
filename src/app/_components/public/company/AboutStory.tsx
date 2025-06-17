import DesktopSiteImage from "@/public/desktop-site-image.png";
import MobileSiteImage from "@/public/mobile-site-image.png";
import { bebasNeue } from "@/src/app/_styles/font";
import Image from "next/image";

export default function AboutStory() {
  return (
    <div className="flex flex-col items-center gap-9 md:flex-row">
      {/* Our Story */}

      <div className="space-y-4 md:w-[50%]">
        <h3
          className={`${bebasNeue?.className} text-[33.18px] md:text-[36px] lg:text-[39.81px]`}
        >
          about dsi
        </h3>
        <div className="space-y-3 text-[15.5px] text-neutral-800 md:text-base">
          <p>
            {" "}
            DSI Football is dedicated to delivering back-to-back football
            content, a consistent flow of updates, covering various aspects of
            the sport.
          </p>
          <p>
            We provide coverage of player interviews, which indicates a focus on
            exclusive insights from football players, providing unique
            perspectives.
          </p>
          <p>
            We analyze match results, which underscores a commitment to in-depth
            examination of game outcomes. Predicting matches involves forecasts
            and insights, engaging the audience in discussions and anticipation
            of upcoming matches. Overall, DSI aims to provide comprehensive,
            timely, and engaging coverage of football.
          </p>

          <p>
            Reinvent the game. <br />
            &#127475;
          </p>
        </div>
      </div>

      {/* image */}
      <div className="flex w-[100%] items-center justify-center gap-5 md:w-[50%] lg:w-[40%]">
        <Image
          src={MobileSiteImage}
          alt="mobile-site"
          quality={100}
          placeholder="blur"
          className="w-[30%]"
        />

        <Image
          src={DesktopSiteImage}
          alt="desktop-site"
          quality={100}
          placeholder="blur"
          className="w-[50%]"
        />
      </div>
    </div>
  );
}
