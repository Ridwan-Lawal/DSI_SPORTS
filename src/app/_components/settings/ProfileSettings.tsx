"use client";

import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";

export default function ProfileSettings() {
  return (
    <form action="" autoComplete="on" className="md:max-w-[700px]">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* avatar */}
        <div className="flex flex-col items-center gap-5 md:w-[30%]">
          <div className="size-[85px] rounded-full bg-neutral-50"></div>

          <Button
            variant="outline"
            className="relative w-[150px] border-neutral-200 text-neutral-600"
            type="button"
          >
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              aria-label="avatar"
              aria-live="polite"
              className="z-10 cursor-pointer opacity-0 file:cursor-pointer"
            />
            <span className="absolute w-full text-sm">Upload an Avatar</span>
          </Button>
        </div>

        {/* display name */}
        <div className="flex-1 space-y-4">
          <Input htmlFor="displayName" label="Display Name" error="">
            <input
              type="text"
              name="displayName"
              id="displayName"
              autoComplete="displayName"
              defaultValue=""
              aria-label="display name"
              aria-live="polite"
              placeholder="Your display name"
            />
            <p className="text-[13px] text-neutral-500">
              This is how your name will appear on the site.
            </p>
          </Input>

          <Input htmlFor="bio" label="Bio" error="">
            <textarea
              rows={4}
              name="displayName"
              id="displayName"
              autoComplete="displayName"
              defaultValue=""
              aria-label="display name"
              aria-live="polite"
              placeholder="A brief intro about yourself."
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
