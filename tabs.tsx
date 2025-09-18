import * as React from "react";

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex border-b border-white/10">{children}</div>;
}

export function TabsTrigger({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm ${
        active ? "border-b-2 border-cyan-500 text-cyan-300" : "text-muted-foreground hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, hidden }: { children: React.ReactNode; hidden?: boolean }) {
  if (hidden) return null;
  return <div className="mt-4">{children}</div>;
}
