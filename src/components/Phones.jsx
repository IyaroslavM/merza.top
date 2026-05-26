import React from 'react';

export function MockPhone({ screens, accent }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % screens.length), 2400);
    return () => clearInterval(t);
  }, [screens.length]);

  return (
    <div style={{
      position: "relative", width: 180, height: 320, flexShrink: 0,
      background: "#1A1A1F", borderRadius: 32, padding: 10,
      boxShadow: `0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06)`,
    }}>
      {/* notch */}
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
        width:48, height:5, background:"#000", borderRadius:99, zIndex:2 }} />
      {/* screen */}
      <div style={{ width:"100%", height:"100%", borderRadius:24, overflow:"hidden", position:"relative" }}>
        {screens.map((s, i) => (
          <div key={i} style={{
            position:"absolute", inset:0,
            background: i % 2 === 0 ? s.color : `linear-gradient(135deg, ${s.color} 0%, ${s.color}CC 100%)`,
            opacity: active === i ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
            display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            gap: 8, padding: 16,
          }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ width:"70%", height:4, borderRadius:4, background:"rgba(255,255,255,0.3)" }} />
            <div style={{ width:"50%", height:4, borderRadius:4, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ marginTop:8, width:"85%", height:48, borderRadius:12, background:"rgba(255,255,255,0.15)" }} />
            <div style={{ width:"85%", height:28, borderRadius:8, background:"rgba(255,255,255,0.1)" }} />
            <div style={{ marginTop:4, width:"60%", height:8, borderRadius:4, background:"rgba(255,255,255,0.25)" }} />
            <div style={{
              position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
              fontSize:8, color:"rgba(255,255,255,0.6)", fontFamily:"'Cormorant Garamond',serif",
              fontStyle:"italic", letterSpacing:".06em", whiteSpace:"nowrap"
            }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* dots */}
      <div style={{ position:"absolute", bottom:-20, left:0, right:0, display:"flex", justifyContent:"center", gap:5 }}>
        {screens.map((_,i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: active===i ? 14 : 5, height:5, borderRadius:99,
            background: active===i ? accent : "rgba(0,0,0,0.18)",
            transition:"all 0.3s ease", cursor:"pointer"
          }}/>
        ))}
      </div>
    </div>
  );
}

export function SushiMasterPhone() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);
  const R = "#C0392B";

  const s = {
    wrap:  { position:"absolute", inset:0, background:"#fff", display:"flex", flexDirection:"column", transition:"opacity .6s cubic-bezier(.4,0,.2,1)" },
    bar:   { padding:"7px 9px 3px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0" },
    time:  { fontSize:5.5, fontWeight:700, color:"#1A1A1F", fontFamily:"monospace" },
    url:   { background:"#f3f3f3", margin:"3px 7px", borderRadius:5, padding:"2px 6px", textAlign:"center" },
    urlTx: { fontSize:4.5, color:"#666", fontFamily:"monospace" },
    hdr:   { padding:"4px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0" },
  };

  const Bars = () => (
    <div style={s.bar}>
      <div style={s.time}>11:03</div>
      <div style={{ display:"flex", gap:1.5, alignItems:"flex-end" }}>
        {[3,4,5,6].map((h,i)=><div key={i} style={{ width:2, height:h, background:"#1A1A1F", borderRadius:1 }}/>)}
        <div style={{ width:7, height:5, border:"1px solid #1A1A1F", borderRadius:1.5, marginLeft:2, position:"relative" }}>
          <div style={{ position:"absolute", inset:"1px 1px 1px 1px", background:"#1A1A1F", borderRadius:1 }}/>
        </div>
      </div>
    </div>
  );

  const UrlBar = () => (
    <div style={s.url}><div style={s.urlTx}>kyiv.sushi-master.ua</div></div>
  );

  const SiteHeader = () => (
    <div style={s.hdr}>
      <div style={{ display:"flex", alignItems:"center", gap:3 }}>
        <div style={{ width:13, height:13, borderRadius:"50%", background:"#FFD600", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, lineHeight:1 }}>🍣</div>
        <div style={{ fontSize:5.5, fontWeight:800, color:R, letterSpacing:"-.1px", fontFamily:"sans-serif" }}>SUSHI MASTER</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:1.5 }}>
        <div style={{ fontSize:6 }}>📍</div>
        <div style={{ fontSize:5, fontWeight:700, color:"#1A1A1F" }}>Київ</div>
      </div>
    </div>
  );

  return (
    <div style={{ position:"relative", width:180, height:320, flexShrink:0,
      background:"#1A1A1F", borderRadius:32, padding:10,
      boxShadow:`0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)` }}>
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
        width:48, height:5, background:"#000", borderRadius:99, zIndex:2 }} />

      <div style={{ width:"100%", height:"100%", borderRadius:24, overflow:"hidden", position:"relative" }}>

        {/* ── Screen 1: Menu Browse ── */}
        <div style={{ ...s.wrap, opacity: active===0?1:0 }}>
          <Bars/><UrlBar/><SiteHeader/>
          {/* Categories */}
          <div style={{ display:"flex", borderBottom:`2px solid #f0f0f0`, padding:"0 5px" }}>
            {["Сети","Роли","Акції","Комбо","Новинки"].map((c,i)=>(
              <div key={c} style={{ flex:1, textAlign:"center", padding:"4px 0", fontSize:4,
                fontWeight:i===0?800:500, color:i===0?R:"#555",
                borderBottom:i===0?`2px solid ${R}`:"2px solid transparent",
                marginBottom:-2 }}>{c}</div>
            ))}
          </div>
          {/* Search */}
          <div style={{ margin:"4px 7px 3px", background:"#f7f7f7", borderRadius:6, padding:"3px 7px", display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ fontSize:6 }}>🔍</div>
            <div style={{ fontSize:4.5, color:"#aaa" }}>Пошук</div>
          </div>
          {/* Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, padding:"0 7px", flex:1, overflow:"hidden" }}>
            {[
              { emoji:"🍣", name:"Філадельфія Класик", price:"349 грн", bg:"#FFF3E0" },
              { emoji:"🍱", name:"Каліфорнія 🔥", price:"299 грн", bg:"#E8F5E9", badge:"-20%" },
              { emoji:"🦐", name:"Дракон Ролл", price:"419 грн", bg:"#FCE4EC" },
              { emoji:"🍤", name:"Темпура Мікс", price:"389 грн", bg:"#E3F2FD" },
            ].map((item,i)=>(
              <div key={i} style={{ borderRadius:7, border:"1px solid #efefef", overflow:"hidden", background:"#fafafa" }}>
                <div style={{ height:38, background:item.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ fontSize:18 }}>{item.emoji}</div>
                  {item.badge && <div style={{ position:"absolute", top:3, right:3, background:R, color:"#fff", fontSize:4, fontWeight:800, padding:"1px 3px", borderRadius:3 }}>{item.badge}</div>}
                </div>
                <div style={{ padding:"3px 4px 4px" }}>
                  <div style={{ fontSize:4, color:"#1A1A1F", fontWeight:600, lineHeight:1.2 }}>{item.name}</div>
                  <div style={{ fontSize:5.5, color:R, fontWeight:800, marginTop:1 }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Screen 2: Item Detail ── */}
        <div style={{ ...s.wrap, opacity: active===1?1:0 }}>
          <Bars/><UrlBar/>
          {/* Back nav */}
          <div style={{ padding:"5px 9px 4px", display:"flex", alignItems:"center", gap:5, borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:10, color:R, lineHeight:1, marginTop:-1 }}>‹</div>
            <div style={{ fontSize:5.5, fontWeight:800, color:"#1A1A1F", letterSpacing:".1em" }}>НАЗАД</div>
          </div>
          {/* Photo */}
          <div style={{ position:"relative", margin:"6px 8px 0", borderRadius:9, overflow:"hidden", height:75,
            background:"linear-gradient(150deg,#2a2a2a 0%,#111 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontSize:30, letterSpacing:-2, filter:"drop-shadow(0 2px 6px rgba(0,0,0,.5))" }}>🍣🍱🦐</div>
            <div style={{ position:"absolute", top:5, right:5, display:"flex", flexDirection:"column", gap:2, alignItems:"flex-end" }}>
              <div style={{ background:R, color:"#fff", fontSize:4.5, fontWeight:800, padding:"1.5px 5px", borderRadius:3 }}>Знижка -35%</div>
              <div style={{ background:"#FFD600", color:"#1A1A1F", fontSize:4.5, fontWeight:800, padding:"1.5px 5px", borderRadius:3 }}>Новинка 🔥</div>
            </div>
          </div>
          {/* Info */}
          <div style={{ padding:"5px 10px 0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ fontSize:4.5, color:"#999" }}>Вага: 1030 г &nbsp;<span style={{ color:R }}>ℹ</span></div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:4.5, color:"#bbb", textDecoration:"line-through" }}>996 грн</div>
                <div style={{ fontSize:10, fontWeight:900, color:"#1A1A1F", lineHeight:1.1 }}>649 грн</div>
              </div>
            </div>
            <div style={{ fontSize:8, fontWeight:900, color:"#1A1A1F", marginTop:5, letterSpacing:"-.01em" }}>СЕТ ТИЖНЯ</div>
            <div style={{ fontSize:4, color:"#888", marginTop:3, lineHeight:1.4 }}>32 шт · Лосось, тунець, вугор, авокадо, вершковий сир</div>
          </div>
          {/* CTA */}
          <div style={{ marginTop:"auto", padding:"6px 8px 8px", display:"flex", gap:5 }}>
            <div style={{ flex:1, background:R, borderRadius:8, padding:"6px 0", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontSize:5.5, fontWeight:900, color:"#fff", letterSpacing:".08em" }}>В КОШИК</div>
            </div>
            <div style={{ width:24, height:24, border:"1.5px solid #e0e0e0", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>🛒</div>
          </div>
        </div>

        {/* ── Screen 3: Cart ── */}
        <div style={{ ...s.wrap, opacity: active===2?1:0 }}>
          <Bars/>
          <div style={{ padding:"6px 10px 5px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:7, fontWeight:900, color:"#1A1A1F", display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:9 }}>🛒</span> Кошик
            </div>
            <div style={{ background:R, color:"#fff", fontSize:4, fontWeight:700, padding:"1.5px 6px", borderRadius:99 }}>2 товари</div>
          </div>
          <div style={{ padding:"5px 8px", display:"flex", flexDirection:"column", gap:4, overflow:"hidden" }}>
            {[
              { emoji:"🍣", name:"Сет Тижня", sub:"32 шт", price:"649 грн", qty:1 },
              { emoji:"🍱", name:"Філадельфія", sub:"8 шт · ×2", price:"698 грн", qty:2 },
            ].map((item,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 5px", borderRadius:8, background:"#fafafa", border:"1px solid #f0f0f0" }}>
                <div style={{ width:24, height:24, borderRadius:6, background:i===0?"#FFF3E0":"#E8F5E9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:13 }}>{item.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:4.5, fontWeight:700, color:"#1A1A1F" }}>{item.name}</div>
                  <div style={{ fontSize:3.5, color:"#999" }}>{item.sub}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:5.5, fontWeight:800, color:R }}>{item.price}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:2, marginTop:1.5, justifyContent:"flex-end" }}>
                    <div style={{ width:11, height:11, borderRadius:3, border:"1px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#777", lineHeight:1 }}>−</div>
                    <div style={{ fontSize:5, fontWeight:800, color:"#1A1A1F", minWidth:8, textAlign:"center" }}>{item.qty}</div>
                    <div style={{ width:11, height:11, borderRadius:3, background:R, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#fff", lineHeight:1 }}>+</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin:"3px 8px", padding:"5px 7px", borderRadius:8, background:"#FFF8F7", border:`1px solid ${R}25` }}>
            <div style={{ fontSize:3.5, color:"#aaa", letterSpacing:".1em", textTransform:"uppercase", marginBottom:2 }}>Доставка</div>
            <div style={{ fontSize:4.5, color:"#1A1A1F", fontWeight:600 }}>🚴 30–45 хв · Київ, Хрещатик</div>
          </div>
          <div style={{ margin:"3px 8px 0", padding:"4px 7px", borderRadius:8, border:"1px dashed #e0e0e0", display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ fontSize:8 }}>🎁</div>
            <div style={{ fontSize:4, color:"#aaa" }}>Промокод або бонуси</div>
          </div>
          <div style={{ marginTop:"auto", padding:"5px 8px 8px", borderTop:"1px solid #f0f0f0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
              <div style={{ fontSize:5, color:"#999" }}>Разом:</div>
              <div style={{ fontSize:9, fontWeight:900, color:"#1A1A1F" }}>1347 грн</div>
            </div>
            <div style={{ background:R, borderRadius:8, padding:"7px 0", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontSize:5.5, fontWeight:900, color:"#fff", letterSpacing:".06em" }}>ОФОРМИТИ ЗАМОВЛЕННЯ</div>
            </div>
          </div>
        </div>

      </div>
      {/* Dots */}
      <div style={{ position:"absolute", bottom:-20, left:0, right:0, display:"flex", justifyContent:"center", gap:5 }}>
        {[0,1,2].map(i=>(
          <div key={i} onClick={()=>setActive(i)} style={{
            width: active===i?14:5, height:5, borderRadius:99,
            background: active===i?R:"rgba(0,0,0,0.18)",
            transition:"all 0.3s ease", cursor:"pointer"
          }}/>
        ))}
      </div>
    </div>
  );
}

export function MonopizzaPhone() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);
  const O = "#E8763A";

  const s = {
    wrap: { position:"absolute", inset:0, background:"#fff", display:"flex", flexDirection:"column", transition:"opacity .6s cubic-bezier(.4,0,.2,1)" },
  };

  const Bars = () => (
    <div style={{ padding:"7px 9px 3px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f5f5f5" }}>
      <div style={{ fontSize:5.5, fontWeight:700, color:"#1A1A1F", fontFamily:"monospace" }}>11:03</div>
      <div style={{ display:"flex", gap:1.5, alignItems:"flex-end" }}>
        {[3,4,5,6].map((h,i)=><div key={i} style={{ width:2, height:h, background:"#1A1A1F", borderRadius:1 }}/>)}
        <div style={{ width:7, height:5, border:"1px solid #1A1A1F", borderRadius:1.5, marginLeft:2, position:"relative" }}>
          <div style={{ position:"absolute", inset:"1px 1px 1px 1px", background:"#1A1A1F", borderRadius:1 }}/>
        </div>
      </div>
    </div>
  );

  const UrlBar = () => (
    <div style={{ background:"#f3f3f3", margin:"3px 7px", borderRadius:5, padding:"2px 6px", textAlign:"center" }}>
      <div style={{ fontSize:4.5, color:"#666", fontFamily:"monospace" }}>monopizza.com.ua</div>
    </div>
  );

  const SiteHeader = () => (
    <div style={{ padding:"4px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0" }}>
      <div style={{ display:"flex", alignItems:"center", gap:3 }}>
        <div style={{ width:14, height:14, borderRadius:4, background:O, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8 }}>🍕</div>
        <div style={{ fontSize:6, fontWeight:900, color:"#1A1A1F", letterSpacing:"-.1px", fontFamily:"sans-serif" }}>mono<span style={{ color:O }}>pizza</span></div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:1.5, background:"#FFF3ED", borderRadius:4, padding:"2px 5px" }}>
        <div style={{ fontSize:5 }}>📍</div>
        <div style={{ fontSize:4.5, fontWeight:700, color:O }}>Київ · авто</div>
      </div>
    </div>
  );

  return (
    <div style={{ position:"relative", width:180, height:320, flexShrink:0,
      background:"#1A1A1F", borderRadius:32, padding:10,
      boxShadow:`0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)` }}>
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
        width:48, height:5, background:"#000", borderRadius:99, zIndex:2 }} />

      <div style={{ width:"100%", height:"100%", borderRadius:24, overflow:"hidden", position:"relative" }}>

        {/* ── Screen 1: Menu & Location ── */}
        <div style={{ ...s.wrap, opacity: active===0?1:0 }}>
          <Bars/><UrlBar/><SiteHeader/>
          {/* Category tabs */}
          <div style={{ display:"flex", borderBottom:"2px solid #f0f0f0", padding:"0 5px" }}>
            {["Піца","Бургери","Напої","Десерти"].map((c,i)=>(
              <div key={c} style={{ flex:1, textAlign:"center", padding:"4px 0", fontSize:4,
                fontWeight:i===0?900:500, color:i===0?O:"#777",
                borderBottom:i===0?`2px solid ${O}`:"2px solid transparent", marginBottom:-2 }}>{c}</div>
            ))}
          </div>
          {/* Promo banner */}
          <div style={{ margin:"5px 7px", borderRadius:8, background:`linear-gradient(110deg,${O} 0%,#C05A1F 100%)`, padding:"7px 9px", display:"flex", alignItems:"center", justifyContent:"space-between", overflow:"hidden", position:"relative" }}>
            <div>
              <div style={{ fontSize:4, color:"rgba(255,255,255,.8)", letterSpacing:".1em", textTransform:"uppercase" }}>Акція тижня</div>
              <div style={{ fontSize:7.5, fontWeight:900, color:"#fff", marginTop:1 }}>2 піци = −30%</div>
              <div style={{ fontSize:3.5, color:"rgba(255,255,255,.7)", marginTop:2 }}>до 23:59 · промокод AUTO30</div>
            </div>
            <div style={{ fontSize:32, opacity:.9 }}>🍕</div>
          </div>
          {/* Pizza grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, padding:"0 7px", flex:1, overflow:"hidden" }}>
            {[
              { emoji:"🍕", name:"Маргарита", price:"249 грн", sub:"25 / 30 / 35 см", bg:"#FFF3ED" },
              { emoji:"🔥", name:"Пепероні", price:"299 грн", sub:"25 / 30 / 35 см", bg:"#FFF3E0", badge:"ХІТ" },
              { emoji:"🌿", name:"4 Сири", price:"319 грн", sub:"25 / 30 / 35 см", bg:"#F3FBF0" },
              { emoji:"🥩", name:"М'ясна", price:"329 грн", sub:"25 / 30 / 35 см", bg:"#FBF0F0" },
            ].map((item,i)=>(
              <div key={i} style={{ borderRadius:7, border:"1px solid #efefef", overflow:"hidden", background:"#fafafa" }}>
                <div style={{ height:36, background:item.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ fontSize:20 }}>{item.emoji}</div>
                  {item.badge && <div style={{ position:"absolute", top:3, right:3, background:O, color:"#fff", fontSize:4, fontWeight:800, padding:"1px 3px", borderRadius:3 }}>{item.badge}</div>}
                </div>
                <div style={{ padding:"3px 4px 4px" }}>
                  <div style={{ fontSize:4, color:"#1A1A1F", fontWeight:700 }}>{item.name}</div>
                  <div style={{ fontSize:3.5, color:"#aaa", marginTop:1 }}>{item.sub}</div>
                  <div style={{ fontSize:5.5, color:O, fontWeight:900, marginTop:2 }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Screen 2: Pizza Builder ── */}
        <div style={{ ...s.wrap, opacity: active===1?1:0 }}>
          <Bars/><UrlBar/>
          <div style={{ padding:"5px 9px 4px", display:"flex", alignItems:"center", gap:5, borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:10, color:O, lineHeight:1, marginTop:-1 }}>‹</div>
            <div style={{ fontSize:5.5, fontWeight:800, color:"#1A1A1F", letterSpacing:".08em" }}>НАЛАШТУЙ ПІЦУ</div>
          </div>
          {/* Live pizza preview */}
          <div style={{ margin:"6px auto 0", width:80, height:80, borderRadius:"50%",
            background:"radial-gradient(circle at 40% 35%, #F5C842 0%, #E8A020 60%, #C07010 100%)",
            display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
            boxShadow:`0 4px 16px rgba(232,118,58,.35)` }}>
            <div style={{ fontSize:30, filter:"drop-shadow(0 1px 3px rgba(0,0,0,.3))" }}>🍕</div>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`2px solid ${O}40` }}/>
          </div>
          <div style={{ textAlign:"center", fontSize:7, fontWeight:900, color:"#1A1A1F", marginTop:5, letterSpacing:"-.01em" }}>Маргарита</div>
          {/* Size selector */}
          <div style={{ padding:"5px 9px 0" }}>
            <div style={{ fontSize:4, color:"#aaa", letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>Розмір</div>
            <div style={{ display:"flex", gap:4 }}>
              {[{s:"25 см",p:"249 грн"},{s:"30 см",p:"289 грн",on:true},{s:"35 см",p:"329 грн"}].map((sz,i)=>(
                <div key={i} style={{ flex:1, borderRadius:7, border:`1.5px solid ${sz.on?O:"#e8e8e8"}`,
                  background:sz.on?`${O}12`:"#fafafa", padding:"4px 2px", textAlign:"center" }}>
                  <div style={{ fontSize:5, fontWeight:sz.on?800:500, color:sz.on?O:"#555" }}>{sz.s}</div>
                  <div style={{ fontSize:4, color:sz.on?O:"#aaa", marginTop:1, fontWeight:sz.on?700:400 }}>{sz.p}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Toppings */}
          <div style={{ padding:"5px 9px 0" }}>
            <div style={{ fontSize:4, color:"#aaa", letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>Топінги</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3 }}>
              {[
                { name:"Моцарела", on:true },
                { name:"Томатний соус", on:true },
                { name:"Базилік", on:false },
                { name:"Орегано", on:true },
                { name:"Пармезан", on:false },
                { name:"Гриби", on:false },
              ].map((tp,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:3, padding:"2px 0" }}>
                  <div style={{ width:9, height:9, borderRadius:3, border:`1.5px solid ${tp.on?O:"#ddd"}`,
                    background:tp.on?O:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {tp.on && <div style={{ fontSize:5, color:"#fff", lineHeight:1 }}>✓</div>}
                  </div>
                  <div style={{ fontSize:4, color:tp.on?"#1A1A1F":"#bbb", fontWeight:tp.on?600:400 }}>{tp.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div style={{ marginTop:"auto", padding:"5px 8px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid #f0f0f0" }}>
            <div>
              <div style={{ fontSize:4, color:"#aaa" }}>Ціна:</div>
              <div style={{ fontSize:9, fontWeight:900, color:"#1A1A1F" }}>289 грн</div>
            </div>
            <div style={{ background:O, borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>
              <div style={{ fontSize:5.5, fontWeight:900, color:"#fff", letterSpacing:".06em" }}>В КОШИК</div>
            </div>
          </div>
        </div>

        {/* ── Screen 3: Combo Upsell ── */}
        <div style={{ ...s.wrap, opacity: active===2?1:0 }}>
          <Bars/>
          {/* Header */}
          <div style={{ background:`linear-gradient(110deg,${O} 0%,#C05A1F 100%)`, padding:"8px 10px 7px" }}>
            <div style={{ fontSize:4.5, color:"rgba(255,255,255,.8)", letterSpacing:".08em", textTransform:"uppercase" }}>Чудовий вибір!</div>
            <div style={{ fontSize:7.5, fontWeight:900, color:"#fff", marginTop:1 }}>🔥 Доповни до комбо</div>
          </div>
          {/* Added item */}
          <div style={{ margin:"6px 8px 4px", padding:"5px 7px", borderRadius:8, background:"#fafafa", border:"1px solid #f0f0f0", display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ fontSize:16 }}>🍕</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:5, fontWeight:700, color:"#1A1A1F" }}>Маргарита 30 см</div>
              <div style={{ fontSize:4, color:"#aaa" }}>додано до кошика</div>
            </div>
            <div style={{ fontSize:6.5, fontWeight:800, color:O }}>289 грн</div>
          </div>
          {/* Combo card */}
          <div style={{ margin:"0 8px", padding:"7px 8px", borderRadius:9, border:`2px solid ${O}`, background:`${O}08` }}>
            <div style={{ fontSize:4.5, fontWeight:800, color:O, letterSpacing:".06em", textTransform:"uppercase", marginBottom:6 }}>Комбо пропозиція</div>
            <div style={{ display:"flex", gap:3, alignItems:"center", marginBottom:6 }}>
              {[{ e:"🥤", n:"Cola 0.5 л" }, { e:"➕", n:null }, { e:"🍟", n:"Картопля фрі" }].map((x,i)=>(
                x.n
                  ? <div key={i} style={{ flex:1, borderRadius:7, background:"#fff", border:"1px solid #f0f0f0", padding:"4px 3px", textAlign:"center" }}>
                      <div style={{ fontSize:14 }}>{x.e}</div>
                      <div style={{ fontSize:3.5, color:"#555", marginTop:1 }}>{x.n}</div>
                    </div>
                  : <div key={i} style={{ fontSize:8, color:O, fontWeight:900 }}>{x.e}</div>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
              <div style={{ fontSize:4, color:"#bbb", textDecoration:"line-through" }}>140 грн окремо</div>
              <div style={{ fontSize:8, fontWeight:900, color:O }}>89 грн</div>
              <div style={{ background:O, color:"#fff", fontSize:3.5, fontWeight:800, padding:"1px 4px", borderRadius:3 }}>−36%</div>
            </div>
          </div>
          {/* Buttons */}
          <div style={{ padding:"5px 8px", display:"flex", flexDirection:"column", gap:4, marginTop:"auto" }}>
            <div style={{ background:O, borderRadius:8, padding:"7px 0", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontSize:5.5, fontWeight:900, color:"#fff", letterSpacing:".06em" }}>ДОДАТИ КОМБО · 89 грн</div>
            </div>
            <div style={{ textAlign:"center", padding:"3px 0", cursor:"pointer" }}>
              <div style={{ fontSize:4.5, color:"#bbb", textDecoration:"underline" }}>Ні, дякую</div>
            </div>
          </div>
          {/* Mini total */}
          <div style={{ padding:"0 8px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #f5f5f5", paddingTop:5 }}>
            <div style={{ fontSize:4, color:"#aaa" }}>Кошик · 1 товар</div>
            <div style={{ fontSize:6.5, fontWeight:900, color:"#1A1A1F" }}>289 грн</div>
          </div>
        </div>

      </div>
      {/* Dots */}
      <div style={{ position:"absolute", bottom:-20, left:0, right:0, display:"flex", justifyContent:"center", gap:5 }}>
        {[0,1,2].map(i=>(
          <div key={i} onClick={()=>setActive(i)} style={{
            width: active===i?14:5, height:5, borderRadius:99,
            background: active===i?O:"rgba(0,0,0,0.18)",
            transition:"all 0.3s ease", cursor:"pointer"
          }}/>
        ))}
      </div>
    </div>
  );
}

export function BabysitterPhone() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);
  const P = "#B85EE0";
  const D = "#7E3DA0";

  const s = {
    wrap: { position:"absolute", inset:0, background:"#fff", display:"flex", flexDirection:"column", transition:"opacity .6s cubic-bezier(.4,0,.2,1)" },
  };

  const Bars = () => (
    <div style={{ padding:"7px 9px 3px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f5f5f5" }}>
      <div style={{ fontSize:5.5, fontWeight:700, color:"#1A1A1F", fontFamily:"monospace" }}>11:03</div>
      <div style={{ display:"flex", gap:1.5, alignItems:"flex-end" }}>
        {[3,4,5,6].map((h,i)=><div key={i} style={{ width:2, height:h, background:"#1A1A1F", borderRadius:1 }}/>)}
        <div style={{ width:7, height:5, border:"1px solid #1A1A1F", borderRadius:1.5, marginLeft:2, position:"relative" }}>
          <div style={{ position:"absolute", inset:"1px 1px 1px 1px", background:"#1A1A1F", borderRadius:1 }}/>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position:"relative", width:180, height:320, flexShrink:0,
      background:"#1A1A1F", borderRadius:32, padding:10,
      boxShadow:`0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)` }}>
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
        width:48, height:5, background:"#000", borderRadius:99, zIndex:2 }} />

      <div style={{ width:"100%", height:"100%", borderRadius:24, overflow:"hidden", position:"relative" }}>

        {/* ── Screen 1: Onboarding / Trust-first ── */}
        <div style={{ ...s.wrap, opacity: active===0?1:0, background:`linear-gradient(160deg,#F9F0FF 0%,#EDD6F9 100%)` }}>
          <Bars/>
          <div style={{ padding:"10px 12px 0", display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
            {/* Logo */}
            <div style={{ width:36, height:36, borderRadius:12, background:`linear-gradient(135deg,${P},${D})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:8, boxShadow:`0 4px 14px ${P}55` }}>👶</div>
            <div style={{ fontSize:8, fontWeight:900, color:"#1A1A1F", letterSpacing:"-.01em", marginBottom:3 }}>Babysitter</div>
            <div style={{ fontSize:4.5, color:"#7A7A82", textAlign:"center", lineHeight:1.5, maxWidth:"22ch", marginBottom:12 }}>Знайди перевірену няню за 3 хвилини</div>
            {/* Trust badges — visible before any tap */}
            <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
              {[
                { icon:"✅", label:"Background check", sub:"Поліцейська перевірка" },
                { icon:"⭐", label:"Verified reviews", sub:"Тільки реальні батьки" },
                { icon:"🛡️", label:"Insurance included", sub:"Захист на кожне замовлення" },
              ].map((b,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,.75)", borderRadius:9, padding:"5px 8px", border:`1px solid ${P}25` }}>
                  <div style={{ fontSize:11 }}>{b.icon}</div>
                  <div>
                    <div style={{ fontSize:5, fontWeight:800, color:"#1A1A1F" }}>{b.label}</div>
                    <div style={{ fontSize:3.5, color:"#7A7A82", marginTop:1 }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width:"100%", background:P, borderRadius:9, padding:"7px 0", textAlign:"center" }}>
              <div style={{ fontSize:6, fontWeight:900, color:"#fff", letterSpacing:".05em" }}>ЗНАЙТИ НЯНЮ</div>
            </div>
            <div style={{ fontSize:4, color:"#aaa", marginTop:6 }}>Вже є акаунт? <span style={{ color:P, fontWeight:700 }}>Увійти</span></div>
          </div>
        </div>

        {/* ── Screen 2: Sitter Profile Card ── */}
        <div style={{ ...s.wrap, opacity: active===1?1:0 }}>
          <Bars/>
          <div style={{ padding:"5px 9px 4px", display:"flex", alignItems:"center", gap:5, borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:10, color:P, lineHeight:1, marginTop:-1 }}>‹</div>
            <div style={{ fontSize:5.5, fontWeight:800, color:"#1A1A1F", letterSpacing:".06em" }}>НЯНЯ ДОСТУПНА</div>
            <div style={{ marginLeft:"auto", background:`${P}18`, borderRadius:99, padding:"2px 7px" }}>
              <div style={{ fontSize:4, color:P, fontWeight:700 }}>поруч · 0.8 км</div>
            </div>
          </div>
          {/* Profile */}
          <div style={{ padding:"8px 10px 0" }}>
            <div style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:`linear-gradient(135deg,${P}66,${D}66)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👩</div>
                <div style={{ position:"absolute", bottom:-2, right:-2, background:"#22C55E", borderRadius:99, width:10, height:10, border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ fontSize:5, color:"#fff", lineHeight:1 }}>✓</div>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:7.5, fontWeight:900, color:"#1A1A1F" }}>Олена К.</div>
                <div style={{ display:"flex", alignItems:"center", gap:3, marginTop:1 }}>
                  <div style={{ fontSize:5, color:"#F59E0B" }}>★★★★★</div>
                  <div style={{ fontSize:4, color:"#7A7A82" }}>4.9 · 87 відгуків</div>
                </div>
                <div style={{ fontSize:4, color:"#22C55E", fontWeight:700, marginTop:2 }}>✅ Перевірена поліцією</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:7, fontWeight:900, color:P }}>180 грн</div>
                <div style={{ fontSize:3.5, color:"#aaa" }}>/година</div>
              </div>
            </div>
            {/* Video preview */}
            <div style={{ borderRadius:10, overflow:"hidden", height:60, background:`linear-gradient(135deg,${D} 0%,${P} 100%)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:7, position:"relative" }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(255,255,255,.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:9, marginLeft:1 }}>▶</div>
              </div>
              <div style={{ position:"absolute", bottom:5, left:9, fontSize:4, color:"rgba(255,255,255,.85)", fontWeight:600 }}>60-секундне відео · Олена розповідає про себе</div>
            </div>
            {/* Tags */}
            <div style={{ display:"flex", gap:3, flexWrap:"wrap", marginBottom:8 }}>
              {["0–3 роки","Перша допомога","Англійська","Плавання"].map(tag=>(
                <div key={tag} style={{ fontSize:3.5, color:D, background:`${P}14`, borderRadius:99, padding:"2px 5px", fontWeight:600 }}>{tag}</div>
              ))}
            </div>
            {/* Actions */}
            <div style={{ display:"flex", gap:5 }}>
              <div style={{ flex:1, background:P, borderRadius:8, padding:"6px 0", textAlign:"center" }}>
                <div style={{ fontSize:5.5, fontWeight:900, color:"#fff" }}>ЗАБРОНЮВАТИ</div>
              </div>
              <div style={{ width:28, height:28, border:`1.5px solid ${P}40`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>💬</div>
            </div>
          </div>
        </div>

        {/* ── Screen 3: Booking Flow ── */}
        <div style={{ ...s.wrap, opacity: active===2?1:0 }}>
          <Bars/>
          <div style={{ padding:"5px 9px 4px", display:"flex", alignItems:"center", gap:5, borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:10, color:P, lineHeight:1, marginTop:-1 }}>‹</div>
            <div style={{ fontSize:5.5, fontWeight:800, color:"#1A1A1F" }}>БРОНЮВАННЯ</div>
          </div>
          <div style={{ padding:"6px 9px 0", display:"flex", flexDirection:"column", gap:6, flex:1 }}>
            {/* Mini profile */}
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 6px", background:"#fafafa", borderRadius:8, border:"1px solid #f0f0f0" }}>
              <div style={{ fontSize:14 }}>👩</div>
              <div>
                <div style={{ fontSize:5, fontWeight:800, color:"#1A1A1F" }}>Олена К.</div>
                <div style={{ fontSize:3.5, color:"#22C55E", fontWeight:700 }}>✅ Перевірена · ★ 4.9</div>
              </div>
              <div style={{ marginLeft:"auto", fontSize:5.5, fontWeight:900, color:P }}>180 грн/год</div>
            </div>
            {/* Date */}
            <div>
              <div style={{ fontSize:4, color:"#aaa", letterSpacing:".08em", textTransform:"uppercase", marginBottom:4 }}>Дата</div>
              <div style={{ display:"flex", gap:3 }}>
                {["Сб\n24", "Нд\n25", "Пн\n26", "Вт\n27", "Ср\n28"].map((d,i)=>(
                  <div key={i} style={{ flex:1, borderRadius:7, border:`1.5px solid ${i===1?P:"#efefef"}`,
                    background:i===1?`${P}12`:"#fafafa", padding:"3px 1px", textAlign:"center" }}>
                    {d.split("\n").map((line,j)=>(
                      <div key={j} style={{ fontSize:j===0?3.5:5.5, fontWeight:i===1?(j===0?600:900):(j===0?400:600), color:i===1?P:j===0?"#aaa":"#1A1A1F", lineHeight:1.3 }}>{line}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Time */}
            <div>
              <div style={{ fontSize:4, color:"#aaa", letterSpacing:".08em", textTransform:"uppercase", marginBottom:4 }}>Час</div>
              <div style={{ display:"flex", gap:3 }}>
                {["09:00","11:00","14:00","17:00"].map((t,i)=>(
                  <div key={i} style={{ flex:1, borderRadius:7, border:`1.5px solid ${i===1?P:"#efefef"}`,
                    background:i===1?`${P}12`:"#fafafa", padding:"4px 1px", textAlign:"center" }}>
                    <div style={{ fontSize:4.5, fontWeight:i===1?800:500, color:i===1?P:"#555" }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Duration */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 6px", background:"#fafafa", borderRadius:8, border:"1px solid #f0f0f0" }}>
              <div style={{ fontSize:4.5, color:"#555" }}>Тривалість</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:14, height:14, borderRadius:4, border:"1px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"#555" }}>−</div>
                <div style={{ fontSize:6, fontWeight:800, color:"#1A1A1F" }}>3 год</div>
                <div style={{ width:14, height:14, borderRadius:4, background:P, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"#fff" }}>+</div>
              </div>
            </div>
          </div>
          {/* Total + confirm */}
          <div style={{ padding:"5px 8px 8px", borderTop:"1px solid #f0f0f0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
              <div style={{ fontSize:4.5, color:"#aaa" }}>Разом · 3 год</div>
              <div style={{ fontSize:9, fontWeight:900, color:"#1A1A1F" }}>540 грн</div>
            </div>
            <div style={{ background:P, borderRadius:9, padding:"7px 0", textAlign:"center" }}>
              <div style={{ fontSize:6, fontWeight:900, color:"#fff", letterSpacing:".05em" }}>ПІДТВЕРДИТИ БРОНЮВАННЯ</div>
            </div>
          </div>
        </div>

      </div>
      {/* Dots */}
      <div style={{ position:"absolute", bottom:-20, left:0, right:0, display:"flex", justifyContent:"center", gap:5 }}>
        {[0,1,2].map(i=>(
          <div key={i} onClick={()=>setActive(i)} style={{
            width: active===i?14:5, height:5, borderRadius:99,
            background: active===i?P:"rgba(0,0,0,0.18)",
            transition:"all 0.3s ease", cursor:"pointer"
          }}/>
        ))}
      </div>
    </div>
  );
}
