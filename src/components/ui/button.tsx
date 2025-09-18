import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base =
      "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants: Record<string, string> = {
      default: "bg-cyan-600 hover:bg-cyan-500 text-white",
      outline: "border border-white/20 text-white hover:bg-white/10",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    };
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />
    );
  }
);

Button.displayName = "Button";

