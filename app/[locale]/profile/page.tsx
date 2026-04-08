import { getTranslations } from "next-intl/server";
import { User, ChevronRight, LogIn, MessageCircle, LayoutDashboard } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Link } from "@/i18n/routing";
import LogoutButton from "@/components/auth/LogoutButton";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};
  const activeTab = sp.tab ?? "";
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const t = await getTranslations({ locale, namespace: "Profile" });
  const tAuth = await getTranslations({ locale, namespace: "Auth" });
  const session = await getSession();

  const menuItems = [
    { icon: User, label: t("my_info"), href: "/profile?tab=info" },
    { icon: MessageCircle, label: t("support"), href: `https://wa.me/22230572816?text=${encodeURIComponent(locale === "ar" ? "مرحباً، أحتاج إلى مساعدة." : "Bonjour, j'ai besoin d'aide.")}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {tNav("profile")}
      </h1>

      {/* User Header */}
      <div className={`rounded-3xl p-8 mb-8 border transition-all ${
        session 
          ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm" 
          : "bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-500 shadow-xl shadow-blue-200 dark:shadow-none"
      }`}>
        <div className="flex items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
            session ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : "bg-white/20 backdrop-blur-md text-white"
          }`}>
            <User className="w-10 h-10" />
          </div>
          <div className="ms-5">
            <h2 className={`text-xl font-extrabold ${session ? "text-gray-900 dark:text-white" : "text-white"}`}>
              {session ? session.name : t("visitor")}
            </h2>
            <p className={`text-sm font-medium ${session ? "text-gray-500" : "text-blue-100"}`}>
              {session ? session.phone : t("login_prompt")}
            </p>
          </div>
        </div>
      </div>

      {session?.role === "ADMIN" ? (
        <Link
          href="/admin/dashboard"
          className="w-full flex items-center justify-center gap-2 p-5 mb-8 bg-blue-600 text-white rounded-3xl font-extrabold shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <LayoutDashboard className="w-5 h-5" />
          {t("admin_dashboard")}
        </Link>
      ) : null}

      {/* Menu List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const targetHref = session ? item.href : "/login";
          
          return (
            <Link
              key={index}
              href={targetHref as any}
              className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              } ${!session && index < 3 ? "opacity-60" : ""}`}
            >
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center me-4 ${
                  session ? "bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400" : "bg-gray-50/50 text-gray-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </Link>
          );
        })}
      </div>

      {session && activeTab === "info" ? (
        <ProfileUpdateForm initialName={session.name} initialPhone={session.phone} />
      ) : null}

      {/* Auth CTA */}
      {session ? (
        <LogoutButton locale={locale} label={t("logout")} />
      ) : (
        <Link
          href="/login"
          className="w-full flex items-center justify-center p-5 bg-blue-600 text-white rounded-3xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <LogIn className="w-5 h-5 me-2" />
          {tAuth("login_button")}
        </Link>
      )}
    </div>
  );
}
