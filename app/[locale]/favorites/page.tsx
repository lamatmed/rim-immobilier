/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@/components/ui/PropertyCard";
import { HeartCrack } from "lucide-react";

export default function FavoritesPage() {
  const t = useTranslations("Navigation");
  const tFav = useTranslations("Favorites");
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/favorites", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setFavoriteProperties(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (cancelled) return;
        setFavoriteProperties([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {tFav("empty_title")}
          </h2>
          <p className="text-gray-500">{tFav("empty_description")}</p>
        </div>
      )}
    </div>
  );
}
