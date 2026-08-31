"use client";

// import { useT } from "@/lib/useT";

interface DiscoveryItem {
  title: string;
  description: string;
  href: string;
}

interface ContentDiscoveryProps {
  title?: string;
  items: DiscoveryItem[];
  bgColor?: string;
  borderColor?: string;
}

export default function ContentDiscovery({
  title,
  items,
  bgColor = "bg-[var(--color-primary-50)]",
  borderColor = "border-[var(--color-primary-200)]",
}: ContentDiscoveryProps) {
  // const t = useT();
  if (items.length === 0) return null;

  return (
    <section className={`mb-10 p-6 rounded-xl ${bgColor} border ${borderColor}`}>
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
        {title || "You May Also Want to Understand"}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block p-3 rounded-lg bg-white hover:shadow-md transition-all border border-transparent hover:border-[var(--color-primary-200)]"
          >
            <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">{item.title}</h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
