"use client";

import Input from "@/src/app/_components/auth/Input";
import { contactCompany } from "@/src/app/_lib/actions/public/contact";
import { CONTACTS } from "@/src/app/_utils/constant";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [state, formAction, isSubmitting] = useActionState(
    contactCompany,
    null,
  );

  const { inputs, formErrors } = state ?? {};

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
    <div>
      <form
        action={formAction}
        autoComplete="on"
        className="mx-auto flex max-w-[600px] flex-col gap-6"
      >
        {/*============== Who to contact========= */}
        <div className="flex flex-col gap-2">
          <label htmlFor="emailToContact" className="text-[15px] font-medium">
            Who do you wish to contact*:{" "}
          </label>
          <select
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            defaultValue={inputs?.emailToContact as string}
            name="emailToContact"
            id="emailToContact"
            className="cursor-pointer rounded-sm border border-neutral-200 px-4 py-2.5 outline-gray-200"
          >
            {CONTACTS?.map((contact, id) => (
              <option key={id} value={contact?.email} className="text-[15px]">
                {contact?.department} ({contact?.email})
              </option>
            ))}
          </select>
        </div>

        {/* =============  summary =================== */}
        <Input
          htmlFor="summary"
          label="Summary*"
          error={formErrors?.summary?.at(0)}
        >
          <input
            type="text"
            name="summary"
            id="summary"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            defaultValue={inputs?.summary as string}
            autoComplete="summary"
            aria-label="summary"
            aria-live="polite"
            aria-invalid={!!formErrors?.summary?.at(0)}
          />
        </Input>

        {/* =============  Message =================== */}
        <Input
          htmlFor="message"
          label="Message*"
          error={formErrors?.message?.at(0)}
        >
          <textarea
            rows={4}
            name="message"
            id="message"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            defaultValue={inputs?.message as string}
            autoComplete="message"
            aria-label="message"
            aria-live="polite"
            aria-invalid={!!formErrors?.message?.at(0)}
          />
        </Input>

        {/* =============  Your name =================== */}
        <Input
          htmlFor="name"
          label="Your Name*"
          error={formErrors?.name?.at(0)}
        >
          <input
            type="text"
            name="name"
            id="name"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            defaultValue={inputs?.name as string}
            autoComplete="name"
            aria-label="name"
            aria-live="polite"
            aria-invalid={!!formErrors?.name?.at(0)}
          />
        </Input>

        {/* =============  Your email =================== */}
        <Input
          htmlFor="email"
          label="Your Email*"
          error={formErrors?.email?.at(0)}
        >
          <input
            type="text"
            name="email"
            id="email"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            defaultValue={inputs?.email as string}
            autoComplete="email"
            aria-label="email"
            aria-live="polite"
            aria-invalid={!!formErrors?.email?.at(0)}
          />
        </Input>

        <button
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="mt-1 rounded-sm bg-neutral-800 px-6 py-2.5 text-[15px] font-medium text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
