"use client";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/src/app/_components/auth/PasswordInput";
import { usePassword } from "@/src/app/_hooks/usePassword";

export default function PasswordSettings() {
  const { onShowPassword, showPassword, inputRef, isPasswordInputFocused } =
    usePassword();
  return (
    <form action="" autoComplete="on" className="space-y-6 md:max-w-[700px]">
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
            error=""
          >
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              autoComplete="currentPassword"
              defaultValue=""
              aria-label="current password"
              aria-live="polite"
              placeholder="********"
              className="password"
              ref={inputRef}
            />
          </PasswordInput>

          {/* current password */}
          <PasswordInput
            htmlFor="newPassword"
            label="New Password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error=""
          >
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              autoComplete="newPassword"
              defaultValue=""
              aria-label="new password"
              aria-live="polite"
              placeholder="********"
              className="password"
              ref={inputRef}
            />
          </PasswordInput>

          {/* current password */}
          <PasswordInput
            htmlFor="confirmNewPassword"
            label="Confirm New Password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error=""
          >
            <input
              type={showPassword ? "text" : "password"}
              name="confirmNewPassword"
              id="confirmNewPassword"
              autoComplete="confirmNewPassword"
              defaultValue=""
              aria-label="confirm new password"
              aria-live="polite"
              placeholder="********"
              className="password"
              ref={inputRef}
            />
          </PasswordInput>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button className="text-right">Update Password</Button>
      </div>
    </form>
  );
}
