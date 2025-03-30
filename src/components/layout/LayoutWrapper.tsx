"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import Header from "./Header";
import SideNav from "./SideNav";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`grid h-screen transition-all duration-300 ${
        isOpen ? "lg:grid-cols-[256px,1fr]" : "lg:grid-cols-[0,1fr]"
      }`}
    >
      <SideNav />
      <main className="w-full h-full overflow-y-auto p-4 flex flex-col gap-4">
        <Header />
        {children}
      </main>
    </div>
  );
}
