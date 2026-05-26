import React from 'react';
import { MockPhone, SushiMasterPhone, MonopizzaPhone, BabysitterPhone } from './Phones.jsx';

function MetricCard({ value, label, delta }) {
  return (
    <div style={{
      background:"#fff", borderRadius:16, padding:"20px 22px",
      border:"1px solid rgba(0,0,0,0.06)",
      boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
      transition:"transform .25s ease, box-shadow .25s ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.09)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)"; }}
    >
      <div style={{
        fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic",
        fontSize:30, fontWeight:600, color:"#1A1A1F", lineHeight:1, marginBottom:6
      }}>{value}</div>
      <div style={{
        fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:".14em",
        textTransform:"uppercase", color:"#7A7A82", fontWeight:500
      }}>{label}</div>
    </div>
  );
}

export function CaseStudy({ project, index: globalIndex }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const isEven = globalIndex % 2 === 0;
  return (
    <article ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: `opacity .7s ${globalIndex * 0.1}s cubic-bezier(.4,0,.2,1), transform .8s ${globalIndex * 0.1}s cubic-bezier(.4,0,.2,1)`,
      borderRadius: 28, overflow:"hidden",
      border: project.concept ? `1.5px dashed ${project.accent}60` : "1px solid rgba(0,0,0,0.07)",
      background: "#fff",
    }}>
      {/* Concept banner */}
      {project.concept && (
        <div style={{
          display:"flex", alignItems:"center", gap:10,
          padding:"9px 28px", background:`${project.accent}0D`,
          borderBottom:`1px dashed ${project.accent}40`,
        }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:project.accent, opacity:.7, flexShrink:0,
            animation:"concept-pulse 2s ease-in-out infinite" }} />
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, fontWeight:600,
            color:project.accent, letterSpacing:".18em", textTransform:"uppercase" }}>
            Concept · In Development
          </div>
          <div style={{ marginLeft:"auto", fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
            color:`${project.accent}99`, letterSpacing:".08em" }}>not shipped</div>
        </div>
      )}
      {/* Header */}
      <div style={{
        background: project.accentLight, borderBottom:"1px solid rgba(0,0,0,0.05)",
        padding:"clamp(20px,5vw,48px) clamp(16px,5.5vw,56px) clamp(20px,4vw,40px)",
        display:"flex", flexDirection:"row", gap:48, alignItems:"flex-start",
        flexWrap:"wrap",
      }}>
        <div style={{ flex:"1 1 340px" }}>
          <div style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:".38em",
            textTransform:"uppercase", color:project.accent, fontWeight:600, marginBottom:14, opacity:.85
          }}>{project.index} — {project.type}</div>
          <div style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic",
            fontSize:54, fontWeight:600, color:"#1A1A1F", lineHeight:.92, marginBottom:8,
            letterSpacing:"-.02em"
          }}>{project.name}</div>
          <div style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22,
            color:project.accent, fontWeight:500, marginBottom:24, letterSpacing:".01em"
          }}>{project.tagline}</div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {[{l:"Role", v:project.role},{l:"Timeline",v:project.timeline}].map(({ l, v }) => (
              <div key={l}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".3em",
                  textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:3 }}>{l}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#1A1A1F", fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:32 }}>
          {project.id === "sushi-master"
            ? <SushiMasterPhone />
            : project.id === "monopizza"
              ? <MonopizzaPhone />
              : project.id === "babysitter"
                ? <BabysitterPhone />
                : <MockPhone screens={project.screens} accent={project.accent} />}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"clamp(20px,5vw,48px) clamp(16px,5.5vw,56px)", display:"flex", flexDirection:"column", gap:48 }}>
        {/* Problem */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".38em",
            textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:16 }}>Problem</div>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:19, lineHeight:1.6,
            color:"#1A1A1F", margin:0, maxWidth:"68ch", fontStyle:"italic", fontWeight:500 }}>{project.problem}</p>
        </div>

        {/* Research */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".38em",
            textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:20 }}>UX Research</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 }}>
            {project.research.map((r, i) => (
              <div key={i} style={{ padding:"16px 18px", background:"rgba(0,0,0,0.025)", borderRadius:14,
                border:"1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:20,
                  fontWeight:600, color:project.accent, lineHeight:1, marginBottom:4 }}>{r.value}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:".12em",
                  textTransform:"uppercase", color:"#1A1A1F", fontWeight:600, marginBottom:2 }}>{r.label}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9.5, color:"#7A7A82" }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key insights */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".38em",
            textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:16 }}>Key Insights</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {project.insights.map((ins, i) => (
              <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:project.accent,
                  marginTop:7, flexShrink:0 }} />
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, lineHeight:1.55,
                  color:"#1A1A1F", fontStyle:"italic" }}>{ins}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Design decisions */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".38em",
            textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:20 }}>Design Decisions</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            {project.decisions.map((d, i) => (
              <div key={i} style={{ padding:"20px 22px", borderRadius:16, background:"#fff",
                border:`1.5px solid ${project.accent}22`,
                borderLeft:`3px solid ${project.accent}` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:17,
                  fontWeight:700, color:"#1A1A1F", marginBottom:8 }}>{d.title}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11.5, lineHeight:1.65,
                  color:"#5A5A62" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:".38em",
            textTransform:"uppercase", color:"#7A7A82", fontWeight:600, marginBottom:20 }}>Outcomes</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
            {project.metrics.map((m, i) => <MetricCard key={i} {...m} />)}
          </div>
        </div>
      </div>
    </article>
  );
}
