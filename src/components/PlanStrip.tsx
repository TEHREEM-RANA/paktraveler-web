import { Compass, Map, NotebookPen, Users } from "lucide-react";
// ===== ADDED: custom plan box =====
import CustomPlanBox from "./CustomPlanBox";

const features = [
  { icon: Map, title: "Interactive maps", desc: "Pin every stop and see your route shape itself across the country." },
  { icon: NotebookPen, title: "Day-by-day itineraries", desc: "Drag, drop, reorder. Built for real travel, not spreadsheets." },
  { icon: Compass, title: "Local recommendations", desc: "Hand-picked places by Pakistani writers, photographers and guides." },
  { icon: Users, title: "Plan with friends", desc: "Share trips, vote on stops, split costs — all in one place." },
];

const PlanStrip = () => {
  return (
    <section id="plan" className="bg-emerald-deep text-cream">
      <div className="container py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Plan your safar</span>
            <h2 className="font-display mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              The trip planner built for <em className="text-gold">Pakistan's</em> rhythms.
            </h2>
            <p className="mt-6 max-w-md text-cream/75">
              Routes that account for KKH road closures, mosque visiting hours, mountain weather windows — and the perfect chai stop in between.
            </p>
            {/* User can write, save, edit and delete their own plans */}
            <CustomPlanBox />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur transition-colors hover:bg-cream/[0.07]">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <h3 className="font-display mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-cream/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanStrip;
