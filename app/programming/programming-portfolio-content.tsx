import Link from "next/link";
import { PortfolioContent } from "../../components/sections/portfolio";

export const PROGRAMMING_PORTFOLIO_CONTENT: PortfolioContent[] = [
  {
    header: "osu! map data",
    date: "2021",
    text: (
      <>
        <p>Data analysis scripts written in Python for osu! beatmaps.</p>
        <p>
          This culiminated into a{" "}
          <a href={"https://youtu.be/bOLI0pVpfyg"} className="underline">
            video
          </a>{" "}
          that talks about where hit objects were most likely to appear and the
          possible reasons for that.
        </p>
      </>
    ),
    links: [
      {
        url: "https://github.com/TheMoMan/osu.map-data",
        label: "Code",
        type: "primary",
      },
      {
        url: "https://youtu.be/bOLI0pVpfyg",
        label: "Video",
      },
    ],
    images: [
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/osu-data-1_ylpnyo",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/osu-data-2_zioihd",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/osu-data-3_bwpblg",
    ],
  },
  {
    header: "osu! storyboards",
    date: "2015-2026",
    text: (
      <>
        <p>
          Animation scripts that accompany osu! beatmaps, written in Python and
          TypeScript.
        </p>
        <p>
          See the full list{" "}
          <Link href={"/osu"} className="underline">
            here
          </Link>
          .
        </p>
      </>
    ),
    links: [
      {
        url: "/osu",
        label: "Link",
        type: "primary",
      },
    ],
    images: [
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/ayla-3_ngmloa",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/kafka-2_j3ee3k",
      "https://res.cloudinary.com/dznjs7drl/image/upload/h_480,q_auto,f_auto/yureru-3_wko8nj",
    ],
  },
];
