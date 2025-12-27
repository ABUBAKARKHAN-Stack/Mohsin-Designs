"use client"

import { cn } from "@/lib/utils";

const Marquee = ({
  items,
  className = ""
}: { items: string[], className?: string }) => {

  return (
    <section className={cn(
      "py-8 border-y border-border overflow-hidden",
      className
    )}>
      <div className="flex animate-marquee duration-[20s]">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-4xl md:text-6xl font-display font-bold tracking-tight text-muted-foreground/30 hover:text-accent transition-colors">
              {item}
            </span>
            <span className="w-3 h-3 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;