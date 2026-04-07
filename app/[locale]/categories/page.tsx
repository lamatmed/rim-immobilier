import { useTranslations } from "next-intl";
import { Building2, Home, Map, Building } from "lucide-react";
import { mockProperties } from "@/data/mockProperties";

export default function CategoriesPage() {
  const t = useTranslations("Categories");

  const categoryCards = [
    { 
      title: t("buildings"), 
      icon: Building, 
      count: mockProperties.filter(p => p.type === "building").length, 
      color: "bg-blue-500" 
    },
    { 
      title: t("houses"), 
      icon: Home, 
      count: mockProperties.filter(p => p.type === "house").length, 
      color: "bg-emerald-500" 
    },
    { 
      title: t("lands"), 
      icon: Map, 
      count: mockProperties.filter(p => p.type === "land").length, 
      color: "bg-orange-500" 
    },
    { 
      title: t("apartments"), 
      icon: Building2, 
      count: mockProperties.filter(p => p.type === "apartment").length, 
      color: "bg-purple-500" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("all")}
      </h1>
      
      <div className="grid grid-cols-2 gap-4">
        {categoryCards.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${cat.color} text-white rounded-full flex items-center justify-center mb-4`}>
                <IconComponent className="w-7 h-7" />
              </div>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-1">{cat.title}</h2>
              <p className="text-sm text-gray-500">{cat.count} annonces</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
