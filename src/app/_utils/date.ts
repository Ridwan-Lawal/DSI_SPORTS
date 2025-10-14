import { formatDistanceToNow } from "date-fns";

export function formatArticleDate(publishedAt: Date | null | undefined) {
  if (publishedAt) {
    const distance = formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    });

    return distance
      .replace("about ", "")
      .replace(" minutes", "min")
      .replace(" minute", "min")
      .replace(" hours", "hrs")
      .replace(" hour", "hr")
      .replace(" months", "mos")
      .replace(" month", "mo");
  }
}

export function formatDateForPostPage(publishedAt: Date | null | undefined) {
  if (publishedAt) {
    const formatDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "long",
    }).format(publishedAt);

    return formatDate;
  }
}
