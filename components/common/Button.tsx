// components/common/Button.tsx
import Link from 'next/link';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "nav" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  asLink?: boolean;
  className?: string;
  children: React.ReactNode;
  role?: "admin" | "hotel_admin" | "customer"; // إضافة خاصية لتحديد نوع المستخدم
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      asLink = false,
      className = "",
      children,
      role,
      ...props
    },
    ref
  ) => {
    const baseClasses = "rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };

    const variants = {
      primary: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30",
      secondary: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-pink-500/30",
      nav: "bg-transparent text-zinc-300 hover:bg-zinc-800/40 backdrop-blur-sm border border-zinc-800/50 hover:border-indigo-500/30",
      outline: "border border-zinc-800 text-zinc-300 hover:border-indigo-500 hover:text-zinc-100 bg-zinc-900/30",
      danger: "bg-transparent text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40"
    };

    const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`;

    // هنا نضيف دعم للتحقق من الدور (role) وإظهار أزرار مخصصة بناءً على ذلك
    const dynamicHref = role === "admin" ? "/admin/dashboard" : 
                        role === "hotel_admin" ? "/hotel-admin/dashboard" : 
                        "/user/dashboard";

    if (asLink && href) {
      return (
        <Link href={href || dynamicHref} passHref>
          <button
            ref={ref}
            className={buttonClasses}
            {...props}
          >
            {children}
          </button>
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
