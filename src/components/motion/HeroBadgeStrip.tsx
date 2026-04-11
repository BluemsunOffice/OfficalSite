import { motion, useReducedMotion } from "motion/react";

type HeroBadgeStripProps = {
  badges: string[];
};

export default function HeroBadgeStrip({ badges }: HeroBadgeStripProps) {
  const reduceMotion = useReducedMotion();

  if (badges.length === 0) {
    return null;
  }

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <motion.li
          key={badge}
          className="mono rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs text-brand-600"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.28, delay: index * 0.05 }}
        >
          {badge}
        </motion.li>
      ))}
    </ul>
  );
}
