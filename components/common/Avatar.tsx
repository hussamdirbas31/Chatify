interface AvatarProps {
  src?: string;
  name?: string; // Make name optional
}

export default function Avatar({ src, name = '' }: AvatarProps) {
  // Safely handle the name splitting
  const initials = name
    ? name
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : '??'; // Default initials if name is not provided

  return (
    <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
      {src ? (
        <img src={src} alt={name || 'User avatar'} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}