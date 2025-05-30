export function formatExcerpts(
  excerpt: string | undefined,
): string | undefined {
  if (excerpt) {
    const excerptToArr = excerpt?.split(" ");
    const featuredArticleExcerpt = excerptToArr
      ? excerptToArr?.length > 30
        ? `${excerptToArr?.slice(0, 31)?.join(" ")}...`
        : `${excerptToArr?.join(" ")}`
      : "";

    return featuredArticleExcerpt;
  }
}
