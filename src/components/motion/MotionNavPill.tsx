import {
  CircleUserRound,
  FileText,
  FlaskConical,
  Home,
  Newspaper,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";

type NavIconName = "home" | "blog" | "news" | "project" | "about" | "join";

type NavItem = {
  label: string;
  href: string;
  icon: NavIconName;
};

type MotionNavPillProps = {
  items: NavItem[];
  currentPath: string;
  compact?: boolean;
};

const iconMap: Record<NavIconName, LucideIcon> = {
  home: Home,
  blog: FileText,
  news: Newspaper,
  project: FlaskConical,
  about: CircleUserRound,
  join: UserPlus,
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

export default function MotionNavPill({
  items,
  currentPath,
  compact = false,
}: MotionNavPillProps) {
  const reduceMotion = useReducedMotion();
  const redirectTimer = useRef<number | null>(null);
  const currentActiveHref = useMemo(
    () =>
      items.find((item) => isActive(currentPath, item.href))?.href ??
      items[0]?.href ??
      "/",
    [items, currentPath],
  );
  const [activeHref, setActiveHref] = useState(currentActiveHref);

  useEffect(() => {
    setActiveHref(currentActiveHref);
  }, [currentActiveHref]);

  useEffect(() => {
    return () => {
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current);
      }
    };
  }, []);

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (compact) {
      const toggle = document.getElementById("mobile-nav-toggle");
      const panel = document.getElementById("mobile-nav-panel");
      if (toggle && panel) {
        toggle.setAttribute("aria-expanded", "false");
        panel.classList.remove("max-h-96", "opacity-100");
        panel.classList.add("max-h-0", "opacity-0");
      }
    }

    if (compact || reduceMotion || href === activeHref) {
      return;
    }

    event.preventDefault();
    setActiveHref(href);

    redirectTimer.current = window.setTimeout(() => {
      window.location.assign(href);
    }, 180);
  };

  return (
    <ul
      className={
        compact
          ? "grid gap-2"
          : "flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand-100/90 bg-white/80 p-2 shadow-[0_8px_20px_rgb(10_102_245/8%)]"
      }
    >
      {items.map((item) => {
        const active = item.href === activeHref;
        const Icon = iconMap[item.icon];

        return (
          <li key={item.href} className="relative">
            {active && (
              <motion.span
                layoutId={compact ? "nav-active-pill-mobile" : "nav-active-pill"}
                className="absolute inset-0 rounded-xl border border-brand-300 bg-brand-50"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 30,
                  mass: 0.7,
                }}
              />
            )}
            <a
              href={item.href}
              onClick={(event) => handleClick(event, item.href)}
              className={[
                "group relative z-10 inline-flex items-center gap-1.5 rounded-xl border border-transparent px-3 py-2 text-sm font-medium transition",
                active
                  ? "text-brand-600"
                  : "text-ink-500 hover:text-brand-500",
                compact ? "w-full justify-start" : "",
              ].join(" ")}
            >
              <Icon size={16} strokeWidth={2} />
              <span>{item.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
