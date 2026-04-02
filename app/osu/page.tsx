import { OsuBlurb } from "./blurb";
import { OsuHeader } from "./header";
import { OsuNav } from "./nav";
import { OsuPortfolio } from "./portfolio";

export default function Osu() {
  return (
    <div className="mx-auto">
      <OsuHeader />
      <OsuNav activePage="/osu" />
      <div className="flex justify-center">Images are placeholders</div>
      {/* <OsuBlurb /> */}
      <hr/>
      <OsuPortfolio />
    </div>
  )
}
