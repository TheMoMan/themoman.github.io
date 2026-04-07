interface NavProps {
  links: NavLink[];
  activePage?: string;
}

export interface NavLink {
  loc: string;
  label: string;
}

export function Nav({
  links,
  activePage,
}: NavProps) {
  const navLink = (link: NavLink) => {
    if (activePage === link.loc) {
      return (
        <span
        key={link.loc}
        className="px-2 font-bold"
        >
          {link.label}
        </span>
      )
    }

    return (
      <a
        key={link.loc}
        href={link.loc}
        className="px-2 underline"

      >
        {link.label}
      </a>
    );
  };

  return (
    <section className="flex justify-center divide-x divide-solid divide-white my-3">
      {links.map((link) => navLink(link))}
    </section>
  );
}
