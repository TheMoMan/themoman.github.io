import { PortfolioContent } from "../../components/sections/portfolio";

export const VIDEOS_PORTFOLIO_CONTENT: PortfolioContent[] = [
  {
    header: "A Mo",
    subHeader: "osu! content",
    text: (
      <>
        <p>
          Informational and instructional videos about how osu! maps are
          created and why certain trends emerge.
        </p>
      </>
    ),
    links: [
      {
        url: "https://www.youtube.com/@AMo_osu",
        label: "YouTube",
        type: "primary",
      },
    ],
    images: [
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/amo-1_bujmup",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/amo-2_exq9af",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/amo-3_mzoldg",
    ],
  },
  {
    header: "A Mo's Incidents",
    subHeader: "Variety gaming",
    text: (
      <>
        <p>Gaming moments captured and edited in SovietWomble style.</p>
        <p>Strong language inside.</p>
      </>
    ),
    links: [
      {
        url: "https://www.youtube.com/@AMoIncidents",
        label: "YouTube",
        type: "primary",
      },
    ],
    images: [
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/incidents-1_mnd7kv",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/incidents-2_om3thc",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/incidents-3_ovk3al",
    ],
  },
];
