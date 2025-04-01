"use client";

import { ChevronsRight, LifeBuoy, Book } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
import NavLink from "../ui/NavLink";

const snsLinks = [
  { href: "https://router.so/docs", text: "Github", icon: Book },
  { href: "/support", text: "LinkedIn", icon: LifeBuoy },
];

export default function SideNavClient({
  categories,
}: {
  categories: string[];
}) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {/* desktop nav */}
      <aside
        className={`
         hidden lg:flex flex-col pr-0 gap-4 justify-between h-screen transition-all duration-300
        ${
          isOpen
            ? "w-64 p-4 opacity-100 pointer-events-auto"
            : "w-0 p-0 opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="h-20 border bg-muted flex items-center justify-center gap-2 rounded-lg px-6 font-bold text-3xl"
        >
          DEV.BLOG
        </Link>
        <nav className="border bg-muted rounded-lg flex flex-col justify-between p-6 h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="grid gap-2">
              {categories.map((cat) => (
                <NavLink key={cat} href={`/posts/${cat}`} icon={ChevronsRight}>
                  {cat}
                </NavLink>
              ))}
            </div>
            <div className="flex gap-2 justify-center w-full">
              {snsLinks.map((link) => (
                <NavLink key={link.href} icon={link.icon} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* mobile nav */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-50 p-4 pr-0 transition-transform duration-300 lg:hidden flex flex-col gap-4
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link
          href="/"
          className="h-20 border bg-muted_solid flex items-center justify-center gap-2 rounded-lg px-6 font-semibold text-2xl"
        >
          DEV.BLOG
        </Link>
        <nav className="border bg-muted_solid rounded-lg flex flex-col justify-between p-6 h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="grid gap-2">
              {categories.map((cat) => (
                <NavLink key={cat} href={`/posts/${cat}`} icon={ChevronsRight}>
                  {cat}
                </NavLink>
              ))}
            </div>
            <div className="flex gap-2 justify-center w-full">
              {snsLinks.map((link) => (
                <NavLink key={link.href} icon={link.icon} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
