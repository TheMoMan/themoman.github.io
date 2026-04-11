import { PageHeader } from "../../components/sections/page-header";
import { Nav, NavLink } from "../../components/sections/nav";
import { Portfolio } from "../../components/sections/portfolio";
import { OSU_PORTFOLIO_CONTENT } from "./osu-portfolio-content";
import { SiOsu } from "react-icons/si";
import { FireflyCanvas } from "@/components/graphics/firefly/firefly-canvas";

const osuNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/osu",
    label: "My maps",
  },
];

export default function Osu() {
  return (
    <div className="mx-auto overflow-x-clip">
      <title>osu! mapping - A Mo</title>
      <PageHeader backgroundImage="url('/assets/home.jpg')">
        <>
          <SiOsu size={196} className="z-10 my-auto" />
          <div className="z-10 my-auto font-heading text-[36px] sm:text-[56px]">
            mapping
          </div>
        </>
      </PageHeader>
      <Nav links={osuNavLinks} activePage="/osu" />
      {/* <OsuBlurb /> */}
      <hr />
      <Portfolio content={OSU_PORTFOLIO_CONTENT} />
      <FireflyCanvas fireflyCount={30} />
    </div>
  );
}
