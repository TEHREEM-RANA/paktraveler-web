import hunza from "@/assets/hero-hunza.jpg";
import lahore from "@/assets/dest-lahore.jpg";
import skardu from "@/assets/dest-skardu.jpg";
import naran from "@/assets/dest-naran.jpg";
import swat from "@/assets/dest-swat.jpg";
import karachi from "@/assets/dest-karachi.jpg";
import islamabad from "@/assets/dest-islamabad.jpg";

type Place = {
  name: string;
  region: string;
  img: string;
  tag: string;
  span?: string;
};

const places: Place[] = [
  { name: "Hunza Valley", region: "Gilgit-Baltistan", img: hunza, tag: "Mountains", span: "md:col-span-2 md:row-span-2" },
  { name: "Skardu", region: "Gilgit-Baltistan", img: skardu, tag: "Lakes" },
  { name: "Lahore", region: "Punjab", img: lahore, tag: "Heritage" },
  { name: "Naran Kaghan", region: "Khyber Pakhtunkhwa", img: naran, tag: "Alpine" },
  { name: "Swat Valley", region: "Khyber Pakhtunkhwa", img: swat, tag: "Forests" },
  { name: "Karachi", region: "Sindh", img: karachi, tag: "Coast" },
  { name: "Islamabad", region: "Capital", img: islamabad, tag: "Modern" },
];

const Destinations = () => {
  return (
    <section id="destinations" className="container py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta">Featured destinations</span>
          <h2 className="font-display mt-3 text-4xl font-semibold text-emerald-deep md:text-6xl">
            A land of <em className="text-terracotta">contrasts</em>, <br className="hidden md:block" />stitched in a single trip.
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Seven curated regions — from 8,000m peaks to ancient bazaars and Arabian Sea shores. Every itinerary is hand-built by locals.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[16rem]">
        {places.map((p, i) => (
          <a
            key={p.name}
            href="#"
            className={`group relative overflow-hidden rounded-2xl shadow-soft ${p.span ?? ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <img
              src={p.img}
              alt={`${p.name}, ${p.region}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="self-start rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-deep">
                {p.tag}
              </span>
              <div className="text-cream">
                <p className="text-xs uppercase tracking-widest text-cream/70">{p.region}</p>
                <h3 className="font-display text-2xl font-semibold md:text-3xl">{p.name}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Destinations;
