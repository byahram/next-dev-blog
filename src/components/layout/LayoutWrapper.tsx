"use client";

import Header from "./Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 h-full overflow-y-auto p-4 flex flex-col gap-4">
      <Header />
      {children}
    </main>
  );
}
