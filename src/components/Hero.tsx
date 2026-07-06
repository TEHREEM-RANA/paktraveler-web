import { useState } from "react";
import heroImg from "@/assets/hero-hunza.jpg";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import TripPlanDialog from "@/components/TripPlanDialog";
import { findCityPlan, cityPlans, CityPlan } from "@/data/cityPlans";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<CityPlan | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);

  const handlePlan = () => {
    if (!query.trim()) return;
    const result = findCityPlan(query);
    setPlan(result);
    setNotFound(result ? null : query);
    setOpen(true);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Hunza Valley at golden hour with snow-capped Karakoram peaks"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 container flex min-h-screen flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-3xl text-cream animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Travel Pakistan, beautifully
          </span>
          <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl lg:text-8xl">
            Wander where the
            <span className="block italic text-gold">mountains meet</span>
            the sky.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/85 md:text-xl">
            From the glaciers of Hunza to the bazaars of Lahore — type a city and we'll spin up a complete itinerary.
          </p>

          {/* Search bar */}
          <div className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl bg-cream/95 p-2 shadow-elegant backdrop-blur sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <MapPin className="h-5 w-5 text-emerald-deep/60" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePlan()}
                placeholder="Where to? Try Skardu, Lahore, Hunza…"
                className="w-full bg-transparent text-emerald-deep placeholder:text-emerald-deep/40 outline-none"
              />
            </div>
            <Button onClick={handlePlan} size="lg" className="gradient-sunset rounded-xl text-cream hover:opacity-95 sm:px-8">
              <Search className="h-4 w-4" /> Plan trip
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {cityPlans.slice(0, 6).map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setQuery(c.name);
                  setPlan(c);
                  setNotFound(null);
                  setOpen(true);
                }}
                className="rounded-full border border-cream/30 bg-cream/10 px-3 py-1 text-xs text-cream backdrop-blur-md hover:bg-cream/20 transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/70">
            <span>★ Trusted by 40,000+ travelers</span>
            <span>· 120+ destinations</span>
            <span>· Local guides verified</span>
          </div>
        </div>
      </div>

      <TripPlanDialog plan={plan} notFoundQuery={notFound} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default Hero;
