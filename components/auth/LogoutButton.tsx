"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton({
  locale,
  label,
}: {
  locale: string;
  label: string;
}) {
  const tProfile = useTranslations("Profile");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const onLogout = async () => {
    if (loading || success) return;
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setSuccess(tProfile("success_logout"));
      window.dispatchEvent(new Event("auth-changed"));
      router.refresh();
      setTimeout(() => {
        router.push("/");
      }, 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-2xl text-sm font-bold border border-green-100 dark:border-green-800">
          {success}
        </div>
      )}
      <button
        type="button"
        onClick={onLogout}
        disabled={loading || !!success}
        className="w-full flex items-center justify-center p-5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-3xl font-bold transition-all hover:bg-red-100 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 me-2 animate-spin" />
        ) : (
          <LogOut className="w-5 h-5 me-2 rtl:rotate-180" />
        )}
        {label}
      </button>
    </div>
  );
}

