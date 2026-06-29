import Link from "next/link";
import type { BreadcrumbItem } from "@/components/seo/breadcrumb-json-ld";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/layout/breadcrumb-nav.module.css";

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.nav} aria-label={UI_LABELS.breadcrumb.label}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.name}-${index}`} className={styles.item}>
              {isCurrent || !item.path ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={styles.link}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
