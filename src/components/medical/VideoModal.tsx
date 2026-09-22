"use client";

import { useEffect, useRef, useCallback } from "react";
import type { PatientTestimonial, VideoItem } from "@/lib/types";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: PatientTestimonial;
  video?: VideoItem;
}

export default function VideoModal({ isOpen, onClose, testimonial, video }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const videoId = testimonial?.videoId || video?.videoId;
  const title = testimonial
    ? (testimonial.title || `${testimonial.patientName}'s Recovery Story — ${testimonial.condition}`)
    : video?.title || "Video";

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (!isOpen || (!testimonial && !video)) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Close video"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        {videoId ? (
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0${testimonial?.playlistId ? `&list=${testimonial.playlistId}` : ''}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-clinical-600)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[var(--color-text-secondary)]">Video not available</p>
            </div>
          </div>
        )}

        {/* Clinical Metadata */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
            {(testimonial?.youtubeUrl || testimonial?.playlistId) && (
              <a
                href={testimonial.youtubeUrl || `https://www.youtube.com/watch?v=${testimonial.videoId}&list=${testimonial.playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors w-fit flex-shrink-0"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch on YouTube
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>


          {testimonial && (
            <div className="space-y-4">
              {/* Patient quote */}
              <blockquote className="pl-4 border-l-4 border-[var(--color-clinical-500)] italic text-[var(--color-text-secondary)]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Patient info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Patient</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{testimonial.patientName}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Condition</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{testimonial.condition}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Procedure</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{testimonial.procedure}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold">Duration</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{testimonial.duration}</p>
                </div>
              </div>

              {/* Recovery summary */}
              <div className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                  Clinical Recovery Summary
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {testimonial.recoverySummary}
                </p>
              </div>

              {/* Recovery milestones */}
              <div className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                  Recovery Milestones
                </h4>
                <ul className="space-y-2">
                  {testimonial.recoveryMilestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consent & disclaimer */}
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                {testimonial.consentVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Informed Consent Verified
                  </span>
                )}
                <span>Recorded: {new Date(testimonial.dateRecorded).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </div>
          )}

          {video && !testimonial && (
            <p className="text-[var(--color-text-secondary)] leading-relaxed">{video.description}</p>
          )}

          {/* Medical disclaimer */}
          <p className="mt-4 text-xs text-[var(--color-text-muted)] leading-relaxed">
            Patient testimonials reflect individual experiences and outcomes. Results may vary. This content is for
            educational purposes and does not constitute medical advice. Consult a qualified healthcare professional
            for personalized evaluation and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
