import * as React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-cyan-600 text-white",
    secondary: "bg-slate-700 text-white",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
