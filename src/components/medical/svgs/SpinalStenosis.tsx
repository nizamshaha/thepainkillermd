export default function SpinalStenosis() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
        Lumbar Spinal Stenosis — Normal vs. Stenotic Canal
      </h3>
      <svg viewBox="0 0 700 420" className="w-full" role="img" aria-label="Comparison diagram of a normal spinal canal and a stenotic spinal canal">
        <title>Spinal Stenosis Comparison</title>
        <desc>Axial cross-section comparing a normal patent lumbar spinal canal with a stenotic constricted canal showing disc bulge, facet hypertrophy, and ligamentum flavum thickening.</desc>

        {/* Background */}
        <rect width="700" height="420" fill="#f8f9fa" rx="12" />

        {/* Normal Canal - Left */}
        <g transform="translate(40, 30)">
          <rect width="280" height="360" rx="10" fill="white" stroke="#4caf50" strokeWidth="2" />
          <rect width="280" height="36" rx="10" fill="#2e7d32" />
          <rect y="26" width="280" height="10" fill="#2e7d32" />
          <text x="140" y="24" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">NORMAL CANAL</text>

          {/* Cross-section illustration */}
          <g transform="translate(50, 55)">
            {/* Vertebral body (anterior) */}
            <ellipse cx="90" cy="180" rx="70" ry="50" fill="#dceef8" stroke="#4a8bc9" strokeWidth="1.5" />
            <text x="90" y="185" textAnchor="middle" fill="#1a3f6b" fontSize="10" fontWeight="600">Vertebral Body</text>

            {/* Normal spinal canal - large and round */}
            <ellipse cx="90" cy="100" rx="50" ry="45" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="2" />

            {/* Spinal cord / cauda equina */}
            <circle cx="80" cy="95" r="4" fill="#1a3f6b" />
            <circle cx="95" cy="90" r="4" fill="#1a3f6b" />
            <circle cx="85" cy="105" r="4" fill="#1a3f6b" />
            <circle cx="100" cy="100" r="4" fill="#1a3f6b" />
            <circle cx="90" cy="85" r="4" fill="#1a3f6b" />

            {/* Facet joints */}
            <ellipse cx="40" cy="60" rx="20" ry="15" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />
            <ellipse cx="140" cy="60" rx="20" ry="15" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />

            {/* Ligamentum flavum (thin) */}
            <path d="M45,40 Q90,30 135,40" fill="none" stroke="#66bb6a" strokeWidth="3" />
            <text x="90" y="25" textAnchor="middle" fill="#2e7d32" fontSize="8" fontWeight="600">Ligamentum Flavum (normal)</text>

            {/* Pedicles */}
            <rect x="25" y="75" width="12" height="40" rx="3" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />
            <rect x="143" y="75" width="12" height="40" rx="3" fill="#b2d6ef" stroke="#4a8bc9" strokeWidth="1" />

            {/* dural sac label */}
            <text x="90" y="120" textAnchor="middle" fill="#2e7d32" fontSize="9" fontWeight="600">Dural Sac</text>
            <text x="90" y="132" textAnchor="middle" fill="#2e7d32" fontSize="8">(Patent — adequate CSF space)</text>

            {/* Area measurement */}
            <text x="90" y="160" textAnchor="middle" fill="#2e7d32" fontSize="9" fontWeight="700">Cross-sectional area: ≥100 mm²</text>
          </g>

          <text x="140" y="310" textAnchor="middle" fill="#2e7d32" fontSize="10" fontWeight="600">✓ Adequate space for neural elements</text>
          <text x="140" y="326" textAnchor="middle" fill="#2e7d32" fontSize="10" fontWeight="600">✓ Normal CSF circulation</text>
          <text x="140" y="342" textAnchor="middle" fill="#2e7d32" fontSize="10" fontWeight="600">✓ No nerve compression</text>
        </g>

        {/* VS label */}
        <g transform="translate(330, 190)">
          <circle cx="20" cy="20" r="18" fill="var(--color-surface-200)" stroke="var(--color-surface-300)" strokeWidth="2" />
          <text x="20" y="24" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="700">VS</text>
        </g>

        {/* Stenotic Canal - Right */}
        <g transform="translate(380, 30)">
          <rect width="280" height="360" rx="10" fill="white" stroke="#c62828" strokeWidth="2" />
          <rect width="280" height="36" rx="10" fill="#c62828" />
          <rect y="26" width="280" height="10" fill="#c62828" />
          <text x="140" y="24" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">STENOTIC CANAL</text>

          {/* Cross-section illustration */}
          <g transform="translate(50, 55)">
            {/* Vertebral body with osteophyte */}
            <ellipse cx="90" cy="180" rx="70" ry="50" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
            <text x="90" y="185" textAnchor="middle" fill="#7b1a1a" fontSize="10" fontWeight="600">Vertebral Body</text>
            {/* Osteophyte */}
            <ellipse cx="90" cy="148" rx="25" ry="10" fill="#e65100" opacity="0.5" />
            <text x="165" y="148" textAnchor="start" fill="#e65100" fontSize="7" fontWeight="600">Disc bulge</text>

            {/* Facet joint hypertrophy */}
            <ellipse cx="40" cy="60" rx="28" ry="22" fill="#e65100" opacity="0.4" stroke="#c62828" strokeWidth="1.5" />
            <ellipse cx="140" cy="60" rx="28" ry="22" fill="#e65100" opacity="0.4" stroke="#c62828" strokeWidth="1.5" />
            <text x="40" y="30" textAnchor="middle" fill="#c62828" fontSize="7" fontWeight="600">Hypertrophied</text>
            <text x="40" y="38" textAnchor="middle" fill="#c62828" fontSize="7" fontWeight="600">Facet Joint</text>

            {/* Ligamentum flavum (thickened) */}
            <path d="M42,42 Q90,28 138,42" fill="none" stroke="#c62828" strokeWidth="6" />
            <text x="90" y="20" textAnchor="middle" fill="#c62828" fontSize="8" fontWeight="600">Ligamentum Flavum (thickened)</text>

            {/* Narrowed canal */}
            <ellipse cx="90" cy="95" rx="25" ry="22" fill="#fce4ec" stroke="#c62828" strokeWidth="2" />

            {/* Compressed nerves */}
            <circle cx="87" cy="93" r="3" fill="#1a3f6b" />
            <circle cx="93" cy="90" r="3" fill="#1a3f6b" />

            {/* Pedicles (thicker) */}
            <rect x="20" y="70" width="18" height="45" rx="3" fill="#e65100" opacity="0.3" stroke="#c62828" strokeWidth="1" />
            <rect x="142" y="70" width="18" height="45" rx="3" fill="#e65100" opacity="0.3" stroke="#c62828" strokeWidth="1" />

            {/* Compressed dural sac label */}
            <text x="90" y="130" textAnchor="middle" fill="#c62828" fontSize="9" fontWeight="600">Dural Sac</text>
            <text x="90" y="142" textAnchor="middle" fill="#c62828" fontSize="8">(Compressed — minimal CSF space)</text>

            {/* Area measurement */}
            <text x="90" y="160" textAnchor="middle" fill="#c62828" fontSize="9" fontWeight="700">Cross-sectional area: {"<"}100 mm²</text>
          </g>

          <text x="140" y="310" textAnchor="middle" fill="#c62828" fontSize="10" fontWeight="600">✗ Neural element compression</text>
          <text x="140" y="326" textAnchor="middle" fill="#c62828" fontSize="10" fontWeight="600">✗ Reduced CSF space</text>
          <text x="140" y="342" textAnchor="middle" fill="#c62828" fontSize="10" fontWeight="600">✗ Neurogenic claudication</text>
        </g>
      </svg>
    </div>
  );
}
