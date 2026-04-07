import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import TopHeader from "@/components/layout/TopHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الشركة الموريتانية للتسويق - Marketing & Digital Solutions",
  description: "Agence de marketing digital en Mauritanie - Solutions créatives et stratégiques pour votre entreprise.",
};

export const viewport: Viewport = {
  themeColor: "#001f3f",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-16 sm:pb-0 antialiased`}
    >
      <NextIntlClientProvider messages={messages}>
        <TopHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
        <BottomNavigation />
        <WhatsAppButton />
      </NextIntlClientProvider>
    </div>
  );
}
