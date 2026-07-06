import SafarHeader from "@/components/SafarHeader";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import PakistanMap from "@/components/PakistanMap";
import PlanStrip from "@/components/PlanStrip";
import Guides from "@/components/Guides";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PakTraveler — Plan Your Pakistan Trip";
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "PakTraveler is the travel planner for Pakistan — curated guides, interactive maps, and itineraries from Hunza to Karachi.");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <SafarHeader />
      <Hero />
      <Destinations />
      <PakistanMap />
      <PlanStrip />
      <Guides />
      <Footer />
    </main>
  );
};

export default Index;
