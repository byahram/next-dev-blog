import { LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<LucideProps>;
  className?: string;
}

const NavLink = ({ href, children, icon: Icon, className }: NavLinkProps) => {
  return (
    <Link
      className={`flex items-center gap-2 group p-2 rounded-md -ml-2 transition-all ${className}`}
      href={href}
    >
      {Icon && (
        <Icon
          className="text-muted-foreground group-hover:text-foreground transition-all"
          size={20}
        />
      )}
      {children}
    </Link>
  );
};

export default NavLink;
