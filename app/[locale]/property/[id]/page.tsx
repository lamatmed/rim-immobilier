import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { mockProperties } from "@/data/mockProperties";
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) return notFound();

  const t = await getTranslations({ locale, namespace: "Property" });
  const location = locale === "ar" ? property.locationAr : property.location;
  
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Mobile Top Nav Overlay */}
      <div className="fixed top-0 left-0 w-full p-4 z-10 flex justify-between items-center sm:hidden backdrop-blur-md bg-white/30 dark:bg-black/30">
        <Link href="/" className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow backdrop-blur-md">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="relative w-full h-[40vh] sm:h-[60vh]">
        <Image
          src={property.image}
          alt={location}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-blue-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 uppercase">
            {property.type}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {formattedPrice} {t("price_suffix")}
          </h1>
          <div className="flex items-center text-gray-200 text-sm">
            <MapPin className="w-4 h-4 me-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm -mt-16 relative z-10 border border-gray-100 dark:border-gray-700">
          
          {/* Amenities Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
              <Maximize className="w-6 h-6 text-blue-500 mb-2" />
              <span className="font-bold text-gray-900 dark:text-white">{property.area}</span>
              <span className="text-xs text-gray-500">{t("sqm")}</span>
            </div>
            {property.bedrooms && (
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <Bed className="w-6 h-6 text-blue-500 mb-2" />
                <span className="font-bold text-gray-900 dark:text-white">{property.bedrooms}</span>
                <span className="text-xs text-gray-500">{t("beds")}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <Bath className="w-6 h-6 text-blue-500 mb-2" />
                <span className="font-bold text-gray-900 dark:text-white">{property.bathrooms}</span>
                <span className="text-xs text-gray-500">{t("baths")}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t("description")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {locale === "ar" 
              ? "عقار ممتاز يقع في قلب المنطقة، مثالي للسكن أو الاستثمار. يتميز بتشطيبات راقية ومساحات واسعة. قريب من جميع الخدمات الأساسية."
              : "Excellente propriété située au cœur du quartier, idéale pour la résidence ou l'investissement. Dispose de finitions de qualité et d'espaces généreux. Proche de toutes les commodités essentielles."}
          </p>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 sm:bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-40">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix demandé</p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">{formattedPrice} {t("price_suffix")}</p>
          </div>
          <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg flex justify-center items-center gap-2 transition-transform active:scale-95">
            <Phone className="w-5 h-5 fill-current" />
            {t("contact_agent")}
          </button>
        </div>
      </div>
    </div>
  );
}
