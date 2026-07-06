import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CityPlan } from "@/data/cityPlans";
import { Calendar, Clock, MapPin, UtensilsCrossed, BedDouble, Lightbulb } from "lucide-react";

interface Props {
  plan: CityPlan | null;
  notFoundQuery?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TripPlanDialog = ({ plan, notFoundQuery, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-cream p-0">
        {plan ? (
          <>
            <div className="relative h-56 w-full overflow-hidden">
              <img src={plan.hero} alt={plan.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-cream">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{plan.region}</p>
                <DialogTitle className="font-display text-4xl font-semibold mt-1">{plan.name}</DialogTitle>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed">{plan.intro}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-deep/10 bg-background p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-terracotta">
                    <Calendar className="h-4 w-4" /> Best time
                  </div>
                  <p className="mt-2 text-sm font-medium text-emerald-deep">{plan.bestTime}</p>
                </div>
                <div className="rounded-xl border border-emerald-deep/10 bg-background p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-terracotta">
                    <Clock className="h-4 w-4" /> Suggested duration
                  </div>
                  <p className="mt-2 text-sm font-medium text-emerald-deep">{plan.duration}</p>
                </div>
              </div>

              <section>
                <h3 className="font-display text-2xl font-semibold text-emerald-deep flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-terracotta" /> Itinerary
                </h3>
                <div className="mt-4 space-y-4">
                  {plan.days.map((d) => (
                    <div key={d.title} className="rounded-xl border-l-4 border-terracotta bg-background p-4">
                      <p className="font-display text-lg font-semibold text-emerald-deep">{d.title}</p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {d.items.map((it) => <li key={it}>• {it}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-6 md:grid-cols-2">
                <section>
                  <h3 className="font-display text-xl font-semibold text-emerald-deep flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-terracotta" /> Where to eat
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {plan.eat.map((e) => <li key={e}>• {e}</li>)}
                  </ul>
                </section>
                <section>
                  <h3 className="font-display text-xl font-semibold text-emerald-deep flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-terracotta" /> Where to stay
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {plan.stay.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </section>
              </div>

              <section className="rounded-xl bg-emerald-deep/5 p-5">
                <h3 className="font-display text-xl font-semibold text-emerald-deep flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-terracotta" /> Local tips
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {plan.tips.map((t) => <li key={t}>• {t}</li>)}
                </ul>
              </section>
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-emerald-deep">No plan yet for "{notFoundQuery}"</DialogTitle>
            </DialogHeader>
            <p className="mt-4 text-muted-foreground">
              We currently have curated guides for: Hunza, Skardu, Lahore, Naran, Swat, Karachi, Islamabad, Peshawar, Quetta, and Multan.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TripPlanDialog;
