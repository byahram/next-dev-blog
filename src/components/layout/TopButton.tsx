"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowUpIcon } from "lucide-react";

type Props = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export function TopButton({ scrollRef }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShow(container.scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-50 rounded-full shadow-md"
      variant="topButton"
      size="topButton"
    >
      <ArrowUpIcon className="w-8 h-8 text-muted_foreground" />
    </Button>
  );
}
