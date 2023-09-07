import { UserButton } from "@clerk/nextjs";
import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex w-full flex-row items-center gap-2 border-b border-slate-100 px-24 py-8">
      <Link
        href="/"
        className="mr-auto flex items-center gap-4 rounded-md border border-slate-100 bg-slate-50 px-4 py-2 text-lg font-medium shadow-slate-600 transition-shadow hover:shadow-md"
      >
        <CalendarIcon />
        <span>evently</span>
      </Link>
      <UserButton />
    </header>
  );
};
