import React from 'react';

export const NetworkField = React.memo(function NetworkField({ accent = "#3770E8", count = 7 }) {
  const nodes = React.useMemo(() => {
    const seed = (i, k) => {
      const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: 8 + seed(i, 1) * 84,
      y: 12 + seed(i, 2) * 76,
      r: 2 + seed(i, 3) * 3.5,
      o: 0.25 + seed(i, 4) * 0.45,
      delay: seed(i, 5) * 6,
      dur: 8 + seed(i, 6) * 6
    }));
  }, [count]);

  const edges = React.useMemo(() => {
    const e = [];
    for (let i = 0; i < nodes.length; i++) {
      const d = nodes.map((n, j) => ({
        j,
        d: j === i ? 1e9 : Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y)
      })).sort((a, b) => a.d - b.d);
      e.push([i, d[0].j]);
      if (d[1] && d[1].d < 40) e.push([i, d[1].j]);
    }
    const seen = new Set();
    return e.filter(([a, b]) => {
      const k = a < b ? a + "-" + b : b + "-" + a;
      if (seen.has(k)) return false;
      seen.add(k); return true;
    });
  }, [nodes]);

  return (
    <svg className="net" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%"  stopColor={accent} stopOpacity="0.7" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={accent} strokeWidth="0.08" opacity="0.28"
          vectorEffect="non-scaling-stroke" />
      ))}
      {nodes.map((n, i) => (
        <g key={i} style={{ transformBox:"fill-box", transformOrigin:"center",
                            willChange:"transform",
                            animation: `drift ${n.dur}s ${n.delay}s ease-in-out infinite` }}>
          <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill="url(#nodeGlow)" opacity={n.o * 0.9} />
          <circle cx={n.x} cy={n.y} r={n.r * 0.35} fill={accent} opacity={n.o} />
        </g>
      ))}
    </svg>
  );
});

export function GridTexture({ accent = "#3770E8" }) {
  return (
    <svg className="grid" aria-hidden="true">
      <defs>
        <pattern id="gridPat" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridPat)" />
    </svg>
  );
}

export function BlobField({ accent = "#B85EE0" }) {
  const sp = [
    { cx:84, cy:14, r:1.2, dur:"9.0s",  delay:"0s"    },
    { cx:86, cy:11, r:0.7, dur:"12.5s", delay:"2.4s"  },
    { cx:82, cy:12, r:0.4, dur:"10.5s", delay:"5.0s"  },
    { cx:93, cy:36, r:0.9, dur:"13.8s", delay:"1.1s"  },
    { cx:14, cy:28, r:0.6, dur:"11.2s", delay:"6.0s"  },
    { cx:22, cy:76, r:1.0, dur:"9.8s",  delay:"3.5s"  },
    { cx:55, cy:5,  r:0.5, dur:"12.0s", delay:"1.9s"  },
    { cx:68, cy:91, r:0.8, dur:"8.5s",  delay:"5.5s"  },
    { cx:38, cy:96, r:0.6, dur:"14.5s", delay:"7.2s"  },
    { cx:7,  cy:46, r:0.7, dur:"10.8s", delay:"8.4s"  },
    { cx:48, cy:50, r:0.4, dur:"16.0s", delay:"4.0s"  },
    { cx:72, cy:62, r:0.5, dur:"10.4s", delay:"0.8s"  },
  ];
  const bs = { transformBox:"fill-box", transformOrigin:"center" };
  return (
    <svg className="blobs" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="blobA"><stop offset="0%" stopColor={accent} stopOpacity="0.22"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        <radialGradient id="blobB"><stop offset="0%" stopColor={accent} stopOpacity="0.16"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        <radialGradient id="blobC"><stop offset="0%" stopColor={accent} stopOpacity="0.11"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        <radialGradient id="blobGlow"><stop offset="0%" stopColor={accent} stopOpacity="0.09"/><stop offset="70%" stopColor={accent} stopOpacity="0.03"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
      </defs>

      {/* Ambient glow — slow pulse */}
      <ellipse cx="58" cy="48" rx="38" ry="28" fill="url(#blobGlow)"
        style={{ ...bs, animation:"blob-pulse 18s 0.5s ease-in-out infinite" }} />

      {/* Primary blobs */}
      <ellipse cx="78" cy="22" rx="26" ry="17" fill="url(#blobA)"
        style={{ ...bs, animation:"blob-drift-a 14s ease-in-out infinite" }} />
      <ellipse cx="88" cy="78" rx="17" ry="24" fill="url(#blobB)"
        style={{ ...bs, animation:"blob-drift-b 18s 2s ease-in-out infinite" }} />
      <ellipse cx="18" cy="60" rx="16" ry="11" fill="url(#blobA)"
        style={{ ...bs, animation:"blob-drift-c 22s 1s ease-in-out infinite" }} />

      {/* Secondary blobs */}
      <ellipse cx="50" cy="10" rx="15" ry="9" fill="url(#blobC)"
        style={{ ...bs, animation:"blob-drift-b 16s 3.5s ease-in-out infinite reverse" }} />
      <ellipse cx="28" cy="90" rx="20" ry="11" fill="url(#blobC)"
        style={{ ...bs, animation:"blob-drift-a 20s 5s ease-in-out infinite reverse" }} />
      <ellipse cx="5"  cy="20" rx="10" ry="7"  fill="url(#blobC)"
        style={{ ...bs, animation:"blob-drift-c 25s 2s ease-in-out infinite" }} />

      {/* Wave lines — breathing opacity */}
      <path d="M -4 38 C 20 30, 38 46, 60 38 S 92 28, 110 36"
        fill="none" stroke={accent} strokeWidth="0.18" vectorEffect="non-scaling-stroke"
        style={{ animation:"path-shimmer 16s ease-in-out infinite" }} />
      <path d="M -4 58 C 22 52, 42 64, 64 58 S 96 50, 110 56"
        fill="none" stroke={accent} strokeWidth="0.14" vectorEffect="non-scaling-stroke"
        style={{ animation:"path-shimmer 20s 4s ease-in-out infinite" }} />
      <path d="M -4 78 C 18 72, 40 84, 62 76 S 92 70, 110 74"
        fill="none" stroke={accent} strokeWidth="0.12" vectorEffect="non-scaling-stroke"
        style={{ animation:"path-shimmer 24s 1.5s ease-in-out infinite" }} />
      <path d="M -4 18 C 15 11, 36 24, 56 18 S 88 9, 110 15"
        fill="none" stroke={accent} strokeWidth="0.09" vectorEffect="non-scaling-stroke"
        style={{ animation:"path-shimmer 18s 6s ease-in-out infinite reverse" }} />

      {/* Sparkle dots */}
      {sp.map((d,i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={accent}
          style={{ animation:`sparkle ${d.dur} ${d.delay} ease-in-out infinite` }} />
      ))}
    </svg>
  );
}
