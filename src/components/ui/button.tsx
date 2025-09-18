import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-cyan-600 hover:bg-cyan-500 text-white",
      outline: "border border-cyan-600 text-cyan-600 hover:bg-cyan-50",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
