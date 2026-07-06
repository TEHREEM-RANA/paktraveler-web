# PakTraveler: The Smart Safar Architect (v1.0.0)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Semester: 3rd](https://img.shields.io/badge/Semester-03--Project-orange)](https://github.com/TEHREEM-RANA)
[![Stack: React/TS/Vite](https://img.shields.io/badge/Stack-React--TS--Tailwind-blue)](https://github.com/TEHREEM-RANA)

> **"A land of contrasts, stitched in a single trip."** 
> PakTraveler is a production-grade travel orchestration platform designed to handle the unique logistical challenges of Pakistan's diverse geography—from the Karakoram peaks to the historical bazaars of Lahore.

---

##  Engineering Overview
This project represents a major milestone in my **3rd Semester**, moving beyond basic UI to solve complex user problems. Under the supervision of **Sir Shahrukh**, I engineered this platform to serve as more than just a gallery; it is a functional tool that calculates routes, manages itineraries, and optimizes travel paths using modern frontend logic.

**Live Project URL:** [https://paktraveler-web.vercel.app/](https://paktraveler-web.vercel.app/)

---

##  Repository Value & Features

| Feature | Technical Implementation |
| :--- | :--- |
| **Smart Route Calculation** | Real-time distance and time estimation between northern hubs (e.g., Hunza to Skardu). |
| **Itinerary Orchestration** | A drag-and-drop style planner built for real travel rhythms, not just static text. |
| **Interactive Map Layer** | Geo-spatial visualization of 120+ destinations across all provinces. |
| **Performance Opt.** | Leveraging **Vite** for < 300ms HMR and optimized asset loading for high-res imagery. |
| **Type-Safe Architecture** | Full **TypeScript** implementation to ensure data integrity across the planning engine. |

---

##  Technical Stack & Architecture

### **The Logic Layer (React + TS)**
*   **Custom Planning Hooks:** Managed state for complex user inputs (Source, Destination, Duration).
*   **Data Integrity:** Interfaces defined for every destination to ensure consistent UI rendering.

### **The Visual Layer (Tailwind CSS)**
*   **Responsive Grid Systems:** Custom layouts for destination cards (image_f16cbb.jpg, image_f16c9a.jpg).
*   **Thematic UI:** A design language inspired by Pakistan’s landscape, featuring deep forest greens and alpine whites.

### **Development Tools**
*   **Editor:** VS Code.
*   **Build System:** Vite.
*   **Icons:** Lucide-react for sharp, consistent iconography.

---

##  Project Structure & Modules
```text
src/
├── hooks/      # The "Brain": Route optimization and state logic
├── data/       # Standardized JSON objects for 120+ locations
├── components/ # Atomic components (Route Planner, Nav, Trip Cards)
├── pages/      # View-level logic (Home, Destinations, Itinerary)
└── lib/        # Utility functions for distance/cost math
```


Core Modules Highlight
The Planner Engine: Users can input origin and destination to receive an instant "Pass" calculation, showing time and distance (as seen in image_f16c79.png).

Destination Encyclopedia: Curated sections for Mountains, Lakes, and Heritage sites (as seen in image_f16cbb.jpg).

Field Notes: Content-driven storytelling ("The Karakoram Trekker's Handbook") to increase user engagement.

 How to Run Locally
Clone the Repo:

Bash
git clone [https://github.com/TEHREEM-RANA/paktraveler-web.git](https://github.com/TEHREEM-RANA/paktraveler-web.git)
Install Dependencies:

Bash
npm install
Launch Dev Server:

Bash
npm run dev

👥 Credits & Mentorship

Tehreem Rana - Lead Full-Stack Architect (3rd Semester Student at UBIT).

Sir Shahrukh - Project Guidance & Supervisor.

Made with 💻 and 🇵🇰 by Tehreem Rana

If this architecture helped you plan your next trip, give this repo a ⭐ Star!
