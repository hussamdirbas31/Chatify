interface AvatarProps {
    src?: string;
    name: string;
  }
  
  export default function Avatar({ src, name }: AvatarProps) {
    const initials = name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  
    return (
      <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
        {src
          ? <img src={src} alt={name} className="w-full h-full object-cover" />
          : initials}
      </div>
    );
  }
  