"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";
import { testimonials, educationalVideos } from "@/data/testimonials";
import type { PatientTestimonial, VideoItem } from "@/lib/types";

type TabFilter = "all" | "testimonial" | "animation";

export default function WatchAndLearn() {
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

  // Filter content based on active tab
  const filteredTestimonials = activeTab === "all" || activeTab === "testimonial" ? testimonials : [];
  const filteredAnimations = activeTab === "all" || activeTab === "animation"
    ? educationalVideos.filter((v) => v.category === "animation" || v.category === "procedure" || v.category === "education")
    : [];

  return (
    <section id="videos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="watch-title">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            11. Video Education &amp; Patient Stories
          </p>
          <h2
            id="watch-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          >
            Watch &amp; Learn
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Hear directly from patients who found relief, and explore 3D anatomical walkthroughs and procedure animations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {([
            { key: "all" as TabFilter, label: "All Videos & Stories" },
            { key: "testimonial" as TabFilter, label: "Patient Stories" },
            { key: "animation" as TabFilter, label: "Medical Animations" },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-[var(--color-clinical-600)] text-white shadow-md"
                  : "bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)] border border-[var(--color-surface-300)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Patient Testimonials */}
        {filteredTestimonials.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-medical-500)]" />
              Patient Recovery Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((t) => (
                <button
                  key={t.id}
                  onClick={() => openTestimonial(t)}
                  className="group text-left rounded-xl overflow-hidden border border-[var(--color-surface-200)] bg-white hover:shadow-xl transition-all"
                  aria-label={`Watch ${t.patientName}'s recovery story from ${t.condition}`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] overflow-hidden">
                    {t.thumbnailUrl ? (
                      <img
                        src={t.thumbnailUrl}
                        alt={`${t.condition} recovery video thumbnail`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-[var(--color-primary-300)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-[var(--color-clinical-600)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-medium">
                      {t.duration}
                    </span>
                    {/* Consent badge */}
                    {t.consentVerified && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600/90 text-white text-xs rounded font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--color-medical-100)] text-[var(--color-medical-700)]">
                        Patient Story
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">{t.condition}</span>
                    </div>
                    <h4 className="font-bold text-[var(--color-text-primary)] mb-1">
                      {t.patientName}&apos;s Recovery from {t.condition}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-xs text-[var(--color-clinical-600)] mt-2 font-medium">
                      Procedure: {t.procedure} →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Educational Videos & Animations */}
        {filteredAnimations.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-clinical-500)]" />
              Medical Animations &amp; Educational Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimations.map((v) => (
                <button
                  key={v.id}
                  onClick={() => openVideo(v)}
                  className="group text-left rounded-xl overflow-hidden border border-[var(--color-surface-200)] bg-white hover:shadow-xl transition-all"
                  aria-label={`Play ${v.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center overflow-hidden">
                    {v.thumbnailUrl ? (
                      <img
                        src={v.thumbnailUrl}
                        alt={`${v.title} video thumbnail`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-[var(--color-primary-300)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-[var(--color-clinical-600)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-medium">
                      {v.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        v.category === "animation"
                          ? "bg-purple-50 text-purple-700"
                          : v.category === "procedure"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {v.category === "animation" ? "3D Animation" : v.category === "procedure" ? "Procedure" : "Education"}
                      </span>
                    </div>
                    <h4 className="font-bold text-[var(--color-text-primary)] mb-1">{v.title}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{v.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video Modal */}
        <VideoModal
          isOpen={modalOpen}
          onClose={closeModal}
          testimonial={selectedTestimonial}
          video={selectedVideo}
        />
      </div>
    </section>
  );
}
