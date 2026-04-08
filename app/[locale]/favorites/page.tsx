/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/ui/PropertyCard";
import { HeartCrack } from "lucide-react";

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navigation" });

  const favoriteProperties = await prisma.property.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("favorites")}
      </h1>

      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <HeartCrack className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucun favori</h2>
          <p className="text-gray-500"> Vous n'avez pas encore ajouté de biens à vos favoris.</p>
        </div>
      )}
    </div>
  );
}
