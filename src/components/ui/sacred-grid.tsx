export function SacredGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex justify-between container mx-auto px-4 mix-blend-multiply opacity-50">
      <div className="w-px h-full bg-primary/3" />
      <div className="w-px h-full bg-primary/3 hidden md:block" />
      <div className="w-px h-full bg-primary/3 hidden md:block" />
      <div className="w-px h-full bg-primary/3" />
    </div>
  );
}
