import { ReactNode } from "react";
import { Gugi } from "next/font/google";

const font = Gugi({ subsets: ["latin"], weight: "400" });

interface TitleProps {
  title?: string;
  children?: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ title, children }) => {
  return (
    <div
      className={`${font.className} flex font-bold capitalize gap-2 text-2xl pb-4 border-b items-center`}
    >
      <h1 className="font-normal">{title}</h1>
      {children && <h3 className="text-muted-foreground">: {children}</h3>}
    </div>
  );
};
