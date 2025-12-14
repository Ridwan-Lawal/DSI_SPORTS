import Footer from "@/src/app/_components/public/Footer";
import NavBar from "@/src/app/_components/public/NavBar";
import { auth } from "@/src/auth";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="">
      <header>
        <SessionProvider session={session}>
          <NavBar />
        </SessionProvider>
      </header>

      <main>{children}</main>
      <Footer />
    </div>
  );
}
