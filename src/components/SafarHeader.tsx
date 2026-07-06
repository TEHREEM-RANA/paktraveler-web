import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const SafarHeader = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2 text-cream">
          <Mountain className="h-6 w-6" strokeWidth={1.5} />
          <span className="font-display text-2xl font-semibold tracking-tight">PakTraveler</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-cream/90">
          <a href="#destinations" className="hover:text-gold transition-colors">Destinations</a>
          <a href="#map" className="hover:text-gold transition-colors">Map</a>
          <a href="#guides" className="hover:text-gold transition-colors">Guides</a>
          <a href="#plan" className="hover:text-gold transition-colors">Plan a Trip</a>
        </nav>
        <Button
          onClick={() => scrollTo("plan")}
          className="rounded-full gradient-sunset text-cream hover:opacity-95"
        >
          Start Planning
        </Button>
      </div>
    </header>
  );
};

export default SafarHeader;
