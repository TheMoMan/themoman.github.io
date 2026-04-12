"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  links: NavLink[];
}

export interface NavLink {
  href: string;
  label: string;
}

export function Nav({ links }: NavProps) {
  const pathname = usePathname();

  const navLink = (link: NavLink) => {
    if (pathname === link.href) {
      return (
        <span key={link.href} className="px-2 font-bold">
          {link.label}
        </span>
      );
    }

    return (
      <Link key={link.href} href={link.href} className="px-2 underline">
        {link.label}
      </Link>
    );
  };

  return (
    <section className="my-3 flex justify-center divide-x divide-solid divide-white">
      {links.map((link) => navLink(link))}
    </section>
  );
}
