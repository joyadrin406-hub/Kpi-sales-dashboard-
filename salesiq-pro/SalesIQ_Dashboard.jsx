import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  navy:    "#0A0F2C",
  ink:     "#0D1545",
  card:    "#111936",
  border:  "#1E2A5E",
  cyan:    "#00E5FF",
  violet:  "#9B5DE5",
  pink:    "#F72585",
  lime:    "#06FFA5",
  amber:   "#FFB703",
  text:    "#E8EEFF",
  muted:   "#6B7DB8",
};

// ─── Data ─────────────────────────────────────────────────────────────────
const revenueData = [
  { month:"Jan", revenue:1.24, target:1.1, profit:0.38 },
  { month:"Feb", revenue:1.38, target:1.2, profit:0.43 },
  { month:"Mar", revenue:1.19, target:1.3, profit:0.34 },
  { month:"Apr", revenue:1.52, target:1.4, profit:0.51 },
  { month:"May", revenue:1.67, target:1.5, profit:0.59 },
  { month:"Jun", revenue:1.89, target:1.6, profit:0.71 },
  { month:"Jul", revenue:2.01, target:1.7, profit:0.79 },
  { month:"Aug", revenue:1.78, target:1.8, profit:0.62 },
  { month:"Sep", revenue:2.14, target:1.9, profit:0.88 },
  { month:"Oct", revenue:2.34, target:2.0, profit:0.97 },
  { month:"Nov", revenue:2.58, target:2.1, profit:1.08 },
  { month:"Dec", revenue:2.91, target:2.2, profit:1.24 },
];

const forecastData = [
  { month:"Jan'25", actual:2.91, forecast:null, lower:null, upper:null },
  { month:"Feb'25", actual:null, forecast:3.08, lower:2.89, upper:3.27 },
  { month:"Mar'25", actual:null, forecast:3.24, lower:2.98, upper:3.50 },
  { month:"Apr'25", actual:null, forecast:3.41, lower:3.08, upper:3.74 },
  { month:"May'25", actual:null, forecast:3.59, lower:3.18, upper:4.00 },
  { month:"Jun'25", actual:null, forecast:3.78, lower:3.28, upper:4.28 },
];

const categoryData = [
  { name:"Bikes",       value:61, color:C.cyan },
  { name:"Accessories", value:17, color:C.violet },
  { name:"Clothing",    value:14, color:C.pink },
  { name:"Components",  value:8,  color:C.lime },
];

const regionData = [
  { region:"North America", orders:12841, revenue:7.4 },
  { region:"Europe",        orders:9203,  revenue:5.2 },
  { region:"Pacific",       orders:6847,  revenue:3.8 },
  { region:"Asia",          orders:3214,  revenue:1.9 },
];

const radarData = [
  { metric:"Revenue",    score:88 },
  { metric:"Growth",     score:74 },
  { metric:"Retention",  score:91 },
  { metric:"Efficiency", score:67 },
  { metric:"Margin",     score:82 },
  { metric:"Coverage",   score:79 },
];

const topProducts = [
  { name:"Mountain-200 Black 46", orders:4341, revenue:"$1.24M", trend:"+12%" },
  { name:"Sport-100 Helmet Red",  orders:3981, revenue:"$0.96M", trend:"+8%"  },
  { name:"Water Bottle 30oz",     orders:3751, revenue:"$0.42M", trend:"+21%" },
  { name:"AWC Logo Cap",          orders:3562, revenue:"$0.28M", trend:"+5%"  },
  { name:"Long-Sleeve Logo 2XL",  orders:3348, revenue:"$0.31M", trend:"+3%"  },
];

const aiInsights = [
  { icon:"🚀", text:"Revenue is tracking 18% above forecast. Bikes segment is the primary driver—consider expanding inventory now.", tag:"High Impact" },
  { icon:"⚠️", text:"Return rate spiked 2.1pp in Clothing category this month. Investigate sizing consistency issues.", tag:"Alert" },
  { icon:"💡", text:"North America conversion up 7%. Replicate Pacific campaign strategy in European markets.", tag:"Opportunity" },
  { icon:"📈", text:"90-day rolling profit hit all-time high of $3.2M. Q4 trajectory suggests a record year.", tag:"Milestone" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n) => n >= 1 ? `$${n.toFixed(2)}M` : `$${(n*1000).toFixed(0)}K`;
const pct = (n, pos=true) => (
  <span style={{ color: pos ? C.lime : C.pink, fontWeight:700 }}>{pos?"+":""}{n}%</span>
);

// ─── Sub-components ─────────────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, delta, color, delay=0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setVisible(true), delay); return ()=>clearTimeout(t); }, [delay]);
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.card} 0%, ${color}18 100%)`,
      border: `1px solid ${color}40`,
      borderRadius: 20,
      padding: "24px 22px",
      position:"relative", overflow:"hidden",
      transform: visible ? "translateY(0)" : "translateY(24px)",
      opacity: visible ? 1 : 0,
      transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      cursor:"default",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px) scale(1.01)"; e.currentTarget.style.boxShadow=`0 12px 40px ${color}30`; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="none"; }}
    >
      {/* glow blob */}
      <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:color, opacity:0.08, filter:"blur(20px)" }} />
      <div style={{ fontSize:28, marginBottom:10 }}>{icon}</div>
      <div style={{ color:C.muted, fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>{label}</div>
      <div style={{ color:C.text, fontSize:30, fontWeight:800, fontFamily:"'Space Grotesk', sans-serif", lineHeight:1 }}>{value}</div>
      {sub && <div style={{ color:C.muted, fontSize:13, marginTop:6 }}>{sub}</div>}
      {delta && <div style={{ marginTop:10, fontSize:13 }}>{pct(delta)} vs last month</div>}
    </div>
  );
}

function SectionTitle({ children, accent=C.cyan }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
      <div style={{ width:4, height:20, background:`linear-gradient(to bottom, ${accent}, ${C.violet})`, borderRadius:99 }} />
      <h2 style={{ margin:0, color:C.text, fontSize:16, fontWeight:700, letterSpacing:"0.05em" }}>{children}</h2>
    </div>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{
      background:C.card, border:`1px solid ${C.border}`,
      borderRadius:20, padding:24,
      backdropFilter:"blur(10px)",
      ...style
    }}>{children}</div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.ink, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 16px" }}>
      <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color||C.text, fontSize:13, fontWeight:600 }}>
          {p.name}: {typeof p.value==="number" ? (p.value>10?p.value:`$${p.value}M`) : p.value}
        </div>
      ))}
    </div>
  );
}

function AIInsightsPanel() {
  const [expanded, setExpanded] = useState(null);
  return (
    <Card>
      <SectionTitle accent={C.violet}>🤖 AI Intelligence Feed</SectionTitle>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {aiInsights.map((ins, i) => (
          <div key={i}
            onClick={() => setExpanded(expanded===i ? null : i)}
            style={{
              background: `linear-gradient(135deg, ${C.ink} 0%, ${C.violet}10 100%)`,
              border: `1px solid ${expanded===i ? C.violet : C.border}`,
              borderRadius:14, padding:"14px 16px",
              cursor:"pointer",
              transition:"all 0.3s ease",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ fontSize:20 }}>{ins.icon}</span>
                <span style={{ color:C.text, fontSize:13, fontWeight:600 }}>{ins.text.slice(0,55)}…</span>
              </div>
              <span style={{
                background: ins.tag==="Alert" ? `${C.pink}20` : ins.tag==="Opportunity" ? `${C.lime}20` : `${C.cyan}20`,
                color: ins.tag==="Alert" ? C.pink : ins.tag==="Opportunity" ? C.lime : C.cyan,
                borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:700, whiteSpace:"nowrap", marginLeft:8
              }}>{ins.tag}</span>
            </div>
            {expanded===i && (
              <div style={{ marginTop:12, color:C.muted, fontSize:13, lineHeight:1.6, borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
                {ins.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ForecastPanel() {
  return (
    <Card>
      <SectionTitle accent={C.lime}>📡 AI Revenue Forecast — H1 2025</SectionTitle>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={forecastData}>
          <defs>
            <linearGradient id="fcGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.lime} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={C.lime} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="month" tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>v?`$${v}M`:""} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="upper" stroke="none" fill={C.lime} fillOpacity={0.08} name="Upper Bound" />
          <Area type="monotone" dataKey="lower" stroke="none" fill={C.navy} fillOpacity={1} name="Lower Bound" />
          <Area type="monotone" dataKey="forecast" stroke={C.lime} strokeWidth={2.5} fill="url(#fcGrad)" strokeDasharray="6 3" name="Forecast" dot={false} />
          <Line type="monotone" dataKey="actual" stroke={C.cyan} strokeWidth={3} dot={{ fill:C.cyan, r:5 }} name="Actual" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display:"flex", gap:20, marginTop:12 }}>
        {[{c:C.cyan,l:"Actual"},{c:C.lime,l:"Forecast"},{c:`${C.lime}40`,l:"Confidence Band"}].map(({c,l})=>(
          <div key={l} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:24, height:3, background:c, borderRadius:99 }} />
            <span style={{ color:C.muted, fontSize:11 }}>{l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function SalesIQDashboard() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("overview");
  const [yearFilter, setYearFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pulseKPIs, setPulseKPIs] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulseKPIs(p => !p), 4000);
    return () => clearInterval(t);
  }, []);

  const nav = [
    { id:"overview", icon:"⚡", label:"Overview" },
    { id:"revenue",  icon:"💰", label:"Revenue Analytics" },
    { id:"ai",       icon:"🤖", label:"AI Insights" },
    { id:"geo",      icon:"🌍", label:"Geo Map" },
    { id:"products", icon:"📦", label:"Products" },
    { id:"customers",icon:"👥", label:"Customers" },
  ];

  return (
    <div style={{
      minHeight:"100vh",
      background: dark
        ? `radial-gradient(ellipse at 20% 20%, ${C.violet}22 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${C.cyan}18 0%, transparent 50%), ${C.navy}`
        : "#F0F4FF",
      fontFamily:"'DM Sans', 'Segoe UI', sans-serif",
      color: dark ? C.text : C.navy,
      display:"flex",
      overflow:"hidden",
    }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarOpen ? 240 : 68,
        background: dark ? `${C.ink}EE` : "#fff",
        borderRight: `1px solid ${C.border}`,
        backdropFilter:"blur(20px)",
        transition:"width 0.35s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", flexDirection:"column",
        overflow:"hidden", flexShrink:0,
        zIndex:10,
      }}>
        {/* Logo */}
        <div style={{ padding:"28px 18px 20px", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${C.border}` }}>
          <div style={{
            width:36, height:36, borderRadius:12, flexShrink:0,
            background:`linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, fontWeight:900, color:"#000"
          }}>S</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:C.text, lineHeight:1.1 }}>SalesIQ</div>
              <div style={{ color:C.muted, fontSize:11 }}>by Adrin Analytics</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"16px 10px" }}>
          {nav.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"12px 12px", borderRadius:12, border:"none", cursor:"pointer",
              marginBottom:4, textAlign:"left",
              background: activeNav===item.id ? `linear-gradient(90deg, ${C.cyan}30, ${C.violet}20)` : "transparent",
              borderLeft: activeNav===item.id ? `3px solid ${C.cyan}` : "3px solid transparent",
              color: activeNav===item.id ? C.cyan : C.muted,
              fontWeight: activeNav===item.id ? 700 : 500,
              fontSize:14, transition:"all 0.2s",
            }}>
              <span style={{ fontSize:17, flexShrink:0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ whiteSpace:"nowrap", overflow:"hidden" }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse btn */}
        <div style={{ padding:"16px 10px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`,
            borderRadius:10, background:"transparent", color:C.muted, cursor:"pointer", fontSize:14,
            display:"flex", alignItems:"center", justifyContent: sidebarOpen?"space-between":"center", gap:8
          }}>
            {sidebarOpen && <span>Collapse</span>}
            <span>{sidebarOpen ? "◀" : "▶"}</span>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div style={{ flex:1, overflow:"auto", padding:"28px 28px" }}>

        {/* ── TOP BAR */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:30, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <h1 style={{ margin:0, fontSize:26, fontWeight:900, fontFamily:"'Space Grotesk',sans-serif",
                background:`linear-gradient(90deg, ${C.cyan}, ${C.violet})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                SalesIQ Pro ⚡
              </h1>
              <span style={{ background:`${C.lime}20`, color:C.lime, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>LIVE</span>
            </div>
            <div style={{ color:C.muted, fontSize:13 }}>AI-Powered Sales Intelligence Dashboard · Adrin Analytics · FY 2024</div>
          </div>

          {/* Controls */}
          <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            {/* Year filter */}
            <select value={yearFilter} onChange={e=>setYearFilter(e.target.value)} style={{
              background:C.card, border:`1px solid ${C.border}`, color:C.text,
              borderRadius:10, padding:"8px 14px", fontSize:13, cursor:"pointer",
            }}>
              {["All","2020","2021","2022","2024"].map(y=><option key={y}>{y}</option>)}
            </select>
            {/* Region filter */}
            <select value={regionFilter} onChange={e=>setRegionFilter(e.target.value)} style={{
              background:C.card, border:`1px solid ${C.border}`, color:C.text,
              borderRadius:10, padding:"8px 14px", fontSize:13, cursor:"pointer",
            }}>
              {["All","North America","Europe","Pacific","Asia"].map(r=><option key={r}>{r}</option>)}
            </select>

            {/* Export */}
            <button style={{
              background:`linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
              border:"none", borderRadius:10, padding:"9px 20px",
              color:"#000", fontWeight:700, fontSize:13, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
              boxShadow:`0 0 20px ${C.cyan}40`,
            }}>📤 Export Report</button>

            {/* Dark mode */}
            <button onClick={()=>setDark(!dark)} style={{
              background: dark ? C.card : "#E2E8F0",
              border:`1px solid ${C.border}`, borderRadius:10,
              padding:"9px 16px", cursor:"pointer", color:C.text, fontSize:13, fontWeight:600,
            }}>{dark ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>

        {/* ── KPI CARDS ─────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:18, marginBottom:28 }}>
          <KPICard icon="💸" label="Total Revenue"    value="$24.9M"   sub="FY 2024"           delta={18}  color={C.cyan}   delay={0}   />
          <KPICard icon="📈" label="Total Profit"     value="$10.5M"   sub="42.2% margin"      delta={12}  color={C.lime}   delay={80}  />
          <KPICard icon="🛒" label="Total Orders"     value="84,748"   sub="Across all regions" delta={9}  color={C.violet} delay={160} />
          <KPICard icon="👤" label="Unique Customers" value="18,149"   sub="Active accounts"    delta={14} color={C.pink}   delay={240} />
          <KPICard icon="↩️" label="Return Rate"      value="2.17%"    sub="Benchmark: 2.5%"   delta={-3} color={C.amber}  delay={320} />
          <KPICard icon="💡" label="Rev / Customer"   value="$1,372"   sub="ARPC FY 2024"       delta={5}  color={C.cyan}   delay={400} />
        </div>

        {/* ── ROW 1 ──────────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
          {/* Revenue + Profit trend */}
          <Card>
            <SectionTitle>Revenue vs Target vs Profit — Monthly</SectionTitle>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  {[[C.cyan,"revGrad"],[C.lime,"profGrad"]].map(([c,id])=>(
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={c} stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={c} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="month" tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke={C.cyan}   strokeWidth={2.5} fill="url(#revGrad)"  name="Revenue" />
                <Area type="monotone" dataKey="profit"  stroke={C.lime}   strokeWidth={2}   fill="url(#profGrad)" name="Profit" />
                <Line type="monotone" dataKey="target"  stroke={C.pink}   strokeWidth={1.5} strokeDasharray="5 3" dot={false} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Category donut */}
          <Card>
            <SectionTitle>Revenue by Category</SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>
                  {categoryData.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v)=>`${v}%`} contentStyle={{ background:C.ink, border:`1px solid ${C.border}`, borderRadius:10 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:4 }}>
              {categoryData.map(d => (
                <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:d.color }} />
                    <span style={{ color:C.muted, fontSize:12 }}>{d.name}</span>
                  </div>
                  <span style={{ color:C.text, fontWeight:700, fontSize:12 }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── ROW 2 ──────────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          <ForecastPanel />
          <AIInsightsPanel />
        </div>

        {/* ── ROW 3 ──────────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          {/* Radar */}
          <Card>
            <SectionTitle accent={C.violet}>Performance Radar</SectionTitle>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="metric" tick={{ fill:C.muted, fontSize:11 }} />
                <Radar dataKey="score" stroke={C.violet} fill={C.violet} fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Regional bar */}
          <Card>
            <SectionTitle accent={C.amber}>Orders by Region</SectionTitle>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                <XAxis type="number" tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="region" tick={{ fill:C.muted, fontSize:11 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" radius={[0,6,6,0]} name="Orders">
                  {regionData.map((_, i) => (
                    <Cell key={i} fill={[C.cyan, C.violet, C.pink, C.lime][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* ── TOP PRODUCTS TABLE ────────────────────────────────────── */}
        <Card style={{ marginBottom:20 }}>
          <SectionTitle>🏆 Top 5 Products by Revenue</SectionTitle>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 6px" }}>
              <thead>
                <tr>
                  {["#","Product Name","Orders","Revenue","MoM Trend"].map(h=>(
                    <th key={h} style={{ textAlign:"left", color:C.muted, fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"8px 14px", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} style={{ cursor:"default" }}
                    onMouseEnter={e => { [...e.currentTarget.children].forEach(td => { td.style.background=`${C.cyan}10`; }); }}
                    onMouseLeave={e => { [...e.currentTarget.children].forEach(td => { td.style.background="transparent"; }); }}
                  >
                    <td style={{ padding:"12px 14px", borderRadius:"10px 0 0 10px", color:C.muted, fontWeight:700 }}>{i+1}</td>
                    <td style={{ padding:"12px 14px", color:C.text, fontWeight:600 }}>{p.name}</td>
                    <td style={{ padding:"12px 14px", color:C.muted }}>{p.orders.toLocaleString()}</td>
                    <td style={{ padding:"12px 14px", color:C.cyan, fontWeight:700 }}>{p.revenue}</td>
                    <td style={{ padding:"12px 14px", borderRadius:"0 10px 10px 0" }}>
                      <span style={{ background:`${C.lime}20`, color:C.lime, borderRadius:8, padding:"4px 10px", fontSize:12, fontWeight:700 }}>{p.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <div style={{
          textAlign:"center", color:C.muted, fontSize:12, padding:"20px 0",
          borderTop:`1px solid ${C.border}`,
        }}>
          <span style={{ background:`linear-gradient(90deg,${C.cyan},${C.violet})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:700 }}>
            SalesIQ Pro
          </span>
          {" "}· AI-Powered Sales Intelligence · © 2025 Adrin Analytics · Built with ❤️ for Data-Driven Teams
        </div>
      </div>

      {/* ── FLOATING PULSE ─────────────────────────────────────────── */}
      <div style={{
        position:"fixed", bottom:24, right:24,
        background:`linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
        borderRadius:99, padding:"10px 20px",
        color:"#000", fontWeight:800, fontSize:13,
        boxShadow:`0 0 ${pulseKPIs?"30px":"10px"} ${C.cyan}60`,
        transition:"box-shadow 2s ease",
        cursor:"pointer", zIndex:100,
        display:"flex", alignItems:"center", gap:8,
      }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background:"#000", display:"block", animation:"ping 1.5s infinite" }} />
        Real-time · Updated now
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius:99px; }
        select option { background: ${C.ink}; }
        @keyframes ping {
          0%,100% { transform:scale(1); opacity:1; }
          50% { transform:scale(1.5); opacity:0.5; }
        }
      `}</style>
    </div>
  );
}
