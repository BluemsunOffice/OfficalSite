import { motion, useReducedMotion } from "motion/react";

export type GalleryItem = {
  title: string;
  image: string;
  description?: string;
  href?: string;
};

type MotionGalleryProps = {
  items: GalleryItem[];
};

export default function MotionGallery({ items }: MotionGalleryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const body = (
          <motion.article
            className="surface-card overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            whileHover={reduceMotion ? {} : { y: -4 }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-ink-500">{item.description}</p>
              ) : null}
            </div>
          </motion.article>
        );

        if (!item.href) {
          return <div key={`${item.title}-${index}`}>{body}</div>;
        }

        return (
          <a
            key={`${item.title}-${index}`}
            href={item.href}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {body}
          </a>
        );
      })}
    </div>
  );
}
