import { Mountain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-emerald-deep/10 bg-cream">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-emerald-deep">
              <Mountain className="h-6 w-6" strokeWidth={1.5} />
              <span className="font-display text-2xl font-semibold">PakTraveler</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A travel journal & trip planner for Pakistan. Built with love in Islamabad — for travelers, by travelers.
            </p>
          </div>
          {[
            { h: "Explore", links: ["Hunza", "Skardu", "Lahore", "Swat", "Karachi"] },
            // { h: "Company", links: ["About", "Guides", "Press", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-emerald-deep">{col.h}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-terracotta transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Updated Bottom Section with Names */}
        <div className="mt-12 flex flex-col gap-4 border-t border-emerald-deep/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} PakTraveler. All rights reserved.</p>
          
          <div className="flex flex-col sm:text-right gap-1">
            <p>Made for the love of Pakistan 🇵🇰</p>
            <p className="font-medium text-emerald-deep/80">
              Developed by: Tehreem Rana, Ayesha Izzat, Wareesha Begum, Sanilah Ahmed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;