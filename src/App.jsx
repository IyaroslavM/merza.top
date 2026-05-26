import React from 'react';
import ambientMp3 from '../ambient.mp3';
import { useTweaks, useViewport, useSplit } from './hooks.js';
import { TWEAK_DEFAULTS, PALETTES, PEOPLE } from './data.js';
import { GridTexture, NetworkField, BlobField } from './components/Decorations.jsx';
import { ProjectCards } from './components/ProjectCards.jsx';
import { PortfolioPage } from './components/PortfolioPage.jsx';
import { YaroslavPortfolioPage } from './components/YaroslavPortfolioPage.jsx';
import { MusicButton, musicCss } from './components/MusicButton.jsx';
import {
  TweaksPanel, TweakSection, TweakSelect, TweakRadio, TweakToggle
} from './components/TweakPanel.jsx';

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [showPortfolio, setShowPortfolio] = React.useState(false);
  const [showYPortfolio, setShowYPortfolio] = React.useState(false);
  const [showTweaks, setShowTweaks] = React.useState(false);
  const { w, h, isMobile, axis } = useViewport();
  const pal = PALETTES[t.palette] || PALETTES["cobalt-orchid"];

  React.useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = pal.yBg;
  }, [pal.yBg]);

  const [hover, setHover] = React.useState(null);
  const [taken, setTaken] = React.useState(null);
  const motion = t.splitMotion;
  const split = useSplit({ axis, hover, taken, motion });
  // Drag override: user-dragged position supersedes spring animation
  const [overrideSplit, setOverrideSplit] = React.useState(null);
  const isDraggingRef = React.useRef(false);
  const effectiveSplit = overrideSplit ?? split;

  const splitRef = React.useRef(effectiveSplit);
  splitRef.current = effectiveSplit;
  const effectiveSplitRef = React.useRef(effectiveSplit);
  effectiveSplitRef.current = effectiveSplit;

  // Magnet stored as ref — no state, no re-render on mouse move
  const magnetRef = React.useRef({ x: 0.5, y: 0.5 });
  const divideRef = React.useRef(null);
  const divideGlowRef = React.useRef(null);
  const cursorRef = React.useRef(null);
  const cursorPosRef = React.useRef({ x: -200, y: -200 });
  const mouseTargetRef = React.useRef({ x: -200, y: -200 });

  // Reset drag override when section expands or axis flips
  React.useEffect(() => { setOverrideSplit(null); }, [taken, axis]);

  React.useEffect(() => {
    if (taken || motion === "off" || isMobile) return;
    const on = (e) => {
      magnetRef.current = { x: e.clientX / w, y: e.clientY / h };
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [taken, motion, isMobile, w, h]);

  // Cursor trailer mouse tracking (independent of motion/taken settings)
  React.useEffect(() => {
    if (isMobile) return;
    const on = (e) => { mouseTargetRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [isMobile]);

  // RAF loop: read ref, write directly to DOM — zero React renders for magnetic movement
  React.useEffect(() => {
    if (motion !== "magnetic" || isMobile) return;
    let raf;
    const tick = () => {
      if (!isDraggingRef.current) {
        const d = divideRef.current, dg = divideGlowRef.current;
        if (d && dg) {
          const { x, y } = taken ? { x: 0.5, y: 0.5 } : magnetRef.current;
          const offset = (axis === "v" ? (y - 0.5) : (x - 0.5)) * 6;
          const prop = axis === "v" ? "left" : "top";
          const val = `calc(${splitRef.current * 100}% + ${offset}px)`;
          d.style[prop] = val;
          dg.style[prop] = val;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motion, isMobile, axis, taken]);

  // Cursor trailer — lerp toward mouse in its own RAF loop
  React.useEffect(() => {
    if (isMobile) return;
    let raf;
    const tick = () => {
      const cur = cursorRef.current;
      if (cur) {
        const tgt = mouseTargetRef.current;
        const p = cursorPosRef.current;
        p.x += (tgt.x - p.x) * 0.13;
        p.y += (tgt.y - p.y) * 0.13;
        cur.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  React.useEffect(() => {
    const bar = document.getElementById('load-bar');
    if (!bar) return;
    bar.style.animation = 'none';
    bar.style.width = '100%';
    bar.style.transition = 'width 0.3s ease, opacity 0.3s ease 0.15s';
    const t1 = setTimeout(() => { bar.style.opacity = '0'; }, 200);
    const t2 = setTimeout(() => bar.remove(), 520);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setTaken(null); setShowTweaks(false); }
      if (e.key === "T" && e.shiftKey) {
        setShowTweaks(v => !v);
        window.dispatchEvent(new MessageEvent("message", { data: { type: "__activate_edit_mode" } }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Intro preview — 2-second work snapshot on first load
  const [introPhase, setIntroPhase] = React.useState('in');
  React.useEffect(() => {
    if (introPhase !== 'in') return;
    const id = setTimeout(() => setIntroPhase('out'), 2600);
    return () => clearTimeout(id);
  }, [introPhase]);
  React.useEffect(() => {
    if (introPhase !== 'out') return;
    const id = setTimeout(() => setIntroPhase('done'), 650);
    return () => clearTimeout(id);
  }, [introPhase]);

  // ── Music ──────────────────────────────────────────────────────────────────
  const audioRef = React.useRef(null);
  const [musicPlaying, setMusicPlaying] = React.useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);
  const fadeRef = React.useRef(null);

  const startMusic = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();
    // Guard: pointerdown listener and onClick can both fire on the same tap.
    // If audio is already playing, just sync state — don't reset volume or call play() again.
    if (!audio.paused) {
      setMusicPlaying(true);
      setAutoplayBlocked(false);
      return Promise.resolve();
    }
    clearInterval(fadeRef.current);
    audio.volume = 0;
    return audio.play().then(() => {
      setMusicPlaying(true);
      setAutoplayBlocked(false);
      fadeRef.current = setInterval(() => {
        if (audio.volume < 0.35) { audio.volume = Math.min(0.38, audio.volume + 0.03); }
        else { audio.volume = 0.38; clearInterval(fadeRef.current); }
      }, 40);
    });
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tryAutoplay = () => {
      startMusic().catch(() => setAutoplayBlocked(true));
    };
    if (audio.readyState >= 3) {
      tryAutoplay();
    } else {
      audio.addEventListener("canplaythrough", tryAutoplay, { once: true });
      return () => audio.removeEventListener("canplaythrough", tryAutoplay);
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (!autoplayBlocked) return;
    const onInteraction = () => startMusic().catch(() => {});
    document.addEventListener("pointerdown", onInteraction, { once: true });
    return () => document.removeEventListener("pointerdown", onInteraction);
  }, [autoplayBlocked, startMusic]);

  const toggleMusic = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      clearInterval(fadeRef.current);
      fadeRef.current = setInterval(() => {
        if (audio.volume > 0.03) { audio.volume = Math.max(0, audio.volume - 0.04); }
        else { audio.pause(); audio.volume = 0.38; clearInterval(fadeRef.current); }
      }, 40);
      setMusicPlaying(false);
    } else {
      startMusic().catch(() => {});
    }
  }, [musicPlaying, startMusic]);
  // ──────────────────────────────────────────────────────────────────────────

  const handleHover = (side) => { if (!taken) setHover(side); };
  const handleLeave = () => setHover(null);
  const handleTake  = (side) => { setTaken(side); setHover(null); };

  const handleDivideDown = React.useCallback((e) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
  }, []);

  const handleDivideMove = React.useCallback((e) => {
    if (!isDraggingRef.current) return;
    const raw = axis === "v" ? e.clientX / w : e.clientY / h;
    const pos = Math.max(0.08, Math.min(0.92, raw));
    setOverrideSplit(pos);
    const d = divideRef.current, dg = divideGlowRef.current;
    if (d && dg) {
      const prop = axis === "v" ? "left" : "top";
      d.style[prop] = `${pos * 100}%`;
      dg.style[prop] = `${pos * 100}%`;
    }
  }, [axis, w, h]);

  const handleDivideUp = React.useCallback((e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const raw = axis === "v" ? e.clientX / w : e.clientY / h;
    if (raw < 0.12 || raw > 0.88) setOverrideSplit(null);
  }, [axis, w, h]);

  const leftSize  = axis === "v" ? { width: (effectiveSplit * 100) + "%", height: "100%" }
                                 : { width: "100%", height: (effectiveSplit * 100) + "%" };
  const rightSize = axis === "v" ? { width: ((1 - effectiveSplit) * 100) + "%", height: "100%" }
                                 : { width: "100%", height: ((1 - effectiveSplit) * 100) + "%" };
  const dimY = taken === "k" ? 0 : (hover === "k" ? 0.5 : 1);
  const dimK = taken === "y" ? 0 : (hover === "y" ? 0.5 : 1);

  const css = `
    html,body,#root{background:${pal.yBg};overflow:hidden}

    .stage{position:fixed;inset:0;display:flex;${axis === "v" ? "flex-direction:row" : "flex-direction:column"};
      overflow:hidden;cursor:default;background:#000}
    .half{position:relative;overflow:hidden;transition:opacity .6s cubic-bezier(.4,0,.2,1)}
    .half.y{background:${pal.yBg};color:#fff}
    .half.k{background:${pal.kBg};color:#1A1A1F}

    .net,.blobs,.grid{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
    .net{opacity:.95}
    .grid{opacity:.5}

    .ident{position:absolute;inset:0;display:flex;align-items:center;padding:clamp(90px,13vh,140px) clamp(22px,3.5vw,56px) clamp(28px,4vw,72px);pointer-events:none}
    .ident.y{justify-content:flex-start}
    .ident.k{justify-content:flex-start}
    .stack{display:flex;flex-direction:column;gap:14px;max-width:560px;pointer-events:auto}

    .eyebrow{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.22em;
      text-transform:uppercase;color:${pal.y};opacity:.7}
    .k .eyebrow{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;letter-spacing:.32em;color:#3B1D58;font-size:13px;font-weight:500}

    .surname{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:clamp(40px,4.5vw + 0.5rem,72px);
      font-weight:700;letter-spacing:-.04em;line-height:.95;color:#fff;margin:0}
    .k .surname{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;
      font-size:clamp(48px,5vw + 0.5rem,84px);letter-spacing:-.02em;color:#141414;margin:0}

    .role{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13px;letter-spacing:.18em;color:#fff;font-weight:500}
    .k .role{font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;letter-spacing:.14em;
      color:#7E3DA0;font-style:italic;font-weight:500}
    .role .cursor{display:inline-block;width:.55ch;background:#fff;margin-left:2px;animation:blink 1.2s ease-in-out infinite}
    .k .role .cursor{display:none}

    .ghost{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;line-height:1.7;color:#fff;opacity:.42;
      white-space:pre-wrap;word-break:break-word;overflow-wrap:break-word;margin-top:12px;max-width:42ch;overflow:hidden}

    .bio{margin-top:12px;max-width:42ch}
    .y .bio{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.88)}
    .k .bio{font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;line-height:1.55;color:#1A1A1F;font-style:italic;font-weight:500}

    .arrow{margin-top:18px;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.32em;
      text-transform:uppercase;color:#fff;opacity:.85;display:inline-flex;align-items:center;gap:8px;cursor:pointer;
      pointer-events:auto;font-weight:500}
    .k .arrow{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;letter-spacing:.18em;
      color:#7E3DA0;opacity:1;font-size:15px;font-weight:600;text-transform:none}
    .arrow:hover{opacity:1}
    .arrow .ch{display:inline-block;transition:transform .35s cubic-bezier(.4,0,.2,1)}
    .arrow:hover .ch{transform:translateX(6px)}

    .divide{position:absolute;${axis === "v" ? "top:0;bottom:0" : "left:0;right:0"};
      ${axis === "v" ? "width:1.5px" : "height:1.5px"};
      pointer-events:none;z-index:5;transition:filter .4s ease}
    .divide.glow{${axis === "v" ? "width:3px;filter:blur(3px)" : "height:3px;filter:blur(3px)"};opacity:.35}

    .wordmark{position:absolute;top:32px;left:0;right:0;z-index:8;pointer-events:none;
      text-align:center;line-height:1}
    .wm-layer{position:absolute;top:0;left:0;right:0;text-align:center}
    .wm-y{color:#fff}
    .wm-k{color:#1A1A1F}
    .wordmark .mark{font-family:'Cormorant Garamond',Georgia,serif;font-style:normal;font-weight:600;
      font-size:30px;letter-spacing:.32em;display:inline-block;padding-left:.32em}

    .wordmark .sub{display:flex;align-items:center;justify-content:center;margin-top:16px;line-height:1}
    .wordmark .sub .side{font-family:'IBM Plex Mono',ui-monospace,monospace;
      font-size:11px;letter-spacing:.5em;font-weight:500;opacity:.82;
      text-transform:uppercase;width:8.6em;white-space:nowrap;display:inline-block}
    .wordmark .sub .side.left{text-align:right;margin-right:-.5em}
    .wordmark .sub .side.right{text-align:left}
    .wordmark .sub .dot{display:inline-block;width:3px;height:3px;border-radius:999px;
      background:currentColor;margin:0 .9em;opacity:.55}

    .explore{position:absolute;bottom:22px;font-family:'IBM Plex Mono',ui-monospace,monospace;
      font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#fff;opacity:.75;z-index:4;font-weight:500}
    .explore.y{left:5vw}
    .explore.k{right:5vw;color:#4A1D6E;opacity:1}
    .k .explore{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;letter-spacing:.18em;font-size:13px;font-weight:600;text-transform:none}

    .taken .ident{display:none}
    .taken .wordmark{opacity:0;pointer-events:none;transition:opacity .25s}
    .detail{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-start;
      padding: 6vh 6vw;pointer-events:none;opacity:0;transition:opacity .55s .15s cubic-bezier(.4,0,.2,1);
      overflow-y:auto}
    .taken .detail{opacity:1;pointer-events:auto}
    .detail-shell{max-width:1180px;width:100%;margin:auto 0;display:flex;flex-direction:column;gap:48px}
    .detail-header{display:flex;flex-direction:column;gap:10px;max-width:760px}
    .detail-inner{display:grid;${axis === "v" ? "grid-template-columns: 1.05fr .95fr" : "grid-template-columns:1fr"};
      gap:64px;align-items:start}
    @media (max-width:760px){.detail-inner{grid-template-columns:1fr;gap:32px}.detail{padding:24px;justify-content:flex-start}.detail-shell{gap:28px;margin-top:24px}}

    .detail-header .eyebrow,
    .detail-header .surname,
    .detail-header .role,
    .detail-header .bio{margin:0}
    .detail-header .surname{font-size:clamp(48px,7vw,88px)}
    .k .detail-header .surname{font-size:clamp(54px,8vw,96px)}

    .label{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:.38em;
      text-transform:uppercase;color:rgba(255,255,255,.72);margin-bottom:22px;font-weight:500}
    .k .label{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;letter-spacing:.18em;text-transform:none;color:#7E3DA0;font-size:15px;font-weight:600;margin-bottom:22px}

    .tl{display:flex;flex-direction:column;gap:22px;padding-left:18px;border-left:1.5px solid ${pal.y}}
    .k .tl{border-left-color:${pal.k}}
    .tl-item{position:relative}
    .tl-item::before{content:"";position:absolute;left:-25px;top:6px;width:9px;height:9px;border-radius:50%;
      background:${pal.yBg};border:1.5px solid ${pal.y}}
    .k .tl-item::before{background:${pal.kBg};border-color:${pal.k}}
    .tl-co{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:14px;font-weight:600;color:#fff;letter-spacing:-.005em;text-decoration:none;display:inline-block}
    .tl-co[href]{opacity:.92;transition:opacity .2s,letter-spacing .2s}
    .tl-co[href]:hover{opacity:1;letter-spacing:.02em}
    .k .tl-co{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:20px;font-weight:600;color:#1A1A1F;letter-spacing:-.01em;text-decoration:none;display:inline-block}
    .k .tl-co[href]:hover{color:#7E3DA0}
    .tl-role{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12.5px;color:#fff;opacity:.85;margin-top:3px;letter-spacing:.04em}
    .k .tl-role{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:15.5px;color:#7E3DA0;letter-spacing:.02em;opacity:1}
    .tl-per{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.82);margin-top:5px}
    .k .tl-per{color:#7A7A82}

    .projects{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
    .pcard{aspect-ratio:5/4;border-radius:14px;background:color-mix(in srgb,${pal.k} 9%,#fff);
      display:flex;align-items:center;justify-content:center;color:#7E3DA0;
      font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:15px;font-weight:600;letter-spacing:.02em;
      border:1px solid color-mix(in srgb,${pal.k} 22%,transparent);position:relative;overflow:hidden;
      opacity:0;transform:translateY(14px) scale(.97);
      transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .55s cubic-bezier(.4,0,.2,1),
                 box-shadow .3s ease,border-color .3s ease;
      cursor:default}
    .pcard.visible{opacity:1;transform:none}
    .pcard:hover{transform:translateY(-4px) scale(1.02);
      box-shadow:0 10px 32px color-mix(in srgb,${pal.k} 18%,transparent);
      border-color:color-mix(in srgb,${pal.k} 45%,transparent)}
    .pcard::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent 0 7px,color-mix(in srgb,${pal.k} 8%,transparent) 7px 8px);opacity:.6;transition:opacity .3s}
    .pcard:hover::before{opacity:.9}
    @keyframes pcardIn{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}

    .ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px;max-width:280px}
    .btn{appearance:none;border:1.5px solid rgba(255,255,255,.7);background:transparent;color:#fff;text-decoration:none;
      height:48px;padding:0 22px;border-radius:999px;
      font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;letter-spacing:.22em;font-weight:500;
      text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:space-between;gap:18px;
      transition:background .25s,color .25s,transform .2s,border-color .25s}
    .btn:hover{background:rgba(255,255,255,.12);border-color:#fff}
    .btn.filled{background:${pal.y};color:#1A1A1F;border-color:${pal.y}}
    .btn.filled:hover{background:#fff;border-color:#fff;transform:translateY(-1px)}
    .k .btn{border-color:#7E3DA0;color:#7E3DA0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
      letter-spacing:.06em;text-transform:none;font-size:15.5px;font-weight:600}
    .k .btn:hover{background:rgba(126,61,160,.08);border-color:#7E3DA0}
    .k .btn.filled{background:#7E3DA0;color:#fff;border-color:#7E3DA0}
    .k .btn.filled:hover{background:#6A2E89;border-color:#6A2E89}
    .btn .ar{font-size:14px}

    .close{position:absolute;top:24px;right:24px;z-index:9;width:42px;height:42px;border-radius:999px;
      border:1px solid currentColor;background:transparent;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      color:#fff;opacity:.7;transition:opacity .2s,transform .2s}
    .y .close{color:#fff;border-color:rgba(255,255,255,.3)}
    .k .close{color:#1A1A1F;border-color:rgba(0,0,0,.2)}
    .close:hover{opacity:1;transform:rotate(90deg)}

    .detail-shell > *{opacity:0;transform:translateY(12px);transition:opacity .55s .15s cubic-bezier(.4,0,.2,1),transform .6s .15s cubic-bezier(.4,0,.2,1)}
    .taken .detail-shell > *{opacity:1;transform:none}
    .taken .detail-shell > *:nth-child(2){transition-delay:.32s}
    .detail-inner > *{opacity:0;transform:translateY(10px);transition:opacity .5s .35s,transform .55s .35s}
    .taken .detail-inner > *{opacity:1;transform:none}
    .taken .detail-inner > *:nth-child(2){transition-delay:.48s}

    .quote{position:relative;margin:0;padding:18px 20px 18px 26px;
      border-left:2px solid ${pal.y};
      font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13px;line-height:1.75;
      color:rgba(255,255,255,.82);font-style:italic}
    .quote-attr{display:block;margin-top:10px;font-size:10px;letter-spacing:.18em;
      text-transform:uppercase;color:rgba(255,255,255,.45);font-style:normal}

    @keyframes blink{0%,45%{opacity:1}55%,100%{opacity:0}}
    @keyframes concept-pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes drift{
      0%,100%{transform:translate(0,0)}
      50%{transform:translate(2%,-1.5%)}
    }
    @keyframes float{
      0%,100%{transform:translate(0,0) scale(1)}
      50%{transform:translate(-3%,2%) scale(1.06)}
    }
    @keyframes blob-drift-a{
      0%,100%{transform:translate(0,0) scale(1)}
      33%{transform:translate(-3%,2.5%) scale(1.08)}
      66%{transform:translate(2%,-1.5%) scale(0.95)}
    }
    @keyframes blob-drift-b{
      0%,100%{transform:translate(0,0) scale(1)}
      40%{transform:translate(3%,-3%) scale(1.12)}
      80%{transform:translate(-2%,2%) scale(0.93)}
    }
    @keyframes blob-drift-c{
      0%,100%{transform:translate(0,0) scale(1)}
      50%{transform:translate(-4%,3%) scale(1.1)}
    }
    @keyframes blob-pulse{
      0%,100%{opacity:0.7;transform:scale(1)}
      50%{opacity:1;transform:scale(1.12)}
    }
    @keyframes sparkle{
      0%,100%{opacity:0.1;transform:scale(1)}
      50%{opacity:0.65;transform:scale(1.7)}
    }
    @keyframes path-shimmer{
      0%,100%{opacity:0.12}
      50%{opacity:0.42}
    }

    @media (prefers-reduced-motion: reduce){
      *,*::before,*::after{
        animation-duration:0.01ms !important;
        animation-iteration-count:1 !important;
        transition-duration:0.01ms !important;
      }
    }

    @media (max-width:1280px){
      .detail-shell{gap:40px}
      .detail-inner{gap:48px}
    }
    @media (max-width:1024px){
      .stack{max-width:440px}
      .detail{padding:5vh 5vw}
      .detail-inner{grid-template-columns:1fr;gap:36px}
      .detail-shell{gap:32px}
      .tl-co{font-size:14px}
    }
    @media (max-width:760px){
      .ident{padding:28px 22px;align-items:center}
      .stack{gap:10px;max-width:100%}
      .surname{font-size:46px}
      .k .surname{font-size:50px}
      .role{font-size:12px}
      .k .role{font-size:16px}
      .bio{font-size:14px;max-width:38ch}
      .k .bio{font-size:15px;max-width:100%}
      .arrow{font-size:10px;margin-top:14px}
      .k .arrow{font-size:14px}
      .ghost{display:none}
      .explore{font-size:9.5px;bottom:14px}
      .k .explore{font-size:11.5px}

      .wordmark{top:14px}
      .wordmark .mark{font-size:18px;letter-spacing:.28em}
      .wordmark .sub{margin-top:10px}
      .wordmark .sub .side{font-size:9px;letter-spacing:.36em;width:7em}
      .wordmark .sub .dot{margin:0 .7em}
      .wm-y{clip-path:none !important;text-shadow:0 0 14px rgba(0,0,0,0.55),0 1px 4px rgba(0,0,0,0.4)}
      .wm-k{display:none}

      .detail{padding:64px 22px max(80px, calc(env(safe-area-inset-bottom) + 72px))}
      .detail-shell{gap:26px}
      .detail-header .surname{font-size:48px}
      .k .detail-header .surname{font-size:52px}
      .detail-inner{gap:28px}
      .tl{gap:18px}
      .tl-co{font-size:14px}
      .k .tl-co{font-size:18px}
      .projects{gap:10px}
      .ctas{max-width:100%}
      .close{top:14px;right:14px;width:38px;height:38px}
    }

    @media (max-width:380px){
      .surname{font-size:40px}
      .k .surname{font-size:44px}
    }

    @media (max-height:500px) and (orientation:landscape){
      .ident{padding:10px 20px 10px;align-items:flex-start}
      .stack{gap:5px;max-width:100%}
      .surname{font-size:clamp(22px,5.5vh,34px)}
      .k .surname{font-size:clamp(24px,6vh,38px)}
      .role{font-size:11px}
      .k .role{font-size:14px}
      .bio{font-size:12px;margin-top:4px;max-width:36ch}
      .k .bio{font-size:13px}
      .ghost{display:none}
      .arrow{font-size:9.5px;margin-top:6px}
      .k .arrow{font-size:12px}
      .explore{font-size:8.5px;bottom:6px}
      .k .explore{font-size:10.5px}
      .wordmark{top:8px}
      .wordmark .mark{font-size:15px;letter-spacing:.24em}
      .wordmark .sub{margin-top:6px}
      .wordmark .sub .side{font-size:8px;letter-spacing:.32em;width:6em}
      .wm-y{clip-path:none !important;text-shadow:0 0 14px rgba(0,0,0,0.55),0 1px 4px rgba(0,0,0,0.4)}
      .wm-k{display:none}

      .detail{padding:46px 20px max(70px, calc(env(safe-area-inset-bottom) + 60px))}
      .detail-shell{gap:16px}
      .detail-header .surname{font-size:clamp(28px,7vh,44px)}
      .k .detail-header .surname{font-size:clamp(30px,7.5vh,48px)}
      .detail-inner{grid-template-columns:1fr;gap:20px}
      .tl{gap:14px}
      .close{top:8px;right:12px;width:34px;height:34px}
    }

    .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

    .skip-nav{position:fixed;top:-100%;left:50%;transform:translateX(-50%);z-index:99999;
      padding:12px 24px;background:#fff;color:#000;
      font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13px;font-weight:600;
      border-radius:0 0 8px 8px;border:2px solid #000;text-decoration:none;
      transition:top .15s;white-space:nowrap}
    .skip-nav:focus{top:0}

    button.arrow{border:none;background:transparent;padding:0;text-align:left;line-height:inherit}

    :focus-visible{outline:2px solid currentColor;outline-offset:2px}
    button.arrow:focus-visible{outline-offset:4px;border-radius:2px}

    .divide-hit{position:absolute;
      ${axis === "v" ? "top:0;bottom:0;width:32px" : "left:0;right:0;height:32px"};
      z-index:6;cursor:${axis === "v" ? "col-resize" : "row-resize"};background:transparent;
      transform:${axis === "v" ? "translateX(-50%)" : "translateY(-50%)"};touch-action:none}

    .cursor-trailer{position:fixed;top:0;left:0;pointer-events:none;z-index:50;
      width:16px;height:16px;border-radius:50%;background:#fff;
      mix-blend-mode:exclusion;will-change:transform}
    @media(hover:none){.cursor-trailer{display:none}}

    .version-mark{position:fixed;bottom:14px;right:20px;z-index:7;
      font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:9px;
      letter-spacing:.22em;text-transform:uppercase;
      color:rgba(255,255,255,.22);pointer-events:none;user-select:none}

    .intro-overlay{position:fixed;inset:0;z-index:200;display:flex;pointer-events:all;
      transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);
      will-change:transform,opacity}
    .intro-overlay.out{opacity:0;transform:translateY(-18px);pointer-events:none}
    .intro-half{flex:1;display:flex;flex-direction:column;align-items:center;
      justify-content:center;gap:14px;padding:clamp(32px,6vw,64px);overflow:hidden;position:relative}
    .intro-title{font-size:clamp(30px,5vw,66px);line-height:.95;letter-spacing:-.04em;
      font-weight:700;text-align:center}
    .intro-stat{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;
      letter-spacing:.32em;text-transform:uppercase;opacity:.6;text-align:center}
    .intro-skip{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:201;
      font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.3em;
      text-transform:uppercase;color:rgba(255,255,255,.36);border:none;background:transparent;
      cursor:pointer;padding:10px 20px;animation:concept-pulse 2s ease-in-out infinite}
    .intro-bar{position:absolute;bottom:0;left:0;height:2px;width:0;
      animation:intro-prog 2.6s linear forwards}
    .intro-bar.y{background:${pal.y};opacity:.7}
    .intro-bar.k{background:${pal.k};opacity:.7}
    @keyframes intro-prog{0%{width:0}100%{width:100%}}
  `;

  const lineGradY = `linear-gradient(${axis === "v" ? "180deg" : "90deg"},
      ${pal.y}00 0%, ${pal.y}E6 30%, #ffffff4D 50%, ${pal.k}E6 70%, ${pal.k}00 100%)`;
  const lineGradSolid = pal.y;
  const lineGradMono = `linear-gradient(${axis === "v" ? "180deg" : "90deg"},
      transparent 0%, currentColor 50%, transparent 100%)`;

  const lineBg = t.lineStyle === "solid" ? lineGradSolid
              : t.lineStyle === "subtle" ? lineGradMono
              : lineGradY;


  return (
    <React.Fragment>
      <style>{css}</style>
      <style>{musicCss}</style>
      <audio ref={audioRef} src={ambientMp3} loop preload="metadata" />

      <a className="skip-nav" href="#main-content">Skip to main content</a>
      <h1 className="sr-only">Merza — Product and Design</h1>
      <div id="main-content" className={"stage" + (taken ? " taken" : "")}>
        {/* LEFT (Yaroslav) */}
        <section aria-label="Yaroslav Merza — Product Owner"
          className={"half y" + (taken === "y" ? " taken" : "")}
          style={{ ...leftSize, opacity: dimY }}
          onMouseEnter={() => handleHover("y")}
          onMouseLeave={handleLeave}
          onClick={() => !taken && handleTake("y")}>
          {t.showDecor && <GridTexture accent={pal.y} />}
          {t.showDecor && <NetworkField accent={pal.y} />}

          <div className="ident y" aria-hidden={taken ? "true" : undefined}>
            <div className="stack">
              <div className="eyebrow">{PEOPLE.y.label}</div>
              <h2 className="surname">{PEOPLE.y.surname}</h2>
              <div className="role">{PEOPLE.y.role.replace("_","")}<span className="cursor">&nbsp;</span></div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:4,
                background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.28)",
                borderRadius:99, padding:"4px 12px 4px 8px", width:"fit-content" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C55E", flexShrink:0,
                  boxShadow:"0 0 0 3px rgba(34,197,94,0.25)",
                  animation:"concept-pulse 2s ease-in-out infinite", display:"inline-block" }} />
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5,
                  color:"rgba(255,255,255,.85)", fontWeight:500, letterSpacing:".04em" }}>
                  Part-time &amp; consulting
                </span>
              </div>
              {!taken && <pre className="ghost" aria-hidden="true">{PEOPLE.y.ghost}</pre>}
              {!taken && (
                <button className="arrow" onClick={(e) => { e.stopPropagation(); handleTake("y"); }}>
                  expand <span className="ch">→</span>
                </button>
              )}
            </div>
          </div>

          {!taken && <div className="explore y">{isMobile ? "tap to expand →" : "↓ systems · strategy · product"}</div>}

          {taken === "y" && (
            <React.Fragment>
              <button className="close" onClick={(e)=>{e.stopPropagation();setTaken(null);}} aria-label="Close">✕</button>
              <div aria-hidden="true" style={{ position:"absolute", top:34, right:76, zIndex:9,
                fontFamily:"'IBM Plex Mono',ui-monospace,monospace", fontSize:9, letterSpacing:".22em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.38)", pointerEvents:"none",
                userSelect:"none" }}>Yaroslav · product</div>
              <div className="detail">
                <div className="detail-shell">
                  <header className="detail-header">
                    <div className="eyebrow">{PEOPLE.y.label}</div>
                    <h2 className="surname">{PEOPLE.y.surname}</h2>
                    <div className="role">{PEOPLE.y.role.replace("_","")}<span className="cursor">&nbsp;</span></div>
                    <p className="bio">{PEOPLE.y.bio}</p>
                  </header>
                  {PEOPLE.y.testimonial && (
                    <blockquote className="quote">
                      {PEOPLE.y.testimonial.quote}
                      <cite className="quote-attr">— {PEOPLE.y.testimonial.author}, {PEOPLE.y.testimonial.role}</cite>
                    </blockquote>
                  )}
                  <div className="detail-inner">
                    <div>
                      <div className="label">{PEOPLE.y.timelineHead}</div>
                      <div className="tl">
                        {PEOPLE.y.timeline.map((it,i)=>(
                          <div className="tl-item" key={i}>
                            {it.href
                              ? <a className="tl-co" href={it.href} target="_blank" rel="noopener noreferrer">{it.co} ↗<span className="sr-only"> (opens in new tab)</span></a>
                              : <div className="tl-co">{it.co}</div>}
                            <div className="tl-role">{it.role}</div>
                            <div className="tl-per">{it.period}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="label">Connect</div>
                      <div className="ctas">
                        {PEOPLE.y.links.map((l,i)=>(
                          l.href
                            ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className={"btn " + (l.kind === "filled" ? "filled" : "")}>
                                <span>{l.label}</span><span className="ar">→</span><span className="sr-only"> (opens in new tab)</span>
                              </a>
                            : l.action === "yportfolio"
                              ? <button key={i} className={"btn " + (l.kind === "filled" ? "filled" : "")} onClick={(e)=>{e.stopPropagation();setShowYPortfolio(true);}}>
                                  <span>{l.label}</span><span className="ar">→</span>
                                </button>
                              : <button key={i} className={"btn " + (l.kind === "filled" ? "filled" : "")}>
                                  <span>{l.label}</span><span className="ar">→</span>
                                </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </section>

        {/* RIGHT (Kseniya) */}
        <section aria-label="Kseniya Merza — Product Designer"
          className={"half k" + (taken === "k" ? " taken" : "")}
          style={{ ...rightSize, opacity: dimK }}
          onMouseEnter={() => handleHover("k")}
          onMouseLeave={handleLeave}
          onClick={() => !taken && handleTake("k")}>
          {t.showDecor && <BlobField accent={pal.k} />}

          <div className="ident k" aria-hidden={taken ? "true" : undefined}>
            <div className="stack">
              <div className="eyebrow">{PEOPLE.k.label}</div>
              <h2 className="surname">{PEOPLE.k.surname}</h2>
              <div className="role">{PEOPLE.k.role}</div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:4,
                background:"rgba(34,197,94,0.10)", border:"1px solid rgba(34,197,94,0.30)",
                borderRadius:99, padding:"4px 12px 4px 8px", width:"fit-content" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C55E", flexShrink:0,
                  boxShadow:"0 0 0 3px rgba(34,197,94,0.22)",
                  animation:"concept-pulse 2s ease-in-out infinite", display:"inline-block" }} />
                <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:13,
                  color:"#1A1A1F", fontWeight:600, fontStyle:"italic", letterSpacing:".02em" }}>
                  Available for freelance
                </span>
              </div>
              {!taken && (
                <p className="bio" style={{maxWidth: isMobile ? "100%" : "34ch"}}>{PEOPLE.k.bio}</p>
              )}
              {!taken && (
                <button className="arrow" onClick={(e) => { e.stopPropagation(); handleTake("k"); }}>
                  expand <span className="ch">→</span>
                </button>
              )}
            </div>
          </div>

          {!taken && <div className="explore k">{isMobile ? "tap to expand →" : "craft · interface · feeling"}</div>}

          {taken === "k" && (
            <React.Fragment>
              <button className="close" onClick={(e)=>{e.stopPropagation();setTaken(null);}} aria-label="Close">✕</button>
              <div aria-hidden="true" style={{ position:"absolute", top:34, right:76, zIndex:9,
                fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic", fontSize:12,
                color:"rgba(26,26,31,0.35)", pointerEvents:"none", userSelect:"none" }}>
                Kseniya · design</div>
              <div className="detail">
                <div className="detail-shell">
                  <header className="detail-header">
                    <div className="eyebrow">{PEOPLE.k.label}</div>
                    <h2 className="surname">{PEOPLE.k.surname}</h2>
                    <div className="role">{PEOPLE.k.role}</div>
                    <p className="bio" style={{maxWidth:"42ch"}}>{PEOPLE.k.bio}</p>
                  </header>
                  <div className="detail-inner">
                    <div>
                      <div className="label">{PEOPLE.k.timelineHead}</div>
                      <ProjectCards projects={PEOPLE.k.projects} />
                      <div className="tl" style={{marginTop:32}}>
                        {PEOPLE.k.timeline.map((it,i)=>(
                          <div className="tl-item" key={i}>
                            {it.href
                              ? <a className="tl-co" href={it.href} target="_blank" rel="noopener noreferrer">{it.co} ↗<span className="sr-only"> (opens in new tab)</span></a>
                              : <div className="tl-co">{it.co}</div>}
                            <div className="tl-role">{it.role}</div>
                            <div className="tl-per">{it.period}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="label">Connect</div>
                      <div className="ctas">
                        {PEOPLE.k.links.map((l,i)=>(
                          l.href
                            ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className={"btn " + (l.kind === "filled" ? "filled" : "")}>
                                <span>{l.label}</span><span className="ar">→</span><span className="sr-only"> (opens in new tab)</span>
                              </a>
                            : l.action === "portfolio"
                              ? <button key={i} className={"btn " + (l.kind === "filled" ? "filled" : "")} onClick={(e)=>{e.stopPropagation();setShowPortfolio(true);}}>
                                  <span>{l.label}</span><span className="ar">→</span>
                                </button>
                              : <button key={i} className={"btn " + (l.kind === "filled" ? "filled" : "")}>
                                  <span>{l.label}</span><span className="ar">→</span>
                                </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </section>

        {/* Divide line — magnetic offset via RAF loop; drag via invisible hit area */}
        <div ref={divideGlowRef} className="divide glow" aria-hidden="true" style={{
          [axis === "v" ? "left" : "top"]: `${effectiveSplit * 100}%`,
          transform: axis === "v" ? "translateX(-50%)" : "translateY(-50%)",
          background: lineBg
        }} />
        <div ref={divideRef} className="divide" aria-hidden="true" style={{
          [axis === "v" ? "left" : "top"]: `${effectiveSplit * 100}%`,
          transform: axis === "v" ? "translateX(-50%)" : "translateY(-50%)",
          background: lineBg
        }} />
        {!taken && (
          <div className="divide-hit" aria-hidden="true"
            style={{ [axis === "v" ? "left" : "top"]: `${effectiveSplit * 100}%` }}
            onPointerDown={handleDivideDown}
            onPointerMove={handleDivideMove}
            onPointerUp={handleDivideUp}
          />
        )}

        {/* Wordmark */}
        {t.showWordmark && !taken && (
          <div className="wordmark" aria-hidden="true">
            <div className="wm-layer wm-y" style={{ clipPath: `inset(-6px ${(1 - effectiveSplit) * 100}% -6px 0)` }}>
              <span className="mark">MERZA FAMILY</span>
              <span className="sub">
                <span className="side left">product</span>
                <span className="dot"></span>
                <span className="side right">design</span>
              </span>
            </div>
            <div className="wm-layer wm-k" style={{ clipPath: `inset(-6px 0 -6px ${effectiveSplit * 100}%)` }}>
              <span className="mark">MERZA FAMILY</span>
              <span className="sub">
                <span className="side left">product</span>
                <span className="dot"></span>
                <span className="side right">design</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {showTweaks && <TweaksPanel title="Tweaks">
        <TweakSection label="Worlds" />
        <TweakSelect label="Palette" value={t.palette}
          options={Object.keys(PALETTES).map(k => ({ value: k, label: PALETTES[k].label }))}
          onChange={(v) => setTweak("palette", v)} />

        <TweakSection label="Motion" />
        <TweakRadio label="Split" value={t.splitMotion}
          options={[
            { value: "magnetic", label: "Magnetic" },
            { value: "snap",     label: "Snap" },
            { value: "off",      label: "Off" }
          ]}
          onChange={(v) => setTweak("splitMotion", v)} />

        <TweakSection label="The Line" />
        <TweakRadio label="Style" value={t.lineStyle}
          options={[
            { value: "gradient", label: "Gradient" },
            { value: "subtle",   label: "Whisper" },
            { value: "solid",    label: "Solid" }
          ]}
          onChange={(v) => setTweak("lineStyle", v)} />

        <TweakSection label="Detail" />
        <TweakToggle label="Decorative scenes" value={t.showDecor}
          onChange={(v) => setTweak("showDecor", v)} />
        <TweakToggle label="Wordmark" value={t.showWordmark}
          onChange={(v) => setTweak("showWordmark", v)} />
      </TweaksPanel>}

      {showYPortfolio && <YaroslavPortfolioPage onClose={() => setShowYPortfolio(false)} />}
      {showPortfolio && <PortfolioPage onClose={() => setShowPortfolio(false)} />}

      <MusicButton playing={musicPlaying} blocked={autoplayBlocked} onClick={toggleMusic} />
      {!isMobile && <div ref={cursorRef} className="cursor-trailer" aria-hidden="true" />}
      <div className="version-mark" aria-hidden="true">v2 · 2026</div>
      {introPhase !== 'done' && (
        <div
          className={"intro-overlay" + (introPhase === 'out' ? " out" : "")}
          onClick={() => introPhase === 'in' && setIntroPhase('out')}
        >
          <div className="intro-half" style={{ background: pal.yBg, color: '#fff' }}>
            <div className="intro-title" style={{ fontFamily: "'IBM Plex Mono',monospace" }}>BROCARD</div>
            <div className="intro-stat">2M+ users · 4 products shipped</div>
            <div className="intro-bar y" aria-hidden="true" />
          </div>
          <div className="intro-half" style={{ background: pal.kBg, color: '#1A1A1F' }}>
            <div className="intro-title" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontWeight: 500 }}>Sushi Master</div>
            <div className="intro-stat" style={{ color: '#7E3DA0' }}>Design · Delivery · Craft</div>
            <div className="intro-bar k" aria-hidden="true" />
          </div>
          {introPhase === 'in' && (
            <button className="intro-skip" onClick={(e) => { e.stopPropagation(); setIntroPhase('out'); }}>
              tap to skip →
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
