/**
 * MountainBackdrop — layered Himalayan ridgeline silhouettes drawn in SVG.
 * Used as the background of the A.R.C. cards (one variant per peak). Pure SVG
 * so it's crisp, themeable (uses currentColor + the brand vars), and weightless.
 */

type Variant = "annapurna" | "ridge" | "chooyu";

const PATHS: Record<Variant, { back: string; mid: string; front: string }> = {
  // a tall, broad massif
  annapurna: {
    back: "M0 120 L40 70 L70 90 L110 40 L150 78 L190 55 L240 100 L300 120 Z",
    mid: "M0 120 L55 85 L95 60 L130 95 L175 72 L220 110 L300 120 Z",
    front: "M0 120 L70 100 L120 78 L160 105 L210 90 L260 115 L300 120 Z",
  },
  // a long connecting crest
  ridge: {
    back: "M0 120 L30 88 L80 70 L130 82 L180 64 L230 80 L300 72 L300 120 Z",
    mid: "M0 120 L50 96 L100 84 L150 92 L210 78 L260 94 L300 88 L300 120 Z",
    front: "M0 120 L60 104 L120 96 L180 102 L240 94 L300 100 L300 120 Z",
  },
  // a steep twin-summit
  chooyu: {
    back: "M0 120 L60 60 L100 95 L150 35 L200 85 L250 65 L300 120 Z",
    mid: "M0 120 L70 82 L115 100 L160 62 L205 98 L255 84 L300 120 Z",
    front: "M0 120 L80 102 L130 90 L175 106 L220 92 L270 110 L300 120 Z",
  },
};

export default function MountainBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const p = PATHS[variant];
  return (
    <svg
      className={className}
      viewBox="0 0 300 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* far range — coolest/faintest */}
      <path d={p.back} fill="var(--accent-ice)" opacity="0.16" />
      {/* mid range */}
      <path d={p.mid} fill="var(--accent-ice)" opacity="0.26" />
      {/* near range — warm accent edge */}
      <path d={p.front} fill="var(--accent)" opacity="0.32" />
      {/* snow caps: thin highlight strokes on the front ridge */}
      <path
        d={p.front}
        fill="none"
        stroke="var(--text-primary)"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
    </svg>
  );
}
