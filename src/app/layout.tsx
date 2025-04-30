import { roboto } from "@/app/_styles/font";
import "@_styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - DSI",
    default: "Home - DSI",
  },

  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto?.className} antialiased`}>{children}</body>
    </html>
  );
}
