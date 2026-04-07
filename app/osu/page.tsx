import { PageHeader } from "../../components/sections/page-header";
import { Nav, NavLink } from "../../components/sections/nav";
import { Portfolio } from "../../components/sections/portfolio";
import { OSU_PORTFOLIO_CONTENT } from "./osu-portfolio-content";
import { SiOsu } from "react-icons/si";

const osuNavLinks: NavLink[] = [
  {
    loc: "/",
    label: "Home",
  },
  {
    loc: "/osu",
    label: "My maps"
  }
];

export default function Osu() {
  return (
    <div className="mx-auto">
      <PageHeader backgroundImage="url('/assets/home.jpg')">
        <>
          <SiOsu size={196} className="my-auto z-10" />
          <div className="text-[36px] sm:text-[56px] my-auto font-heading z-10">
            mapping
          </div>
        </>
      </PageHeader>
      <Nav links={osuNavLinks} activePage="/osu" />
      {/* <OsuBlurb /> */}
      <hr />
      <Portfolio content={OSU_PORTFOLIO_CONTENT} />
    </div>
  );
}
