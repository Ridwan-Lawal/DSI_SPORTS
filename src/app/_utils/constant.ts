import {
  Bolt,
  Home,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  Rss,
  SquarePen,
  Users,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

export const SOCIALS = [
  {
    icon: FaXTwitter,
    name: "Twitter's X",
    username: "@DSI_Football",
    link: "https://x.com/DSI_Football?t=r8tWSLLtInTf7z0SEE-r0g&s=09",
  },

  {
    icon: FaInstagram,
    name: "Instagram",
    username: "@dsi_football",
    link: "https://www.instagram.com/dsi_football?utm_source=qr&igsh=NmRoMnczM21jNGlt",
  },

  {
    icon: FaYoutube,
    name: "YouTube",
    username: "@DSI_Football",
    link: "https://youtube.com/@dsi_football?si=v3bTBQwlTjzuDXKZ",
  },
  {
    icon: FaTiktok,
    name: "TikTok",
    username: "@dsi_football",
    link: "https://www.tiktok.com/@dsi_foootball?_t=ZM-8whhVbymj5y&_r=1",
  },
];

export const ARTICLES_PER_PAGE = 10;

export const PAGES = [
  { name: "home", link: "/", icon: Home },
  { name: "news", link: "/news", icon: Rss },
];

export const DASHBOARD = [
  { name: "overview", link: "/admin/overview", icon: LayoutDashboard },
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
