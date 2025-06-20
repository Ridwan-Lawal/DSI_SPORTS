import QueryProviders from "@/src/app/_lib/react-query/Providers";
import StoreProvider from "@/src/app/_lib/redux/StoreProvider";
import { roboto } from "@/src/app/_styles/font";
import "@_styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

export const metadata: Metadata = {
  title: {
    template: "%s - DSI Football",
    default: "Home - DSI Football",
  },

  description:
    "DSI Football is a platform dedicated to providing the latest news, updates, and insights on football. Stay informed with our comprehensive coverage of local and international football events.",
  // To add metadata for each social media platform, you can use the following format
  twitter: {
    // defines how the opengraph  image will look on twitter maybe small or large
    card: "summary_large_image",
    description:
      "Delivering the latest football news, updates, and insights. Stay informed with DSI Football.",
    title: "DSI Football - Your Source for Football News",
  },

  openGraph: {
    title: {
      template: "%s - DSI Football",
      default: "Home - DSI Football",
    },
    description:
      "Delivering the latest football news, updates, and insights. Stay informed with DSI Football.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DSI Football",
    locale: "en_US",
    type: "website",
  },
  applicationName: "Your Sport Site",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Your Name", url: "https://yoursite.com" }],
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto?.className} scrollbar-thin overflow-y-scroll antialiased`}
      >
        <QueryProviders>
          <StoreProvider>
            <main>{children}</main>
          </StoreProvider>
        </QueryProviders>
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

// continue with the domain, and resend configuration, email configuration
// still continue with the seo, find out how you can be seen when user search for your site
// Then do the google search console from that tutorial
