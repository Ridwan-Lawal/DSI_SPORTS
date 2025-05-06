"use client";

import Input from "@/src/app/_components/auth/Input";
import PasswordInput from "@/src/app/_components/auth/PasswordInput";
import { usePassword } from "@/src/app/_hooks/usePassword";
import { loginAction } from "@/src/app/_lib/actions/auth/login";
import { DEFAULT_ADMIN_REDIRECT } from "@/src/route";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback");

  const { onShowPassword, showPassword, inputRef, isPasswordInputFocused } =
    usePassword();
  const [state, formAction, isLoggingIn] = useActionState(loginAction, null);
  const router = useRouter();

  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      // if successful
      if (state?.success) {
        toast.success(state?.success);

        // if successful and redirect (this is only for other login other than the first) is true, then redirect
        if (state?.redirect) {
          router.push(callbackUrl || DEFAULT_ADMIN_REDIRECT);
        }
      }

      // if there's an error
      if (state?.error) {
        toast.error(state?.error);
      }
    }
  }, [state, router, callbackUrl]);

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1 text-center">
        <h5 className="font-medium">Login</h5>
        <p className="text-sm text-neutral-500">
          Enter your credentials to access the dashboard
        </p>
      </div>

      <form action={formAction} autoComplete="on" className="space-y-3">
        <input
          type="hidden"
          value={callbackUrl ? callbackUrl : ""}
          name="callbackUrl"
          id="callbackUrl"
        />
        <Input htmlFor="email" label="email" error={formErrors?.email?.at(0)}>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            defaultValue={inputs?.email as string}
            aria-label="email"
            placeholder="example@email.com"
            aria-live="polite"
            aria-describedby="email-error"
            aria-invalid={!!formErrors?.email?.at(0)}
            disabled={isLoggingIn}
            aria-disabled={isLoggingIn}
            className={`${formErrors?.email?.at(0) && "border border-red-600"}`}
          />
        </Input>

        <div>
          <PasswordInput
            htmlFor="password"
            label="Password"
            isPasswordInputFocused={isPasswordInputFocused}
            onShowPassword={onShowPassword}
            showPassword={showPassword}
            error={formErrors?.password?.at(0)}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="password"
              defaultValue={inputs?.password as string}
              aria-label="password"
              placeholder="**********"
              aria-live="polite"
              aria-describedby="password-error"
              aria-invalid={!!formErrors?.password?.at(0)}
              disabled={isLoggingIn}
              aria-disabled={isLoggingIn}
              className="password"
              ref={inputRef}
            />
          </PasswordInput>

          <Link href="/auth/admin/forgot-password">
            <button
              type="button"
              className="relative right-0 mt-2 w-full text-right text-sm text-neutral-500 underline"
              disabled={isLoggingIn}
              aria-disabled={isLoggingIn}
            >
              Forgot password?
            </button>
          </Link>
        </div>

        <button
          type="submit"
          aria-label="login"
          className="auth-btn disabled:bg-neutral-700"
          disabled={isLoggingIn}
          aria-disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <span className="italic">Logging in...</span>
          ) : (
            " Login to dashboard"
          )}
        </button>
      </form>
    </div>
  );
}
