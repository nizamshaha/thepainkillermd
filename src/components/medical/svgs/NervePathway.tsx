export default function NervePathway() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
        Nerve Pain Pathway — Radiculopathy
      </h3>
      <svg viewBox="0 0 800 350" className="w-full" role="img" aria-label="Diagram showing nerve pain pathway from disc herniation through cytokine release, ectopic firing, to dermatomal radiation">
        <title>Nerve Pain Pathway Diagram</title>
        <desc>A 4-stage diagram: Disc herniation leads to cytokine release, which causes ectopic firing, resulting in dermatomal radiation pain.</desc>

        {/* Background */}
        <rect width="800" height="350" fill="#f8f9fa" rx="12" />

        {/* Stage 1: Disc Herniation */}
        <g transform="translate(30, 40)">
          <rect width="165" height="270" rx="10" fill="white" stroke="#e4e7ec" strokeWidth="1.5" />
          <rect width="165" height="36" rx="10" fill="#1565c0" />
          <rect y="26" width="165" height="10" fill="#1565c0" />
          <text x="82" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">STAGE 1</text>
          <text x="82" y="58" textAnchor="middle" fill="#1a1d23" fontSize="12" fontWeight="600">Disc Herniation</text>

          {/* Spine illustration */}
          <g transform="translate(35, 75)">
            {/* Vertebrae */}
            <rect x="20" y="0" width="50" height="15" rx="3" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />
            <rect x="20" y="22" width="50" height="15" rx="3" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />
            {/* Disc (herniated) */}
            <ellipse cx="45" cy="20" rx="25" ry="8" fill="#e65100" opacity="0.6" />
            <ellipse cx="52" cy="20" rx="12" ry="6" fill="#c62828" opacity="0.8" />
            {/* Compressed nerve */}
            <path d="M65,15 Q75,10 80,20 Q85,30 80,40" fill="none" stroke="#c62828" strokeWidth="2" strokeDasharray="3,2" />
            <circle cx="80" cy="25" r="3" fill="#c62828" />
          </g>
          <text x="82" y="170" textAnchor="middle" fill="#4a5568" fontSize="9.5">Nucleus pulposus protrudes</text>
          <text x="82" y="183" textAnchor="middle" fill="#4a5568" fontSize="9.5">through annular tear,</text>
          <text x="82" y="196" textAnchor="middle" fill="#4a5568" fontSize="9.5">compressing adjacent</text>
          <text x="82" y="209" textAnchor="middle" fill="#4a5568" fontSize="9.5">nerve root.</text>

          <text x="82" y="240" textAnchor="middle" fill="#c62828" fontSize="9" fontWeight="600">Mechanical Compression</text>
          <text x="82" y="253" textAnchor="middle" fill="#c62828" fontSize="9" fontWeight="600">+ Chemical Irritation</text>
        </g>

        {/* Arrow 1 */}
        <g transform="translate(195, 155)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#1565c0" strokeWidth="2" />
          <polygon points="35,-5 45,0 35,5" fill="#1565c0" />
        </g>

        {/* Stage 2: Cytokine Release */}
        <g transform="translate(240, 40)">
          <rect width="165" height="270" rx="10" fill="white" stroke="#e4e7ec" strokeWidth="1.5" />
          <rect width="165" height="36" rx="10" fill="#6a1b9a" />
          <rect y="26" width="165" height="10" fill="#6a1b9a" />
          <text x="82" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">STAGE 2</text>
          <text x="82" y="58" textAnchor="middle" fill="#1a1d23" fontSize="12" fontWeight="600">Inflammatory Cascade</text>

          {/* Cytokine visualization */}
          <g transform="translate(20, 75)">
            {/* Nerve fiber */}
            <path d="M10,40 C40,35 60,45 80,38 C100,31 120,42 140,40" fill="none" stroke="#4a8bc9" strokeWidth="3" />
            {/* Inflammatory mediators */}
            <circle cx="30" cy="28" r="5" fill="#e65100" opacity="0.7" />
            <circle cx="55" cy="22" r="4" fill="#c62828" opacity="0.7" />
            <circle cx="80" cy="30" r="6" fill="#e65100" opacity="0.6" />
            <circle cx="110" cy="25" r="4" fill="#c62828" opacity="0.7" />
            <circle cx="125" cy="32" r="5" fill="#e65100" opacity="0.5" />
            {/* Labels */}
            <text x="30" y="18" textAnchor="middle" fill="#e65100" fontSize="7" fontWeight="600">TNF-α</text>
            <text x="60" y="14" textAnchor="middle" fill="#c62828" fontSize="7" fontWeight="600">IL-1β</text>
            <text x="90" y="18" textAnchor="middle" fill="#e65100" fontSize="7" fontWeight="600">PGE₂</text>
            <text x="118" y="16" textAnchor="middle" fill="#c62828" fontSize="7" fontWeight="600">NGF</text>
          </g>

          <text x="82" y="170" textAnchor="middle" fill="#4a5568" fontSize="9.5">Disc material releases</text>
          <text x="82" y="183" textAnchor="middle" fill="#4a5568" fontSize="9.5">inflammatory mediators:</text>
          <text x="82" y="196" textAnchor="middle" fill="#4a5568" fontSize="9.5">TNF-α, IL-1β, PGE₂,</text>
          <text x="82" y="209" textAnchor="middle" fill="#4a5568" fontSize="9.5">substance P, NGF.</text>

          <text x="82" y="240" textAnchor="middle" fill="#6a1b9a" fontSize="9" fontWeight="600">Chemical Radiculitis</text>
          <text x="82" y="253" textAnchor="middle" fill="#6a1b9a" fontSize="9" fontWeight="600">Nociceptor Sensitization</text>
        </g>

        {/* Arrow 2 */}
        <g transform="translate(405, 155)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#6a1b9a" strokeWidth="2" />
          <polygon points="35,-5 45,0 35,5" fill="#6a1b9a" />
        </g>

        {/* Stage 3: Ectopic Firing */}
        <g transform="translate(450, 40)">
          <rect width="165" height="270" rx="10" fill="white" stroke="#e4e7ec" strokeWidth="1.5" />
          <rect width="165" height="36" rx="10" fill="#e65100" />
          <rect y="26" width="165" height="10" fill="#e65100" />
          <text x="82" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">STAGE 3</text>
          <text x="82" y="58" textAnchor="middle" fill="#1a1d23" fontSize="12" fontWeight="600">Ectopic Impulse Generation</text>

          {/* Action potential visualization */}
          <g transform="translate(10, 80)">
            {/* Baseline */}
            <line x1="0" y1="50" x2="145" y2="50" stroke="#e4e7ec" strokeWidth="1" strokeDasharray="4,4" />
            {/* Normal AP */}
            <path d="M10,50 L25,50 L30,20 L35,80 L40,50 L55,50" fill="none" stroke="#4caf50" strokeWidth="2" />
            <text x="32" y="95" textAnchor="middle" fill="#4caf50" fontSize="7">Normal</text>
            {/* Ectopic AP */}
            <path d="M60,50 L70,50 L75,15 L80,85 L85,50 L95,50" fill="none" stroke="#c62828" strokeWidth="2" />
            <path d="M88,50 L95,50 L100,10 L105,88 L110,50 L120,50" fill="none" stroke="#c62828" strokeWidth="2" />
            <path d="M113,50 L120,50 L125,18 L130,82 L135,50 L145,50" fill="none" stroke="#c62828" strokeWidth="2" />
            <text x="107" y="95" textAnchor="middle" fill="#c62828" fontSize="7">Ectopic</text>
          </g>

          <text x="82" y="190" textAnchor="middle" fill="#4a5568" fontSize="9.5">Sodium channel upregulation</text>
          <text x="82" y="203" textAnchor="middle" fill="#4a5568" fontSize="9.5">in damaged axons creates</text>
          <text x="82" y="216" textAnchor="middle" fill="#4a5568" fontSize="9.5">spontaneous, ectopic</text>
          <text x="82" y="229" textAnchor="middle" fill="#4a5568" fontSize="9.5">nerve firing patterns.</text>

          <text x="82" y="255" textAnchor="middle" fill="#e65100" fontSize="9" fontWeight="600">Ectopic Firing</text>
          <text x="82" y="268" textAnchor="middle" fill="#e65100" fontSize="9" fontWeight="600">Spontaneous Pain Signals</text>
        </g>

        {/* Arrow 3 */}
        <g transform="translate(615, 155)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#c62828" strokeWidth="2" />
          <polygon points="35,-5 45,0 35,5" fill="#c62828" />
        </g>

        {/* Stage 4: Dermatomal Radiation */}
        <g transform="translate(660, 40)">
          <rect width="130" height="270" rx="10" fill="white" stroke="#e4e7ec" strokeWidth="1.5" />
          <rect width="130" height="36" rx="10" fill="#c62828" />
          <rect y="26" width="130" height="10" fill="#c62828" />
          <text x="65" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">STAGE 4</text>
          <text x="65" y="58" textAnchor="middle" fill="#1a1d23" fontSize="12" fontWeight="600">Dermatomal Pain</text>

          {/* Dermatome figure */}
          <g transform="translate(25, 75)">
            {/* Leg outline */}
            <path d="M35,0 L40,0 L42,30 L48,80 L45,130 L30,130 L28,80 L32,30Z" fill="#f0f2f5" stroke="#718096" strokeWidth="1" />
            {/* Pain radiation pattern */}
            <path d="M35,10 L42,15 L48,60 L45,100 L35,100 L28,60Z" fill="#c62828" opacity="0.15" />
            <path d="M38,20 L44,25 L46,55 L43,85 L33,85 L30,55Z" fill="#c62828" opacity="0.25" />
            <path d="M40,30 L43,35 L44,50 L42,70 L36,70 L34,50Z" fill="#c62828" opacity="0.35" />
            {/* Nerve root */}
            <circle cx="40" cy="5" r="4" fill="#c62828" />
            <path d="M40,9 L40,20" stroke="#c62828" strokeWidth="1.5" strokeDasharray="2,2" />
          </g>

          <text x="65" y="225" textAnchor="middle" fill="#4a5568" fontSize="9">Pain follows the</text>
          <text x="65" y="237" textAnchor="middle" fill="#4a5568" fontSize="9">dermatomal distribution</text>
          <text x="65" y="249" textAnchor="middle" fill="#4a5568" fontSize="9">of the compressed</text>
          <text x="65" y="261" textAnchor="middle" fill="#4a5568" fontSize="9">nerve root.</text>

          <text x="65" y="285" textAnchor="middle" fill="#c62828" fontSize="9" fontWeight="600">Radiating Pain</text>
        </g>
      </svg>
    </div>
  );
}
