import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    template: "%s | Istay",
    default: "Istay",
  },
  description:
    "Making your trip memorable located across the world , luxuirous & afforable",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} flex max-h-screen flex-col gap-4 bg-primary-950 text-accent-50 antialiased`}
      >
        <Header />
        <div className="bg-red h-screen px-10 py-12">
          <main className="text-3xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
