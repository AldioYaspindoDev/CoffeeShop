import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-black text-white rounded-full px-6 py-3 md:py-2.5 md:px-8 min-h-[44px] md:min-h-[40px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
