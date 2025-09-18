import * as React from "react";

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return <div className="border border-white/10 rounded-lg">{children}</div>;
}

export function AccordionTrigger({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 font-medium bg-white/5 hover:bg-white/10"
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-2 text-sm text-muted-foreground">{children}</div>;
}
