// components/common/LogoutButton.tsx
import Button from "@/components/common/Button";

export default function LogoutButton() {
  return (
    <Button variant="danger" className="w-full justify-start gap-3 p-3">
      <svg
        className="w-5 h-5 text-rose-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="text-zinc-100">Logout</span>
    </Button>
  );
}