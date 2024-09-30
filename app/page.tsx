import LatestPosts from "@/components/home/latest-posts";

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
