/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

export default function PropertySkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" />
      
      {/* Gallery skeleton */}
      <div className="w-full h-[60vh] bg-gray-200 dark:bg-gray-700" />
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 sm:p-8 shadow-xl">
          
          {/* Price skeleton */}
          <div className="mb-8">
            <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="flex items-start gap-3 p-5 bg-gray-50 dark:bg-gray-900/20 rounded-3xl">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="flex-1">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
          
          {/* Features skeleton */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
          
          {/* Description skeleton */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar skeleton */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="hidden sm:block">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="w-full sm:w-auto h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}