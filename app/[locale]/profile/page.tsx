import { useTranslations } from "next-intl";
import { User, Settings, Phone, Bell, LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const tNav = useTranslations("Navigation");
  const t = useTranslations("Profile");

  const menuItems = [
    { icon: User, label: t("my_info"), href: "#" },
    { icon: Bell, label: t("notifications"), href: "#" },
    { icon: Settings, label: t("settings"), href: "#" },
    { icon: Phone, label: t("support"), href: "#" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {tNav("profile")}
      </h1>

      {/* User Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center me-4">
          <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("visitor")}</h2>
          <p className="text-sm text-gray-500">{t("login_prompt")}</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}
            >
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <Icon className="w-5 h-5 me-3 text-gray-400" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </button>
          );
        })}
      </div>

      {/* Logout / Login CTA */}
      <button className="w-full flex items-center justify-center p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-2xl font-semibold transition-colors hover:bg-red-100 dark:hover:bg-red-900/40">
        <LogOut className="w-5 h-5 me-2 rtl:rotate-180" />
        {t("logout")}
      </button>
    </div>
  );
}
