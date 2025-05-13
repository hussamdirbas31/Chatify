"use client";

import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { auth } from "@/lib/firebase/firebase-client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // تسجيل الخروج من Firebase
      await auth.signOut();
      
      // حذف جلسة الكوكي من السيرفر
      const response = await fetch('/api/auth/session', {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
        router.push("/auth/login");
      } else {
        console.error('Failed to delete session');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Signing Out...</span>
        </>
      ) : (
        <>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}