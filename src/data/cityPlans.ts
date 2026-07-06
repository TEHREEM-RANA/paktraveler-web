import hunzaImg from "@/assets/hero-hunza.jpg";
import skarduImg from "@/assets/dest-skardu.jpg";
import lahoreImg from "@/assets/dest-lahore.jpg";
import naranImg from "@/assets/dest-naran.jpg";
import swatImg from "@/assets/dest-swat.jpg";
import karachiImg from "@/assets/dest-karachi.jpg";
import islamabadImg from "@/assets/dest-islamabad.jpg";
import heritageImg from "@/assets/guide-heritage.jpg";
import foodImg from "@/assets/guide-food.jpg";
import trekkingImg from "@/assets/guide-trekking.jpg";

export type CityPlan = {
  slug: string;
  name: string;
  region: string;
  hero: string;
  intro: string;
  bestTime: string;
  duration: string;
  days: { title: string; items: string[] }[];
  eat: string[];
  stay: string[];
  tips: string[];
};

export const cityPlans: CityPlan[] = [
  {
    slug: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    hero: hunzaImg,
    intro: "A storybook valley of apricot blossoms, glaciers, and 7,000m giants like Rakaposhi and Lady Finger.",
    bestTime: "April–October (cherry blossoms in early April, golden autumn in October)",
    duration: "5–7 days",
    days: [
      { title: "Day 1 — Arrive Karimabad", items: ["Fly Islamabad → Gilgit, drive to Karimabad", "Sunset at Eagle's Nest viewpoint", "Dinner at Café de Hunza (walnut cake!)"] },
      { title: "Day 2 — Baltit & Altit Forts", items: ["Tour 700-year-old Baltit Fort", "Walk Altit village & royal garden", "Local Hunza thali lunch"] },
      { title: "Day 3 — Attabad Lake & Passu", items: ["Boat ride on turquoise Attabad Lake", "Photo stop at Passu Cones", "Hussaini Suspension Bridge (if brave!)"] },
      { title: "Day 4 — Khunjerab Pass", items: ["Drive KKH to Pakistan-China border (4,693m)", "Spot ibex & marmots in the national park", "Return via Sost for lunch"] },
      { title: "Day 5 — Hopper Valley", items: ["Day trip to Nagar & Hopper glacier", "Glacier viewpoint hike", "Return to Karimabad"] },
    ],
    eat: ["Café de Hunza — walnut cake", "Hidden Paradise — chapshuro", "Bricks Café — apricot soup"],
    stay: ["Serena Hunza (luxury)", "Hunza Embassy Hotel (mid)", "Old Hunza Inn (budget)"],
    tips: ["Carry cash — ATMs are scarce above Gilgit", "Altitude is real, hydrate well", "KKH may close briefly after rain — keep a buffer day"],
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    hero: skarduImg,
    intro: "Gateway to K2, Shangrila, and a desert that sits between snow peaks and turquoise lakes.",
    bestTime: "May–October",
    duration: "5–6 days",
    days: [
      { title: "Day 1 — Arrive Skardu", items: ["Fly PIA Islamabad → Skardu (book early)", "Stroll Skardu bazaar", "Sunset at Kharpocho Fort"] },
      { title: "Day 2 — Shangrila & Upper Kachura", items: ["Lower Kachura (Shangrila) lake", "Lunch at the resort", "Hike to Upper Kachura"] },
      { title: "Day 3 — Shigar Valley", items: ["Visit Shigar Fort (Serena)", "Cold Desert at Katpana", "Apricot orchards"] },
      { title: "Day 4 — Deosai Plains", items: ["Jeep trip to 'Land of Giants' (4,114m)", "Sheosar Lake picnic", "Spot Himalayan brown bear"] },
      { title: "Day 5 — Khaplu", items: ["Day trip to Khaplu Palace", "Chaqchan Mosque (700 years old)", "Return Skardu"] },
    ],
    eat: ["Dewanekhas at Shigar Fort", "Khaplu Palace café", "Chunni — local mantu dumplings"],
    stay: ["Serena Shigar Fort (heritage)", "Legends Hotel (mid)", "Concordia Motel (budget)"],
    tips: ["Flights are weather-dependent — keep a road backup (24h via KKH)", "Deosai needs a 4x4", "Layers — temps swing 20°C in a day"],
  },
  {
    slug: "lahore",
    name: "Lahore",
    region: "Punjab",
    hero: lahoreImg,
    intro: "The cultural heart of Pakistan — Mughal monuments, food streets, qawwali nights, and warm Punjabi hospitality.",
    bestTime: "October–March",
    duration: "3–4 days",
    days: [
      { title: "Day 1 — Walled City", items: ["Lahore Fort & Sheesh Mahal", "Badshahi Mosque at sunset", "Dinner at Cooco's Den (rooftop view)"] },
      { title: "Day 2 — Heritage trail", items: ["Wazir Khan Mosque", "Shahi Hammam", "Food Street Gawalmandi for nihari"] },
      { title: "Day 3 — Gardens & Wagah", items: ["Shalimar Gardens (UNESCO)", "Tomb of Jahangir", "Wagah Border ceremony at sunset"] },
      { title: "Day 4 — Modern Lahore", items: ["Liberty Market shopping", "Lunch at Andaaz / Haveli", "Qawwali night at Shah Jamal (Thursdays)"] },
    ],
    eat: ["Phajja Siri Paye (dawn breakfast)", "Butt Karahi Lakshmi Chowk", "Cooco's Den, Andaaz", "Haji Sardar fish"],
    stay: ["Pearl Continental (luxury)", "Faletti's Heritage", "Rose Palace (budget)"],
    tips: ["Walled City is best on foot — hire a local guide", "Wagah ceremony: arrive 90 min early", "Carry water — summers hit 45°C"],
  },
  {
    slug: "naran",
    name: "Naran Kaghan",
    region: "Khyber Pakhtunkhwa",
    hero: naranImg,
    intro: "Alpine valley with the legendary Saif-ul-Malook lake and meadows of Lulusar.",
    bestTime: "May–September (Babusar Pass closes in winter)",
    duration: "3–4 days",
    days: [
      { title: "Day 1 — Drive to Naran", items: ["Islamabad → Naran via Mansehra & Balakot", "Riverside dinner"] },
      { title: "Day 2 — Saif-ul-Malook", items: ["Jeep ride to the lake (3,200m)", "Optional boat ride", "Evening bazaar walk"] },
      { title: "Day 3 — Lulusar & Babusar", items: ["Drive to Lulusar Lake", "Babusar Top (4,173m) panorama", "Return to Naran"] },
    ],
    eat: ["Trout fish at riverside dhabas", "Hot pakoras with chai", "Cherry Pine Hotel restaurant"],
    stay: ["Pine Park Hotel", "Cherry Pine", "PTDC Motel"],
    tips: ["Babusar opens roughly mid-June to Sept", "Cell signal is patchy — download offline maps", "Nights drop near 5°C even in July"],
  },
  {
    slug: "swat",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    hero: swatImg,
    intro: "The 'Switzerland of the East' — pine forests, Buddhist ruins, and the snowy meadows of Malam Jabba & Kalam.",
    bestTime: "March–October (Dec–Feb for snow at Malam Jabba)",
    duration: "4–5 days",
    days: [
      { title: "Day 1 — Mingora & Saidu Sharif", items: ["Drive Islamabad → Mingora", "Swat Museum (Gandhara art)", "Butkara Stupa"] },
      { title: "Day 2 — Malam Jabba", items: ["Chairlift & ski resort", "Zipline & forest walks"] },
      { title: "Day 3 — Kalam", items: ["Drive Mingora → Kalam along the river", "Trout dinner by Swat River"] },
      { title: "Day 4 — Mahodand Lake", items: ["Jeep trip up Ushu Valley", "Picnic at Mahodand", "Return Kalam"] },
    ],
    eat: ["Trout in Kalam", "Chapli kebab in Mingora", "Honey & shahi tukda"],
    stay: ["Swat Serena (mid)", "PC Malam Jabba (luxury)", "Walnut Heights Kalam"],
    tips: ["Roads up to Kalam can be slow — leave early", "Modest dress appreciated in villages", "Jeep needed beyond Kalam"],
  },
  {
    slug: "karachi",
    name: "Karachi",
    region: "Sindh",
    hero: karachiImg,
    intro: "Pakistan's mega-city by the Arabian Sea — colonial heritage, beaches, and the country's wildest food scene.",
    bestTime: "November–February",
    duration: "3 days",
    days: [
      { title: "Day 1 — Heritage", items: ["Mohatta Palace", "Frere Hall & Empress Market", "Sunset at Clifton Beach"] },
      { title: "Day 2 — Coast & Crafts", items: ["Boat ride to Manora Island", "Lunch at Kolachi (sea view)", "Saddar antique shopping"] },
      { title: "Day 3 — Food crawl", items: ["Burns Road for nihari", "Boat Basin BBQ at night", "Do Darya seafood dinner"] },
    ],
    eat: ["Javed Nihari, Burns Road", "Kolachi & BBQ Tonight", "Student Biryani", "Café Flo"],
    stay: ["Mövenpick (luxury)", "Avari Towers", "Regent Plaza (mid)"],
    tips: ["Traffic is brutal — plan around peak hours", "Use Careem/InDrive over street taxis", "Beach swimming: stick to lifeguarded zones"],
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    region: "Capital",
    hero: islamabadImg,
    intro: "Pakistan's calm green capital, cradled by the Margalla Hills.",
    bestTime: "September–April",
    duration: "2–3 days",
    days: [
      { title: "Day 1 — Margalla & Monuments", items: ["Faisal Mosque", "Daman-e-Koh viewpoint", "Monal restaurant for sunset"] },
      { title: "Day 2 — Twin city", items: ["Pakistan Monument & Museum", "Lok Virsa heritage museum", "Saidpur Village dinner"] },
      { title: "Day 3 — Day trip", items: ["Taxila ruins (UNESCO)", "Khewra Salt Mine (longer day)"] },
    ],
    eat: ["Monal", "Tuscany Courtyard", "Des Pardes (Saidpur)", "Street food at Melody"],
    stay: ["Serena Islamabad (luxury)", "Marriott", "Hotel One (mid)"],
    tips: ["Trail 5 hike at sunrise is unmissable", "Diplomatic Enclave needs prior permits", "Weather is mild but Aug = rain"],
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    region: "Khyber Pakhtunkhwa",
    hero: heritageImg,
    intro: "One of South Asia's oldest living cities — Qissa Khwani bazaar, Mughal monuments, and legendary chapli kebab.",
    bestTime: "October–March",
    duration: "2 days",
    days: [
      { title: "Day 1 — Old city", items: ["Qissa Khwani Bazaar (storytellers' market)", "Mahabat Khan Mosque", "Sethi Haveli"] },
      { title: "Day 2 — Museum & food", items: ["Peshawar Museum (Gandhara art)", "Chapli kebab at Jalil Kabab House", "Namak Mandi for tikka"] },
    ],
    eat: ["Charsi Tikka, Namak Mandi", "Jalil Kabab House", "Shinwari Chapli Kebab"],
    stay: ["Pearl Continental Peshawar", "Shelton's Rezidor"],
    tips: ["Check current security advisories", "Modest dress recommended", "Old city is best with a local guide"],
  },
  {
    slug: "quetta",
    name: "Quetta",
    region: "Balochistan",
    hero: trekkingImg,
    intro: "Apple orchards, rugged mountains, and the gateway to Hanna Lake & Ziarat junipers.",
    bestTime: "April–October",
    duration: "2–3 days",
    days: [
      { title: "Day 1 — City & Hanna Lake", items: ["Hanna Lake picnic", "Urak Valley orchards", "Liaquat Park bazaar"] },
      { title: "Day 2 — Ziarat day trip", items: ["Drive to Ziarat (2,449m)", "Quaid-e-Azam Residency", "Ancient juniper forest"] },
    ],
    eat: ["Sajji at Lehri Sajji House", "Kabuli pulao", "Fresh apples from Urak"],
    stay: ["Serena Quetta", "Bloom Star Hotel"],
    tips: ["Always check current travel advisories for Balochistan", "Day trips are best with a local driver", "Carry warm layers — even summer nights are cool"],
  },
  {
    slug: "multan",
    name: "Multan",
    region: "Punjab",
    hero: heritageImg,
    intro: "City of Saints — blue-tiled shrines, ancient bazaars, and the famous sohan halwa.",
    bestTime: "October–March",
    duration: "2 days",
    days: [
      { title: "Day 1 — Shrines", items: ["Shrine of Bahauddin Zakariya", "Shrine of Shah Rukn-e-Alam (UNESCO listed)", "Multan Fort"] },
      { title: "Day 2 — Bazaar & crafts", items: ["Hussain Agahi Bazaar", "Blue pottery workshops", "Sohan halwa tasting"] },
    ],
    eat: ["Sohan halwa from Hafiz", "Multani sajji", "Lassi at Bohar Gate"],
    stay: ["Ramada Multan", "Hotel One"],
    tips: ["Summers are extreme (45°C+) — plan winter", "Best to attend qawwali on Thursday evenings", "Carry sunscreen & water always"],
  },
];

export function findCityPlan(query: string): CityPlan | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    cityPlans.find((c) => c.slug === q || c.name.toLowerCase() === q) ||
    cityPlans.find((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q)) ||
    null
  );
}
