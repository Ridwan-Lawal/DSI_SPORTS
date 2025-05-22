"use client";

import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";

export default function SocialMediaSettings() {
  return (
    <form action="" autoComplete="on" className="space-y-6 md:max-w-[700px]">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-[30%]"></div>

        <div className="flex-1 space-y-4 border-t border-neutral-200 pt-5">
          <h6>Social media</h6>
          <Input htmlFor="X" label="Twitter Profile" error="">
            <input
              type="text"
              name="X"
              id="X"
              autoComplete="X"
              defaultValue=""
              aria-label="X"
              aria-live="polite"
              placeholder="Your X profile link (e.g https://X.com/dsifootball)"
            />
          </Input>

          <Input htmlFor="instagram" label="Instagram Profile" error="">
            <input
              type="text"
              name="instagram"
              id="instagram"
              autoComplete="instagram"
              defaultValue=""
              aria-label="instagram"
              aria-live="polite"
              placeholder="Your IG profile link (e.g https://instagram.com/dsifootball)"
            />
          </Input>

          <Input htmlFor="whatsapp" label="Whatsapp Channel" error="">
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              autoComplete="whatsapp"
              defaultValue=""
              aria-label="whatsapp"
              aria-live="polite"
              placeholder="Your whatsapp channel link (e.g https://whatsapp.me/dsifootball)"
            />
          </Input>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button className="text-right">Save changes</Button>
      </div>
    </form>
  );
}
