"use client";

import { cn } from "@/lib/utils";
import { BookmarkIcon, PlusIcon } from "@radix-ui/react-icons";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidenavItem = {
  label: string;
  icon: React.ReactNode;
  href: Url;
};

type Props = {
  items: SidenavItem[];
};

export const Sidenav = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4 text-sm text-slate-600">
      {items.map((item, index) => (
        <SidenavItem key={index} pathname={pathname} {...item} />
      ))}

      <div className="mt-auto" />

      <SidenavItem
        href="/create"
        icon={<PlusIcon />}
        label="Create event"
        pathname={pathname}
      />

      <div className="w-64 rounded-md border border-slate-200 bg-slate-100 p-4 text-sm">
        <span className="mb-2 flex flex-row items-center gap-2 font-medium text-slate-600">
          <BookmarkIcon />
          Jamfest is coming up!
        </span>
        <p>
          Your bookmarked event is coming up soon! Click here to see more
          details.
        </p>
      </div>
    </nav>
  );
};

const SidenavItem = ({
  label,
  icon,
  href,
  pathname,
}: SidenavItem & {
  pathname: string;
}) => {
  return (
    <Link
      href={href}
      className={cn("flex flex-row items-center gap-2 p-2", {
        "rounded-md bg-slate-50": pathname === href,
        "rounded-md hover:bg-slate-50": pathname !== href,
      })}
    >
      {icon}
      {label}
    </Link>
  );
};
