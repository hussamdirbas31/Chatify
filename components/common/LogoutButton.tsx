"use client";

import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Add your logout API call here
      // await logout();
      
      // Redirect after logout
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
      aria-label="Sign out"
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