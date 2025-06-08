"use server";

import { sendContactMail } from "@/src/app/_lib/actions/public/sendContactMail";
import { ContactFormSchema } from "@/src/app/_lib/schema/company-schema";
import { revalidatePath } from "next/cache";

export async function contactCompany(prevState: unknown, formData: FormData) {
  const contactFormData = Object.fromEntries(formData.entries());

  const validatedContactFormData = ContactFormSchema.safeParse(contactFormData);

  if (!validatedContactFormData?.success) {
    return {
      formErrors: validatedContactFormData?.error?.flatten()?.fieldErrors,
      inputs: contactFormData,
    };
  }

  //    send mail
  try {
    await sendContactMail(validatedContactFormData?.data);

    revalidatePath("/contact");

    return { success: "Message successfully sent" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Something went wrong - ${error?.message}` };
    }
  }
}
