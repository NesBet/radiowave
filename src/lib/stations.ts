export interface Station {
  id: string;
  name: string;
  tagline: string;
  url: string;
  icon: string;
  color: string;
}

export const stations: Station[] = [
  {
    id: "nrg",
    name: "NRG Radio",
    tagline: "Kenya's #1 Hit Music Station",
    url: process.env.NEXT_PUBLIC_NRG_URL!,
    icon: "/icons/nrg.webp",
    color: "#f97316",
  },
  {
    id: "hot96",
    name: "Hot 96",
    tagline: "The Capital's Hotspot",
    url: process.env.NEXT_PUBLIC_HOT96_URL!,
    icon: "/icons/hot96.webp",
    color: "#ef4444",
  },
  {
    id: "classic105",
    name: "Classic 105",
    tagline: "Kenya's Best Variety",
    url: process.env.NEXT_PUBLIC_CLASSIC105_URL!,
    icon: "/icons/classic-105.webp",
    color: "#f59e0b",
  },
  {
    id: "kiss100",
    name: "Kiss 100",
    tagline: "Kenya's #1 Urban Station",
    url: process.env.NEXT_PUBLIC_KISS100_URL!,
    icon: "/icons/kiss.webp",
    color: "#ec4899",
  },
  {
    id: "homeboyz",
    name: "Homeboyz Radio",
    tagline: "The Youthful Vibes of Kenya",
    url: process.env.NEXT_PUBLIC_HOMEBOYZ_URL!,
    icon: "/icons/homeboyz.webp",
    color: "#8b5cf6",
  },
  {
    id: "capital",
    name: "Capital Radio",
    tagline: "Heartbeat of Nairobi",
    url: process.env.NEXT_PUBLIC_CAPITAL_URL!,
    icon: "/icons/capital.webp",
    color: "#e5e7eb",
  },
];
