import { Button } from "@/components/ui/button";
import Input from "@/src/app/_components/auth/Input";

export default function EmailSettings() {
  return (
    <form action="" autoComplete="on" className="space-y-6 md:max-w-[700px]">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-[30%]"></div>

        <div className="flex-1 space-y-4 border-t border-neutral-200 pt-5">
          <h6>Account security</h6>
          <p className="text-[15px] font-semibold">Change Email Address</p>
          <Input htmlFor="email" label="Email Address" error="">
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              defaultValue=""
              aria-label="email"
              aria-live="polite"
              placeholder="Change your email address"
            />
          </Input>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button className="text-right">Update Email</Button>
      </div>
    </form>
  );
}
