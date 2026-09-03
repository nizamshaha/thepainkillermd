"use client";

import { useState, useMemo } from "react";
import { getExercisesForArea, type Exercise } from "@/data/exercises";

interface Props {
  areaId: string;
  areaName: string;
}

export default function ExerciseLibrary({ areaId, areaName }: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const areaExercises = useMemo(() => getExercisesForArea(areaId), [areaId]);

  const filtered = useMemo(() => {
    if (difficultyFilter === "all") return areaExercises;
    return areaExercises.filter((e) => e.difficulty === difficultyFilter);
  }, [areaExercises, difficultyFilter]);

  if (areaExercises.length === 0) return null;

  return (
    <section className="py-8">
      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
          🏋️ Exercises & Rehabilitation
        </p>
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Recommended Exercises
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
          Evidence-based exercises commonly prescribed for {areaName.toLowerCase()} pain.
          Always perform within your pain-free range.
        </p>
      </div>

      {/* Difficulty Filter */}
      <div className="flex justify-center gap-2 mb-6">
        {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              difficultyFilter === level
                ? "bg-[var(--color-clinical-600)] text-white"
                : "bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)]"
            }`}
          >
            {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isActive={activeVideo === exercise.youtubeId}
            onPlay={() => setActiveVideo(exercise.youtubeId)}
            onClose={() => setActiveVideo(null)}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <strong>Important:</strong> These exercises are for educational purposes and are commonly
          recommended for {areaName.toLowerCase()} pain. They are not a substitute for personalized
          medical advice. Consult Dr. Shahnawaz F Shah or your healthcare provider before starting
          any exercise program, especially if you have acute pain, red flag symptoms, or recent surgery.
        </p>
      </div>
    </section>
  );
}

function ExerciseCard({
  exercise,
  isActive,
  onPlay,
  onClose,
}: {
  exercise: Exercise;
  isActive: boolean;
  onPlay: () => void;
  onClose: () => void;
}) {
  const difficultyColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl border border-[var(--color-surface-200)] bg-white overflow-hidden hover:shadow-md transition-shadow">
      {/* Video Embed or Thumbnail */}
      {isActive ? (
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${exercise.youtubeId}?autoplay=1&rel=0`}
            title={exercise.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 z-10"
            aria-label="Close video"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          onClick={onPlay}
          className="relative aspect-video bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] flex items-center justify-center group"
          aria-label={`Play ${exercise.title}`}
        >
          {/* YouTube thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
          />
          {/* Play button */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium z-10">
            {exercise.duration}
          </span>
        </button>
      )}

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-[var(--color-text-primary)] text-sm">{exercise.title}</h4>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase whitespace-nowrap ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-2">
          {exercise.description}
        </p>
        {exercise.precautions && (
          <p className="text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-2">
            ⚠️ {exercise.precautions}
          </p>
        )}
      </div>
    </div>
  );
}
