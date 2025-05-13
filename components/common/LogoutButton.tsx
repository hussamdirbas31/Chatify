"use client";

import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

 

  return (
    <button
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