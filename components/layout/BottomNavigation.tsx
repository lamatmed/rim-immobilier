"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Home, Building2, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const navItems = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("categories"), href: "/categories", icon: Building2 },
    { name: t("favorites"), href: "/favorites", icon: Heart },
    { name: t("profile"), href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-safe sm:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
