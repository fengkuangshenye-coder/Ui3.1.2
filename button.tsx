import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-cyan-600 hover:bg-cyan-700 text-white",
      outline: "border border-white/20 hover:bg-white/10",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    };

    return (
      <button
        ref={ref}
        className={`px-3 py-2 rounded-md text-sm font-medium transition ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
