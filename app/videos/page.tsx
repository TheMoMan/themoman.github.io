import { PageHeader } from "../../components/sections/page-header";
import { Nav } from "../../components/sections/nav";
import { Portfolio } from "../../components/sections/portfolio";
import { VIDEOS_PORTFOLIO_CONTENT } from "./videos-portfolio-content";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FireflyCanvas } from "@/components/graphics/firefly/firefly-canvas";
import { NAV_LINKS } from "../nav-links";

export default function Videos() {
  return (
    <div className="mx-auto overflow-x-clip">
      <title>Videos - A Mo</title>
      <PageHeader backgroundImage="url('/assets/home.jpg')">
        <>
          <MdOutlineOndemandVideo size={196} className="z-10 my-auto" />
          <div className="z-10 my-auto font-heading text-[36px] sm:text-[56px]">
            Videos
          </div>
        </>
      </PageHeader>
      <Nav links={NAV_LINKS} />
      <hr />
      <Portfolio content={VIDEOS_PORTFOLIO_CONTENT} />
      <FireflyCanvas fireflyCount={30} />
    </div>
  );
}
