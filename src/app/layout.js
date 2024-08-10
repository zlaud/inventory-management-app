import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "CookNook",
  description: "All your kitchen needs",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Navbar />
          <div className="ml-[20%] w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
