"use client";

import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";
import { useGetUser } from "@/src/app/_hooks/useGetUser";
import { emailSettingsAction } from "@/src/app/_lib/actions/settings/security";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EmailSettings() {
  const { user, update } = useGetUser();
  const [state, formAction, isUpdatingEmail] = useActionState(
    emailSettingsAction,
    null,
  );

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
    <form
      action={formAction}
      autoComplete="on"
      className="space-y-6 md:max-w-[700px]"
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-[30%]"></div>

        <div className="flex-1 space-y-4 border-t border-neutral-200 pt-5">
          <h6>Account security</h6>
          <p className="text-[15px] font-semibold">Change Email Address</p>
          <Input
            htmlFor="email"
            label="Email Address"
            error={formErrors?.email?.at(0)}
          >
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              disabled={isUpdatingEmail}
              aria-disabled={isUpdatingEmail}
              defaultValue={((inputs?.email as string) || user?.email) ?? ""}
              aria-label="email"
              aria-describedby="email-error"
              aria-invalid={!!formErrors?.email?.at(0)}
              aria-live="polite"
              placeholder="Change your email address"
            />
          </Input>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          disabled={isUpdatingEmail}
          aria-disabled={isUpdatingEmail}
          className="text-right"
        >
          {isUpdatingEmail ? "updating email..." : " Update Email"}
        </Button>
      </div>
    </form>
  );
}
