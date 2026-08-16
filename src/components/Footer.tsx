import { Mountain, Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Hunza", href: "#" },
        { name: "Skardu", href: "#" },
        { name: "Lahore", href: "#" },
        { name: "Swat", href: "#" },
        { name: "Karachi", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { 
          name: "About", 
          href: "https://tehreem-rana.vercel.app/", 
          isExternal: true 
        },
        { name: "Guides", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Travel Tips", href: "#" },
        { name: "Weather Updates", href: "#" },
        { name: "Safety Info", href: "#" },
        { name: "FAQs", href: "#" },
      ],
    },
  ];

  const developer = [
    "Tehreem Rana",
  
  ];

  return (
    <footer className="border-t border-emerald-deep/10 bg-cream text-muted-foreground">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-emerald-deep">
              <Mountain className="h-6 w-6" strokeWidth={1.5} />
              <span className="font-display text-2xl font-semibold tracking-wide">
                PakTraveler
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              A travel journal & trip planner for Pakistan. Built with love in
              Islamabad — for travelers, by travelers.
            </p>
            
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4 text-emerald-deep/80">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-terracotta transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-terracotta transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@paktraveler.com"
                className="hover:text-terracotta transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dynamic Links Columns */}
          {footerSections.map((col) => (
            <div key={col.title}>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-emerald-deep">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : "_self"}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="hover:text-terracotta transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-4 border-t border-emerald-deep/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PakTraveler. All rights reserved.</p>

          <div className="flex flex-col gap-1 sm:text-right">
            <p className="flex items-center gap-1 sm:justify-end">
              Made for the love of Pakistan 🇵🇰
            </p>
            <p className="font-medium text-emerald-deep/80">
              Developed by: {developers.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
