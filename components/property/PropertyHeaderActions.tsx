"use client";

import { ArrowLeft, Share2 } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function PropertyHeaderActions() {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "Rim Immobilier",
        url: window.location.href,
      }).catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full p-4 z-50 flex justify-between items-center sm:hidden">
      <Link 
        href="/" 
        className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 dark:border-gray-700/50 active:scale-90 transition-transform"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
      </Link>
      <button 
        className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 dark:border-gray-700/50 active:scale-90 transition-transform"
        aria-label="Share"
        onClick={handleShare}
      >
        <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>
    </div>
  );
}
