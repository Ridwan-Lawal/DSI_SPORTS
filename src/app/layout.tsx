import StoreProvider from "@/src/app/_lib/redux/StoreProvider";
import { roboto } from "@/src/app/_styles/font";
import "@_styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

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
      <body className={`${roboto?.className} antialiased`}>
        <StoreProvider>
          <main>{children}</main>
        </StoreProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: "14px",
              color: "#171717",
            },

            success: {
              duration: 6000,
              iconTheme: {
                primary: "#094702",
                secondary: "#fff",
              },

              icon: <FaCheckCircle className="size-[21px] text-[#108d03]" />,
            },

            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ba0303",
                secondary: "#fff",
              },

              style: {
                color: "#960505",
              },

              icon: <MdError className="size-[21px] text-[#960505]" />,
            },
          }}
        />
      </body>
    </html>
  );
}
