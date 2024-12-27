"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomNavLink = ({ linkmeta }: ICustNavLink) => {
  const pathname = usePathname();
  return (
    <li className="nav-item">
      <Link href={linkmeta.path} className={`nav-link ${pathname === linkmeta.path ? "active" : ""}`}>
        {linkmeta.name}
      </Link>
    </li>
  );
};

interface ICustNavLink {
  linkmeta: {
    name: string;
    path: string;
  };
}
