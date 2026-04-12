import { PageHeader } from "../../components/sections/page-header";
import { Nav } from "../../components/sections/nav";
import { Portfolio } from "../../components/sections/portfolio";
import { PROGRAMMING_PORTFOLIO_CONTENT } from "./programming-portfolio-content";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { FireflyCanvas } from "@/components/graphics/firefly/firefly-canvas";
import { NAV_LINKS } from "../nav-links";

export default function Programming() {
  return (
    <div className="mx-auto overflow-x-clip">
      <title>Programming - A Mo</title>
      <PageHeader backgroundImage="url('/assets/home.jpg')">
        <>
          <HiOutlineCommandLine size={196} className="z-10 my-auto" />
          <div className="z-10 my-auto font-heading text-[36px] sm:text-[56px]">
            Programming
          </div>
        </>
      </PageHeader>
      <Nav links={NAV_LINKS} />
      <hr />
      <Portfolio content={PROGRAMMING_PORTFOLIO_CONTENT} />
      <FireflyCanvas fireflyCount={30} />
    </div>
  );
}
