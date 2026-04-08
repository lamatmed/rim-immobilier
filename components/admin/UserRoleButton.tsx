"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield, User as UserIcon, Loader2 } from "lucide-react";
import type { Role } from "@prisma/client";

export default function UserRoleButton({
  id,
  currentRole,
}: {
  id: string;
  currentRole: Role;
}) {
  const t = useTranslations("Admin");
  const [loading, setLoading] = useState(false);

  const nextRole: Role = currentRole === "ADMIN" ? "USER" : "ADMIN";

  const onToggle = async () => {
    if (loading) return;
    const ok = window.confirm(
      nextRole === "ADMIN"
        ? t("confirm_promote_user")
        : t("confirm_demote_user")
    );
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || t("update_user_role_failed"));
      window.location.reload();
    } catch (e: any) {
      alert(e?.message || t("update_user_role_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold disabled:opacity-70"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : currentRole === "ADMIN" ? (
        <Shield className="w-4 h-4" />
      ) : (
        <UserIcon className="w-4 h-4" />
      )}
      {currentRole === "ADMIN" ? t("make_user_button") : t("make_admin_button")}
    </button>
  );
}

