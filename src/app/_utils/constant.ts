import {
  Bolt,
  ChartPie,
  Home,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  Rss,
  SquarePen,
  Users,
} from "lucide-react";

export const PAGES = [
  { name: "home", link: "/", icon: Home },
  { name: "news", link: "/news", icon: Rss },
];

export const DASHBOARD = [
  { name: "overview", link: "/admin/overview", icon: LayoutDashboard },
  { name: "analytics", link: "/admin/analytics", icon: ChartPie },
];

export const CONTENTS = [
  { name: "create article", link: "/admin/articles/new", icon: SquarePen },
  { name: "articles", link: "/admin/articles", icon: Newspaper },
  { name: "comments", link: "/admin/comments", icon: MessageSquareText },
];

export const TEAMS = [
  { name: "teams", link: "/admin/teams", icon: Users },
  { name: "settings", link: "/admin/settings", icon: Bolt },
];

export const PASSWORD_REQUIREMENT = [
  "Password must be 8 or more characters.",
  "Password must contain at least a letter.",
  "Password must contain at least a special character (@, _, &,-,%,$).",
  "Password must contain at least a number.",
];
