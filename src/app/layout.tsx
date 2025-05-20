import "./globals.css";
import  Header  from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/guestSessionContext";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GuestSessionProvider>
        <Header />
        <main className="p-6 mt-16">{children}</main>
        </GuestSessionProvider>
      </body>
    </html>
  );
}
