import { cn } from "@/lib/utils";

interface OsuNavProps {
  activePage?: string;
}

interface OsuNavLinkProps {
  link: string;
  label: string;
}

const osuNavLinks: OsuNavLinkProps[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/osu",
    label: "My maps"
  }
];

export function OsuNav(props: OsuNavProps) {
  const navLink = (linkProps: OsuNavLinkProps) => {
    if (props.activePage === linkProps.link) {
      return (
        <span
        key={linkProps.link}
        className="px-2 font-bold"
        >
          {linkProps.label}
        </span>
      )
    }

    return (
      <a
        key={linkProps.link}
        href={linkProps.link}
        className="px-2 underline"

      >
        {linkProps.label}
      </a>
    );
  };

  return (
    <div className="flex justify-center divide-x divide-solid divide-white my-3">
      {osuNavLinks.map((link) => navLink(link))}
    </div>
  );
}
