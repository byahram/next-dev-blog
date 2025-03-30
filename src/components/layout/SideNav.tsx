import { getAllCategories } from "@/utils/posts";
import SideNavClient from "./SideNavClient";

export default function SideNav() {
  const categories = getAllCategories(); // 서버에서 호출 가능
  return <SideNavClient categories={categories} />;
}
