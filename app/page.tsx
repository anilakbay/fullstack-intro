import LatestPosts from "@/components/home/latest-posts";
import { MainNav } from "@/components/main-nav";

export default async function Home() {
  return (
    <>
      <MainNav />
      <main>
        <div>
          <LatestPosts />
        </div>
      </main>
    </>
  );
}
