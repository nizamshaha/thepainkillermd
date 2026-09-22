"use client";

import { useState } from "react";
import VideoModal from "@/components/medical/VideoModal";
import { testimonials, educationalVideos, YOUTUBE_TESTIMONIALS_PLAYLIST_URL } from "@/data/testimonials";
import type { PatientTestimonial, VideoItem } from "@/lib/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

type TabFilter = "all" | "testimonial" | "animation";

export default function VideosPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<PatientTestimonial | undefined>();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | undefined>();

  const openTestimonial = (t: PatientTestimonial) => {
    setSelectedTestimonial(t);
    setSelectedVideo(undefined);
    setModalOpen(true);
  };

  const openVideo = (v: VideoItem) => {
    setSelectedVideo(v);
    setSelectedTestimonial(undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(undefined);
    setSelectedVideo(undefined);
  };

  const allItems: Array<{ type: "testimonial" | "video"; data: PatientTestimonial | VideoItem }> = [
    ...testimonials.map((t) => ({ type: "testimonial" as const, data: t })),
    ...educationalVideos.map((v) => ({ type: "video" as const, data: v })),
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "testimonial") return item.type === "testimonial";
    if (activeTab === "animation") return item.type === "video";
    return true;
  });

  const tabs = [
    { key: "all" as TabFilter, label: t("videos.allVideos"), count: allItems.length },
    { key: "testimonial" as TabFilter, label: t("videos.patientStories"), count: testimonials.length },
    { key: "animation" as TabFilter, label: t("videos.medicalAnimations"), count: educationalVideos.length },
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={[{ label: t("nav.videos") }]} />
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-clinical-300)] uppercase tracking-wider mb-2">
            Video Hub
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("videos.title")}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hear directly from patients who found relief through evidence-based pain medicine,
            and explore 3D anatomical walkthroughs and procedure animations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-[var(--color-clinical-600)] text-white shadow-md"
                    : "bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)] border border-[var(--color-surface-300)]"
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.key ? "bg-white/20" : "bg-[var(--color-surface-200)]"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* YouTube Playlist Callout */}
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 border border-red-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Dr. Shahnawaz Shah&apos;s Official Patient Stories</h3>
                <p className="text-xs text-gray-600">Watch real patient recovery journeys and testimonials on YouTube</p>
              </div>
            </div>
            <a
              href={YOUTUBE_TESTIMONIALS_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow transition-all hover:scale-[1.02] flex-shrink-0"
            >
              Open YouTube Playlist
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              if (item.type === "testimonial") {
                const t = item.data as PatientTestimonial;
                return (
                  <button
                    key={t.id}
                    onClick={() => openTestimonial(t)}
                    className="group text-left rounded-xl overflow-hidden border border-[var(--color-surface-200)] bg-white hover:shadow-xl transition-all"
                    aria-label={`Watch ${t.patientName}'s recovery story`}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] overflow-hidden">
                      {t.thumbnailUrl ? (
                        <img src={t.thumbnailUrl} alt={`${t.condition} recovery`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-[var(--color-primary-300)]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-[var(--color-clinical-600)] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-medium">{t.duration}</span>
                      {t.consentVerified && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600/90 text-white text-xs rounded font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--color-medical-100)] text-[var(--color-medical-700)]">Patient Story</span>
                        <span className="text-xs text-[var(--color-text-muted)]">{t.condition}</span>
                      </div>
                      <h3 className="font-bold text-[var(--color-text-primary)] mb-1 line-clamp-2">
                        {t.title || `${t.patientName}'s Recovery`}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
                      <p className="text-xs text-[var(--color-clinical-600)] mt-2 font-medium">{t.procedure} →</p>
                    </div>
                  </button>
                );
              } else {
                const v = item.data as VideoItem;
                return (
                  <button
                    key={v.id}
                    onClick={() => openVideo(v)}
                    className="group text-left rounded-xl overflow-hidden border border-[var(--color-surface-200)] bg-white hover:shadow-xl transition-all"
                    aria-label={`Play ${v.title}`}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center overflow-hidden">
                      {v.thumbnailUrl ? (
                        <img src={v.thumbnailUrl} alt={`${v.title} thumbnail`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-[var(--color-primary-300)]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-[var(--color-clinical-600)] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-medium">{v.duration}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          v.category === "animation" ? "bg-purple-50 text-purple-700" : v.category === "procedure" ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {v.category === "animation" ? "3D Animation" : v.category === "procedure" ? "Procedure" : "Education"}
                        </span>
                      </div>
                      <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{v.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{v.description}</p>
                    </div>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={closeModal}
        testimonial={selectedTestimonial}
        video={selectedVideo}
      />
    </div>
  );
}
