import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/shared/providers/Theme";
import { LanguageProvider } from "@/shared/providers/Localization";
import QueryProvider from "@/shared/providers/QueryProvider";
import { SideBarProvider } from "@/shared/providers/Sidebar";

const cmu = localFont({
  src: [
    {
      path: './fonts/CMU-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/CMU-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-cmu',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Nongma-Connect",
  description: "Nongma Connect Manage platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cmu.variable}  antialiased font-cmu`}
      >
        <QueryProvider>
          <LanguageProvider>
            <ThemeProvider>
              <SideBarProvider>
                {children}
              </SideBarProvider>
            </ThemeProvider>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
