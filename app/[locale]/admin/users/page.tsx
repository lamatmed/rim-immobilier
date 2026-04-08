import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import UserRoleButton from "@/components/admin/UserRoleButton";
import { Users, Search, ArrowLeft, UserCog, Shield, User, X } from "lucide-react";

// Skeleton component for loading state
function AdminUsersSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pb-28 max-w-6xl animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Search skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Users list skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AdminUsersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ phone?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });
  const sp = (await searchParams) ?? {};
  const phoneQuery = (sp.phone ?? "").trim();

  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect(`/${locale}/`);
  }

  const users = await prisma.user.findMany({
    where: phoneQuery
      ? {
          phone: {
            contains: phoneQuery,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: { name: "asc" },
    select: { id: true, name: true, phone: true, role: true },
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === "ADMIN").length,
    users: users.filter(u => u.role === "USER").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pb-28 max-w-6xl">
        
        {/* Header avec animation */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {t("users_title") ?? "Utilisateurs"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("users_subtitle") ?? "Gérez les utilisateurs et leurs permissions"}
                </p>
              </div>
            </div>
            <Link
              href="/admin/dashboard"
              className="group px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-all duration-200 hover:shadow-md flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t("dashboard_button")}
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("stats_total") ?? "Total"}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("stats_admins") ?? "Administrateurs"}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.admins}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("stats_users") ?? "Utilisateurs"}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.users}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <Search className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold text-gray-900 dark:text-white">{t("search_title") ?? "Rechercher"}</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("search_subtitle") ?? "Filtrer les utilisateurs par numéro de téléphone"}</p>
          </div>
          
          <form method="GET" className="p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  defaultValue={phoneQuery}
                  placeholder={t("users_search_placeholder")}
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {phoneQuery && (
                  <Link
                    href="/admin/users"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </Link>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                {t("users_search_button")}
              </button>
              {phoneQuery && (
                <Link
                  href="/admin/users"
                  className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {t("users_clear_button")}
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Header avec résultats */}
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <UserCog className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("results_count", { count: users.length }) ?? `${users.length} utilisateur${users.length > 1 ? 's' : ''} trouvé${users.length > 1 ? 's' : ''}`}
                </span>
              </div>
              {phoneQuery && (
                <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  {t("active_filter") ?? "Filtre"}: {phoneQuery}
                </div>
              )}
            </div>
          </div>

          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("empty_title") ?? "Aucun utilisateur trouvé"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                {phoneQuery 
                  ? t("empty_search_description") ?? "Aucun utilisateur ne correspond à ce numéro de téléphone"
                  : t("empty_description") ?? "La liste des utilisateurs est vide"}
              </p>
              {phoneQuery && (
                <Link
                  href="/admin/users"
                  className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  {t("clear_filter_button") ?? "Effacer le filtre"}
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {users.map((u, index) => (
                <li 
                  key={u.id} 
                  className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                            {u.name}
                            {session.id === u.id && (
                              <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                                {t("you_badge")}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <span className="text-xs">📱</span> {u.phone}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              u.role === "ADMIN" 
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" 
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}>
                              <span className="flex items-center gap-1">
                                {u.role === "ADMIN" ? (
                                  <>
                                    <Shield className="w-3 h-3" />
                                    {t("role_admin")}
                                  </>
                                ) : (
                                  <>
                                    <User className="w-3 h-3" />
                                    {t("role_user")}
                                  </>
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 opacity-100 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                      {session.id !== u.id && (
                        <>
                          <UserRoleButton id={u.id} currentRole={u.role} />
                          <DeleteUserButton id={u.id} />
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export { AdminUsersSkeleton };