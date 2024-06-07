import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/ui/fonts";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";

export const metadata: Metadata = {
  title: "Flywill Trading Welcome",
  description: "Pre-authentication welcome page for Flywill Trading customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
