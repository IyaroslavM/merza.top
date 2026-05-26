import React from 'react';
import { useFocusTrap } from '../hooks.js';
import { PROJECTS } from '../data.js';
import { CaseStudy } from './CaseStudy.jsx';

export function PortfolioPage({ onClose }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);
  const [scrolled, setScrolled] = React.useState(false);
  const scrollRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  useFocusTrap(overlayRef);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const portfolioCss = `
    @keyframes grain{
      0%,100%{transform:translate(0,0)}
      10%{transform:translate(-2%,-3%)}
      30%{transform:translate(3%,2%)}
      50%{transform:translate(-1%,4%)}
      70%{transform:translate(2%,-2%)}
      90%{transform:translate(-3%,1%)}
    }
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
    .pf-overlay{position:fixed;inset:0;z-index:9999;background:#F7F4F0;
      opacity:0;transition:opacity .45s cubic-bezier(.4,0,.2,1);overflow:hidden}
    .pf-overlay.in{opacity:1}
    .pf-scroll{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;
      scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
    .pf-nav{position:fixed;top:0;left:0;right:0;z-index:10000;
      height:64px;display:flex;align-items:center;padding:0 48px;
      background:rgba(247,244,240,0);transition:background .3s,box-shadow .3s;
      justify-content:space-between}
    .pf-nav.scrolled{background:rgba(247,244,240,0.88);
      -webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);
      box-shadow:0 1px 0 rgba(0,0,0,0.07)}
    .pf-close{appearance:none;width:40px;height:40px;border-radius:999px;
      border:1px solid rgba(0,0,0,0.15);background:transparent;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      font-size:14px;color:#1A1A1F;transition:all .2s;opacity:.7}
    .pf-close:hover{opacity:1;transform:rotate(90deg);border-color:rgba(0,0,0,0.4)}
    .pf-grain{position:fixed;inset:-50%;width:200%;height:200%;
      pointer-events:none;z-index:9998;opacity:.028;
      background-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
      animation:grain 0.5s steps(2) infinite}
    @media(max-width:760px){
      .pf-nav{padding:0 20px;height:56px}
      .pf-nav .pf-logo{font-size:13px}
    }
  `;

  return (
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Kseniya Merza — Portfolio"
        className={"pf-overlay" + (mounted ? " in" : "")}>
      <style>{portfolioCss}</style>
      <div className="pf-grain" aria-hidden="true" />

      {/* Nav */}
      <nav className={"pf-nav" + (scrolled ? " scrolled" : "")}>
        <div style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic",
          fontSize:17, fontWeight:600, color:"#1A1A1F", letterSpacing:".02em"
        }} className="pf-logo">Kseniya Merza — Portfolio</div>
        <button className="pf-close" onClick={onClose} aria-label="Close portfolio">✕</button>
      </nav>

      {/* Scrollable content */}
      <div className="pf-scroll" ref={scrollRef}>
        <div style={{ maxWidth:960, margin:"0 auto", padding:"120px 24px 100px" }}>

          {/* Hero */}
          <div style={{
            marginBottom:100, animation:"fadeUp .7s cubic-bezier(.4,0,.2,1) both"
          }}>
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:".42em",
              textTransform:"uppercase", color:"#B85EE0", fontWeight:600, marginBottom:18, opacity:.8
            }}>Selected Work · 2021 – 2022</div>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic",
              fontSize:"clamp(52px,8vw,88px)", fontWeight:600, lineHeight:.9,
              color:"#1A1A1F", margin:"0 0 24px", letterSpacing:"-.02em"
            }}>Design that<br/>moves numbers.</h1>
            <p style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, lineHeight:1.6,
              color:"#5A5A62", maxWidth:"52ch", margin:0, fontStyle:"italic", fontWeight:500
            }}>Three case studies where UX research drove measurable outcomes — from food delivery to childcare trust and safety.</p>

            {/* Stat row */}
            <div style={{ display:"flex", gap:40, marginTop:48, flexWrap:"wrap" }}>
              {[
                { v:"+52%", l:"Sushi Master cart lift" },
                { v:"+67%", l:"Monopizza conversion" },
                { v:"+38%", l:"Babysitter booking lift" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                    fontSize:38, fontWeight:600, color:"#B85EE0", lineHeight:1 }}>{v}</div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                    letterSpacing:".22em", textTransform:"uppercase", color:"#7A7A82", marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Case studies */}
          <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
            {PROJECTS.map((p, i) => <CaseStudy key={p.id} project={p} index={i} />)}
          </div>

          {/* Footer CTA */}
          <div style={{
            marginTop:96, textAlign:"center",
            animation:"fadeUp .7s .3s cubic-bezier(.4,0,.2,1) both"
          }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic",
              fontSize:36, fontWeight:600, color:"#1A1A1F", marginBottom:8 }}>
              Want to work together?
            </div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#7A7A82",
              letterSpacing:".12em", marginBottom:28 }}>
              Open to product design roles · Kyiv / Remote
            </div>
            <a href="https://www.linkedin.com/in/kseniya-merza-08754077/" target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                height:52, padding:"0 28px", borderRadius:999,
                background:"#7E3DA0", color:"#fff", textDecoration:"none",
                fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:17, fontWeight:600,
                transition:"background .2s, transform .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#6A2E89"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#7E3DA0"; e.currentTarget.style.transform=""; }}
            >
              Connect on LinkedIn <span style={{ fontSize:14 }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
