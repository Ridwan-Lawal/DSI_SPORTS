import { bebasNeue } from "@/src/app/_styles/font";
import { SOCIALS } from "@/src/app/_utils/constant";

export default function SocialsMediaDetails() {
  return (
    <div className="space-y-6 px-4 py-8 sm:px-6 md:px-8">
      <h5 className={`${bebasNeue?.className} text-xl text-neutral-500`}>
        Follow Dsi
      </h5>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {SOCIALS?.map((social, id) => (
          <div
            key={id}
            className="cursor-pointer space-y-2 border-2 border-transparent bg-white px-4 py-4 transition-all hover:border-neutral-700"
          >
            <p>
              <social.icon />
            </p>
            <p className="text-xs text-neutral-500">{social?.name}</p>
            <p className="text-[13px] font-medium">{social?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
