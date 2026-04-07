"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import Image from "next/image";
import { Globe } from "lucide-react";

export default function TopHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "fr" : "ar";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
            <Image
              src="/icon-192x192.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-sm sm:text-lg text-gray-900 dark:text-white line-clamp-1">
            الشركة الموريتانية للتسويق
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            {t("home")}
          </Link>
          <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            {t("categories")}
          </Link>
          <Link href="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            {t("favorites")}
          </Link>
          <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            {t("profile")}
          </Link>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            aria-label="Toggle Language"
          >
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-200 uppercase">
              {locale === "ar" ? "FR" : "AR"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
