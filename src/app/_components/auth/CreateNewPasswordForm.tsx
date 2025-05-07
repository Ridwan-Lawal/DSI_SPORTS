"use client";

import PasswordInput from "@/src/app/_components/auth/PasswordInput";
import { usePassword } from "@/src/app/_hooks/usePassword";
import { createNewPasswordAction } from "@/src/app/_lib/actions/auth/create-new-password";
import { PASSWORD_REQUIREMENT } from "@/src/app/_utils/constant";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CreateNewPasswordForm() {
  const searchParams = useSearchParams();
  const createPasswordTokenFromUrl = searchParams.get("token") ?? "";
  const { onShowPassword, showPassword, inputRef, isPasswordInputFocused } =
    usePassword();
  const [state, formAction, creatingNewPassword] = useActionState(
    createNewPasswordAction,
    null,
  );
  const router = useRouter();

  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.success);
        router.push("/auth/admin/login");
      }
      if (state?.error) {
        toast.error(state?.error);
      }
    }
  }, [state, router]);

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1 text-center">
        <h5 className="font-medium">Create new password (Admin)</h5>
        <p className="text-sm text-neutral-500">
          Please create a secure password which will be used to access the
          dashboard.
        </p>
      </div>

      <form action={formAction} autoComplete="on" className="">
        <input
          type="hidden"
          name="createPasswordTokenFromUrl"
          value={createPasswordTokenFromUrl}
        />
        <div className="space-y-2">
          <PasswordInput
            htmlFor="newPassword"
            label="New password"
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
              aria-label="new password"
              placeholder="**********"
              aria-live="polite"
              aria-describedby="newPassword-error"
              aria-invalid={!!formErrors?.newPassword?.at(0)}
              disabled={creatingNewPassword}
              aria-disabled={creatingNewPassword}
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

        <div className="mt-4">
          <PasswordInput
            htmlFor="confirmPassword"
            label="Confirm password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error={formErrors?.confirmPassword?.at(0)}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="confirmPassword"
              defaultValue=""
              aria-label="confirm-password"
              placeholder="**********"
              aria-live="polite"
              aria-describedby="confirmPassword-error"
              aria-invalid={!!formErrors?.confirmPassword?.at(0)}
              disabled={creatingNewPassword}
              aria-disabled={creatingNewPassword}
              className="password"
              ref={inputRef}
            />
          </PasswordInput>
        </div>

        <div className="mt-5 space-y-4">
          <button
            type="submit"
            aria-label="create password"
            className="auth-btn disabled:bg-neutral-700"
            disabled={creatingNewPassword}
            aria-disabled={creatingNewPassword}
          >
            {creatingNewPassword ? (
              <span className="italic">Creating password...</span>
            ) : (
              " Create new password"
            )}
          </button>

          <Link href="/auth/admin/login">
            <button
              type="button"
              aria-label="back to login"
              className="auth-btn bg-neutral-200 font-medium text-neutral-900 transition-colors hover:bg-gray-300"
              disabled={creatingNewPassword}
              aria-disabled={creatingNewPassword}
            >
              Back to Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
