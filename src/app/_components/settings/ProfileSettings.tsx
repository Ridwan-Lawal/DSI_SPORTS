"use client";

import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";
import { useGetUser } from "@/src/app/_hooks/useGetUser";
import { useUploadImageToCloudinary } from "@/src/app/_hooks/useUploadImageToCloudinary";
import { ProfileSettingsAction } from "@/src/app/_lib/actions/settings/profile";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const [state, formAction, isUpdatingProfile] = useActionState(
    ProfileSettingsAction,
    null,
  );
  const { user, update } = useGetUser();
  console.log(user);
  const { featuredImageLink: avatarUrl, onImageUpload } =
    useUploadImageToCloudinary();
  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      if (state?.success) {
        update();
        toast.success(state?.success);
      } else if (state?.error) {
        toast.error(state?.error);
      }
    }
  }, [state]);

  return (
    <form action={formAction} autoComplete="on" className="md:max-w-[700px]">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* avatar */}
        <div className="flex flex-col items-center gap-5 md:w-[30%]">
          <div className="relative size-[85px] overflow-auto rounded-full bg-neutral-50">
            {avatarUrl || user?.image ? (
              <Image
                src={avatarUrl ? avatarUrl : (user?.image ?? "")}
                alt="avatar"
                quality={100}
                priority={true}
                fill
                className="object-cover"
              />
            ) : (
              ""
            )}
          </div>
          <input
            type="hidden"
            name="avatarUrl"
            disabled={isUpdatingProfile}
            aria-disabled={isUpdatingProfile}
            id="avatarUrl"
            value={avatarUrl ?? ""}
          />
          <Button
            variant="outline"
            className="relative w-[150px] border-neutral-200 text-neutral-600"
            type="button"
          >
            <input
              type="file"
              name="avatar"
              id="avatar"
              disabled={isUpdatingProfile}
              aria-disabled={isUpdatingProfile}
              onChange={(e) => onImageUpload(e)}
              accept="image/*"
              aria-label="avatar"
              aria-live="polite"
              className="z-10 cursor-pointer opacity-0 file:cursor-pointer"
            />
            <span className="absolute w-full text-sm">Upload an Avatar</span>
          </Button>
          {formErrors?.avatar && (
            <p className="text-xs text-red-500">{formErrors?.avatar}</p>
          )}
        </div>

        {/* display name */}
        <div className="flex-1 space-y-4">
          <Input
            htmlFor="displayName"
            label="Display Name"
            error={formErrors?.displayName?.at(0)}
          >
            <input
              type="text"
              name="displayName"
              id="displayName"
              autoComplete="displayName"
              disabled={isUpdatingProfile}
              aria-disabled={isUpdatingProfile}
              defaultValue={(inputs?.name as string) ?? user?.name}
              aria-label="display name"
              aria-live="polite"
              aria-describedby="displayName-error"
              aria-invalid={!!formErrors?.displayName?.at(0)}
              placeholder="Your display name"
            />
            <p className="text-[13px] text-neutral-500">
              This is how your name will appear on the site.
            </p>
          </Input>

          <Input htmlFor="bio" label="Bio" error={formErrors?.bio?.at(0)}>
            <textarea
              rows={4}
              name="bio"
              id="bio"
              autoComplete="bio"
              disabled={isUpdatingProfile}
              aria-disabled={isUpdatingProfile}
              defaultValue={(inputs?.bio as string) ?? user?.bio}
              aria-label="bio"
              aria-live="polite"
              aria-describedby="bio-error"
              aria-invalid={!!formErrors?.bio?.at(0)}
              placeholder="A brief intro about yourself."
            />
          </Input>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          className="text-right"
          disabled={isUpdatingProfile}
          aria-disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? "Saving changes..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
