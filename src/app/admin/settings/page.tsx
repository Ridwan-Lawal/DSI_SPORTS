import EmailSettings from "@/src/app/_components/settings/EmailSettings";
import PasswordSettings from "@/src/app/_components/settings/PasswordSettings";
import ProfileSettings from "@/src/app/_components/settings/ProfileSettings";
import SettingsHeader from "@/src/app/_components/settings/SettingsHeader";
import SocialMediaSettings from "@/src/app/_components/settings/SocialMediaSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-4 pt-4 pb-8 lg:px-6">
      <SettingsHeader />

      {/* settings */}
      <div className="mt-7 space-y-6 rounded-md border border-neutral-100 bg-white px-5 py-4 pb-6 shadow-sm shadow-neutral-100 md:px-7">
        <div>
          <h5>Profile Settings</h5>
          <p className="text-sm text-neutral-400">
            Manage your personal information and account settings.
          </p>
        </div>
        <ProfileSettings />
        <SocialMediaSettings />
        <EmailSettings />
        <PasswordSettings />
      </div>
    </div>
  );
}
