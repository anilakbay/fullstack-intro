import { getBlogPosts } from "@/app/blog/utils"; // Eğer formData bir fonksiyon değilse buradan sil.
import Link from "next/link";

// Yeni formatDate fonksiyonu
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export default function LatestPosts() {
  let latestPosts = getBlogPosts();

  // Sıralama işlemi
  latestPosts.sort((a, b) => {
    const dateA = a.metadata.publisher
      ? new Date(a.metadata.publisher)
      : new Date(0); // Varsayılan olarak 1970-01-01
    const dateB = b.metadata.publisher
      ? new Date(b.metadata.publisher)
      : new Date(0); // Varsayılan olarak 1970-01-01

    return dateB.getTime() - dateA.getTime(); // En yeni tarih en önde
  });

  return (
    <>
      <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
        Recently Published
      </h1>
      {latestPosts.map((post) => (
        <article key={post.slug} className="text-wrap max-w-md my-10">
          <Link href={`/blog/${post.metadata.category}/${post.slug}`}>
            <h3 className="font-bold py-2 leading-5 hover:text-blue-400">
              {post.metadata.title}
            </h3>
          </Link>
          <p className="leading-8 my-5">{post.metadata.summary}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.metadata.publisher)}
          </p>
        </article>
      ))}
    </>
  );
}
