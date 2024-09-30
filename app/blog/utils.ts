import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { metadata } from "../layout";

// get all the mdx files in a directory
function getMdxFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}
// read data from those files
function readMdxFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, "utf-8");

  return matter(rawContent);
}
// present the mdx data and metadata
function getMdxData(dir: string) {
  let mdxFile = getMdxFiles(dir);

  return mdxFile.map((file) => {
    let { data, content } = readMdxFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMdxData(path.join(process.cwd(), "app", "blog", "contents"));
}

export function formData(date: string, includeRelative = true) {
  let currentDate = new Date(date);
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
}

let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

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

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

