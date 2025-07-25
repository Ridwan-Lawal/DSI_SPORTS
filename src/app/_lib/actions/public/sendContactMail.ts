import EmailContactTemplate from "@/src/app/_components/public/company/EmailContactTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  emailToContact: string;
  summary: string;
  message: string;
}

export async function sendContactMail(contactFormData: ContactFormData) {
  const { name, email, message } = contactFormData;

  await resend.emails.send({
    from: "query@dsifootball.live",
    to: contactFormData?.emailToContact,
    subject: contactFormData?.summary,
    react: EmailContactTemplate({ name, email, message }),
  });
}
