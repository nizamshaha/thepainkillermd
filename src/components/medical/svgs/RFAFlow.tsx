export default function RFAFlow() {
  const stages = [
    {
      num: "01",
      title: "Identification",
      description: "Clinical assessment confirms facet joint as the pain generator through examination findings and imaging.",
      color: "#1565c0",
      icon: "🔍",
    },
    {
      num: "02",
      title: "Diagnostic Block",
      description: "Medial branch block with local anesthetic confirms 80%+ pain relief, validating the facet joint as the pain source.",
      color: "#6a1b9a",
      icon: "💉",
    },
    {
      num: "03",
      title: "Safety Testing",
      description: "Sensory (50Hz) and motor (2Hz) stimulation under fluoroscopy confirms correct needle placement and safe distance from motor nerves.",
      color: "#e65100",
      icon: "⚡",
    },
    {
      num: "04",
      title: "Thermal Neurotomy",
      description: "Controlled RF energy at 80°C creates a precise thermal lesion on the medial branch nerve, interrupting pain signal transmission.",
      color: "#c62828",
      icon: "🔥",
    },
    {
      num: "05",
      title: "Active Rehabilitation",
      description: "Structured physical therapy, core stabilization, and ergonomic modifications to address underlying biomechanical dysfunction and prevent recurrence.",
      color: "#2e7d32",
      icon: "🏋️",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
        Radiofrequency Ablation — 5-Stage Clinical Pathway
      </h3>
      <svg viewBox="0 0 900 320" className="w-full" role="img" aria-label="5-stage RFA clinical pathway from identification through rehabilitation">
        <title>RFA Clinical Flow</title>
        <desc>A 5-stage clinical pathway for Radiofrequency Ablation: Identification, Diagnostic Block, Safety Testing, Thermal Neurotomy, and Active Rehabilitation.</desc>

        <rect width="900" height="320" fill="#f8f9fa" rx="12" />

        {stages.map((stage, i) => {
          const x = 15 + i * 178;
          // const centerX = x + 80;
          return (
            <g key={i} transform={`translate(${x}, 20)`}>
              {/* Connector arrow */}
              {i > 0 && (
                <g transform="translate(-18, 75)">
                  <line x1="0" y1="0" x2="15" y2="0" stroke={stage.color} strokeWidth="2" opacity="0.5" />
                  <polygon points="15,-4 23,0 15,4" fill={stage.color} opacity="0.5" />
                </g>
              )}

              {/* Card */}
              <rect width="160" height="280" rx="10" fill="white" stroke={stage.color} strokeWidth="1.5" />

              {/* Stage number badge */}
              <g transform="translate(80, 0)">
                <circle cx="0" cy="0" r="18" fill={stage.color} />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                  {stage.num}
                </text>
              </g>

              {/* Icon */}
              <text x="80" y="55" textAnchor="middle" fontSize="28">
                {stage.icon}
              </text>

              {/* Title */}
              <text x="80" y="85" textAnchor="middle" fill={stage.color} fontSize="12" fontWeight="700">
                {stage.title}
              </text>

              {/* Description */}
              <text x="80" y="110" textAnchor="middle" fill="#4a5568" fontSize="9.5" style={{ lineHeight: '1.4' }}>
                {stage.description.length > 60 ? [
                  stage.description.slice(0, 60),
                  stage.description.slice(60, 120),
                  stage.description.slice(120)
                ].filter(Boolean).map((line, li) => (
                  <tspan key={li} x="80" dy={li === 0 ? 0 : 14}>{line}</tspan>
                )) : stage.description}
              </text>

              {/* Bottom accent line */}
              <rect x="30" y="270" width="100" height="3" rx="1.5" fill={stage.color} opacity="0.3" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
