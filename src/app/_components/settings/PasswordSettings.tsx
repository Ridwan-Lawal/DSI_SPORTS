"use client";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/src/app/_components/auth/PasswordInput";
import { usePassword } from "@/src/app/_hooks/usePassword";
import { passwordSettingsAction } from "@/src/app/_lib/actions/settings/security";
import { PASSWORD_REQUIREMENT } from "@/src/app/_utils/constant";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PasswordSettings() {
  const { onShowPassword, showPassword, inputRef, isPasswordInputFocused } =
    usePassword();

  const [state, formAction, isUpdatingPassword] = useActionState(
    passwordSettingsAction,
    null,
  );

  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      if (state?.success) {
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
          <p className="text-[15px] font-bold">Change Password</p>

          {/* current password */}
          <PasswordInput
            htmlFor="currentPassword"
            label="Current Password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error={formErrors?.currentPassword?.at(0)}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              disabled={isUpdatingPassword}
              aria-disabled={isUpdatingPassword}
              autoComplete="currentPassword"
              defaultValue={inputs?.currentPassword as string}
              aria-describedby="currentPassword-error"
              aria-invalid={!!formErrors?.currentPassword?.at(0)}
              aria-label="current password"
              aria-live="polite"
              placeholder="********"
              className="password"
              ref={inputRef}
            />
          </PasswordInput>

          {/* new password */}
          <div className="space-y-2">
            <PasswordInput
              htmlFor="newPassword"
              label="New Password"
              isPasswordInputFocused={isPasswordInputFocused}
              onShowPassword={onShowPassword}
              showPassword={showPassword}
              error={formErrors?.newPassword?.at(0)}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                autoComplete="newPassword"
                defaultValue={inputs?.newPassword as string}
                disabled={isUpdatingPassword}
                aria-disabled={isUpdatingPassword}
                aria-describedby="newPassword-error"
                aria-invalid={!!formErrors?.newPassword?.at(0)}
                aria-label="new password"
                aria-live="polite"
                placeholder="********"
                className="password"
                ref={inputRef}
              />
            </PasswordInput>

            <ul className="ml-4 list-disc">
              {PASSWORD_REQUIREMENT?.map((requirement) => (
                <li key={requirement} className="text-xs text-neutral-400">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          {/* current password */}
          <PasswordInput
            htmlFor="confirmNewPassword"
            label="Confirm New Password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error={formErrors?.confirmNewPassword?.at(0)}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="confirmNewPassword"
              id="confirmNewPassword"
              autoComplete="confirmNewPassword"
              defaultValue={inputs?.confirmNewPassword as string}
              aria-label="confirm new password"
              disabled={isUpdatingPassword}
              aria-disabled={isUpdatingPassword}
              aria-describedby="confirmNewPassword-error"
              aria-invalid={!!formErrors?.confirmNewPassword?.at(0)}
              aria-live="polite"
              placeholder="********"
              className="password"
              ref={inputRef}
            />
          </PasswordInput>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          disabled={isUpdatingPassword}
          aria-disabled={isUpdatingPassword}
          className="text-right"
        >
          {isUpdatingPassword ? "updating password..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
