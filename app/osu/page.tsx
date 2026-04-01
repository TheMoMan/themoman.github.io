import { OsuBlurb } from "./blurb";
import { OsuHeader } from "./header";
import { OsuPortfolio } from "./portfolio";

export default function Osu() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <OsuHeader />
      <OsuBlurb />
      <hr/>
      <OsuPortfolio />
    </div>
  )
}
