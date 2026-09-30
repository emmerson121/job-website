import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import { auth } from "@/auth";
import "aos/dist/aos"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Job Posting Website",
  description: "A job posting platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();



  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
        <div className="min-h-screen bg-[#edeef1]">
          <Navbar />
        <main className="container mx-auto px-4 py-8 pt-25">
        {children}
        </main>
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
