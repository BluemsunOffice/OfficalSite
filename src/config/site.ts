export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "blog" | "news" | "project" | "about" | "join";
};

export type SocialItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  slogan: "Bluemsun Studio",
  name: "Bluemsun Studio",
  zhName: "蓝旭工作室",
  description:
    "蓝旭工作室是计算机系技术实践团队，聚焦真实项目、工程协作与持续成长。",
  domain: "https://www.bluemsun.com.cn",
  language: "zh-CN",
  theme: {
    accent: "#0A66F5",
    accentSoft: "#EAF2FF",
    background: "#F7FAFF",
    surface: "#FFFFFF",
    text: "#0F172A",
    muted: "#5B6B85",
  },
  nav: [
    { label: "首页", href: "/", icon: "home" },
    { label: "博客", href: "/blog/", icon: "blog" },
    { label: "新闻", href: "/news/", icon: "news" },
    { label: "项目", href: "/projects/", icon: "project" },
    { label: "关于", href: "/about/", icon: "about" },
    { label: "加入我们", href: "/join/", icon: "join" },
  ] satisfies NavItem[],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/BluemsunOffice",
    },
  ] satisfies SocialItem[],
  footer: {
    copyright: "© Hello! Bluemsun",
    beian: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
