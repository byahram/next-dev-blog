import { Title } from "@/components/layout/Title";
import { getAllCategories } from "@/utils/posts";
import { Noto_Sans_KR } from "next/font/google";

const pageInfo = {
  name: "BLOG",
  title: "Ahram Kim | Dev Blog",
  description: "Snapshot of your endpoints and leads",
};

const font = Noto_Sans_KR({ subsets: ["latin"] });

export default function Home() {
  const categories = getAllCategories();

  return (
    <div
      className={`${font.className} p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full`}
    >
      <Title title={pageInfo?.title}></Title>
      <div className="mt-6 space-y-6">
        {/* 블로그 소개 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">💡 블로그 소개</h2>
          <p className="text-foreground mt-3">
            이 블로그는 개발하면서 배운 것들을 기록하고 공유하기 위해
            만들었습니다.
          </p>
        </section>

        {/* 기능 목록 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">🚀 주요 기능</h2>
          <ul className="list-disc list-inside text-foreground mt-3 space-y-1">
            <li>📝 MDX 기반 포스트 작성</li>
            <li>🌙 다크모드 지원</li>
            <li>🔍 검색 기능 (예정)</li>
            <li>🏷️ 태그 시스템 (예정)</li>
            <li>📌 글 정렬 및 필터링 (예정)</li>
          </ul>
        </section>

        {/* 기술 스택 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">⚙️ Tech Stack</h2>
          <ul className="list-disc list-inside text-foreground mt-3 space-y-1">
            <li>
              ⚡ Next.js + TypeScript - SSR과 SSG를 지원하는 최신 웹 프레임워크
            </li>
            <li>🎨 TailwindCSS - 빠르고 직관적인 스타일링</li>
            <li>
              📄 MDX - Markdown과 React 컴포넌트를 조합하여 유연한 글 작성 가능
            </li>
            <li>🌙 Next Themes - 다크 모드 지원</li>
            <li>📊 Vercel Analytics - 성능 모니터링 및 트래픽 분석</li>
          </ul>
        </section>

        {/* 디자인 컨셉 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">🎨 디자인 컨셉</h2>
          <p className="text-foreground mt-3">
            미니멀하면서도 가독성이 좋은 디자인을 목표로 했습니다. <br />
            <a href="https://app.router.so/">https://app.router.so/</a>{" "}
            사이트에서 레이아웃 참조
          </p>
        </section>

        {/* 카테고리 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">📂 블로그 카테고리</h2>
          <ul className="list-disc list-inside text-foreground mt-3 space-y-1">
            {categories.map((category) => (
              <li key={category}>
                <a href="#">{category}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* 현재 작업 중 */}
        <section className="bg-card_bg p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">📌 현재 작업 중</h2>
          <p className="text-foreground mt-3">
            최근에는 검색 기능 개선과 태그 시스템을 추가하려고 작업 중입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
