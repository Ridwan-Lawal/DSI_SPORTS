"use client";

import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";
import { useGetUser } from "@/src/app/_hooks/useGetUser";
import { socialMediaAction } from "@/src/app/_lib/actions/settings/social-media";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SocialMediaSettings() {
  const { user, update } = useGetUser();
  const [state, formAction, isUpdatingSocials] = useActionState(
    socialMediaAction,
    null,
  );
  const { formErrors, inputs } = state ?? {};
  const { socials } = user ?? {};

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
    <form
      action={formAction}
      autoComplete="on"
      className="space-y-6 md:max-w-[700px]"
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-[30%]"></div>

        <div className="flex-1 space-y-4 border-t border-neutral-200 pt-5">
          <h6>Social media</h6>
          <input type="hidden" name="userId" value={user?.id} />
          <Input
            htmlFor="X"
            label="Twitter Profile"
            error={formErrors?.X?.at(0)}
          >
            <input
              type="text"
              name="X"
              id="X"
              autoComplete="X"
              defaultValue={(inputs?.X as string) || socials?.X}
              disabled={isUpdatingSocials}
              aria-disabled={isUpdatingSocials}
              aria-label="X"
              aria-describedby="x-error"
              aria-invalid={!!formErrors?.X?.at(0)}
              aria-live="polite"
              placeholder="Your X profile link (e.g https://X.com/dsifootball)"
            />
          </Input>

          <Input
            htmlFor="instagram"
            label="Instagram Profile"
            error={formErrors?.instagram?.at(0)}
          >
            <input
              type="text"
              name="instagram"
              id="instagram"
              autoComplete="instagram"
              defaultValue={(inputs?.instagram as string) || socials?.instagram}
              disabled={isUpdatingSocials}
              aria-disabled={isUpdatingSocials}
              aria-label="instagram"
              aria-describedby="instagram-error"
              aria-invalid={!!formErrors?.instagram?.at(0)}
              aria-live="polite"
              placeholder="Your IG profile link (e.g https://instagram.com/dsifootball)"
            />
          </Input>

          <Input
            htmlFor="whatsapp"
            label="Whatsapp Channel"
            error={formErrors?.whatsapp?.at(0)}
          >
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              autoComplete="whatsapp"
              defaultValue={(inputs?.whatsapp as string) || socials?.whatsapp}
              disabled={isUpdatingSocials}
              aria-disabled={isUpdatingSocials}
              aria-label="whatsapp"
              aria-describedby="whatsapp-error"
              aria-invalid={!!formErrors?.whatsapp?.at(0)}
              aria-live="polite"
              placeholder="Your whatsapp channel link (e.g https://whatsapp.me/dsifootball)"
            />
          </Input>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          disabled={isUpdatingSocials}
          aria-disabled={isUpdatingSocials}
          className="text-right"
        >
          {isUpdatingSocials ? "updating socials" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
