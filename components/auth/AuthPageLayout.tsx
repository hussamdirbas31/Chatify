import Link from "next/link";
import Image from "next/image";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerHref: string;
  showImage?: boolean;
}

export default function AuthPageLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerHref,
  showImage = false,
}: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen flex bg-zinc-950">
      {showImage && (
        <div className="hidden lg:block relative w-1/2 ">
          <Image
            src="/auth.png"
            alt="Authentication background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}
      <div className={`flex-1 flex items-center justify-center p-6 ${showImage ? "lg:w-1/2" : "w-full"}`}>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {title}
              </span>
            </h1>
            <p className="mt-2 text-zinc-400">{subtitle}</p>
          </div>
          {children}
          <div className="text-center text-sm text-zinc-500">
            {footerText}{" "}
            <Link 
              href={footerHref} 
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              {footerLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}