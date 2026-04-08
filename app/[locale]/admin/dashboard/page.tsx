import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Building2, Users, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

// Skeleton component
function AdminDashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 pb-28 max-w-5xl animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="flex-1">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const [totalProperties, totalUsers] = await Promise.all([
    prisma.property.count(),
    prisma.user.count(),
  ]);

  const cards = [
    {
      title: t("properties_title") ?? "Annonces",
      href: "/admin/properties",
      icon: Building2,
      description: t("properties_desc") ?? "Créer, modifier, supprimer des annonces.",
      count: totalProperties,
      color: "blue",
    },
    {
      title: t("users_title") ?? "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      description: t("users_desc") ?? "Voir les utilisateurs, supprimer, gérer les rôles.",
      count: totalUsers,
      color: "purple",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-28 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
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
              className="group bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-${c.color}-50 dark:bg-${c.color}-900/20 text-${c.color}-600 dark:text-${c.color}-300 flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
                <div className={`bg-${c.color}-50 dark:bg-${c.color}-900/20 rounded-xl px-3 py-2 text-center min-w-[50px]`}>
                  <div className={`text-xl font-bold text-${c.color}-600 dark:text-${c.color}-400`}>
                    {c.count}
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