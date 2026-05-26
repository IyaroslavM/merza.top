import React from 'react';
import { useFocusTrap } from '../hooks.js';
import { Y_PROJECTS } from '../data.js';

function MetricTerminal({ stats, accent }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % stats.length), 2600);
    return () => clearInterval(t);
  }, [stats.length]);

  return (
    <div style={{
      position:"relative", width:196, height:170, flexShrink:0,
      background:"rgba(0,0,0,0.28)", borderRadius:16, padding:"16px 18px",
      border:`1px solid rgba(255,255,255,0.14)`,
      boxShadow:`0 20px 60px rgba(0,0,0,0.3), 0 0 32px ${accent}18`,
      fontFamily:"'IBM Plex Mono',monospace",
    }}>
      <div style={{ display:"flex", gap:5, marginBottom:12 }}>
        {[accent, "rgba(255,255,255,0.18)", "rgba(255,255,255,0.18)"].map((c,i) => (
          <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:c, opacity:.75 }} />
        ))}
      </div>
      <div style={{ fontSize:9, letterSpacing:".28em", textTransform:"uppercase",
        color:"rgba(255,255,255,.82)", marginBottom:6 }}>{">"} {stats[active]?.label}</div>
      <div style={{
        fontSize:30, fontWeight:700, color:accent, lineHeight:1,
        letterSpacing:"-.04em", marginBottom:4,
        transition:"color .4s"
      }}>{stats[active]?.value}</div>
      <div style={{ fontSize:8.5, color:"rgba(255,255,255,.72)", letterSpacing:".14em",
        textTransform:"uppercase" }}>{stats[active]?.sub}</div>
      <div style={{ position:"absolute", bottom:14, left:0, right:0,
        display:"flex", justifyContent:"center", gap:5 }}>
        {stats.map((_,i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: active===i ? 14 : 5, height:4, borderRadius:99,
            background: active===i ? accent : "rgba(255,255,255,0.14)",
            transition:"all 0.3s ease", cursor:"pointer"
          }} />
        ))}
      </div>
    </div>
  );
}

function YMetricCard({ value, label, accent }) {
  return (
    <div style={{
      background:"rgba(0,0,0,0.2)",
      borderRadius:14, padding:"18px 20px",
      border:"1px solid rgba(255,255,255,0.12)",
      transition:"transform .25s ease, border-color .25s ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor=accent+"55"; }}
    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}
    >
      <div style={{
        fontFamily:"'IBM Plex Mono',monospace", fontSize:26, fontWeight:700,
        color:accent, lineHeight:1, marginBottom:6, letterSpacing:"-.03em"
      }}>{value}</div>
      <div style={{
        fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5,
        letterSpacing:".22em", textTransform:"uppercase",
        color:"rgba(255,255,255,0.82)", fontWeight:500
      }}>{label}</div>
    </div>
  );
}

function YCaseStudy({ project, index: globalIndex }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <article ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(40px)",
      transition: `opacity .7s ${globalIndex*0.1}s cubic-bezier(.4,0,.2,1), transform .8s ${globalIndex*0.1}s cubic-bezier(.4,0,.2,1)`,
      borderRadius:24, overflow:"hidden",
      border:"1px solid rgba(255,255,255,0.12)",
      background:"rgba(0,0,0,0.22)",
    }}>
      {/* Header */}
      <div style={{
        background:project.accentLight,
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"44px 52px 36px",
        display:"flex", flexDirection:"row", gap:40,
        alignItems:"flex-start", flexWrap:"wrap",
      }}>
        <div style={{ flex:"1 1 300px" }}>
          <div style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:project.accent, fontWeight:600, marginBottom:14, opacity:.85
          }}>{project.index} — {project.type}</div>
          <div style={{
            fontFamily:"'IBM Plex Mono',monospace",
            fontSize:"clamp(30px,4.5vw,50px)", fontWeight:700,
            color:"#fff", lineHeight:.95, marginBottom:10, letterSpacing:"-.04em"
          }}>{project.name}</div>
          <div style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:20, color:project.accent, fontWeight:500,
            marginBottom:24, fontStyle:"italic"
          }}>{project.tagline}</div>
          <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            {[{l:"Role",v:project.role},{l:"Timeline",v:project.timeline}].map(({l,v}) => (
              <div key={l}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
                  letterSpacing:".3em", textTransform:"uppercase",
                  color:"rgba(255,255,255,.3)", fontWeight:600, marginBottom:3 }}>{l}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                  color:"rgba(255,255,255,.8)", fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <MetricTerminal stats={project.stats} accent={project.accent} />
      </div>

      {/* Body */}
      <div style={{ padding:"44px 52px", display:"flex", flexDirection:"column", gap:44 }}>

        {/* Problem */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:"rgba(255,255,255,.5)", fontWeight:600, marginBottom:14 }}>Problem</div>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:18.5,
            lineHeight:1.62, color:"rgba(255,255,255,.82)", margin:0,
            maxWidth:"68ch", fontStyle:"italic", fontWeight:500 }}>{project.problem}</p>
        </div>

        {/* Discovery */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:"rgba(255,255,255,.5)", fontWeight:600, marginBottom:18 }}>Discovery</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))", gap:12 }}>
            {project.research.map((r, i) => (
              <div key={i} style={{
                padding:"14px 16px", background:"rgba(0,0,0,0.18)",
                borderRadius:12, border:"1px solid rgba(255,255,255,.1)"
              }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:18,
                  fontWeight:700, color:project.accent, lineHeight:1,
                  marginBottom:5, letterSpacing:"-.02em" }}>{r.value}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
                  letterSpacing:".14em", textTransform:"uppercase",
                  color:"rgba(255,255,255,.65)", fontWeight:600, marginBottom:2 }}>{r.label}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
                  color:"rgba(255,255,255,.3)" }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:"rgba(255,255,255,.5)", fontWeight:600, marginBottom:14 }}>Key Insights</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {project.insights.map((ins, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:5, height:5, borderRadius:"50%",
                  background:project.accent, marginTop:8, flexShrink:0 }} />
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17,
                  lineHeight:1.58, color:"rgba(255,255,255,.78)", fontStyle:"italic" }}>{ins}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Decisions */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:"rgba(255,255,255,.5)", fontWeight:600, marginBottom:18 }}>Product Decisions</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
            {project.decisions.map((d, i) => (
              <div key={i} style={{
                padding:"18px 20px", borderRadius:14,
                background:"rgba(0,0,0,0.18)",
                border:`1px solid ${project.accent}30`,
                borderLeft:`3px solid ${project.accent}`
              }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12,
                  fontWeight:700, color:"#fff", marginBottom:8,
                  letterSpacing:"-.01em" }}>{d.title}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                  lineHeight:1.65, color:"rgba(255,255,255,.62)" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
            letterSpacing:".42em", textTransform:"uppercase",
            color:"rgba(255,255,255,.5)", fontWeight:600, marginBottom:18 }}>Outcomes</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12 }}>
            {project.metrics.map((m, i) => (
              <YMetricCard key={i} value={m.value} label={m.label} accent={project.accent} />
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}

export function YaroslavPortfolioPage({ onClose }) {
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

  const yCss = `
    @keyframes yfadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
    @keyframes yfloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-2%,3%) scale(1.06)}}
    @keyframes yfloat2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(3%,-2%) scale(1.08)}}
    .ypf-overlay{position:fixed;inset:0;z-index:9999;background:#2E7D32;
      opacity:0;transition:opacity .45s cubic-bezier(.4,0,.2,1);overflow:hidden}
    .ypf-overlay.in{opacity:1}
    .ypf-scroll{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;
      scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
    .ypf-nav{position:fixed;top:0;left:0;right:0;z-index:10000;
      height:64px;display:flex;align-items:center;padding:0 48px;
      background:rgba(46,125,50,0);transition:background .3s,box-shadow .3s;
      justify-content:space-between}
    .ypf-nav.scrolled{background:rgba(26,68,26,0.94);
      -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
      box-shadow:0 1px 0 rgba(255,255,255,0.1)}
    .ypf-close{appearance:none;width:40px;height:40px;border-radius:999px;
      border:1px solid rgba(255,255,255,0.32);background:transparent;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      font-size:14px;color:#fff;transition:all .2s;opacity:.72}
    .ypf-close:hover{opacity:1;transform:rotate(90deg);border-color:rgba(255,255,255,0.7)}
    .ypf-blob{position:absolute;border-radius:50%;pointer-events:none}
    .ypf-hero{position:relative;margin-bottom:96px;
      animation:yfadeUp .7s cubic-bezier(.4,0,.2,1) both;
      padding:72px 0 24px}
    .ypf-grid{position:absolute;inset:-80px -80px -20px -80px;pointer-events:none;
      background-image:
        linear-gradient(rgba(255,255,255,0.09) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,0.09) 1px,transparent 1px);
      background-size:48px 48px;
      -webkit-mask-image:radial-gradient(ellipse 80% 90% at 22% 42%,black 0%,transparent 68%);
      mask-image:radial-gradient(ellipse 80% 90% at 22% 42%,black 0%,transparent 68%)}
    .ypf-glow{display:none}
    .ypf-glow2{display:none}
    @media(max-width:760px){
      .ypf-nav{padding:0 20px;height:56px}
      .ypf-nav .ypf-logo{font-size:11px}
      .ypf-hero{padding:48px 0 16px}
    }
  `;

  return (
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Yaroslav Merza — Portfolio"
        className={"ypf-overlay" + (mounted ? " in" : "")}>
      <style>{yCss}</style>

      {/* Floating blobs — mirrors the NetworkField from the main page */}
      <div className="ypf-blob" style={{ width:230,height:130, top:"12%",  left:"24%",  background:"radial-gradient(ellipse,rgba(255,255,255,0.11) 0%,transparent 70%)", animation:"yfloat 16s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:150,height:90,  top:"7%",   right:"14%", background:"radial-gradient(ellipse,rgba(255,255,255,0.08) 0%,transparent 70%)", animation:"yfloat2 20s 2s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:100,height:58,  top:"7%",   right:"28%", background:"radial-gradient(ellipse,rgba(255,255,255,0.06) 0%,transparent 70%)", animation:"yfloat 13s 1s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:130,height:75,  top:"42%",  right:"6%",  background:"radial-gradient(ellipse,rgba(255,255,255,0.09) 0%,transparent 70%)", animation:"yfloat2 14s 0.5s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:190,height:110, top:"36%",  left:"52%",  background:"radial-gradient(ellipse,rgba(255,255,255,0.06) 0%,transparent 70%)", animation:"yfloat 18s 3s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:115,height:65,  bottom:"18%",left:"36%", background:"radial-gradient(ellipse,rgba(255,255,255,0.08) 0%,transparent 70%)", animation:"yfloat2 22s 1.5s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:80, height:48,  bottom:"26%",right:"22%",background:"radial-gradient(ellipse,rgba(255,255,255,0.07) 0%,transparent 70%)", animation:"yfloat 17s 4s ease-in-out infinite" }} />
      <div className="ypf-blob" style={{ width:160,height:95,  bottom:"8%", right:"38%",background:"radial-gradient(ellipse,rgba(255,255,255,0.07) 0%,transparent 70%)", animation:"yfloat2 19s 2.5s ease-in-out infinite" }} />

      <nav className={"ypf-nav" + (scrolled ? " scrolled" : "")}>
        <div style={{
          fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700,
          color:"rgba(255,255,255,0.82)", letterSpacing:".24em", textTransform:"uppercase"
        }} className="ypf-logo">Yaroslav Merza — Portfolio</div>
        <button className="ypf-close" onClick={onClose} aria-label="Close portfolio">✕</button>
      </nav>

      <div className="ypf-scroll" ref={scrollRef}>
        <div style={{ maxWidth:960, margin:"0 auto", padding:"120px 24px 100px" }}>

          {/* Hero */}
          <div className="ypf-hero">
            <div className="ypf-grid" aria-hidden="true" />
            <div className="ypf-glow" aria-hidden="true" />
            <div className="ypf-glow2" aria-hidden="true" />
            <div style={{
              position:"relative", zIndex:1,
              fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5,
              letterSpacing:".46em", textTransform:"uppercase",
              color:"#E8DDB5", fontWeight:600, marginBottom:18, opacity:.72
            }}>Selected Work · 2020 – Present</div>
            <h1 style={{
              position:"relative", zIndex:1,
              fontFamily:"'IBM Plex Mono',monospace",
              fontSize:"clamp(44px,8vw,80px)", fontWeight:700,
              lineHeight:.92, margin:"0 0 24px", letterSpacing:"-.04em",
              color:"#fff"
            }}>
              Products<br/>
              <span style={{ color:"#E8DDB5" }}>that scale.</span>
            </h1>
            <p style={{
              position:"relative", zIndex:1,
              fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20,
              lineHeight:1.62, color:"rgba(255,255,255,.5)", maxWidth:"52ch",
              margin:0, fontStyle:"italic", fontWeight:500
            }}>Three case studies where product strategy drove measurable business outcomes — from zero to millions of users.</p>

            {/* Stats */}
            <div style={{ position:"relative", zIndex:1, display:"flex", gap:44, marginTop:52, flexWrap:"wrap" }}>
              {[
                { v:"2M+",   l:"BROCARD installs" },
                { v:"+40%",  l:"Crystal traffic growth" },
                { v:"3M+",   l:"DOC.ua appointments" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:36,
                    fontWeight:700, color:"#E8DDB5", lineHeight:1,
                    letterSpacing:"-.04em" }}>{v}</div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5,
                    letterSpacing:".3em", textTransform:"uppercase",
                    color:"rgba(255,255,255,.35)", marginTop:8 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Case studies */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {Y_PROJECTS.map((p, i) => <YCaseStudy key={p.id} project={p} index={i} />)}
          </div>

          {/* Footer CTA */}
          <div style={{
            marginTop:96, textAlign:"center",
            animation:"yfadeUp .7s .3s cubic-bezier(.4,0,.2,1) both"
          }}>
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace",
              fontSize:"clamp(22px,3.5vw,38px)", fontWeight:700,
              color:"#fff", marginBottom:10, letterSpacing:"-.03em"
            }}>Have a product challenge?</div>
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5,
              color:"rgba(255,255,255,.35)", letterSpacing:".22em",
              textTransform:"uppercase", marginBottom:32
            }}>Open to product leadership roles · Kyiv / Remote</div>
            <a href="https://www.linkedin.com/in/iaroslavmerza/" target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                height:52, padding:"0 30px", borderRadius:999,
                background:"#E8DDB5", color:"#1A1A1F", textDecoration:"none",
                fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                fontWeight:700, letterSpacing:".18em", textTransform:"uppercase",
                transition:"background .2s, transform .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#E8DDB5"; e.currentTarget.style.transform=""; }}
            >Connect on LinkedIn <span style={{ fontSize:14 }}>→</span></a>
          </div>

        </div>
      </div>
    </div>
  );
}
