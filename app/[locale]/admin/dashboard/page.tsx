import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Building2, Users } from "lucide-react";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });

  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect(`/${locale}/`);
  }

  const cards = [
    {
      title: t("properties_title") ?? "Annonces",
      href: "/admin/properties",
      icon: Building2,
      description: t("properties_desc") ?? "Créer, modifier, supprimer des annonces.",
    },
    {
      title: t("users_title") ?? "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      description:
        t("users_desc") ?? "Voir les utilisateurs, supprimer, gérer les rôles.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-28 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("dashboard_title") ?? "Dashboard Admin"}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-gray-900 dark:text-white">
                    {c.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {c.description}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

