import { Title } from "@/components/layout/Title";
import { Noto_Sans_KR } from "next/font/google";

const pageInfo = {
  name: "BLOG",
  title: "Dashboard",
  description: "Snapshot of your endpoints and leads",
};

const font = Noto_Sans_KR({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`${font.className} p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full`}
    >
      <Title title={pageInfo?.title}>{pageInfo?.description}</Title>
      <div className="grid grid-cols-3 gap-4">asf</div>
    </div>
  );
}
