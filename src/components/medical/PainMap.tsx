"use client";

import { useState, useCallback } from "react";

interface PainArea {
  id: string;
  name: string;
  description: string;
  region: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  point: {
    top: string;
    left: string;
  };
}

interface PainMapProps {
  onSelectPainArea?: (areaId: string) => void;
  bodyImageSrc?: string;
}

// Pain areas configuration with percentage-based responsive coordinates
const PAIN_AREAS: PainArea[] = [
  {
    id: 'headache',
    name: 'Headache',
    description: 'Pain in the head, temples, or forehead region including tension headaches and migraines.',
    region: { top: '5%', left: '42%', width: '16%', height: '14%' },
    point: { top: '9%', left: '50%' }
  },
  {
    id: 'face',
    name: 'Face Pain',
    description: 'Pain affecting the facial region, jaw, or sinuses.',
    region: { top: '10%', left: '44%', width: '12%', height: '8%' },
    point: { top: '13%', left: '50%' }
  },
  {
    id: 'neck',
    name: 'Neck Pain',
    description: 'Stiffness, discomfort, or pain in the cervical spine and surrounding neck muscles.',
    region: { top: '18%', left: '45%', width: '10%', height: '7%' },
    point: { top: '21%', left: '50%' }
  },
  {
    id: 'left-shoulder',
    name: 'Left Shoulder',
    description: 'Pain in the left shoulder joint, rotator cuff, or surrounding muscles.',
    region: { top: '23%', left: '23%', width: '20%', height: '15%' },
    point: { top: '28%', left: '30%' }
  },
  {
    id: 'right-shoulder',
    name: 'Right Shoulder',
    description: 'Pain in the right shoulder joint, rotator cuff, or surrounding muscles.',
    region: { top: '23%', left: '57%', width: '20%', height: '15%' },
    point: { top: '28%', left: '70%' }
  },
  {
    id: 'upper-back',
    name: 'Upper Back',
    description: 'Pain between the shoulder blades in the thoracic spine region.',
    region: { top: '30%', left: '40%', width: '20%', height: '14%' },
    point: { top: '36%', left: '50%' }
  },
  {
    id: 'lower-back',
    name: 'Lower Back',
    description: 'Pain in the lumbar spine region, the most common type of back pain.',
    region: { top: '45%', left: '38%', width: '24%', height: '14%' },
    point: { top: '51%', left: '50%' }
  },
  {
    id: 'left-hip',
    name: 'Left Hip',
    description: 'Pain in the left hip joint or surrounding pelvic region.',
    region: { top: '56%', left: '35%', width: '16%', height: '10%' },
    point: { top: '60%', left: '41%' }
  },
  {
    id: 'right-hip',
    name: 'Right Hip',
    description: 'Pain in the right hip joint or surrounding pelvic region.',
    region: { top: '56%', left: '49%', width: '16%', height: '10%' },
    point: { top: '60%', left: '59%' }
  },
  {
    id: 'left-knee',
    name: 'Left Knee',
    description: 'Pain affecting the left knee joint, ligaments, or surrounding structures.',
    region: { top: '68%', left: '36%', width: '12%', height: '12%' },
    point: { top: '73%', left: '41.5%' }
  },
  {
    id: 'right-knee',
    name: 'Right Knee',
    description: 'Pain affecting the right knee joint, ligaments, or surrounding structures.',
    region: { top: '68%', left: '52%', width: '12%', height: '12%' },
    point: { top: '73%', left: '58.5%' }
  }
];

export default function PainMap({ onSelectPainArea, bodyImageSrc = '/images/body.jpeg' }: PainMapProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleHighlight = useCallback((areaId: string) => {
    if (selectedArea !== areaId) {
      setHoveredArea(areaId);
    }
  }, [selectedArea]);

  const handleUnhighlight = useCallback((areaId: string) => {
    if (selectedArea !== areaId) {
      setHoveredArea(null);
    }
  }, [selectedArea]);

  const handleSelect = useCallback((areaId: string) => {
    setSelectedArea(areaId);
    setHoveredArea(null);
    if (onSelectPainArea) {
      onSelectPainArea(areaId);
    }
  }, [onSelectPainArea]);

  const handleReset = useCallback(() => {
    setSelectedArea(null);
    setHoveredArea(null);
  }, []);

  const selectedAreaData = PAIN_AREAS.find(area => area.id === selectedArea);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Main Body Map */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg">
          <div className="relative max-w-[550px] mx-auto aspect-[1/1.5]">
            {/* Body Image */}
            <img
              src={bodyImageSrc}
              alt="Human body diagram"
              className="absolute top-0 left-0 w-full h-full object-contain select-none pointer-events-none opacity-95"
            />

            {/* Interactive Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {PAIN_AREAS.map((area) => {
                const isSelected = selectedArea === area.id;
                const isHighlighted = hoveredArea === area.id;

                return (
                  <div key={area.id}>
                    {/* Region hover zone (macro) */}
                    <div
                      className="absolute pointer-events-auto cursor-pointer z-0 transition-all duration-400"
                      style={{
                        top: area.region.top,
                        left: area.region.left,
                        width: area.region.width,
                        height: area.region.height,
                      }}
                      onMouseEnter={() => handleHighlight(area.id)}
                      onMouseLeave={() => handleUnhighlight(area.id)}
                      onClick={() => handleSelect(area.id)}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-450 ${
                          isHighlighted && !isSelected
                            ? 'w-[200%] h-[200%] opacity-100'
                            : 'w-0 h-0 opacity-0'
                        }`}
                        style={{
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 65%)',
                        }}
                      />
                    </div>

                    {/* Pain point (micro) */}
                    <div
                      className={`absolute w-[22px] h-[22px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 ${
                        isHighlighted || isSelected ? 'scale-115' : 'scale-100'
                      }`}
                      style={{
                        top: area.point.top,
                        left: area.point.left,
                      }}
                      onMouseEnter={() => handleHighlight(area.id)}
                      onMouseLeave={() => handleUnhighlight(area.id)}
                      onClick={() => handleSelect(area.id)}
                      role="button"
                      aria-label={`Select ${area.name}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelect(area.id);
                        }
                      }}
                    >
                      <div
                        className={`w-full h-full rounded-full border-3 transition-all duration-350 ${
                          isSelected
                            ? 'border-red-500 bg-red-500 shadow-[0_0_0_5px_rgba(239,68,68,0.3),0_0_16px_rgba(239,68,68,0.4)]'
                            : isHighlighted
                            ? 'border-red-500 bg-red-500 shadow-[0_0_0_8px_rgba(239,68,68,0.3),0_0_24px_rgba(239,68,68,0.3),0_0_36px_rgba(239,68,68,0.2)] animate-pulse-glow'
                            : 'border-blue-500 bg-blue-500/15'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              How to Use This Tool
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-500 before:font-bold">
                Hover over body regions to highlight general areas
              </li>
              <li className="pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-500 before:font-bold">
                Hover directly on pain points to see them glow red
              </li>
              <li className="pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-500 before:font-bold">
                Click on any point to lock in your selection
              </li>
              <li className="pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-500 before:font-bold">
                Use the sidebar menu to browse all available areas
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Pain Areas</h2>

          <div className="space-y-2.5">
            {PAIN_AREAS.map((area) => {
              const isSelected = selectedArea === area.id;
              const isHighlighted = hoveredArea === area.id;

              return (
                <div
                  key={area.id}
                  className={`px-4 py-3.5 border-2 rounded-xl cursor-pointer transition-all duration-250 font-medium text-[15px] ${
                    isSelected
                      ? 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : isHighlighted
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500 font-semibold translate-x-1'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:border-blue-500 hover:bg-white dark:hover:bg-gray-800 hover:translate-x-0.5'
                  }`}
                  onMouseEnter={() => handleHighlight(area.id)}
                  onMouseLeave={() => handleUnhighlight(area.id)}
                  onClick={() => handleSelect(area.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(area.id);
                    }
                  }}
                >
                  {area.name}
                </div>
              );
            })}
          </div>

          {/* Selection Display */}
          {selectedAreaData && (
            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl animate-slide-in">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                Selected Area
              </h3>
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {selectedAreaData.name}
              </div>
              <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedAreaData.description}
              </p>
              <button
                onClick={handleReset}
                className="mt-5 w-full px-4 py-3.5 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-semibold text-[15px] text-gray-900 dark:text-white transition-all hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:border-gray-900 dark:hover:border-white"
              >
                Clear Selection
              </button>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.3),
                        0 0 24px rgba(239, 68, 68, 0.3),
                        0 0 36px rgba(239, 68, 68, 0.2);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(239, 68, 68, 0.15),
                        0 0 32px rgba(239, 68, 68, 0.3),
                        0 0 48px rgba(239, 68, 68, 0.3);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 1.8s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
