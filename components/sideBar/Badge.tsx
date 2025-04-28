export default function Badge({ count }: { count: number }) {
  return (
    <span className="absolute right-3 bg-gradient-to-r from-accent to-rose-500 text-text-primary text-xs font-medium px-2 py-0.5 rounded-full">
      {count}
    </span>
  );
}