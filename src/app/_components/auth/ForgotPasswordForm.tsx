"use client";

import Input from "@/src/app/_components/auth/Input";
import { forgotPasswordAction } from "@/src/app/_lib/actions/auth/reset-password";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [state, formAction, isSendingMail] = useActionState(
    forgotPasswordAction,
    null,
  );

  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.success);
      }
    }
  }, [state]);

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1 text-center">
        <h5 className="font-medium">Forgot your password?</h5>
        <p className="text-sm text-neutral-500">
          Enter your email address to reset your password.
        </p>
      </div>

      <form action={formAction} autoComplete="on" className="space-y-5">
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
            disabled={isSendingMail}
            aria-disabled={isSendingMail}
            className={`${formErrors?.email?.at(0) && "border border-red-600"}`}
          />
        </Input>

        <div className="space-y-4">
          <button
            type="submit"
            aria-label="login"
            className="auth-btn disabled:bg-neutral-700"
            disabled={isSendingMail}
            aria-disabled={isSendingMail}
          >
            {isSendingMail ? (
              <span className="italic"> Sending password reset mail...</span>
            ) : (
              "Send password reset mail"
            )}
          </button>

          <Link href="/auth/admin/login">
            <button
              type="button"
              aria-label="back to login"
              className="auth-btn bg-neutral-200 font-medium text-neutral-900 transition-colors hover:bg-gray-300"
              disabled={isSendingMail}
              aria-disabled={isSendingMail}
            >
              Back to Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
