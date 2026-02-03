import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import { PatternDiamond } from "@/components/ui/patterns";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col border-t-2 border-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-foreground/10 group", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-6 text-left transition-all hover:bg-primary/5 px-4 outline-none",
          "[&[data-state=open]>div>span]:text-primary",
          className,
        )}
        {...props}
      >
        <span className="text-lg font-bold uppercase tracking-tight text-foreground transition-colors group-data-[state=open]:text-primary">
          {children}
        </span>

        <div className="relative w-6 h-6 flex items-center justify-center mt-1">
          <PatternDiamond className="absolute inset-0 w-full h-full transition-all duration-300 text-foreground/20 scale-75 group-data-[state=open]:text-primary group-data-[state=open]:rotate-90 group-data-[state=open]:scale-100" />
          <span className="relative z-10 text-lg leading-none font-light transition-transform duration-300 text-foreground group-data-[state=open]:rotate-45 group-data-[state=open]:text-white">
            +
          </span>
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-4 pb-8 pt-0", className)}>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {children}
        </p>
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
