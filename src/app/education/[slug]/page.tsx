"use client";

import { use, useState } from "react";
import { getArticleBySlug, articles } from "@/data/articles";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PhysicianAvatar from "@/components/ui/PhysicianAvatar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import TableOfContents from "@/components/ui/TableOfContents";
import ShareButtons from "@/components/ui/ShareButtons";
import { useT } from "@/lib/useT";
import Link from "next/link";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useT();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            {t("condition.notFound")}
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/education"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
          >
            ← {t("nav.education")}
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter(
    (a) => a.slug !== article.slug && article.relatedSlugs.includes(a.slug)
  );

  const sections = article.content.split("\n\n").filter((s) => s.trim());

  return (
    <>
      <ReadingProgress />

      <Breadcrumbs
        items={[
          { label: t("nav.education"), href: "/education" },
          { label: article.title },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                {article.category}
              </span>
              <span className="text-xs text-white/50">{article.readTime} read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">{article.excerpt}</p>
            <ShareButtons title={article.title} />
          </div>
        </div>
      </section>

      {/* Content with sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {sections.map((section, i) => {
              const trimmed = section.trim();
              if (trimmed.startsWith("## ")) {
                const headingText = trimmed.replace("## ", "");
                const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return (
                  <h2
                    key={i}
                    id={id}
                    className="text-2xl font-bold text-[var(--color-text-primary)] mt-10 mb-4 scroll-mt-24"
                  >
                    {headingText}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                const headingText = trimmed.replace("### ", "");
                const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return (
                  <h3
                    key={i}
                    id={id}
                    className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-3 scroll-mt-24"
                  >
                    {headingText}
                  </h3>
                );
              }
              if (trimmed.includes("\n- ")) {
                const lines = trimmed.split("\n");
                const intro = lines.filter((l) => !l.startsWith("- "));
                const bullets = lines.filter((l) => l.startsWith("- "));
                return (
                  <div key={i} className="mb-4">
                    {intro.length > 0 && intro[0].trim() && (
                      <p className="text-[var(--color-text-secondary)] mb-3 leading-relaxed">
                        {formatInlineText(intro.join(" "))}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
                          <span>{formatInlineText(b.replace("- ", ""))}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (/^\d+\./.test(trimmed)) {
                const items = trimmed.split("\n").filter((l) => l.trim());
                return (
                  <ol key={i} className="space-y-2 mb-4 list-decimal list-inside">
                    {items.map((item, j) => (
                      <li key={j} className="text-[var(--color-text-secondary)] leading-relaxed pl-2">
                        {formatInlineText(item.replace(/^\d+\.\s*/, ""))}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {formatInlineText(trimmed)}
                </p>
              );
            })}

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section id="faq" className="mt-12 mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  {t("condition.faq")}
                </h2>
                <div className="space-y-3">
                  {article.faq.map((item, i) => (
                    <FAQItem key={i} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </section>
            )}

            {/* Share bar at bottom */}
            <div className="mt-10 pt-6 border-t border-[var(--color-surface-200)]">
              <ShareButtons title={article.title} />
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-8 mb-10 p-6 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                  Related Articles
                </h3>
                <div className="space-y-2">
                  {relatedArticles.map((a) => (
                    <a
                      key={a.slug}
                      href={`/education/${a.slug}`}
                      className="block p-3 rounded-lg bg-white hover:shadow-md transition-all border border-transparent hover:border-[var(--color-primary-200)]"
                    >
                      <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">
                        {a.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                        {a.excerpt}
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Doctor CTA */}
            <section className="mt-10 p-6 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
              <div className="flex items-start gap-4">
                <PhysicianAvatar size="lg" />
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">
                    Dr. Shahnawaz F Shah
                  </h3>
                  <p className="text-sm text-[var(--color-clinical-600)] mb-2">
                    {t("doctor.specialty")}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    For personalized evaluation and treatment, consult with Dr. Shah.
                  </p>
                  <a
                    href="/clinic#book"
                    className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
                  >
                    {t("hero.cta.primary")}
                  </a>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-8 text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-surface-200)] pt-6">
              <strong>{t("condition.disclaimer")}:</strong>{" "}
              {t("condition.disclaimerFull")}
            </div>
          </article>

          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}

function formatInlineText(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-text-primary)]">
          {part}
        </strong>
      );
    }
    return part;
  });
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-[var(--color-surface-200)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--color-surface-50)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[var(--color-text-primary)]">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-[var(--color-text-secondary)] leading-relaxed">{answer}</div>
      )}
    </div>
  );
}
