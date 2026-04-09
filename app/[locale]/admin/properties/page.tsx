import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";
import Image from "next/image";

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
    <div className="container mx-auto px-4 py-6 sm:py-10 pb-28 max-w-6xl">
      {/* Header avec animation et meilleur responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("properties_title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("properties_total_count", { count: properties.length })}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/admin/dashboard"
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200 text-center"
          >
            ← {t("dashboard_button")}
          </Link>
          <Link
            href="/admin/add-property"
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium transition-all duration-200 text-center shadow-lg shadow-blue-600/20"
          >
            + {t("add_property_title")}
          </Link>
        </div>
      </div>

      {/* Liste des propriétés */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 sm:p-16 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {t("properties_empty")}
            </p>
            <Link
              href="/admin/add-property"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
            >
              <span>+</span>
              <span>   {t("add_property_title")}</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {properties.map((p, index) => (
              <div
                key={p.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4">
                  {/* Image de la propriété */}
                  <div className="w-full sm:w-32 h-32 sm:h-24 flex-shrink-0">
                    {p.image ? (
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={p.image}
                          alt={p.location}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 128px"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <span className="text-3xl">🏠</span>
                      </div>
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-gray-900 dark:text-white text-lg truncate">
                          {p.location}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {p.price.toLocaleString()} €
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            • {p.type}
                          </span>
                          {p.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              ⭐ {t("featured_badge")}
                            </span>
                          )}
                        </div>
                      
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3 sm:mt-0">
                        <Link
                          href={`/admin/properties/${p.id}`}
                          className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200 text-sm"
                        >
                          ✏️ {t("edit_button")}
                        </Link>
                        <DeletePropertyButton id={p.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    
    </div>
  );
}