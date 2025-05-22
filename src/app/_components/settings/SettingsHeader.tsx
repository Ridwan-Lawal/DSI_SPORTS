"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsHeader() {
  const router = useRouter();

  return (
    <>
      <button className="flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="size-4" />{" "}
        <span className="text-[15px] hover:underline">Back</span>
      </button>
      <header className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h4>Settings</h4>
          <p className="text-sm text-neutral-500 md:text-base">
            Configure your website and account preferences.
          </p>
        </div>
      </header>
    </>
  );
}
