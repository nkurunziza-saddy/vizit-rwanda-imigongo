import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "prologue", label: "00", title: "Prologue" },
  { id: "concierge", label: "01", title: "The Concierge" },
  { id: "land", label: "02", title: "The Land" },
  { id: "sanctuary", label: "03", title: "The Sanctuary" },
  { id: "community", label: "04", title: "The Community" },
];

export function PageNavigator() {
  const [activeId, setActiveId] = useState("prologue");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => scrollTo(chapter.id)}
          className="group flex items-center justify-end gap-3"
        >
          <span
            className={cn(
              "text-[10px] font-mono uppercase tracking-widest transition-all duration-300",
              activeId === chapter.id
                ? "opacity-100 text-primary translate-x-0"
                : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-foreground",
            )}
          >
            {chapter.title}
          </span>
          <div className="relative flex items-center justify-center">
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeId === chapter.id
                  ? "bg-primary scale-100"
                  : "bg-foreground/20 scale-75 group-hover:bg-foreground/50",
              )}
            />
            {activeId === chapter.id && (
              <div className="absolute inset-0 w-full h-full animate-ping rounded-full bg-primary/20" />
            )}
          </div>
          <span
            className={cn(
              "text-[10px] font-mono font-bold transition-colors duration-300 min-w-[14px]",
              activeId === chapter.id ? "text-primary" : "text-foreground/20",
            )}
          >
            {chapter.label}
          </span>
        </button>
      ))}

      <div className="absolute right-[5px] top-0 bottom-0 w-px bg-foreground/5 -z-10" />
    </div>
  );
}
