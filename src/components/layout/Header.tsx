import { useSidebar } from "@/contexts/SidebarContext";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useTheme } from "next-themes";
import NavLink from "../ui/NavLink";

const tabList = [
  { href: "/", text: "Home" },
  { href: "/tags", text: "Tags" },
  { href: "/contact", text: "Contact" },
];

const Header = () => {
  const { toggleSidebar, isOpen } = useSidebar();
  const { theme, setTheme } = useTheme();

  const handleClick = (href: string) => {
    if (href === "/tags" || href === "/contact") {
      alert("준비 중입니다.");
    }
  };

  return (
    <header className="h-20 bg-muted rounded-lg border flex items-center justify-between px-6">
      <button
        onClick={toggleSidebar}
        className="text-sm px-2 py-1 transition mr-4"
      >
        {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-3">
          {tabList.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <button
          className="cursor-pointer transition-all duration-300"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <AiOutlineMoon size={25} />
          ) : (
            <AiOutlineSun size={25} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
