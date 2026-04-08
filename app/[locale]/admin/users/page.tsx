import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import UserRoleButton from "@/components/admin/UserRoleButton";

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

  return (
    <div className="container mx-auto px-4 py-10 pb-28 max-w-5xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("users_title") ?? "Utilisateurs"}
        </h1>
        <Link
          href="/admin/dashboard"
          className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold"
        >
          {t("dashboard_button")}
        </Link>
      </div>

      <form method="GET" className="mb-6 flex items-center gap-3">
        <input
          type="text"
          name="phone"
          defaultValue={phoneQuery}
          placeholder={t("users_search_placeholder")}
          className="w-full sm:max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          {t("users_search_button")}
        </button>
        <Link
          href="/admin/users"
          className="px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold"
        >
          {t("users_clear_button")}
        </Link>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-gray-600 dark:text-gray-300 font-medium">
            {t("users_empty")}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((u) => (
              <li key={u.id} className="p-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-extrabold text-gray-900 dark:text-white truncate">
                    {u.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {u.phone} • {u.role === "ADMIN" ? t("role_admin") : t("role_user")}
                    {session.id === u.id ? ` • (${t("you_badge")})` : ""}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {session.id !== u.id && (
                    <>
                      <UserRoleButton id={u.id} currentRole={u.role} />
                      <DeleteUserButton id={u.id} />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

