"use client";

import { motion } from "framer-motion";

export default function PropertySkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 h-[400px]">
      {/* Image Skeleton */}
      <div className="relative h-48 sm:h-56 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 h-full"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-5 w-1/4 bg-blue-100 dark:bg-blue-900/30 rounded-lg animate-pulse" />
        </div>
        
        <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
          <div className="h-5 w-1/4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-5 w-1/4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-5 w-1/4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
