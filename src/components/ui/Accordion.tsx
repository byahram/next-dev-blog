// components/Accordion.tsx
import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 font-semibold"
      >
        {title}
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}
