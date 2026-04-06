import { OsuHeader } from "./header";
import { OsuNav } from "./nav";
import { Portfolio } from "../../components/sections/portfolio";
import { OSU_PORTFOLIO_CONTENT } from "./osu-portfolio-content";

export default function Osu() {
  return (
    <div className="mx-auto">
      <OsuHeader />
      <OsuNav activePage="/osu" />
      {/* <OsuBlurb /> */}
      <hr/>
      <Portfolio content={OSU_PORTFOLIO_CONTENT} />
    </div>
  )
}
