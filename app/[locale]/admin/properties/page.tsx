import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

export default async function AdminPropertiesPage({
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

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-10 pb-28 max-w-5xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("properties_title") ?? "Annonces"}
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold"
          >
            {t("dashboard_button")}
          </Link>
          <Link
            href="/admin/add-property"
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            {t("add_property_title") ?? "Ajouter"}
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {properties.length === 0 ? (
          <div className="p-10 text-gray-600 dark:text-gray-300 font-medium">
            {t("properties_empty")}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {properties.map((p) => (
              <li key={p.id} className="p-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-extrabold text-gray-900 dark:text-white truncate">
                    {p.location} — {p.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {p.type} {p.featured ? `• ${t("featured_badge")}` : ""}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/admin/properties/${p.id}`}
                    className="inline-flex items-center px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold"
                  >
                    {t("edit_button")}
                  </Link>
                  <DeletePropertyButton id={p.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

