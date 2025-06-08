import ContactForm from "@/src/app/_components/public/company/ContactForm";
import { bebasNeue } from "@/src/app/_styles/font";

export const metadata = {
  title: "Contact",
};

export default function Page() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-[1440px] border-2 border-green-500 py-12">
        <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className={`${bebasNeue?.className}`}>
              want to get in touch with dsi?
            </h2>
            <p className="text-border-100">
              Want to get in touch with dsi to give feedbacks, make a complaint
              or enquiry? Fill in the quick form below, and someone will get in
              touch with you.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
