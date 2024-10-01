import fs from "fs";
import path from "path";
import matter from "gray-matter";

// MDX dosyalarını almak için
function getMdxFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

// MDX dosyasını okumak için
function readMdxFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

// MDX verilerini ve meta verileri sunmak için
function getMdxData(dir: string) {
  const mdxFiles = getMdxFiles(dir);
  return mdxFiles.map((file) => {
    const { data, content } = readMdxFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data,
      slug,
      content,
    };
  });
}

// Blog yazılarını almak için
export function getBlogPosts() {
  return getMdxData(path.join(process.cwd(), "app", "blog", "contents"));
}

// Tarih formatlama işlevi
export function formatDate(date: string, includeRelative = true) {
  const currentDate = new Date();
  const targetDate = new Date(date.includes("T") ? date : `${date}T00:00:00`);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return includeRelative ? `${fullDate} (${formattedDate})` : fullDate;
}
