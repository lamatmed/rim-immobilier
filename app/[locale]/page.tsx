"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@/components/ui/PropertyCard";
import PropertySkeleton from "@/components/ui/PropertySkeleton";
import { Search } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const t = useTranslations("Home");
  const c = useTranslations("Categories");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const categories = [
    { id: "all", name: c("all") },
    { id: "HOUSE", name: c("houses") },
    { id: "APARTMENT", name: c("apartments") },
    { id: "LAND", name: c("lands") },
    { id: "BUILDING", name: c("buildings") },
  ];

  const filteredProperties = properties.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.type === activeCategory;
    const matchesSearch = 
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {/* Light & Modern Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        {/* Soft Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-orange-300/20 dark:bg-orange-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold mb-6 shadow-sm border border-blue-200 dark:border-blue-800/50">
              الشركة الموريتانية للتسويق
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              {t("hero_title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              {t("hero_subtitle")}
            </p>

            {/* Glassmorphic Search Bar */}
            <motion.div 
              className="flex bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 max-w-2xl mx-auto transition-all focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:bg-white dark:focus-within:bg-gray-800"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 me-3" />
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md active:scale-95">
                <Search className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Category Pills */}
        <motion.div 
          className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 pb-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-white/10"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md border border-gray-200/60 dark:border-gray-700"
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Properties Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            {activeCategory === "all" ? t("featured") : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 transition-colors">
            {t("view_all")}
          </button>
        </motion.div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property) => (
                <motion.div 
                  key={property.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
