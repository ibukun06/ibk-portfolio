import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════ DATA — edit here to update your portfolio ═══════ */

const P = {
  name:"Ibukunoluwa J. Oluwafemi", nick:"IBK",
  titles:["Mechanical Engineering Student","AI Workflow Optimizer","AI Tools & Automation Specialist"],
  tagline:"I weld steel frames, use AI to automate the paperwork, and ship production tools — without writing a single line of code from scratch.",
  summary:"Mechanical Engineering student at Redeemer's University (CGPA 4.37/5.00) with hands-on fabrication experience from SMAW welding, lathe, milling, and machine operations. Parallel track in AI-driven productivity: used AI tools to design, build, and ship three live web applications for the RUNSA Legislative Summit 2026 serving 611 registered delegates — zero prior software training. SAT 1360/1600 (90th percentile, Math 710). Seeking engineering SIWES/internships where I can work on the floor or in the field, and AI workflow roles where I help organizations identify and implement AI tools to cut costs, reduce bottlenecks, and increase efficiency.",
  location:"Lagos, Nigeria", email:"oluwafemiibk@gmail.com", phone:"+234 708 057 2415",
  whatsapp:"https://wa.me/2347080572415", linkedin:"https://linkedin.com/in/ibk-co",
  github:"https://github.com/ibukun06",
  resume:"https://ibukun06.github.io/Ibukunoluwa-portfolio/Ibukunoluwa_Oluwafemi_Resume.docx",
  // ── PROFILE PHOTO ──────────────────────────────────────────────────
  // Replace null with your image URL, e.g.:
  //   photo: "https://i.imgur.com/yourphoto.jpg"   (hosted)
  //   photo: "/photo.jpg"                           (file in /public/)
  photo: null,
  // ───────────────────────────────────────────────────────────────────
  stats:[
    {value:"4.37",label:"CGPA / 5.00",sub:"Dean's List",detail:"B.Eng. Mechanical Engineering · Redeemer's University · Oct 2023 – Present"},
    {value:"1360",label:"SAT Score",sub:"90th Percentile",detail:"Math: 710 (92nd %ile) · R&W: 650 (85th %ile) · College Board, March 2023"},
    {value:"611",label:"Delegates",sub:"RUNSA 2026",detail:"611 delegates processed across three solo-built production apps. Zero data loss."},
    {value:"3",label:"Live Apps",sub:"Built Solo",detail:"Registration Portal, Live Agenda, ID Card Generator — shipped in under 10 weeks as sole developer."},
  ],
  seeking:["⚙️ SIWES / Engineering Internship","🤖 AI Workflow & Efficiency Role","🌍 Nigeria & Abroad","💡 Factory Floor or AI Team — Both Welcome"],
};

const SKILLS=[
  {id:"ai",icon:"🤖",cat:"AI & Productivity",title:"Prompt Engineering & AI Tools",level:"Applied",
    modal:{tag:"AI & Productivity",title:"Prompt Engineering & AI Tools",subtitle:"Applied · Core Differentiator",
      desc:"Leveraging AI to help organizations optimize workflows, automate tasks, and increase efficiency. Targeted at companies integrating AI into operations — from streamlining documentation to cutting manual process time by 50–90%.",
      pts:["Prompt engineering for structured outputs, data extraction, and automation","AI-assisted code generation, debugging, and review workflows","Using LLMs to optimize documentation, reporting, and internal comms","Workflow analysis: identifying bottlenecks where AI can produce step-change gains","Target: AI user/integration specialist at companies adopting AI systems"]}},
  {id:"python",icon:"🐍",cat:"Engineering Software",title:"Python & NumPy",level:"Intermediate",
    modal:{tag:"Engineering Software",title:"Python & NumPy",subtitle:"Intermediate · Engineering-Focused",
      desc:"Engineering-first Python: solving real structural problems, not just software tasks.",
      pts:["NumPy for numerical computation and matrix operations","Beam Deflection Automator — reduced lab time by 90%+, used by coursemates","Automation scripting for repetitive engineering calculations","Growing into: Pandas, Matplotlib, SciPy"]}},
  {id:"react",icon:"⚛️",cat:"Web & Software",title:"React & Firebase (AI-Assisted)",level:"Project Experience",
    modal:{tag:"Web & Software",title:"React & Firebase — AI-Assisted Builds",subtitle:"Applied via AI tools — not traditional software training",
      desc:"Used AI tools to build and ship three production web apps for the RUNSA Summit 2026. Every line of code was produced and iterated with AI assistance — demonstrating what's possible with prompt engineering and no formal coding background.",
      pts:["React.js apps: built by prompting AI, iterating, debugging with AI feedback","Firebase Firestore: database setup, real-time dashboards — configured via AI guidance","Firebase RTDB: cross-device live sync implemented through AI-directed workflow","Vercel: deployed successfully using AI-guided deployment steps","Note: this is AI-assisted project experience, not professional software development"]}},
  {id:"welding",icon:"🔧",cat:"Manufacturing",title:"SMAW Welding",level:"Hands-On",
    modal:{tag:"Manufacturing",title:"SMAW Welding",subtitle:"Shielded Metal Arc Welding · Mild Steel",
      desc:"Hands-on SMAW welding from Student Work Experience Program. Applied in Maize Sheller chassis fabrication.",
      pts:["Joint preparation and electrode selection","Mild steel angle iron structural welding","Post-weld cleanup and quality inspection","Applied in Maize Sheller chassis — 50 kg/hr throughput"]}},
  {id:"machining",icon:"⚙️",cat:"Manufacturing",title:"Lathe & Milling",level:"SWEP Trained",
    modal:{tag:"Manufacturing",title:"Lathe & Milling",subtitle:"Machine Operations · SWEP",
      pts:["Lathe: turning, facing, threading on mild steel","Milling: surface finishing, shoulder milling","Drilling: precision drilling and reaming","Angle grinding: deburring and surface prep"]}},
  {id:"autocad",icon:"📐",cat:"Engineering Software",title:"AutoCAD 2D/3D",level:"Coursework",
    modal:{tag:"Engineering Software",title:"AutoCAD 2D/3D",subtitle:"2D Drafting & 3D Modelling",
      pts:["Orthographic projections and dimensioned drawings","3D model creation and visualization","Component design for manufacturing","Applied in coursework and engineering modules"]}},
  {id:"fabrication",icon:"🏗️",cat:"Manufacturing",title:"Metal Fabrication",level:"Hands-On",
    modal:{tag:"Manufacturing",title:"Metal Fabrication & Assembly",subtitle:"End-to-End Prototype",
      pts:["Mild steel angle iron frame construction","Drive system alignment and motor integration","Component assembly and fit-up","Led chassis team: Maize Sheller Machine (50 kg/hr)"]}},
  {id:"leadership",icon:"👔",cat:"Leadership",title:"Leadership & Coordination",level:"Proven",
    modal:{tag:"Leadership",title:"Leadership & Coordination",subtitle:"Student Govt · Team Leadership",
      pts:["RUNSA Chief Whip: parliamentary order, supervises all In-House Committees","RUNSA Summit 2026: sole developer of full event digital infrastructure for 611 delegates","SWEP Fabrication Lead: led Maize Sheller chassis team to functional prototype","Cowrywise Ambassador: grew campus registrations 15%"]}},
  {id:"networking",icon:"🌐",cat:"Tech",title:"Ethernet Cabling",level:"Practiced",
    modal:{tag:"Tech",title:"Ethernet Cabling (RJ45 Cat6)",
      pts:["RJ45 Cat6 crimping and assembly","Straight-through and crossover configurations","Cable testing with network verifiers","Structured cabling fundamentals"]}},
];

const PROJECTS=[
  {id:"runsa",featured:true,icon:"🚀",title:"RUNSA Legislative Summit 2026",period:"Jan – Apr 2026",
    subtitle:"AI-Assisted Build · Production · Solo",link:"https://ibukun06.github.io",
    summary:"Three independent production web apps built solo in under 10 weeks. 611 delegates. Zero data loss.",
    tags:["React.js","Firebase","Firestore","Realtime DB","Vercel","JavaScript"],
    modal:{tag:"⭐ Featured",title:"RUNSA Legislative Summit 2026",
      subtitle:"Jan 2026 – Apr 2026 · AI-Assisted Solo Build · Redeemer's University Student Association",
      desc:"Used AI tools to design, build, and deploy three independent production web applications in under 10 weeks — with no formal software training. A demonstration of what AI-augmented productivity can achieve.",
      pts:["Delegate Registration & Admin Portal — Firestore backend, real-time dashboard, accreditation tools, bulk CSV export. 611 delegates. Zero data loss.",
        "Live Order of Events (Agenda.jsx) — Firebase Realtime DB for cross-device sync; admin auth mode; Vercel-deployed.",
        "Delegate Card Generator — Automated branded ID card generation and print layout for all registered institutions."],
      tags:["React.js","Firebase Firestore","Firebase RTDB","Vercel","JavaScript","CSS"],
      links:[{label:"Live Site",url:"https://ibukun06.github.io"}]}},
  {id:"beam",featured:false,icon:"📊",title:"Beam Deflection Automator",period:"2024",
    subtitle:"Python · Engineering Tool",
    summary:"Automates the Double Integration Method for structural beam analysis. Cuts lab calculation time by 90%+.",
    tags:["Python","NumPy","Engineering"],
    modal:{tag:"Engineering Tool",title:"Beam Deflection Automator",subtitle:"2024 · Personal Project · Python + NumPy",
      desc:"Built a Python script that automates the Double Integration Method for structural beam analysis — eliminating propagation errors and cutting lab report time.",
      pts:["Reduced lab report calculation time by over 90%","Eliminated propagation errors common in manual computation","Used by coursemates for Strength of Materials coursework"],
      code:`import numpy as np\n\ndef double_integration(load, length, E, I):\n    M     = (load * length) / 2\n    theta = M / (E * I)\n    delta = (load * length**3) / (48 * E * I)\n    return {"slope": theta, "deflection": delta}`}},
  {id:"maize",featured:false,icon:"⚙️",title:"Maize Sheller Machine",period:"SWEP 2024",
    subtitle:"Fabrication · Lead Role",
    summary:"Led chassis fabrication. SMAW welded mild steel angle iron frame, aligned 2HP motor. Throughput: 50 kg/hr.",
    tags:["SMAW Welding","Fabrication","Mechanical Design"],
    modal:{tag:"SWEP 2024",title:"Maize Sheller Machine",subtitle:"Lead Fabricator · Student Work Experience Program",
      specs:[{l:"Role",v:"Lead Fabricator — Chassis Team"},{l:"Chassis",v:"Mild steel angle iron (SMAW welded)"},
        {l:"Power",v:"2HP Electric Motor"},{l:"Drive",v:"Pulley & Belt"},{l:"Throughput",v:"50 kg/hr"},{l:"Outcome",v:"Functional prototype delivered"}]}},
  {id:"tunnel",featured:false,icon:"💨",title:"Wind Tunnel Apparatus",period:"SWEP 2024",
    subtitle:"Fluid Mechanics · Fabrication",
    summary:"Low-speed wind tunnel for aerodynamic flow visualization. Contraction cone ratio calculated analytically.",
    tags:["Fluid Mechanics","Fabrication","Bernoulli"],
    modal:{tag:"SWEP 2024",title:"Wind Tunnel Apparatus",subtitle:"Builder & Designer · Student Work Experience Program",
      specs:[{l:"Type",v:"Low-speed open-circuit wind tunnel"},{l:"Test Section",v:"Transparent acrylic"},
        {l:"Physics",v:"Bernoulli's Principle demonstration"},{l:"Design",v:"Contraction cone ratio calculated analytically"},
        {l:"Purpose",v:"Aerodynamic flow visualization & testing"}]}},
];

const EXPERIENCE=[
  {id:"cowrywise",icon:"💰",tag:"Fintech",title:"Campus Ambassador",org:"Cowrywise Fintech",
    period:"Dec 2024 – Present",loc:"Redeemer's University, Ede",
    modal:{tag:"Fintech · Active",title:"Campus Ambassador — Cowrywise",subtitle:"Dec 2024 – Present · Redeemer's University, Ede",
      pts:["Lead financial literacy campaigns on personal finance and investment fundamentals","Organised 'Club60' masterclasses on savings, budgeting, and investing","Grew student platform registrations by 15% within the first semester"]}},
  {id:"runsa-gov",icon:"⚖️",tag:"Student Govt",title:"Chief Whip & In-House Committees Supervisor",org:"RUNSA Legislative Council",
    period:"Oct 2024 – Present",loc:"Redeemer's University, Ede",
    modal:{tag:"Student Govt · Active",title:"Chief Whip & In-House Committees Supervisor",subtitle:"RUNSA Legislative Council · Oct 2024 – Present",
      pts:["Enforce parliamentary procedures and maintain legislative order during high-stakes sessions","Supervise all In-House Committees — procedural compliance, reporting, coordinated operations","Central coordination role in organizing the RUNSA Legislative Summit 2026","Additionally served as sole developer of the Summit's full digital infrastructure (611 delegates, 3 live apps)"]}},
  {id:"spe-e",icon:"🛢️",tag:"SPE",title:"Energy & Fossil Fuel Committee Member",org:"SPE — Redeemer's University Chapter",
    period:"2024 – Present",loc:"Ede, Osun State",
    modal:{tag:"SPE · Active",title:"Energy & Fossil Fuel Committee",subtitle:"Society of Petroleum Engineers — RU Chapter · 2024 – Present",
      pts:["Participate in sessions on drilling engineering, reservoir analysis, and energy economics","Engage with industry literature on hydrocarbon extraction and processing","Contribute to discussions on Nigeria's energy sector challenges and opportunities"]}},
  {id:"spe-env",icon:"🌍",tag:"SPE",title:"Environmental & Climate Impact Committee Member",org:"SPE — Redeemer's University Chapter",
    period:"2024 – Present",loc:"Ede, Osun State",
    modal:{tag:"SPE · Active",title:"Environmental & Climate Impact Committee",subtitle:"Society of Petroleum Engineers — RU Chapter · 2024 – Present",
      pts:["Study environmental impact assessment frameworks for oil & gas operations","Engage with climate policy, carbon capture concepts, and ESG standards","Participate in discussions on Nigeria's environmental regulation and the just energy transition"]}},
  {id:"sales",icon:"🛍️",tag:"Business",title:"Sales Representative",org:"Family Business",
    period:"2022 – 2024",loc:"Lagos, Nigeria",
    modal:{tag:"Business",title:"Sales Representative",subtitle:"Family Business · 2022 – 2024 · Lagos, Nigeria",
      pts:["Managed customer relations in a fast-paced retail environment","Handled stock reconciliation, inventory tracking, and daily sales logging","Developed practical negotiation and communication skills"]}},
];

const EDUCATION=[
  {id:"uni",icon:"🎓",title:"B.Eng. Mechanical Engineering",org:"Redeemer's University, Ede",period:"Oct 2023 – Present",badge:"4.37 / 5.00",
    modal:{tag:"Current · Dean's List Candidate",title:"B.Eng. Mechanical Engineering",subtitle:"Redeemer's University, Ede · Osun State, Nigeria",
      desc:"CGPA: 4.37 / 5.00 · Dean's List Candidate",ptsLabel:"Relevant Coursework:",
      pts:["Engineering Thermodynamics","Strength of Materials","Engineering Materials","Workshop Practice","Fluid Mechanics","Engineering Mathematics","Introduction to Python Programming"]}},
  {id:"waec",icon:"📜",title:"WAEC Senior School Certificate",org:"Yabtech Secondary School, Lagos",period:"Sep 2016 – Jul 2022",badge:"3 Distinctions",
    modal:{tag:"WAEC",title:"West African Senior School Certificate",subtitle:"Yaba College of Technology Secondary School · 2016 – 2022",
      desc:"Distinctions in:",pts:["Further Mathematics","Geography","Technical Drawing"]}},
  {id:"sat",icon:"📊",title:"SAT — Scholastic Assessment Test",org:"College Board",period:"Mar 2023",badge:"1360 / 1600",
    modal:{tag:"90th Percentile · Nationwide Grade 12",title:"SAT — 1360 / 1600",subtitle:"College Board · March 2023 · Record: 4088725788",
      desc:"Taken during a deliberate gap year to benchmark academic aptitude before university. Above 90th percentile nationally among Grade 12 test takers.",
      specs:[{l:"Total Score",v:"1360 / 1600 — 90th Percentile"},{l:"Math",v:"710 / 800 — 92nd Percentile"},
        {l:"Reading & Writing",v:"650 / 800 — 85th Percentile"},{l:"Information & Ideas",v:"680–800 performance band"},
        {l:"Advanced Math",v:"680–800 performance band"},{l:"Problem-Solving & Data",v:"680–800 performance band"}]}},
];

// ── CERTIFICATES ─────────────────────────────────────────────────
// To add: duplicate an "earned" block, set status:"earned", fill in fields.
const CERTIFICATES=[
  {id:"prog",status:"earned",icon:"💻",title:"Fundamentals of Programming",issuer:"Programming Hero",year:"2020",
    topics:["Data Structures","Algorithms","Conditionals"],
    modal:{tag:"Earned · 2020",title:"Fundamentals of Programming",subtitle:"Programming Hero · 2020",
      pts:["Data Structures","Algorithms","Loops & Conditionals","Foundational programming concepts and problem-solving"]}},
  {id:"sat-c",status:"earned",icon:"📊",title:"SAT Score Achievement",issuer:"College Board",year:"2023",
    topics:["1360/1600","90th Percentile","Math 710"],
    modal:{tag:"Earned · 2023",title:"SAT — 1360 / 1600",subtitle:"College Board · March 2023",
      pts:["Total: 1360/1600 — 90th Percentile (Grade 12, nationwide)","Math: 710/800 — 92nd Percentile","R&W: 650/800 — 85th Percentile"]}},
  {id:"ph1",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"Portfolio.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in title, issuer, year, topics, and modal details."}},
  {id:"ph2",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"Portfolio.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in title, issuer, year, topics, and modal details."}},
  {id:"ph3",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"Portfolio.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in title, issuer, year, topics, and modal details."}},
  {id:"ph4",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"Portfolio.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in title, issuer, year, topics, and modal details."}},
];

// ── EVENTS ───────────────────────────────────────────────────────
// To add: set status:"past"|"upcoming", add image URL, fill all fields.
const EVENTS=[
  {id:"ev1",status:"placeholder",type:"past",title:"Event Name",org:"Organizing Body",date:"Month Year",
    loc:"City, Country",role:"Your Role",desc:"What happened and what you gained or contributed.",
    image:null, // e.g. "https://i.imgur.com/yourphoto.jpg"
    modal:{tag:"Past Event",title:"Event Name",subtitle:"Month Year · City, Country",
      desc:"What happened and what you gained or contributed.",
      specs:[{l:"Organizer",v:"Organizing Body"},{l:"Role",v:"Your Role"},{l:"Date",v:"Month Year"},{l:"Location",v:"City, Country"}]}},
  {id:"ev2",status:"placeholder",type:"past",title:"Event Name",org:"Organizing Body",date:"Month Year",
    loc:"City, Country",role:"Your Role",desc:"What happened and what you gained or contributed.",
    image:null,
    modal:{tag:"Past Event",title:"Event Name",subtitle:"Month Year · City, Country",
      desc:"What happened and what you gained or contributed.",
      specs:[{l:"Organizer",v:"Organizing Body"},{l:"Role",v:"Your Role"},{l:"Date",v:"Month Year"},{l:"Location",v:"City, Country"}]}},
  {id:"ev3",status:"placeholder",type:"upcoming",title:"Upcoming Event",org:"Organizing Body",date:"Coming Soon",
    loc:"TBD",role:"Attendee / Participant",desc:"Event you are registered for or planning to attend.",
    image:null,
    modal:{tag:"Upcoming",title:"Upcoming Event",subtitle:"Coming Soon",
      desc:"Event you are registered for or planning to attend.",
      specs:[{l:"Status",v:"Registered / Planning"},{l:"Date",v:"TBD"},{l:"Location",v:"TBD"}]}},
  {id:"ev4",status:"placeholder",type:"upcoming",title:"Upcoming Event",org:"Organizing Body",date:"Coming Soon",
    loc:"TBD",role:"Attendee / Participant",desc:"Event you are registered for or planning to attend.",
    image:null,
    modal:{tag:"Upcoming",title:"Upcoming Event",subtitle:"Coming Soon",
      desc:"Event you are registered for or planning to attend.",
      specs:[{l:"Status",v:"Registered / Planning"},{l:"Date",v:"TBD"},{l:"Location",v:"TBD"}]}},
];

const SM={
  skills:{tag:"Technical Arsenal",title:"Skills Overview",subtitle:"Manufacturing · Software · AI & Productivity · Leadership",
    desc:"A dual-track foundation: hands-on mechanical engineering (SMAW welding, lathe, milling, AutoCAD) combined with modern software and AI capabilities (React, Python, Firebase, Prompt Engineering). Built for both the factory floor and the AI team.",
    pts:["Manufacturing: SMAW Welding, Lathe, Milling, Drilling, Metal Fabrication","Engineering Software: AutoCAD 2D/3D, Python (NumPy), Git/GitHub, MS Office","Web & Software: React.js, Firebase, Vercel, JavaScript, HTML/CSS","AI & Productivity: Prompt Engineering, Workflow Automation, LLM Tools","Leadership: Parliamentary Order, Team Coordination, Campus Outreach"]},
  projects:{tag:"Projects",title:"Projects Overview",subtitle:"Production · Engineering · Research",
    desc:"Projects spanning full-stack web development, mechanical fabrication, fluid mechanics, and Python automation — all completed during university.",
    pts:["RUNSA Legislative Summit 2026 — 3 live apps, 611 delegates, 10 weeks, solo build","Beam Deflection Automator — Python, 90%+ calculation time reduction","Maize Sheller Machine — SMAW fabrication, 50 kg/hr prototype","Wind Tunnel Apparatus — Fluid mechanics Bernoulli demonstration rig"]},
  experience:{tag:"Experience",title:"Experience Log",subtitle:"Fintech · Student Government · Engineering Organizations",
    desc:"Leadership and professional experience across fintech outreach, parliamentary governance, petroleum engineering committees, and retail business."},
  education:{tag:"Education",title:"Education",subtitle:"B.Eng. Mechanical Engineering · WAEC · SAT",
    desc:"Redeemer's University B.Eng. Mechanical Engineering (CGPA 4.37/5.00, Dean's List). WAEC distinctions in Further Mathematics, Geography, and Technical Drawing. SAT 1360/1600 — 90th percentile nationally."},
  certificates:{tag:"Certifications",title:"Certificates & Achievements",subtitle:"Earned · In Progress",
    desc:"Current certifications and academic credentials. Additional slots are ready — as new certifications are earned, they replace placeholder cards."},
  events:{tag:"Events",title:"Events — Past & Upcoming",subtitle:"Conferences · Summits · Workshops",
    desc:"Engineering conferences, student summits, workshops, and industry events — past and upcoming. Placeholder cards are replaced as events are attended."},
};

/* ═══════ THEME ═══════ */
const mkT=(d)=>({
  bg:d?"#0f172a":"#f8fafc", bgAlt:d?"#0c1628":"#f1f5f9",
  card:d?"#1e293b":"#ffffff", cardHov:d?"#243044":"#f0f9ff",
  text:d?"#f1f5f9":"#0f172a", muted:d?"#94a3b8":"#64748b",
  accent:"#0d9488", aLight:d?"rgba(13,148,136,0.16)":"rgba(13,148,136,0.09)",
  border:d?"#334155":"#e2e8f0", nav:d?"rgba(15,23,42,0.97)":"rgba(248,250,252,0.97)",
  shadow:d?"0 4px 24px rgba(0,0,0,0.45)":"0 4px 24px rgba(0,0,0,0.07)",
  code:d?"#0a2233":"#f0fdf4", codeText:d?"#5eead4":"#0f766e",
});

/* ═══════ SHARED ═══════ */
const Chip=({label,t})=>(
  <span style={{background:t.aLight,color:t.accent,padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:700,whiteSpace:"nowrap",display:"inline-block"}}>{label}</span>
);

function STitle({title,sub,skey,open,t}){
  return(
    <div style={{marginBottom:44,textAlign:"center"}}>
      <button onClick={()=>open({modal:SM[skey]})} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
        <h2 style={{fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:900,color:t.text,margin:"0 0 8px",letterSpacing:"-0.75px",display:"inline-flex",alignItems:"center",gap:8}}>
          {title}<span style={{color:t.accent,fontSize:"0.6em",opacity:0.7}}>↗</span>
        </h2>
      </button>
      {sub&&<p style={{color:t.muted,fontSize:13,margin:0}}>{sub}</p>}
    </div>
  );
}

/* ═══════ MODAL ═══════ */
function Modal({data,onClose,t}){
  useEffect(()=>{
    const fn=(e)=>e.key==="Escape"&&onClose();
    window.addEventListener("keydown",fn);
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",fn);document.body.style.overflow="";};
  },[onClose]);
  const m=data?.modal; if(!m) return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.68)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:t.card,color:t.text,borderRadius:18,padding:"2rem",maxWidth:580,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 72px rgba(0,0,0,0.35)",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",cursor:"pointer",color:t.muted,fontSize:22,lineHeight:1,padding:"2px 6px"}}>✕</button>
        <div style={{marginBottom:20,paddingRight:36}}>
          {m.tag&&<span style={{background:t.aLight,color:t.accent,padding:"3px 12px",borderRadius:999,fontSize:11,fontWeight:700,display:"inline-block",marginBottom:12}}>{m.tag}</span>}
          <h2 style={{margin:"0 0 5px",fontSize:20,fontWeight:900,color:t.text,letterSpacing:"-0.5px"}}>{m.title}</h2>
          {m.subtitle&&<p style={{margin:0,color:t.muted,fontSize:13,lineHeight:1.5}}>{m.subtitle}</p>}
        </div>
        {m.desc&&<p style={{color:t.muted,fontSize:14,lineHeight:1.8,marginBottom:16}}>{m.desc}</p>}
        {m.ptsLabel&&<p style={{fontWeight:700,fontSize:13,marginBottom:6,color:t.text}}>{m.ptsLabel}</p>}
        {m.pts&&<ul style={{margin:"0 0 16px",paddingLeft:20}}>{m.pts.map((pt,i)=><li key={i} style={{color:t.muted,fontSize:14,lineHeight:1.75,marginBottom:5}}>{pt}</li>)}</ul>}
        {m.specs&&(
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:16}}>
            <tbody>{m.specs.map((s,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${t.border}`}}>
                <td style={{padding:"9px 12px 9px 0",fontWeight:700,fontSize:13,color:t.text,width:165,verticalAlign:"top"}}>{s.l}</td>
                <td style={{padding:"9px 0",fontSize:13,color:t.muted}}>{s.v}</td>
              </tr>))}
            </tbody>
          </table>)}
        {m.code&&<pre style={{background:t.code,border:`1px solid ${t.border}`,borderRadius:10,padding:"1rem",overflowX:"auto",fontSize:12,lineHeight:1.75,color:t.codeText,fontFamily:"'Fira Code','Courier New',monospace",margin:"0 0 16px"}}>{m.code}</pre>}
        {m.tags&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>{m.tags.map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>}
        {m.links&&(
          <div style={{display:"flex",gap:14,flexWrap:"wrap",paddingTop:8,borderTop:`1px solid ${t.border}`}}>
            {m.links.map((l,i)=><a key={i} href={l.url} target="_blank" rel="noreferrer" style={{color:t.accent,fontSize:13,fontWeight:700,textDecoration:"none"}}>{l.label} ↗</a>)}
          </div>)}
      </div>
    </div>
  );
}

/* ═══════ NAV ═══════ */
function Nav({dark,toggle,t,open}){
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [mobile,setMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<820);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>30);
    const onResize=()=>setMobile(window.innerWidth<820);
    window.addEventListener("scroll",onScroll);
    window.addEventListener("resize",onResize);
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);};
  },[]);
  const links=["Skills","Projects","Experience","Education","Certificates","Events"];
  const closeMenu=()=>setMenuOpen(false);
  return(
    <>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:t.nav,backdropFilter:"blur(18px)",borderBottom:`1px solid ${scrolled?t.border:"transparent"}`,transition:"all 0.3s",animation:"slideDown 0.5s ease"}}>
      <div style={{maxWidth:1140,margin:"0 auto",padding:"0 1.5rem",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>open({modal:{tag:"Engineer · AI Specialist",title:"IBK & Co.",subtitle:P.location+" · Open to SIWES & AI Workflow Roles",desc:P.summary,links:[{label:"Download Résumé",url:P.resume},{label:"LinkedIn",url:P.linkedin},{label:"GitHub",url:P.github}]}})} style={{background:"none",border:"none",cursor:"pointer",fontWeight:900,fontSize:18,letterSpacing:"-0.5px",lineHeight:1,transition:"opacity 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <span style={{color:t.accent}}>IBK</span><span style={{color:t.text}}>&Co.</span>
        </button>
        {!mobile?(
          <div style={{display:"flex",alignItems:"center",gap:2}}>
            {links.map(l=>(
              <a key={l} href={`#${l.toLowerCase()}`} style={{color:t.muted,textDecoration:"none",fontSize:12.5,padding:"5px 9px",borderRadius:6,fontWeight:500,transition:"color 0.15s"}}
                onMouseEnter={e=>e.target.style.color=t.accent} onMouseLeave={e=>e.target.style.color=t.muted}>{l}</a>
            ))}
            <button onClick={toggle} title="Toggle theme" style={{background:"none",border:`1px solid ${t.border}`,cursor:"pointer",borderRadius:8,padding:"4px 10px",color:t.text,fontSize:14,marginLeft:6,transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=t.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
              {dark?"☀️":"🌙"}
            </button>
            <a href={P.resume} download style={{marginLeft:6,background:t.accent,color:"#fff",padding:"6px 16px",borderRadius:8,fontSize:12,fontWeight:800,textDecoration:"none",transition:"opacity 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Résumé ↓</a>
          </div>
        ):(
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={toggle} style={{background:"none",border:`1px solid ${t.border}`,cursor:"pointer",borderRadius:8,padding:"4px 9px",color:t.text,fontSize:13}}>{dark?"☀️":"🌙"}</button>
            <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:`1px solid ${t.border}`,cursor:"pointer",borderRadius:8,padding:"6px 10px",color:t.text,fontSize:16,lineHeight:1}}>
              {menuOpen?"✕":"☰"}
            </button>
          </div>
        )}
      </div>
    </nav>
    {mobile&&menuOpen&&(
      <div style={{position:"fixed",top:60,left:0,right:0,zIndex:199,background:t.nav,backdropFilter:"blur(18px)",borderBottom:`1px solid ${t.border}`,padding:"1rem 1.5rem",animation:"slideDown 0.25s ease"}}>
        {links.map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu} style={{display:"block",color:t.text,textDecoration:"none",fontSize:15,padding:"10px 0",borderBottom:`1px solid ${t.border}`,fontWeight:600,transition:"color 0.15s"}}
            onMouseEnter={e=>e.target.style.color=t.accent} onMouseLeave={e=>e.target.style.color=t.text}>{l}</a>
        ))}
        <a href={P.resume} download onClick={closeMenu} style={{display:"block",marginTop:12,background:t.accent,color:"#fff",padding:"10px 0",borderRadius:8,textAlign:"center",fontWeight:800,fontSize:14,textDecoration:"none"}}>Download Résumé</a>
      </div>
    )}
    </>
  );
}

/* ═══════ HERO ═══════ */
function Hero({open,t,dark}){
  const [ti,setTi]=useState(0);
  const [avatarHov,setAvatarHov]=useState(false);
  const [mobile,setMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<600);
  useEffect(()=>{
    const id=setInterval(()=>setTi(i=>(i+1)%P.titles.length),2800);
    const onResize=()=>setMobile(window.innerWidth<600);
    window.addEventListener("resize",onResize);
    return()=>{clearInterval(id);window.removeEventListener("resize",onResize);};
  },[]);
  const heroBg=dark?"linear-gradient(150deg,#0f172a 0%,#0a2744 55%,#0f172a 100%)":"linear-gradient(150deg,#f0fdf4 0%,#ecfeff 55%,#f8fafc 100%)";
  return(
    <section style={{paddingTop:120,paddingBottom:80,background:heroBg,textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"5%",right:"5%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(13,148,136,0.11),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-8%",left:"3%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(8,145,178,0.07),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:680,margin:"0 auto",padding:"0 1.5rem",position:"relative",zIndex:1,animation:"fadeUp 0.8s ease both"}}>
        {/* Open badge with pulsing dot */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:t.aLight,border:`1px solid rgba(13,148,136,0.3)`,borderRadius:999,padding:"5px 18px",marginBottom:28,fontSize:12,fontWeight:700,color:t.accent,animation:"fadeUp 0.6s 0.1s ease both"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block",flexShrink:0,animation:"pulseDot 2s ease infinite"}}/>
          Open to SIWES &amp; AI Workflow Roles
        </div>
        {/* Animated avatar */}
        <div style={{margin:"0 auto 24px",width:140,height:140,position:"relative",animation:"fadeUp 0.7s 0.2s ease both"}}>
          {/* Spinning gradient ring */}
          <div style={{position:"absolute",inset:-4,borderRadius:"50%",background:"conic-gradient(#0d9488,#0891b2,#6366f1,#0d9488)",animation:"spinRing 5s linear infinite",opacity:avatarHov?1:0.7,transition:"opacity 0.3s"}}/>
          {/* Floating avatar inner */}
          <div style={{position:"relative",width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:`3px solid ${t.card}`,animation:"float 4s ease-in-out infinite",transform:avatarHov?"scale(1.06)":"scale(1)",transition:"transform 0.3s ease",boxShadow:avatarHov?`0 0 32px rgba(13,148,136,0.5), 0 12px 40px rgba(0,0,0,0.2)`:`0 4px 20px rgba(0,0,0,0.15)`,cursor:"pointer"}}
            onMouseEnter={()=>setAvatarHov(true)} onMouseLeave={()=>setAvatarHov(false)}>
            {P.photo
              ?<img src={P.photo} alt="IBK" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              :<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#0d9488,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.5rem",fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>IBK</div>}
          </div>
        </div>
        <h1 style={{fontSize:"clamp(1.8rem,5vw,3rem)",fontWeight:900,margin:"0 0 10px",color:t.text,letterSpacing:"-1px",lineHeight:1.1,animation:"fadeUp 0.7s 0.3s ease both"}}>{P.name}</h1>
        <div style={{height:30,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,overflow:"hidden",animation:"fadeUp 0.7s 0.4s ease both"}}>
          <p key={ti} style={{fontSize:14,fontWeight:700,color:t.accent,margin:0,letterSpacing:"0.5px",textTransform:"uppercase",animation:"fadeUp 0.4s ease both"}}>{P.titles[ti]}</p>
        </div>
        <p style={{fontSize:15,color:t.muted,lineHeight:1.8,maxWidth:500,margin:"0 auto 36px",animation:"fadeUp 0.7s 0.5s ease both"}}>{P.tagline}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:52,animation:"fadeUp 0.7s 0.6s ease both"}}>
          <a href={P.resume} download style={{background:t.accent,color:"#fff",padding:"11px 26px",borderRadius:10,fontWeight:800,fontSize:14,textDecoration:"none",boxShadow:"0 4px 20px rgba(13,148,136,0.38)",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(13,148,136,0.48)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.38)";}}>Download Résumé</a>
          <a href={`mailto:${P.email}`} style={{background:"none",color:t.accent,padding:"11px 26px",borderRadius:10,fontWeight:700,fontSize:14,textDecoration:"none",border:`2px solid ${t.accent}`,transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=t.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=t.accent;}}>Get in Touch</a>
          <a href={P.linkedin} target="_blank" rel="noreferrer" style={{background:"none",color:t.text,padding:"11px 26px",borderRadius:10,fontWeight:600,fontSize:14,textDecoration:"none",border:`2px solid ${t.border}`,transition:"all 0.25s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=t.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>LinkedIn</a>
        </div>
        {/* Stats — 2-col on mobile */}
        <div style={{display:"grid",gridTemplateColumns:mobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:12,animation:"fadeUp 0.7s 0.7s ease both"}}>
          {P.stats.map((s,i)=>(
            <button key={s.value} onClick={()=>open({modal:{tag:"Quick Stat",title:s.value,subtitle:s.label,desc:s.detail}})} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px 8px",cursor:"pointer",textAlign:"center",boxShadow:t.shadow,transition:"all 0.25s",animation:`fadeUp 0.5s ${0.7+i*0.08}s ease both`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(13,148,136,0.2)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=t.shadow;}}>
              <div style={{fontSize:"1.65rem",fontWeight:900,color:t.accent,lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:11,color:t.text,fontWeight:700,marginTop:5,lineHeight:1.3}}>{s.label}</div>
              <div style={{fontSize:10,color:t.muted,marginTop:2}}>{s.sub}</div>
            </button>))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ ABOUT ═══════ */
function About({t}){
  return(
    <section style={{padding:"52px 1.5rem",background:t.bg,borderBottom:`1px solid ${t.border}`}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <p style={{fontSize:15,color:t.muted,lineHeight:1.85,marginBottom:28}}>{P.summary}</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {P.seeking.map(item=><span key={item} style={{background:t.aLight,color:t.accent,padding:"6px 16px",borderRadius:999,fontSize:12,fontWeight:700}}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ═══════ SKILLS ═══════ */
function Skills({open,t}){
  const cats=[...new Set(SKILLS.map(s=>s.cat))];
  const [ref,vis]=useReveal();
  return(
    <section id="skills" style={{padding:"80px 1.5rem",background:t.bgAlt}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Technical Arsenal" sub="Click any skill for full details" skey="skills" open={open} t={t}/>
        {cats.map(cat=>(
          <div key={cat} style={{marginBottom:30}}>
            <p style={{fontSize:10.5,fontWeight:800,color:t.accent,textTransform:"uppercase",letterSpacing:2.5,marginBottom:12}}>{cat}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(172px,1fr))",gap:10}}>
              {SKILLS.filter(s=>s.cat===cat).map(skill=>(
                <button key={skill.id} onClick={()=>open(skill)}
                  style={{background:t.card,border:`1px solid ${skill.id==="ai"?t.accent+"55":t.border}`,borderRadius:12,padding:"15px 14px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",flexDirection:"column",gap:5}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.background=t.cardHov;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=t.shadow;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=skill.id==="ai"?t.accent+"55":t.border;e.currentTarget.style.background=t.card;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <span style={{fontSize:22}}>{skill.icon}</span>
                  <span style={{fontWeight:700,fontSize:13,color:t.text,lineHeight:1.3}}>{skill.title}</span>
                  <span style={{fontSize:10.5,color:t.accent,fontWeight:700}}>{skill.level}</span>
                </button>))}
            </div>
          </div>))}
      </div>
    </section>
  );
}

/* ═══════ PROJECTS ═══════ */
function Projects({open,t}){
  const [ref,vis]=useReveal();
  return(
    <section id="projects" style={{padding:"80px 1.5rem",background:t.bg}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Projects" sub="Production · Engineering · Research — click for full details" skey="projects" open={open} t={t}/>
        {PROJECTS.filter(p=>p.featured).map(p=>(
          <button key={p.id} onClick={()=>open(p)} style={{width:"100%",display:"block",background:`linear-gradient(135deg,${t.aLight} 0%,${t.card} 100%)`,border:`1px solid rgba(13,148,136,0.3)`,borderRadius:16,padding:"2rem",cursor:"pointer",textAlign:"left",marginBottom:20,transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(13,148,136,0.2)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:14}}>
              <div>
                <Chip label="⭐ Featured" t={t}/>
                <h3 style={{fontSize:"1.25rem",fontWeight:900,margin:"10px 0 4px",color:t.text,letterSpacing:"-0.5px"}}>{p.icon} {p.title}</h3>
                <p style={{color:t.muted,margin:0,fontSize:13}}>{p.subtitle} · {p.period}</p>
              </div>
              {p.link&&<a href={p.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:t.accent,fontSize:12,fontWeight:700,textDecoration:"none",border:`1px solid ${t.accent}`,padding:"5px 14px",borderRadius:7,flexShrink:0}}>Live ↗</a>}
            </div>
            <p style={{color:t.muted,fontSize:14,lineHeight:1.8,marginBottom:16}}>{p.summary}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{p.tags.map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>
          </button>))}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:14}}>
          {PROJECTS.filter(p=>!p.featured).map(p=>(
            <button key={p.id} onClick={()=>open(p)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"1.5rem",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",flexDirection:"column"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=t.shadow;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <span style={{fontSize:28,marginBottom:12}}>{p.icon}</span>
              <h3 style={{fontWeight:800,fontSize:15,margin:"0 0 4px",color:t.text}}>{p.title}</h3>
              <p style={{fontSize:12,color:t.muted,margin:"0 0 10px"}}>{p.subtitle} · {p.period}</p>
              <p style={{fontSize:13,color:t.muted,lineHeight:1.7,margin:"0 0 14px",flex:1}}>{p.summary}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.tags.slice(0,3).map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>
            </button>))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EXPERIENCE ═══════ */
function Experience({open,t}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="experience" style={{padding:"80px 1.5rem",background:t.bgAlt}}>
      <div ref={ref} style={{maxWidth:680,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Experience" sub="Leadership · Fintech · Engineering Organizations" skey="experience" open={open} t={t}/>
        <div style={{position:"relative",paddingLeft:28}}>
          <div style={{position:"absolute",left:4,top:8,bottom:8,width:2,background:`linear-gradient(to bottom,${t.accent},${t.border})`,borderRadius:2}}/>
          {EXPERIENCE.map(ex=>(
            <button key={ex.id} onClick={()=>open(ex)} onMouseEnter={()=>setHov(ex.id)} onMouseLeave={()=>setHov(null)}
              style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",marginBottom:20,position:"relative"}}>
              <div style={{position:"absolute",left:-24,top:18,width:10,height:10,borderRadius:"50%",background:t.accent,border:`2px solid ${t.bg}`,zIndex:1}}/>
              <div style={{background:t.card,border:`1px solid ${hov===ex.id?t.accent:t.border}`,borderRadius:12,padding:"1rem 1.25rem",transition:"all 0.2s",transform:hov===ex.id?"translateX(5px)":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,marginBottom:6}}>
                  <Chip label={ex.tag} t={t}/>
                  <span style={{fontSize:11,color:t.muted,fontWeight:500}}>{ex.period}</span>
                </div>
                <h3 style={{margin:"0 0 3px",fontSize:14,fontWeight:800,color:t.text}}>{ex.icon} {ex.title}</h3>
                <p style={{margin:0,fontSize:12,color:t.muted}}>{ex.org} · {ex.loc}</p>
              </div>
            </button>))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EDUCATION ═══════ */
function Education({open,t}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="education" style={{padding:"80px 1.5rem",background:t.bg}}>
      <div ref={ref} style={{maxWidth:680,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Education" sub="B.Eng. Mechanical Engineering · SAT 1360/1600" skey="education" open={open} t={t}/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {EDUCATION.map(e=>(
            <button key={e.id} onClick={()=>open(e)} onMouseEnter={()=>setHov(e.id)} onMouseLeave={()=>setHov(null)}
              style={{background:t.card,border:`1px solid ${hov===e.id?t.accent:t.border}`,borderRadius:14,padding:"1.25rem 1.5rem",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:16,transition:"all 0.2s",transform:hov===e.id?"translateX(6px)":"none"}}>
              <span style={{fontSize:30,flexShrink:0}}>{e.icon}</span>
              <div style={{flex:1}}>
                <h3 style={{margin:"0 0 3px",fontSize:15,fontWeight:800,color:t.text}}>{e.title}</h3>
                <p style={{margin:"0 0 3px",fontSize:13,color:t.muted}}>{e.org}</p>
                <p style={{margin:0,fontSize:12,color:t.muted}}>{e.period}</p>
              </div>
              <span style={{background:t.aLight,color:t.accent,padding:"5px 14px",borderRadius:10,fontSize:12,fontWeight:800,flexShrink:0,whiteSpace:"nowrap"}}>{e.badge}</span>
            </button>))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ CERTIFICATES ═══════ */
function Certificates({open,t}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="certificates" style={{padding:"80px 1.5rem",background:t.bgAlt}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Certificates" sub="Earned credentials — placeholder slots ready for new certifications" skey="certificates" open={open} t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          {CERTIFICATES.map(c=>{
            const ph=c.status==="placeholder",isHov=hov===c.id;
            return(
              <button key={c.id} onClick={()=>open(c)} onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
                style={{background:ph?"none":t.card,border:`${ph?"2px dashed":"2px solid"} ${isHov?t.accent:ph?t.border:t.accent+"35"}`,borderRadius:14,padding:"1.4rem",cursor:"pointer",textAlign:"left",transition:"all 0.2s",opacity:ph&&!isHov?0.45:1,transform:isHov?"translateY(-3px)":"none"}}>
                <span style={{fontSize:26,display:"block",marginBottom:10}}>{c.icon}</span>
                <h3 style={{margin:"0 0 4px",fontSize:13,fontWeight:800,color:ph?t.muted:t.text}}>{c.title}</h3>
                <p style={{margin:"0 0 12px",fontSize:12,color:t.muted}}>{c.issuer} · {c.year}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{c.topics.map(tp=><Chip key={tp} label={tp} t={t}/>)}</div>
                {ph&&<p style={{margin:"10px 0 0",fontSize:10,color:t.muted,fontStyle:"italic"}}>Slot — click to see how to add</p>}
              </button>);})}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EVENTS ═══════ */
function Events({open,t}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="events" style={{padding:"80px 1.5rem",background:t.bg}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Events" sub="Conferences · Summits · Workshops — Past & Upcoming" skey="events" open={open} t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
          {EVENTS.map(ev=>{
            const ph=ev.status==="placeholder",upcoming=ev.type==="upcoming",isHov=hov===ev.id;
            return(
              <button key={ev.id} onClick={()=>open(ev)} onMouseEnter={()=>setHov(ev.id)} onMouseLeave={()=>setHov(null)}
                style={{background:t.card,border:`${ph?"2px dashed":"1px solid"} ${isHov?t.accent:t.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",flexDirection:"column",transform:isHov?"translateY(-4px)":"none",boxShadow:isHov?t.shadow:"none"}}>
                <div style={{height:150,background:ev.image?`url(${ev.image}) center/cover no-repeat`:`linear-gradient(135deg,${t.aLight} 0%,${t.border}40 100%)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
                  {!ev.image&&<div style={{textAlign:"center",color:t.muted}}><div style={{fontSize:30}}>{upcoming?"📅":"📸"}</div><div style={{fontSize:11,marginTop:4}}>{upcoming?"Upcoming":"Add Photo"}</div></div>}
                  {upcoming&&<span style={{position:"absolute",top:8,right:8,background:"#16a34a",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:999}}>UPCOMING</span>}
                </div>
                <div style={{padding:"1rem",flex:1}}>
                  <h3 style={{margin:"0 0 4px",fontSize:13,fontWeight:800,color:ph?t.muted:t.text}}>{ev.title}</h3>
                  <p style={{margin:"0 0 4px",fontSize:12,color:t.accent,fontWeight:700}}>{ev.org}</p>
                  <p style={{margin:"0 0 6px",fontSize:11,color:t.muted}}>{ev.date} · {ev.loc}</p>
                  {!ph&&<p style={{margin:0,fontSize:12,color:t.muted,lineHeight:1.5}}>{ev.desc}</p>}
                  {ph&&<p style={{margin:0,fontSize:11,color:t.muted,fontStyle:"italic"}}>Placeholder — add event details</p>}
                </div>
              </button>);})}
        </div>
      </div>
    </section>
  );
}

/* ═══════ SCROLL REVEAL HOOK ═══════ */
function useReveal(){
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    if(!ref.current) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.08});
    obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return [ref,vis];
}

/* ═══════ CONTACT ═══════ */
function Contact({t}){
  return(
    <section style={{padding:"80px 1.5rem",background:t.accent,textAlign:"center"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:900,color:"#fff",margin:"0 0 14px"}}>Let's Work Together</h2>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:15,lineHeight:1.8,marginBottom:36}}>
          Seeking Mechanical Engineering internships (Nigeria &amp; abroad) and AI productivity/integration roles.
          If you need an engineer who can code, automate workflows, and move fast — let's talk.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
          <a href={`mailto:${P.email}`} style={{background:"#fff",color:t.accent,padding:"12px 24px",borderRadius:10,fontWeight:800,fontSize:13,textDecoration:"none"}}>📧 {P.email}</a>
          <a href={P.whatsapp} target="_blank" rel="noreferrer" style={{background:"rgba(255,255,255,0.15)",color:"#fff",padding:"12px 24px",borderRadius:10,fontWeight:700,fontSize:13,textDecoration:"none",border:"2px solid rgba(255,255,255,0.3)"}}>💬 WhatsApp</a>
        </div>
        <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
          {[{label:"LinkedIn",url:P.linkedin},{label:"GitHub",url:P.github},{label:"Download Résumé",url:P.resume}].map(l=>(
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,0.8)",fontSize:13,fontWeight:700,textDecoration:"none"}}>{l.label} ↗</a>))}
        </div>
        <p style={{marginTop:40,color:"rgba(255,255,255,0.4)",fontSize:12}}>© 2026 Ibukunoluwa J. Oluwafemi · IBK &amp; Co. · Built from scratch in React.</p>
      </div>
    </section>
  );
}

/* ═══════ APP ═══════ */
export default function App(){
  const [dark,setDark]=useState(()=>
    typeof window!=="undefined"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
  const [modal,setModal]=useState(null);
  const t=mkT(dark);
  const open=useCallback((data)=>setModal(data),[]);
  const close=useCallback(()=>setModal(null),[]);

  // Inject all CSS animations once on mount
  useEffect(()=>{
    const style=document.createElement("style");
    style.id="ibk-animations";
    style.textContent=`
      *{scroll-behavior:smooth;box-sizing:border-box;}
      @keyframes slideDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
      @keyframes spinRing{to{transform:rotate(360deg)}}
      @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes popIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:none}}
      .reveal{animation:fadeUp 0.65s ease both;}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:transparent;}
      ::-webkit-scrollbar-thumb{background:rgba(13,148,136,0.4);border-radius:99px;}
      ::selection{background:rgba(13,148,136,0.25);color:inherit;}
      a,button{-webkit-tap-highlight-color:transparent;}
    `;
    if(!document.getElementById("ibk-animations")) document.head.appendChild(style);
    return()=>document.getElementById("ibk-animations")?.remove();
  },[]);

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",lineHeight:1.6}}>
      <Nav dark={dark} toggle={()=>setDark(d=>!d)} t={t} open={open}/>
      <main>
        <Hero open={open} t={t} dark={dark}/>
        <About t={t}/>
        <Skills open={open} t={t}/>
        <Projects open={open} t={t}/>
        <Experience open={open} t={t}/>
        <Education open={open} t={t}/>
        <Certificates open={open} t={t}/>
        <Events open={open} t={t}/>
        <Contact t={t}/>
      </main>
      {modal&&<Modal data={modal} onClose={close} t={t}/>}
    </div>
  );
}
