import { useState } from "react";
import trekking from "@/assets/guide-trekking.jpg";
import food from "@/assets/guide-food.jpg";
import heritage from "@/assets/guide-heritage.jpg";
import StoryNotesDialog from "./StoryNotesDialog";
import { NotebookPen } from "lucide-react";

const guides = [
  { slug: "karakoram", title: "The Karakoram trekker's handbook", excerpt: "Fairy Meadows, K2 base camp and Rakaposhi — when to go, what to pack, who to trust.", img: trekking },
  { slug: "food", title: "Eating across Pakistan in 14 plates", excerpt: "Nihari at dawn, chapli kebabs at dusk. A culinary roadmap from Peshawar to Karachi.", img: food },
  { slug: "heritage", title: "5,000 years on a single road trip", excerpt: "Mohenjo-daro, Taxila, Lahore Fort — Pakistan's heritage trail, decoded.", img: heritage },
];

const Guides = () => {
  const [active, setActive] = useState<{ slug: string; title: string } | null>(null);

  return (
    <section id="guides" className="container py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.25em] text-terracotta">Field notes</span>
        <h2 className="font-display mt-3 text-4xl font-semibold text-emerald-deep md:text-6xl">
          Stories from the road.
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {guides.map((g) => (
          <article
            key={g.title}
            className="group cursor-pointer"
            onClick={() => setActive({ slug: g.slug, title: g.title })}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="font-display mt-5 text-2xl font-semibold leading-snug text-emerald-deep group-hover:underline decoration-gold underline-offset-4">
              {g.title}
            </h3>
            <p className="mt-3 text-muted-foreground">{g.excerpt}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive({ slug: g.slug, title: g.title });
              }}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta hover:text-emerald-deep"
            >
              <NotebookPen className="h-3.5 w-3.5" /> Story notes
            </button>
          </article>
        ))}
      </div>

      <StoryNotesDialog
        storyKey={active?.slug ?? null}
        storyTitle={active?.title ?? ""}
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
      />
    </section>
  );
};

export default Guides;
