import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════ DATA -- edit here to update your portfolio ═══════ */

const P = {
  name:"Ibukunoluwa J. Oluwafemi", nick:"IBK",
  titles:["Mechanical Engineering Student","Fabrication & Workshop Trained","AI Workflow Optimizer"],
  tagline:"I weld steel frames, design in AutoCAD, and use AI to build production tools -- a mechanical engineer who ships at the speed of software.",
  summary:"Mechanical Engineering student at Redeemer's University (CGPA 4.32/5.00) with hands-on fabrication experience: SMAW welding, lathe, milling, drilling, and machine operations through SWEP. Used AI-assisted development to design and ship three live web applications for the RUNSA Legislative Summit 2026 -- serving 611 registered delegates with zero data loss. SAT 1360/1600 (90th percentile, Math 710). Seeking SIWES/engineering internships in manufacturing, production, or mechanical systems -- and AI workflow roles where I help organizations identify and implement tools that cut costs and increase efficiency.",
  location:"Lagos, Nigeria",
  emailAcademic:"oluwafemi14634@run.edu.ng",
  emailPersonal:"oluwafemiibk@gmail.com",
  email:"oluwafemiibk@gmail.com",
  phone:"+234 708 057 2415",
  whatsapp:"https://wa.me/2347080572415",
  linkedin:"https://www.linkedin.com/in/ibk-co",
  github:"https://github.com/ibukun06",
  resume:"/Resumé.pdf",
  photo: "/profile.jpg",
  stats:[
    {value:"4.32",label:"CGPA / 5.00",detail:"B.Eng. Mechanical Engineering · Redeemer's University · Oct 2023 – Present"},
    {value:"1360",label:"SAT Score",sub:"90th Percentile",detail:"Math: 710 (92nd %ile) · R&W: 650 (85th %ile) · College Board, March 2023"},
    {value:"611",label:"Delegates",sub:"RUNSA 2026",detail:"611 delegates processed across three solo-built production apps. Zero data loss."},
    {value:"3",label:"Live Apps",sub:"Built Solo",detail:"Registration Portal, Live Agenda, ID Card Generator -- shipped in under 10 weeks as sole developer."},
  ],
  seeking:["⚙️ SIWES / Engineering Internship","🔧 Manufacturing & Fabrication","🤖 AI Workflow Role","🌍 Nigeria & Abroad"],
};

const SKILLS=[
  {id:"welding",icon:"🔧",cat:"Manufacturing & Fabrication",title:"SMAW Welding",level:"Hands-On",
    modal:{tag:"Manufacturing",title:"SMAW Welding",subtitle:"Shielded Metal Arc Welding · Mild Steel",
      desc:"Hands-on SMAW welding from Student Work Experience Program. Applied in Maize Sheller chassis fabrication.",
      pts:["Joint preparation, electrode selection, and current setting","Mild steel angle iron structural welding","Post-weld cleanup, slag removal, and quality inspection","Applied in Maize Sheller chassis — 50 kg/hr throughput"]}},
  {id:"machining",icon:"⚙️",cat:"Manufacturing & Fabrication",title:"Lathe, Milling & Drilling",level:"SWEP Trained",
    modal:{tag:"Manufacturing",title:"Lathe, Milling & Drilling",subtitle:"Machine Operations · SWEP",
      pts:["Lathe: turning, facing, threading on mild steel workpieces","Milling: surface finishing, shoulder milling, keyway cutting","Drilling: precision drilling, reaming, countersinking","Angle grinding: deburring, edge preparation, surface finishing"]}},
  {id:"fabrication",icon:"🏗️",cat:"Manufacturing & Fabrication",title:"Metal Fabrication & Assembly",level:"Hands-On",
    modal:{tag:"Manufacturing",title:"Metal Fabrication & Assembly",subtitle:"End-to-End Prototype Build",
      pts:["Mild steel angle iron frame construction and alignment","Drive system alignment and power transmission integration","Component assembly, fit-up, and structural integrity checks","Contributed to Maize Sheller Machine chassis (50 kg/hr throughput)"]}},
  {id:"autocad",icon:"📐",cat:"Engineering Software",title:"AutoCAD 2D/3D",level:"Coursework",
    modal:{tag:"Engineering Software",title:"AutoCAD 2D/3D",subtitle:"2D Drafting & 3D Modelling",
      pts:["Orthographic projections and dimensioned technical drawings","3D model creation and visualization","Component design for manufacturing applications","Applied in coursework and engineering design modules"]}},
  {id:"python",icon:"🐍",cat:"Engineering Software",title:"Python & NumPy",level:"Intermediate",
    modal:{tag:"Engineering Software",title:"Python & NumPy",subtitle:"Intermediate · Engineering-Focused",
      desc:"Engineering-first Python: solving real structural problems, not just software tasks.",
      pts:["NumPy for numerical computation and matrix operations","Beam Deflection Automator — reduced lab calculation time by 90%+","Automation scripting for repetitive engineering calculations","Growing into: Pandas, Matplotlib, SciPy for engineering data analysis"]}},
  {id:"ai",icon:"🤖",cat:"AI & Productivity",title:"Prompt Engineering & AI Tools",level:"Applied",
    modal:{tag:"AI & Productivity",title:"Prompt Engineering & AI Tools",subtitle:"Applied · Cross-functional Differentiator",
      desc:"Using AI to optimize workflows, automate tasks, and build production tools — positioning AI as a force multiplier on top of engineering fundamentals.",
      pts:["Prompt engineering for structured outputs, data extraction, and automation","AI-assisted code generation: built 3 production apps with no prior software training","Workflow analysis: identifying bottlenecks where AI produces step-change efficiency gains","Using LLMs to optimize documentation, reporting, and internal communications"]}},
  {id:"react",icon:"⚛️",cat:"Web Development",title:"React & Firebase (AI-Assisted)",level:"Project Experience",
    modal:{tag:"Web Development",title:"React & Firebase — AI-Assisted Builds",subtitle:"Applied via AI tools — production-grade output",
      desc:"Used AI tools to build and ship three production web apps for the RUNSA Summit 2026. Every component was produced and iterated through AI-guided development — demonstrating what is possible with prompt engineering and zero formal coding background.",
      pts:["React.js apps: components, state management, and UI built via AI iteration","Firebase Firestore: real-time database, dashboards, and accreditation tools","Firebase RTDB: cross-device live sync for the Order of Events platform","Vercel: successful deployment of all three apps"]}},
  {id:"leadership",icon:"👔",cat:"Leadership",title:"Leadership & Parliamentary Governance",level:"Proven",
    modal:{tag:"Leadership",title:"Leadership & Parliamentary Governance",subtitle:"Student Govt · Legislative Council · Chief Whip",
      pts:["RUNSA Chief Whip: enforces parliamentary procedure, supervises all In-House Committees","RUNSA Summit 2026: sole developer of full event digital infrastructure — 611 delegates","SWEP Fabrication: led Maize Sheller chassis team to functional prototype delivery","Cowrywise Campus Ambassador: grew student platform registrations by 15%"]}},
  {id:"networking",icon:"🌐",cat:"Technical",title:"Ethernet Cabling (RJ45/Cat6)",level:"Practiced",
    modal:{tag:"Technical",title:"Ethernet Cabling (RJ45 Cat6)",
      pts:["RJ45 Cat6 crimping and cable assembly","Straight-through and crossover configurations","Cable testing with network verifiers","Structured cabling and troubleshooting fundamentals"]}},
];

// Projects with scalable image gallery support
const PROJECTS=[
  {id:"runsa",featured:true,icon:"🚀",title:"RUNSA Legislative Summit 2026",period:"Jan – Apr 2026",
    subtitle:"AI-Assisted Build · Production · Solo Developer",
    link:"https://legislative-summit-registration.vercel.app",
    summary:"Three independent production web apps built solo in under 10 weeks. 611 delegates. Zero data loss.",
    tags:["React.js","Firebase","Firestore","Realtime DB","Vercel","JavaScript"],
    images:[
      {src:"/projects/runsa-registration.jpg",caption:"Registration Portal - 611 delegates registered",alt:"RUNSA Registration Portal"},
      {src:"/projects/runsa-agenda.jpg",caption:"Live Order of Events Platform",alt:"RUNSA Agenda Platform"},
      {src:"/projects/runsa-idcard.jpg",caption:"ID Card Generator output",alt:"RUNSA ID Card Generator"},
      {src:"/projects/runsa-dashboard.jpg",caption:"Admin accreditation dashboard",alt:"RUNSA Admin Dashboard"},
    ],
    modal:{tag:"⭐ Featured Project",title:"RUNSA Legislative Summit 2026",
      subtitle:"Jan 2026 – Apr 2026 · AI-Assisted Solo Build · Redeemer's University Student Association",
      desc:"Used AI-assisted development to design, build, and deploy three independent production web applications in under 10 weeks — with no formal software training. 611 delegates served across all three platforms with zero data loss on summit day.",
      pts:["Delegate Registration & Admin Portal — Firestore backend, real-time dashboard, accreditation tools, bulk CSV export. 611 delegates. Zero data loss.",
        "Live Order of Events (Agenda) — Firebase Realtime DB for cross-device session sync; admin authentication mode; Vercel-deployed.",
        "Delegate Card Generator — Automated branded ID card generation with face-centering crop logic and print layout for all registered institutions."],
      tags:["React.js","Firebase Firestore","Firebase RTDB","Vercel","JavaScript","CSS"],
      links:[{label:"Live Registration Site",url:"https://legislative-summit-registration.vercel.app"}]}},
  {id:"beam",featured:false,icon:"📊",title:"Beam Deflection Automator",period:"2024",
    subtitle:"Python · Engineering Calculation Tool",
    summary:"Automates the Double Integration Method for structural beam analysis. Cuts lab calculation time by 90%+.",
    tags:["Python","NumPy","Structural Analysis"],
    images:[
      {src:"/projects/beam-code.jpg",caption:"Python implementation of Double Integration Method",alt:"Beam Deflection code"},
      {src:"/projects/beam-output.jpg",caption:"Terminal output showing deflection results",alt:"Beam Deflection output"},
      {src:"/projects/beam-calculations.jpg",caption:"Sample engineering calculations",alt:"Beam calculations"},
    ],
    modal:{tag:"Engineering Tool",title:"Beam Deflection Automator",subtitle:"2024 · Personal Project · Python + NumPy",
      desc:"Built a Python script that automates the Double Integration Method for structural beam analysis — eliminating propagation errors and dramatically cutting lab report preparation time.",
      pts:["Reduced lab report calculation time by over 90%","Eliminated propagation errors common in manual double integration","Used by coursemates for Strength of Materials coursework","Demonstrates engineering analysis + programming integration"],
      code:"import numpy as np\n\ndef double_integration(load, length, E, I):\n    M = (load * length) / 2\n    theta = M / (E * I)\n    delta = (load * length**3) / (48 * E * I)\n    return {\"slope\": theta, \"deflection\": delta}"}},
  {id:"maize",featured:false,icon:"⚙️",title:"Maize Sheller Machine",period:"SWEP 2024",
    subtitle:"Fabrication · Lead Role · Petrol-Powered",
    summary:"Led chassis fabrication. SMAW welded mild steel angle iron frame. Aligned petrol engine drive system. Throughput: 50 kg/hr.",
    tags:["SMAW Welding","Metal Fabrication","Mechanical Design"],
    images:[
      {src:"/projects/maize-sketch.jpg",caption:"Design sketch of Maize Sheller chassis",alt:"Maize Sheller design"},
      {src:"/projects/maize-materials.jpg",caption:"Material preparation - angle iron cutting",alt:"Material preparation"},
      {src:"/projects/maize-welding.jpg",caption:"SMAW welding process on mild steel frame",alt:"SMAW welding"},
      {src:"/projects/maize-chassis.jpg",caption:"Chassis fabrication and assembly",alt:"Chassis fabrication"},
      {src:"/projects/maize-assembly.jpg",caption:"Final assembly with petrol engine",alt:"Final assembly"},
      {src:"/projects/maize-final.jpg",caption:"Final machine - 50 kg/hr throughput",alt:"Final Maize Sheller"},
    ],
    modal:{tag:"SWEP 2024",title:"Maize Sheller Machine",subtitle:"Lead Fabricator · Student Work Experience Program",
      specs:[{l:"Role",v:"Lead Fabricator — Chassis Team"},{l:"Chassis",v:"Mild steel angle iron (SMAW welded)"},
        {l:"Power Source",v:"Petrol Engine"},{l:"Drive",v:"Pulley & Belt Transmission"},{l:"Throughput",v:"50 kg/hr"},{l:"Outcome",v:"Functional agricultural prototype delivered"}]}},
  {id:"tunnel",featured:false,icon:"💨",title:"Wind Tunnel Apparatus",period:"SWEP 2024",
    subtitle:"Fluid Mechanics · Fabrication",
    summary:"Low-speed open-circuit wind tunnel for aerodynamic flow visualization. Contraction cone ratio calculated analytically.",
    tags:["Fluid Mechanics","Fabrication","Aerodynamics"],
    images:[
      {src:"/projects/tunnel-design.jpg",caption:"Design phase - contraction cone calculations",alt:"Wind Tunnel design"},
      {src:"/projects/tunnel-construction.jpg",caption:"Construction phase - acrylic assembly",alt:"Wind Tunnel construction"},
      {src:"/projects/tunnel-testing.jpg",caption:"Testing phase - flow visualization",alt:"Wind Tunnel testing"},
      {src:"/projects/tunnel-final.jpg",caption:"Final wind tunnel apparatus",alt:"Final Wind Tunnel"},
    ],
    modal:{tag:"SWEP 2024",title:"Wind Tunnel Apparatus",subtitle:"Builder & Designer · Student Work Experience Program",
      specs:[{l:"Type",v:"Low-speed open-circuit wind tunnel"},{l:"Test Section",v:"Transparent acrylic for flow visualization"},
        {l:"Physics",v:"Bernoulli's Principle & continuity equation"},{l:"Design",v:"Contraction cone ratio calculated analytically"},
        {l:"Purpose",v:"Aerodynamic flow visualization and experimental testing"}]}},
];

const EXPERIENCE=[
  {id:"swep",icon:"🔩",tag:"Engineering",title:"SWEP Participant — Workshop & Fabrication",org:"Redeemer's University",
    period:"200 Level, 2024",loc:"Ede, Osun State",
    modal:{tag:"Practical Engineering · 2024",title:"Student Work Experience Program (SWEP)",subtitle:"Redeemer's University · 200 Level · 2024",
      pts:["Operated lathe machines for cylindrical turning and threading on metal workpieces","Performed milling operations: surface finishing, shoulder milling, keyway cutting","Executed precision drilling with proper workpiece clamping and tool selection","Applied SMAW techniques to join mild steel components for fabrication projects","Utilized angle grinders for metal cutting, edge preparation, and surface finishing","Led chassis fabrication for the Maize Sheller Machine: petrol-engine powered, 50 kg/hr throughput","Contributed to Wind Tunnel Apparatus design: contraction cone ratio calculation and acrylic assembly"]}},
  {id:"runsa-gov",icon:"⚖️",tag:"Student Govt",title:"Chief Whip & In-House Committees Supervisor",org:"RUNSA Legislative Council",
    period:"Oct 2024 – Present",loc:"Redeemer's University, Ede",
    modal:{tag:"Student Government · Active",title:"Chief Whip & In-House Committees Supervisor",subtitle:"RUNSA Legislative Council · Oct 2024 – Present",
      pts:["Enforce parliamentary procedures and maintain legislative order during high-stakes sessions","Supervise all In-House Committees — procedural compliance, reporting, and coordinated operations","Central coordination role in organizing the RUNSA Legislative Summit 2026","Additionally served as sole developer of the Summit's full digital infrastructure (611 delegates, 3 live apps)"]}},
  {id:"cowrywise",icon:"💰",tag:"Fintech",title:"Campus Ambassador",org:"Cowrywise Fintech",
    period:"Dec 2024 – Present",loc:"Redeemer's University, Ede",
    modal:{tag:"Fintech · Active",title:"Campus Ambassador — Cowrywise",subtitle:"Dec 2024 – Present · Redeemer's University, Ede",
      pts:["Lead financial literacy campaigns on personal finance and investment fundamentals","Organised 'Club60' masterclasses on savings, budgeting, and investing","Grew student platform registrations by 15% within the first semester"]}},
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
      pts:["Managed customer relations in a fast-paced retail environment","Handled stock reconciliation, inventory tracking, and daily sales logging","Developed practical negotiation and professional communication skills"]}},
];

const EDUCATION=[
  {id:"uni",icon:"🎓",title:"B.Eng. Mechanical Engineering",org:"Redeemer's University, Ede",period:"Oct 2023 – Present",badge:"4.32 / 5.00",
    modal:{tag:"Current",title:"B.Eng. Mechanical Engineering",subtitle:"Redeemer's University, Ede · Osun State, Nigeria",
      desc:"CGPA: 4.32 / 5.00",ptsLabel:"Relevant Coursework:",
      pts:["Engineering Thermodynamics","Strength of Materials","Engineering Materials","Fluid Mechanics","Engineering Mathematics","Workshop Practice (SWEP)","Introduction to Python Programming","Engineering Drawing & CAD"]}},
  {id:"waec",icon:"📜",title:"WAEC Senior School Certificate",org:"Yaba College of Technology Secondary School, Lagos",period:"Sep 2016 – Jul 2022",badge:"3 Distinctions",
    modal:{tag:"WAEC",title:"West African Senior School Certificate",subtitle:"Yaba College of Technology Secondary School · 2016 – 2022",
      desc:"Distinctions in:",pts:["Further Mathematics","Geography","Technical Drawing"]}},
  {id:"sat",icon:"📊",title:"SAT — Scholastic Assessment Test",org:"College Board",period:"Mar 2023",badge:"1360 / 1600",
    modal:{tag:"90th Percentile · Nationwide Grade 12",title:"SAT — 1360 / 1600",subtitle:"College Board · March 2023 · Record: 4088725788",
      desc:"Taken during a deliberate gap year to benchmark academic aptitude before university. Above 90th percentile nationally among Grade 12 test takers.",
      specs:[{l:"Total Score",v:"1360 / 1600 — 90th Percentile"},{l:"Math",v:"710 / 800 — 92nd Percentile"},
        {l:"Reading & Writing",v:"650 / 800 — 85th Percentile"},{l:"Information & Ideas",v:"680–800 performance band"},
        {l:"Advanced Math",v:"680–800 performance band"},{l:"Problem-Solving & Data",v:"680–800 performance band"}]}},
];

// ── CERTIFICATES — scalable data-driven system ────────────────────
const CERTIFICATES=[
  {id:"prog",status:"earned",icon:"💻",title:"Fundamentals of Programming",issuer:"Programming Hero",year:"2020",
    credentialId:null,verifyUrl:null,
    topics:["Data Structures","Algorithms","Conditionals"],
    skills:["Problem-solving","Algorithmic thinking","Basic coding"],
    modal:{tag:"Earned · 2020",title:"Fundamentals of Programming",subtitle:"Programming Hero · 2020",
      pts:["Data Structures & memory management","Algorithms and computational complexity basics","Loops, conditionals, and control flow","Foundational programming concepts and problem-solving methodology"]}},
  {id:"hp-leadership",status:"earned",icon:"🏆",title:"Effective Leadership",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"626c9fdd-0691-4f57-9eb2-1ec155cdb095",verifyUrl:"https://www.life-global.org",
    topics:["Leadership Strategies","Ethics in Leadership","Team Management"],
    skills:["Leadership","Ethical decision-making","Team coordination"],
    modal:{tag:"Earned · May 2026",title:"Effective Leadership",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Effective Leadership course, covering leadership theory, strategy selection, and ethical decision-making in professional environments.",
      pts:["Effective leadership frameworks and their strategic application","Adapting leadership style to team and situational context","Ethics and integrity as core pillars of leadership","Credential ID: 626c9fdd-0691-4f57-9eb2-1ec155cdb095"]}},
  {id:"hp-entrepreneurship",status:"earned",icon:"🚀",title:"Social Entrepreneurship",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"e820d6c9-2919-4911-b9f4-1f737434fd89",verifyUrl:"https://www.life-global.org",
    topics:["Social Enterprise","Stakeholder Analysis","Impact Measurement"],
    skills:["Entrepreneurial thinking","Stakeholder analysis","Business impact assessment"],
    modal:{tag:"Earned · May 2026",title:"Social Entrepreneurship",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Social Entrepreneurship course covering sustainable social enterprise development and impact measurement.",
      pts:["Assessing the sustainability and viability of social enterprise ideas","Using stakeholder analysis to evaluate business need and community fit","Measuring and communicating business impact","Credential ID: e820d6c9-2919-4911-b9f4-1f737434fd89"]}},
  {id:"hp-design",status:"earned",icon:"💡",title:"Design Thinking",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"044c5743-5e9b-4393-923f-885fb9bc5f72",verifyUrl:"https://www.life-global.org",
    topics:["Problem Definition","Customer Feedback","Solution Design"],
    skills:["Design thinking","Problem framing","Human-centred design"],
    modal:{tag:"Earned · May 2026",title:"Design Thinking",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Design Thinking course, covering the full design thinking process from problem definition to solution iteration.",
      pts:["Applying the design thinking process to real-world challenges","Defining problem statements with precision and user-centricity","Using customer feedback to iterate and improve solutions","Credential ID: 044c5743-5e9b-4393-923f-885fb9bc5f72"]}},
  {id:"hp-ai",status:"earned",icon:"🤖",title:"AI for Business Professionals",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"c7c8bf97-70d4-4f88-b3b9-1fbe2836b824",verifyUrl:"https://www.life-global.org",
    topics:["AI in Business","Prompt Crafting","Ethical AI Use"],
    skills:["AI tools","Prompt engineering","AI ethics"],
    modal:{tag:"Earned · May 2026",title:"AI for Business Professionals",subtitle:"HP LIFE · HP Foundation · Presented 19 May 2026",
      desc:"Completed HP LIFE's AI for Business Professionals course, covering practical AI tool use, prompt engineering, and ethical considerations for professionals.",
      pts:["AI's role in modern business operations and decision-making","Difference between standalone AI tools and integrated AI features","Crafting effective prompts for professional outputs","Ethical use of AI and managing bias in AI-generated content","Credential ID: c7c8bf97-70d4-4f88-b3b9-1fbe2836b824"]}},
  {id:"hp-email",status:"earned",icon:"📧",title:"Business Email",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"a060a394-306f-4d35-82a8-d1448a4a389a",verifyUrl:"https://www.life-global.org",
    topics:["Email Structure","Professional Writing","Business Communication"],
    skills:["Professional writing","Business communication","Email etiquette"],
    modal:{tag:"Earned · May 2026",title:"Business Email",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      pts:["Structural elements of effective business emails","Developing clear, concise, and action-oriented professional emails","Applying email communication across different professional scenarios","Credential ID: a060a394-306f-4d35-82a8-d1448a4a389a"]}},
  {id:"hp-critical",status:"earned",icon:"🧠",title:"Critical Thinking in the AI Era",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"6c8953d2-459f-43e0-be87-297f09838df6",verifyUrl:"https://www.life-global.org",
    topics:["Critical Thinking","AI Bias","Fact-Checking"],
    skills:["Critical thinking","Bias mitigation","Information verification"],
    modal:{tag:"Earned · May 2026",title:"Critical Thinking in the AI Era",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Critical Thinking in the AI Era course, covering decision-making frameworks and tools for navigating AI-generated information.",
      pts:["Applying critical thinking frameworks to improve professional decisions","Understanding how AI-generated content can distort or misrepresent information","Strategies to counteract cognitive biases in decision-making","Practical tools and workflows for fact-checking AI-generated content","Credential ID: 6c8953d2-459f-43e0-be87-297f09838df6"]}},
  {id:"ai-intro",status:"earned",icon:"🧩",title:"Purpose-Driven AI: Introduction to Artificial Intelligence",issuer:"Faith Leads University (Grow with Google Partner)",year:"2026",
    credentialId:"8487641051OI",verifyUrl:null,
    topics:["AI Foundations","Machine Learning","AI Ethics"],
    skills:["AI fundamentals","Machine learning concepts","Responsible AI"],
    modal:{tag:"Earned · May 2026",title:"Purpose-Driven AI: Introduction to Artificial Intelligence",subtitle:"Faith Leads University · Grow with Google Partner · 28 May 2026",
      pts:["Foundational concepts of artificial intelligence and machine learning","AI applications across industries and professional contexts","Ethical considerations and responsible use of AI systems","Certificate Number: 8487641051OI"]}},
  {id:"ph1",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],skills:[],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"App.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in: id, title, issuer, year, credentialId, verifyUrl, topics, skills, and modal details."}},
];

// ── AWARDS — dedicated section ───────────────────────────────────
const AWARDS=[
  {id:"chiefwhip-award",status:"awarded",icon:"🏅",title:"Chief Whip Award",org:"RUNSA Legislative Council",year:"2025–2026",
    category:"Leadership",
    desc:"Awarded for outstanding service as Chief Whip of the RUNSA Legislative Council, demonstrating exemplary parliamentary leadership, procedural discipline, and committee oversight.",
    modal:{tag:"Leadership Award",title:"Chief Whip Award",subtitle:"RUNSA Legislative Council · 2025–2026 Session",
      desc:"Awarded for outstanding service as Chief Whip of the RUNSA Legislative Council. Recognized for maintaining parliamentary order, supervising all In-House Committees, and demonstrating exemplary leadership throughout the legislative session.",
      specs:[{l:"Category",v:"Leadership Award"},{l:"Issuer",v:"RUNSA Legislative Council"},{l:"Role",v:"Chief Whip & In-House Committees Supervisor"},{l:"Year",v:"2025–2026 Academic Session"}]}},
  {id:"award-ph1",status:"placeholder",icon:"🏆",title:"Add Award / Honor",org:"Awarding Body",year:"—",
    category:"Competition / Leadership",
    desc:"Placeholder — fill in your award details.",
    modal:{tag:"Placeholder",title:"Add an Award Here",subtitle:"App.jsx → AWARDS array → duplicate an 'awarded' entry",
      desc:"Set status:'awarded' and fill in: id, title, org, year, category, desc, and modal details."}},
];

// ── EVENTS — with gallery support ────────────────────────────────
const EVENTS=[
  {id:"ev1",status:"placeholder",type:"past",title:"Event Name",org:"Organizing Body",date:"Month Year",
    loc:"City, Country",role:"Your Role",desc:"What happened and what you gained or contributed.",
    image:null,
    images:[
      {src:"/events/event1-photo1.jpg",caption:"Event photo 1",alt:"Event photo"},
      {src:"/events/event1-photo2.jpg",caption:"Event photo 2",alt:"Event photo"},
    ],
    modal:{tag:"Past Event",title:"Event Name",subtitle:"Month Year · City, Country",
      desc:"What happened and what you gained or contributed.",
      specs:[{l:"Organizer",v:"Organizing Body"},{l:"Role",v:"Your Role"},{l:"Date",v:"Month Year"},{l:"Location",v:"City, Country"}]}},
  {id:"ev2",status:"placeholder",type:"upcoming",title:"Upcoming Event",org:"Organizing Body",date:"Coming Soon",
    loc:"TBD",role:"Attendee / Participant",desc:"Event you are registered for or planning to attend.",
    image:null,
    images:[],
    modal:{tag:"Upcoming",title:"Upcoming Event",subtitle:"Coming Soon",
      desc:"Event you are registered for or planning to attend.",
      specs:[{l:"Status",v:"Registered / Planning"},{l:"Date",v:"TBD"},{l:"Location",v:"TBD"}]}},
];

const SM={
  skills:{tag:"Technical Arsenal",title:"Skills Overview",subtitle:"Manufacturing · Engineering Software · Web · AI & Productivity · Leadership",
    desc:"A dual-track foundation: hands-on mechanical engineering (SMAW welding, lathe, milling, AutoCAD, fabrication) combined with modern software and AI capabilities (React, Python, Firebase, Prompt Engineering). Engineered for both the factory floor and the AI team.",
    pts:["Manufacturing & Fabrication: SMAW Welding, Lathe, Milling, Drilling, Metal Fabrication","Engineering Software: AutoCAD 2D/3D, Python (NumPy), Git/GitHub","Web & Software: React.js, Firebase, Vercel, JavaScript","AI & Productivity: Prompt Engineering, Workflow Automation, LLM Tools","Leadership: Parliamentary Governance, Team Coordination, Campus Outreach"]},
  projects:{tag:"Projects",title:"Projects Overview",subtitle:"Production · Engineering · Research",
    desc:"Projects spanning AI-assisted full-stack web development, mechanical fabrication, fluid mechanics, and Python automation — all completed during university with real-world impact.",
    pts:["RUNSA Legislative Summit 2026 — 3 live apps, 611 delegates, 10 weeks, solo build","Beam Deflection Automator — Python + NumPy, 90%+ calculation time reduction","Maize Sheller Machine — SMAW fabrication, petrol-engine powered, 50 kg/hr","Wind Tunnel Apparatus — Fluid mechanics Bernoulli demonstration rig"]},
  experience:{tag:"Experience",title:"Experience Log",subtitle:"Workshop Training · Student Government · Fintech · Engineering Organizations",
    desc:"Hands-on engineering, parliamentary governance, fintech outreach, and petroleum engineering committee experience — all developed during university."},
  education:{tag:"Education",title:"Education",subtitle:"B.Eng. Mechanical Engineering · WAEC · SAT",
    desc:"Redeemer's University B.Eng. Mechanical Engineering (CGPA 4.32/5.00). WAEC distinctions in Further Mathematics, Geography, and Technical Drawing. SAT 1360/1600 — 90th percentile nationally."},
  certificates:{tag:"Certifications",title:"Certificates & Credentials",subtitle:"Earned · HP LIFE · Programming · AI",
    desc:"Verified credentials spanning engineering, AI, business communication, and leadership. All certificates are issued with credential IDs for verification."},
  events:{tag:"Events",title:"Events — Past & Upcoming",subtitle:"Conferences · Summits · Workshops",
    desc:"Engineering conferences, student summits, workshops, and industry events — past and upcoming."},
  awards:{tag:"Awards",title:"Awards & Honors",subtitle:"Leadership · Recognition · Achievement",
    desc:"Formal recognitions for leadership excellence, academic achievement, and professional contributions."},
};

/* ═══════ THEME ═══════ */
const mkT=(d)=>({
  bg:d?"#0f172a":"#f8fafc", bgAlt:d?"#0c1628":"#f1f5f9",
  card:d?"#1e293b":"#ffffff", cardHov:d?"#243044":"#f0f9ff",
  text:d?"#f1f5f9":"#0f172a", muted:d?"#94a3b8":"#64748b",
  accent:"#0d9488", aLight:d?"rgba(13,148,136,0.16)":"rgba(13,148,136,0.09)",
  border:d?"#334155":"#e2e8f0", nav:d?"rgba(15,23,42,0.92)":"rgba(248,250,252,0.92)",
  shadow:d?"0 4px 24px rgba(0,0,0,0.45)":"0 4px 24px rgba(0,0,0,0.07)",
  code:d?"#0a2233":"#f0fdf4", codeText:d?"#5eead4":"#0f766e",
  pill:d?"rgba(15,23,42,0.88)":"rgba(255,255,255,0.88)",
});

/* ═══════ SHARED ═══════ */
const Chip=({label,t})=>(
  <span style={{background:t.aLight,color:t.accent,padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:700,whiteSpace:"nowrap",display:"inline-block"}}>{label}</span>
);

// Clickable indicator shown on all interactive cards
const ClickHint=({label="Click for Details",t})=>(
  <span className="click-hint" style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10,fontWeight:700,color:t.accent,opacity:0.75,letterSpacing:"0.3px",textTransform:"uppercase"}}>
    {label} <span style={{fontSize:9}}>↗</span>
  </span>
);

// Section separator with accent line
const SectionSep=({t})=>(
  <div style={{display:"flex",alignItems:"center",gap:16,padding:"0 1.5rem",maxWidth:1100,margin:"0 auto"}}>
    <div style={{flex:1,height:1,background:`linear-gradient(to right,transparent,${t.border})`}}/>
    <div style={{width:6,height:6,borderRadius:"50%",background:t.accent,opacity:0.5}}/>
    <div style={{flex:1,height:1,background:`linear-gradient(to left,transparent,${t.border})`}}/>
  </div>
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

/* ═══════ CONTACT POP-UP MODAL ═══════ */
function ContactModal({onClose,t}){
  const [copied,setCopied]=useState(null);
  useEffect(()=>{
    const fn=(e)=>e.key==="Escape"&&onClose();
    window.addEventListener("keydown",fn);
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",fn);document.body.style.overflow="";};}
  ,[onClose]);

  const doCopy=async(text,label)=>{
    try{await navigator.clipboard.writeText(text);setCopied(label);setTimeout(()=>setCopied(null),2000);}catch(e){}
  };

  const contacts=[
    {icon:"📚",label:"Academic / Internship",value:P.emailAcademic,href:`mailto:${P.emailAcademic}`,copyable:true},
    {icon:"👤",label:"Personal",value:P.emailPersonal,href:`mailto:${P.emailPersonal}`,copyable:true},
    {icon:"💬",label:"WhatsApp",value:"+234 708 057 2415",href:P.whatsapp,external:true},
    {icon:"🔗",label:"LinkedIn",value:"linkedin.com/in/ibk-co",href:P.linkedin,external:true},
    {icon:"🐙",label:"GitHub",value:"github.com/ibukun06",href:P.github,external:true},
    {icon:"📄",label:"Download Résumé",value:"Resumé.pdf",href:P.resume,download:true},
  ];

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.68)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:t.card,color:t.text,borderRadius:20,padding:"2rem",maxWidth:420,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 72px rgba(0,0,0,0.35)",position:"relative",animation:"popIn 0.25s ease both"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",cursor:"pointer",color:t.muted,fontSize:22,lineHeight:1,padding:"2px 6px"}}>✕</button>
        <div style={{marginBottom:24,paddingRight:36}}>
          <h2 style={{margin:"0 0 5px",fontSize:22,fontWeight:900,color:t.text,letterSpacing:"-0.5px"}}>Ways to reach me</h2>
          <p style={{margin:0,color:t.muted,fontSize:13}}>I respond within 24 hours</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {contacts.map((c,i)=>{
            const isCopied=copied===c.label;
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:t.bgAlt,border:`1px solid ${t.border}`,borderRadius:12,padding:"10px 14px",transition:"all 0.2s"}}>
                <span style={{fontSize:20,flexShrink:0}}>{c.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:10,fontWeight:700,color:t.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>{c.label}</div>
                  <a href={c.href} target={c.external?"_blank":undefined} rel={c.external?"noreferrer":undefined} download={c.download} style={{color:t.accent,fontSize:13,fontWeight:600,textDecoration:"none",wordBreak:"break-all"}}>
                    {c.value}
                  </a>
                </div>
                {c.copyable&&(
                  <button onClick={()=>doCopy(c.value,c.label)} style={{background:isCopied?"rgba(22,163,74,0.15)":t.aLight,border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:isCopied?"#16a34a":t.accent,flexShrink:0,transition:"all 0.2s"}}>
                    {isCopied?"Copied!":"Copy"}
                  </button>
                )}
                {c.external&&<span style={{fontSize:11,color:t.muted,flexShrink:0}}>↗</span>}
                {c.download&&<span style={{fontSize:11,color:t.muted,flexShrink:0}}>↓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════ GALLERY LIGHTBOX ═══════ */
function GalleryModal({images,title,onClose,t}){
  const [idx,setIdx]=useState(0);
  const [touchX,setTouchX]=useState(null);
  useEffect(()=>{
    const fn=(e)=>{
      if(e.key==="Escape")onClose();
      if(e.key==="ArrowLeft")setIdx(i=>Math.max(0,i-1));
      if(e.key==="ArrowRight")setIdx(i=>Math.min(images.length-1,i+1));
    };
    window.addEventListener("keydown",fn);
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",fn);document.body.style.overflow="";};}
  ,[onClose,images.length]);

  const onTouchStart=e=>setTouchX(e.changedTouches[0].screenX);
  const onTouchEnd=e=>{
    const endX=e.changedTouches[0].screenX;
    if(touchX!==null&&endX<touchX-40&&idx<images.length-1)setIdx(idx+1);
    if(touchX!==null&&endX>touchX+40&&idx>0)setIdx(idx-1);
    setTouchX(null);
  };

  if(!images||images.length===0)return null;
  const cur=images[idx];

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:10001,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative"}}>
        {/* Close */}
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:999,padding:"8px 14px",cursor:"pointer",color:"#fff",fontSize:18,zIndex:10,backdropFilter:"blur(8px)"}}>✕</button>
        {/* Counter */}
        <div style={{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.5)",color:"#fff",padding:"5px 14px",borderRadius:999,fontSize:12,fontWeight:700,backdropFilter:"blur(8px)",zIndex:10}}>
          {idx+1} / {images.length}
        </div>
        {/* Image */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"60px 20px 20px"}}>
          <img
            src={cur.src}
            alt={cur.alt||cur.caption||title}
            style={{maxWidth:"100%",maxHeight:"calc(100vh - 140px)",objectFit:"contain",borderRadius:8,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",animation:"fadeUp 0.3s ease both"}}
            onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
          />
          <div style={{display:"none",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",fontSize:13}}>
            <div style={{fontSize:40,marginBottom:8}}>🖼️</div>
            <div>Add photo: {cur.src}</div>
          </div>
        </div>
        {/* Caption */}
        {cur.caption&&<div style={{color:"rgba(255,255,255,0.8)",fontSize:13,padding:"8px 20px",textAlign:"center",maxWidth:600}}>{cur.caption}</div>}
        {/* Nav buttons */}
        {images.length>1&&(
          <>
            <button onClick={()=>setIdx(Math.max(0,idx-1))} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.5)",border:"none",borderRadius:999,padding:"10px 14px",cursor:"pointer",color:"#fff",fontSize:18,backdropFilter:"blur(8px)",opacity:idx>0?1:0.3,transition:"opacity 0.2s"}}>←</button>
            <button onClick={()=>setIdx(Math.min(images.length-1,idx+1))} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.5)",border:"none",borderRadius:999,padding:"10px 14px",cursor:"pointer",color:"#fff",fontSize:18,backdropFilter:"blur(8px)",opacity:idx<images.length-1?1:0.3,transition:"opacity 0.2s"}}>→</button>
          </>
        )}
        {/* Dots */}
        {images.length>1&&(
          <div style={{display:"flex",gap:6,padding:"10px 0 20px"}}>
            {images.map((_,i)=>(
              <button key={i} onClick={()=>setIdx(i)} style={{width:8,height:8,borderRadius:"50%",border:"none",padding:0,cursor:"pointer",background:i===idx?"#fff":"rgba(255,255,255,0.3)",transition:"all 0.2s"}}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════ DETAIL MODAL ═══════ */
function Modal({data,onClose,t,openGallery}){
  useEffect(()=>{
    const fn=(e)=>e.key==="Escape"&&onClose();
    window.addEventListener("keydown",fn);
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",fn);document.body.style.overflow="";};}
  ,[onClose]);
  const m=data?.modal; if(!m) return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.68)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:t.card,color:t.text,borderRadius:18,padding:"2rem",maxWidth:580,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 72px rgba(0,0,0,0.35)",position:"relative",animation:"popIn 0.2s ease both"}}>
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
            <tbody>{m.specs.map((s,i)=>{
              return(<tr key={i} style={{borderBottom:`1px solid ${t.border}`}}>
                <td style={{padding:"9px 12px 9px 0",fontWeight:700,fontSize:13,color:t.text,width:165,verticalAlign:"top"}}>{s.l}</td>
                <td style={{padding:"9px 0",fontSize:13,color:t.muted}}>{s.v}</td>
              </tr>);})}
            </tbody>
          </table>)}
        {m.code&&<pre style={{background:t.code,border:`1px solid ${t.border}`,borderRadius:10,padding:"1rem",overflowX:"auto",fontSize:12,lineHeight:1.75,color:t.codeText,fontFamily:"'Fira Code','Courier New',monospace",margin:"0 0 16px"}}>{m.code}</pre>}
        {m.tags&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>{m.tags.map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>}
        {m.links&&(
          <div style={{display:"flex",gap:14,flexWrap:"wrap",paddingTop:8,borderTop:`1px solid ${t.border}`}}>
            {m.links.map((l,i)=><a key={i} href={l.url} target="_blank" rel="noreferrer" style={{color:t.accent,fontSize:13,fontWeight:700,textDecoration:"none"}}>{l.label} ↗</a>)}
          </div>)}
        {/* Open Gallery button if item has images */}
        {openGallery&&data?.images&&data.images.length>0&&(
          <button onClick={openGallery} style={{marginTop:16,display:"flex",alignItems:"center",gap:8,background:t.aLight,border:`1px solid ${t.accent}40`,borderRadius:10,padding:"8px 16px",cursor:"pointer",color:t.accent,fontSize:12,fontWeight:700,width:"100%",justifyContent:"center",transition:"all 0.2s"}}>
            🖼️ View Gallery ({data.images.length} {data.images.length===1?"image":"images"})
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════ PILL NAVBAR ═══════ */
function Nav({dark,toggle,t,open}){
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [active,setActive]=useState("");
  const [mobile,setMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<820);
  useEffect(()=>{
    const onScroll=()=>{
      setScrolled(window.scrollY>30);
      const sections=["skills","projects","experience","education","certificates","awards","events"];
      for(const s of [...sections].reverse()){
        const el=document.getElementById(s);
        if(el&&window.scrollY>=el.offsetTop-120){setActive(s);break;}
      }
    };
    const onResize=()=>setMobile(window.innerWidth<820);
    window.addEventListener("scroll",onScroll);
    window.addEventListener("resize",onResize);
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);};
  },[]);
  const links=["Skills","Projects","Experience","Education","Certificates","Awards","Events"];
  const closeMenu=()=>setMenuOpen(false);
  const pillStyle={
    position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",
    zIndex:200,
    background:t.pill,
    backdropFilter:"blur(20px)",
    WebkitBackdropFilter:"blur(20px)",
    border:`1px solid ${scrolled?t.accent+"30":t.border}`,
    borderRadius:999,
    boxShadow:scrolled?"0 8px 32px rgba(0,0,0,0.2)":"0 4px 20px rgba(0,0,0,0.08)",
    transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
    animation:"slideDown 0.5s ease both",
    padding:"0 6px",
    height:52,
    display:"flex",alignItems:"center",
    maxWidth:"calc(100vw - 32px)",
  };
  return(
    <>
    <nav style={pillStyle}>
      <div style={{display:"flex",alignItems:"center",gap:2,height:"100%"}}>
        <button onClick={()=>open({modal:{tag:"Mechanical Engineer · AI Builder",title:"IBK & Co.",subtitle:P.location+" · Open to SIWES & Engineering Internships",desc:P.summary,links:[{label:"Download Résumé",url:P.resume},{label:"LinkedIn",url:P.linkedin},{label:"GitHub",url:P.github}]}})} style={{background:"none",border:"none",cursor:"pointer",fontWeight:900,fontSize:17,letterSpacing:"-0.5px",lineHeight:1,padding:"0 14px 0 10px",transition:"opacity 0.2s",height:"100%",display:"flex",alignItems:"center"}}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <span style={{color:t.accent}}>IBK</span><span style={{color:t.text}}>&Co.</span>
        </button>
        {!mobile&&(
          <div style={{display:"flex",alignItems:"center",gap:1,height:"100%",borderLeft:`1px solid ${t.border}`,paddingLeft:4}}>
            {links.map(l=>{
              const isActive=active===l.toLowerCase();
              return(
                <a key={l} href={`#${l.toLowerCase()}`} style={{color:isActive?t.accent:t.muted,textDecoration:"none",fontSize:12,padding:"5px 9px",borderRadius:999,fontWeight:isActive?700:500,transition:"all 0.2s",background:isActive?t.aLight:"none"}
                } onMouseEnter={e=>{e.target.style.color=t.accent;e.target.style.background=t.aLight;}} onMouseLeave={e=>{e.target.style.color=isActive?t.accent:t.muted;e.target.style.background=isActive?t.aLight:"none";}}>{l}</a>
              );
            })}
            <div style={{width:1,height:22,background:t.border,margin:"0 4px"}}/>
            <button onClick={toggle} title="Toggle theme" style={{background:"none",border:"none",cursor:"pointer",borderRadius:999,padding:"6px 10px",color:t.text,fontSize:14,transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background=t.aLight} onMouseLeave={e=>e.currentTarget.style.background="none"}>
              {dark?"☀️":"🌙"}
            </button>
            <a href={P.resume} download style={{background:t.accent,color:"#fff",padding:"7px 16px",borderRadius:999,fontSize:12,fontWeight:800,textDecoration:"none",transition:"all 0.2s",marginLeft:2,flexShrink:0}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Résumé ↓</a>
          </div>
        )}
        {mobile&&(
          <div style={{display:"flex",alignItems:"center",gap:6,paddingLeft:4,height:"100%"}}>
            <button onClick={toggle} style={{background:"none",border:"none",cursor:"pointer",borderRadius:999,padding:"6px 10px",color:t.text,fontSize:13}}>{dark?"☀️":"🌙"}</button>
            <button onClick={()=>setMenuOpen(o=>!o)} style={{background:menuOpen?t.aLight:"none",border:"none",cursor:"pointer",borderRadius:999,padding:"6px 12px",color:t.text,fontSize:15,lineHeight:1,fontWeight:700,transition:"all 0.2s"}}>
              {menuOpen?"✕":"☰"}
            </button>
          </div>
        )}
      </div>
    </nav>
    {mobile&&menuOpen&&(
      <div style={{position:"fixed",top:80,left:16,right:16,zIndex:199,background:t.pill,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:`1px solid ${t.border}`,borderRadius:20,padding:"1rem",animation:"popIn 0.2s ease both",boxShadow:"0 16px 48px rgba(0,0,0,0.2)"}}>
        {links.map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu} style={{display:"flex",justifyContent:"space-between",alignItems:"center",color:t.text,textDecoration:"none",fontSize:15,padding:"11px 8px",borderBottom:`1px solid ${t.border}`,fontWeight:600,transition:"color 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.text}>
            {l}<span style={{color:t.accent,fontSize:12}}>→</span>
          </a>
        ))}
        <a href={P.resume} download onClick={closeMenu} style={{display:"block",marginTop:12,background:t.accent,color:"#fff",padding:"11px 0",borderRadius:12,textAlign:"center",fontWeight:800,fontSize:14,textDecoration:"none"}}>Download Résumé</a>
      </div>
    )}
    </>
  );
}

/* ═══════ HERO ═══════ */
function Hero({open,t,dark,openContact}){
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
    <section style={{paddingTop:140,paddingBottom:80,background:heroBg,textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"5%",right:"5%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(13,148,136,0.11),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-8%",left:"3%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(8,145,178,0.07),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:700,margin:"0 auto",padding:"0 1.5rem",position:"relative",zIndex:1,animation:"fadeUp 0.8s ease both"}}>

        {/* SIWES availability badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(22,163,74,0.12)",border:"1px solid rgba(22,163,74,0.35)",borderRadius:999,padding:"5px 18px",marginBottom:12,fontSize:12,fontWeight:800,color:"#16a34a",animation:"fadeUp 0.6s ease both"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block",flexShrink:0,animation:"pulseDot 2s ease infinite"}}/>
          Available for SIWES / Engineering Internship
        </div>

        {/* Open to roles badge */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:28,animation:"fadeUp 0.6s 0.1s ease both"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:t.aLight,border:`1px solid rgba(13,148,136,0.3)`,borderRadius:999,padding:"4px 16px",fontSize:11,fontWeight:700,color:t.accent}}>
            Open to Engineering Internships · Nigeria & Abroad
          </div>
        </div>

        {/* Avatar */}
        <div style={{margin:"0 auto 24px",width:140,height:140,position:"relative",animation:"fadeUp 0.7s 0.2s ease both"}}>
          <div style={{position:"absolute",inset:-4,borderRadius:"50%",background:"conic-gradient(#0d9488,#0891b2,#6366f1,#0d9488)",animation:"spinRing 5s linear infinite",opacity:avatarHov?1:0.7,transition:"opacity 0.3s"}}/>
          <div style={{position:"relative",width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:`3px solid ${t.card}`,animation:"float 4s ease-in-out infinite",transform:avatarHov?"scale(1.06)":"scale(1)",transition:"transform 0.3s ease",boxShadow:avatarHov?`0 0 32px rgba(13,148,136,0.5), 0 12px 40px rgba(0,0,0,0.2)`:`0 4px 20px rgba(0,0,0,0.15)`,cursor:"pointer"}}
            onMouseEnter={()=>setAvatarHov(true)} onMouseLeave={()=>setAvatarHov(false)}>
            {P.photo
              ?<img src={P.photo} alt="IBK" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              :<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#0d9488,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.5rem",fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>IBK</div>}
          </div>
        </div>

        <h1 style={{fontSize:"clamp(1.8rem,5vw,3rem)",fontWeight:900,margin:"0 0 6px",color:t.text,letterSpacing:"-1px",lineHeight:1.1,animation:"fadeUp 0.7s 0.3s ease both"}}>{P.name}</h1>
        <p style={{fontSize:13,fontWeight:700,color:t.accent,margin:"0 0 10px",letterSpacing:"1px",textTransform:"uppercase",animation:"fadeUp 0.7s 0.35s ease both"}}>Mechanical Engineering · B.Eng. · Redeemer's University</p>

        <div style={{height:30,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,overflow:"hidden",animation:"fadeUp 0.7s 0.4s ease both"}}>
          <p key={ti} style={{fontSize:13,fontWeight:600,color:t.muted,margin:0,letterSpacing:"0.3px",animation:"fadeUp 0.4s ease both"}}>{P.titles[ti]}</p>
        </div>

        <p style={{fontSize:15,color:t.muted,lineHeight:1.8,maxWidth:520,margin:"0 auto 36px",animation:"fadeUp 0.7s 0.5s ease both"}}>{P.tagline}</p>

        {/* CTA buttons - consolidated: Download Résumé + Get in Touch */}
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:20,animation:"fadeUp 0.7s 0.6s ease both"}}>
          <a href={P.resume} download style={{background:t.accent,color:"#fff",padding:"11px 26px",borderRadius:10,fontWeight:800,fontSize:14,textDecoration:"none",boxShadow:"0 4px 20px rgba(13,148,136,0.38)",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(13,148,136,0.48)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.38)";}}>Download Résumé ↓</a>
          <button onClick={openContact} style={{background:"none",color:t.accent,padding:"11px 26px",borderRadius:10,fontWeight:700,fontSize:14,textDecoration:"none",border:`2px solid ${t.accent}`,cursor:"pointer",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=t.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=t.accent;}}>Get in Touch</button>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:mobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:12,animation:"fadeUp 0.7s 0.7s ease both"}}>
          {P.stats.map((s,i)=>{
            return(<button key={s.value} onClick={()=>open({modal:{tag:"Quick Stat",title:s.value,subtitle:s.label,desc:s.detail}})} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px 8px 12px",cursor:"pointer",textAlign:"center",boxShadow:t.shadow,transition:"all 0.25s",animation:`fadeUp 0.5s ${0.7+i*0.08}s ease both`,position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(13,148,136,0.2)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=t.shadow;}}>
              <div style={{fontSize:"1.65rem",fontWeight:900,color:t.accent,lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:11,color:t.text,fontWeight:700,marginTop:5,lineHeight:1.3}}>{s.label}</div>
              <div style={{fontSize:10,color:t.muted,marginTop:2}}>{s.sub}</div>
              <div style={{marginTop:6,fontSize:9,fontWeight:700,color:t.accent,opacity:0.6,letterSpacing:"0.3px",textTransform:"uppercase"}}>tap for details</div>
            </button>);})}
        </div>
      </div>
    </section>
  );
}

/* ═══════ ABOUT ═══════ */
function About({t}){
  return(
    <section style={{padding:"52px 1.5rem",background:t.bg,borderBottom:`1px solid ${t.border}`}}>
      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
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
        <STitle title="Technical Arsenal" sub="Click any skill card for full details" skey="skills" open={open} t={t}/>
        {cats.map(cat=>{
          return(<div key={cat} style={{marginBottom:32}}>
            <p style={{fontSize:10.5,fontWeight:800,color:t.accent,textTransform:"uppercase",letterSpacing:2.5,marginBottom:12}}>{cat}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
              {SKILLS.filter(s=>s.cat===cat).map(skill=>{
                return(<button key={skill.id} onClick={()=>open(skill)}
                  style={{background:t.card,border:`1px solid ${skill.id==="ai"?t.accent+"55":t.border}`,borderRadius:12,padding:"15px 14px 12px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",flexDirection:"column",gap:4,position:"relative"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.background=t.cardHov;e.currentTarget.style.transform="translateY(-3px) scale(1.02)";e.currentTarget.style.boxShadow=t.shadow;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=skill.id==="ai"?t.accent+"55":t.border;e.currentTarget.style.background=t.card;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <span style={{fontSize:22}}>{skill.icon}</span>
                  <span style={{fontWeight:700,fontSize:13,color:t.text,lineHeight:1.3}}>{skill.title}</span>
                  <span style={{fontSize:10.5,color:t.accent,fontWeight:700}}>{skill.level}</span>
                  <ClickHint t={t}/>
                </button>);})}
            </div>
          </div>);})}
      </div>
    </section>
  );
}

/* ═══════ PROJECTS ═══════ */
function Projects({open,t,setGallery}){
  const [ref,vis]=useReveal();
  return(
    <section id="projects" style={{padding:"80px 1.5rem",background:t.bg}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Projects" sub="Click any project card to view details or gallery" skey="projects" open={open} t={t}/>

        {/* Featured project */}
        {PROJECTS.filter(p=>p.featured).map(p=>{
          return(<div key={p.id}>
            <button onClick={()=>open(p)} style={{width:"100%",display:"block",background:`linear-gradient(135deg,${t.aLight} 0%,${t.card} 100%)`,border:`1px solid rgba(13,148,136,0.3)`,borderRadius:16,padding:"2rem",cursor:"pointer",textAlign:"left",marginBottom:20,transition:"all 0.25s",position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 48px rgba(13,148,136,0.25)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
              <div style={{position:"absolute",top:14,right:14}}><ClickHint label="View Details" t={t}/></div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:14}}>
                <div>
                  <Chip label="⭐ Featured" t={t}/>
                  <h3 style={{fontSize:"1.25rem",fontWeight:900,margin:"10px 0 4px",color:t.text,letterSpacing:"-0.5px"}}>{p.icon} {p.title}</h3>
                  <p style={{color:t.muted,margin:0,fontSize:13}}>{p.subtitle} · {p.period}</p>
                </div>
                {p.link&&<a href={p.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:t.accent,fontSize:12,fontWeight:700,textDecoration:"none",border:`1px solid ${t.accent}`,padding:"5px 14px",borderRadius:7,flexShrink:0}}>Live ↗</a>}
              </div>
              <p style={{color:t.muted,fontSize:14,lineHeight:1.8,marginBottom:16}}>{p.summary}</p>
              {/* Gallery preview thumbnails */}
              {p.images&&p.images.length>0&&(
                <div onClick={e=>{e.stopPropagation();setGallery({images:p.images,title:p.title});}} style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
                  {p.images.slice(0,4).map((img,i)=>{
                    return(<div key={i} style={{width:72,height:52,borderRadius:8,background:`url(${img.src}) center/cover no-repeat,${t.bgAlt}`,border:`1px solid ${t.border}`,flexShrink:0,cursor:"pointer",position:"relative",transition:"all 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                      {i===3&&p.images.length>4&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700}}>+{p.images.length-4}</div>}
                    </div>);})}
                  <span style={{fontSize:11,color:t.accent,fontWeight:700,display:"flex",alignItems:"center",cursor:"pointer"}}>View Gallery ({p.images.length}) ↗</span>
                </div>
              )}
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{p.tags.map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>
            </button>
          </div>);})}

        {/* Other projects */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:14}}>
          {PROJECTS.filter(p=>!p.featured).map(p=>{
            return(<div key={p.id}>
              <button onClick={()=>open(p)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"1.5rem",cursor:"pointer",textAlign:"left",transition:"all 0.25s",display:"flex",flexDirection:"column",width:"100%",position:"relative"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=t.shadow;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <span style={{fontSize:28,marginBottom:12}}>{p.icon}</span>
                <h3 style={{fontWeight:800,fontSize:15,margin:"0 0 4px",color:t.text}}>{p.title}</h3>
                <p style={{fontSize:12,color:t.muted,margin:"0 0 10px"}}>{p.subtitle} · {p.period}</p>
                <p style={{fontSize:13,color:t.muted,lineHeight:1.7,margin:"0 0 14px",flex:1}}>{p.summary}</p>
                {/* Gallery preview for non-featured */}
                {p.images&&p.images.length>0&&(
                  <div onClick={e=>{e.stopPropagation();setGallery({images:p.images,title:p.title});}} style={{display:"flex",gap:4,marginBottom:10,overflowX:"auto"}}>
                    {p.images.slice(0,3).map((img,i)=>{
                      return(<div key={i} style={{width:50,height:36,borderRadius:6,background:`url(${img.src}) center/cover no-repeat,${t.bgAlt}`,border:`1px solid ${t.border}`,flexShrink:0,cursor:"pointer"}}/>);})}
                    <span style={{fontSize:10,color:t.accent,fontWeight:700,display:"flex",alignItems:"center"}}>Gallery ↗</span>
                  </div>
                )}
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{p.tags.slice(0,3).map(tag=><Chip key={tag} label={tag} t={t}/>)}</div>
                <ClickHint t={t}/>
              </button>
            </div>);})}
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
      <div ref={ref} style={{maxWidth:700,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Experience" sub="Click any entry for full details" skey="experience" open={open} t={t}/>
        <div style={{position:"relative",paddingLeft:28}}>
          <div style={{position:"absolute",left:4,top:8,bottom:8,width:2,background:`linear-gradient(to bottom,${t.accent},${t.border})`,borderRadius:2}}/>
          {EXPERIENCE.map(ex=>{
            return(<button key={ex.id} onClick={()=>open(ex)} onMouseEnter={()=>setHov(ex.id)} onMouseLeave={()=>setHov(null)}
              style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",marginBottom:16,position:"relative"}}>
              <div style={{position:"absolute",left:-24,top:18,width:10,height:10,borderRadius:"50%",background:t.accent,border:`2px solid ${t.bg}`,zIndex:1,transition:"transform 0.2s",transform:hov===ex.id?"scale(1.5)":"scale(1)"}}/>
              <div style={{background:t.card,border:`1px solid ${hov===ex.id?t.accent:t.border}`,borderRadius:12,padding:"1rem 1.25rem",transition:"all 0.2s",transform:hov===ex.id?"translateX(6px)":"none",boxShadow:hov===ex.id?t.shadow:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,marginBottom:6}}>
                  <Chip label={ex.tag} t={t}/>
                  <span style={{fontSize:11,color:t.muted,fontWeight:500}}>{ex.period}</span>
                </div>
                <h3 style={{margin:"0 0 3px",fontSize:14,fontWeight:800,color:t.text}}>{ex.icon} {ex.title}</h3>
                <p style={{margin:"0 0 6px",fontSize:12,color:t.muted}}>{ex.org} · {ex.loc}</p>
                <ClickHint t={t}/>
              </div>
            </button>);})}
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
      <div ref={ref} style={{maxWidth:700,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Education" sub="Click any entry for full details" skey="education" open={open} t={t}/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {EDUCATION.map(e=>{
            return(<button key={e.id} onClick={()=>open(e)} onMouseEnter={()=>setHov(e.id)} onMouseLeave={()=>setHov(null)}
              style={{background:t.card,border:`1px solid ${hov===e.id?t.accent:t.border}`,borderRadius:14,padding:"1.25rem 1.5rem",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:16,transition:"all 0.25s",transform:hov===e.id?"translateX(6px) scale(1.01)":"none",boxShadow:hov===e.id?t.shadow:"none"}}>
              <span style={{fontSize:30,flexShrink:0}}>{e.icon}</span>
              <div style={{flex:1}}>
                <h3 style={{margin:"0 0 3px",fontSize:15,fontWeight:800,color:t.text}}>{e.title}</h3>
                <p style={{margin:"0 0 3px",fontSize:13,color:t.muted}}>{e.org}</p>
                <p style={{margin:"0 0 4px",fontSize:12,color:t.muted}}>{e.period}</p>
                <ClickHint t={t}/>
              </div>
              <span style={{background:t.aLight,color:t.accent,padding:"5px 14px",borderRadius:10,fontSize:12,fontWeight:800,flexShrink:0,whiteSpace:"nowrap"}}>{e.badge}</span>
            </button>);})}
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
        <STitle title="Certificates & Credentials" sub="Click any certificate to view credential details" skey="certificates" open={open} t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:14}}>
          {CERTIFICATES.map(c=>{
            const ph=c.status==="placeholder",isHov=hov===c.id;
            return(
              <button key={c.id} onClick={()=>open(c)} onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
                style={{background:ph?"none":t.card,border:`${ph?"2px dashed":"2px solid"} ${isHov?t.accent:ph?t.border:t.accent+"35"}`,borderRadius:14,padding:"1.4rem",cursor:"pointer",textAlign:"left",transition:"all 0.25s",opacity:ph&&!isHov?0.45:1,transform:isHov?"translateY(-4px) scale(1.02)":"none",boxShadow:isHov&&!ph?t.shadow:"none",display:"flex",flexDirection:"column",gap:3}}>
                <span style={{fontSize:26,display:"block",marginBottom:8}}>{c.icon}</span>
                <h3 style={{margin:"0 0 3px",fontSize:13,fontWeight:800,color:ph?t.muted:t.text,lineHeight:1.3}}>{c.title}</h3>
                <p style={{margin:"0 0 4px",fontSize:11,color:t.muted}}>{c.issuer}</p>
                <p style={{margin:"0 0 10px",fontSize:11,color:t.muted,fontWeight:600}}>{c.year}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>{c.topics.map(tp=><Chip key={tp} label={tp} t={t}/>)}</div>
                {ph?<p style={{margin:"6px 0 0",fontSize:10,color:t.muted,fontStyle:"italic"}}>Slot — click to see how to add</p>
                  :<ClickHint label="View Credential" t={t}/>}
              </button>);})}
        </div>
      </div>
    </section>
  );
}

/* ═══════ AWARDS ═══════ */
function Awards({open,t}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="awards" style={{padding:"80px 1.5rem",background:t.bg}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Awards & Honors" sub="Click any award for full details" skey="awards" open={open} t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
          {AWARDS.map(a=>{
            const ph=a.status==="placeholder",isHov=hov===a.id;
            return(
              <button key={a.id} onClick={()=>open(a)} onMouseEnter={()=>setHov(a.id)} onMouseLeave={()=>setHov(null)}
                style={{background:ph?"none":`linear-gradient(135deg,${t.aLight} 0%,${t.card} 100%)`,border:`${ph?"2px dashed":"2px solid"} ${isHov?t.accent:ph?t.border:"rgba(245,158,11,0.4)"}`,borderRadius:16,padding:"1.75rem",cursor:"pointer",textAlign:"left",transition:"all 0.25s",opacity:ph&&!isHov?0.45:1,transform:isHov&&!ph?"translateY(-5px) scale(1.01)":"none",boxShadow:isHov&&!ph?`0 12px 40px rgba(245,158,11,0.15)`:"none",display:"flex",flexDirection:"column",gap:4}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                  <span style={{fontSize:32}}>{a.icon}</span>
                  <span style={{background:"rgba(245,158,11,0.12)",color:"#d97706",padding:"3px 12px",borderRadius:999,fontSize:11,fontWeight:800}}>{a.category}</span>
                </div>
                <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:900,color:ph?t.muted:t.text,letterSpacing:"-0.3px"}}>{a.title}</h3>
                <p style={{margin:"0 0 3px",fontSize:13,color:t.accent,fontWeight:700}}>{a.org}</p>
                <p style={{margin:"0 0 10px",fontSize:12,color:t.muted,fontWeight:600}}>{a.year}</p>
                {!ph&&<p style={{margin:"0 0 10px",fontSize:13,color:t.muted,lineHeight:1.7,flex:1}}>{a.desc}</p>}
                {ph?<p style={{margin:0,fontSize:11,color:t.muted,fontStyle:"italic"}}>Placeholder — add award details</p>
                  :<ClickHint label="View Award Details" t={t}/>}
              </button>);})}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EVENTS ═══════ */
function Events({open,t,setGallery}){
  const [hov,setHov]=useState(null);
  const [ref,vis]=useReveal();
  return(
    <section id="events" style={{padding:"80px 1.5rem",background:t.bgAlt}}>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:"all 0.7s ease"}}>
        <STitle title="Events" sub="Conferences · Summits · Workshops — Past & Upcoming" skey="events" open={open} t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
          {EVENTS.map(ev=>{
            const ph=ev.status==="placeholder",upcoming=ev.type==="upcoming",isHov=hov===ev.id;
            const coverImg=ev.image||(ev.images&&ev.images[0]?.src)||null;
            return(
              <div key={ev.id}>
                <button onClick={()=>open(ev)} onMouseEnter={()=>setHov(ev.id)} onMouseLeave={()=>setHov(null)}
                  style={{background:t.card,border:`${ph?"2px dashed":"1px solid"} ${isHov?t.accent:t.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",textAlign:"left",transition:"all 0.25s",display:"flex",flexDirection:"column",width:"100%",transform:isHov?"translateY(-5px)":"none",boxShadow:isHov?t.shadow:"none"}}>
                  {/* Cover image - clickable to gallery */}
                  <div onClick={e=>{if(ev.images&&ev.images.length>0){e.stopPropagation();setGallery({images:ev.images,title:ev.title});}}} style={{height:150,background:coverImg?`url(${coverImg}) center/cover no-repeat`:`linear-gradient(135deg,${t.aLight} 0%,${t.border}40 100%)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative",cursor:ev.images&&ev.images.length>0?"pointer":"default"}}>
                    {!coverImg&&<div style={{textAlign:"center",color:t.muted}}><div style={{fontSize:30}}>{upcoming?"📅":"📸"}</div><div style={{fontSize:11,marginTop:4}}>{upcoming?"Upcoming":"Add Photo"}</div></div>}
                    {upcoming&&<span style={{position:"absolute",top:8,right:8,background:"#16a34a",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:999}}>UPCOMING</span>}
                    {ev.images&&ev.images.length>1&&<span style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.6)",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:999,backdropFilter:"blur(4px)"}}>{ev.images.length} 📷</span>}
                  </div>
                  <div style={{padding:"1rem",flex:1,display:"flex",flexDirection:"column",gap:3}}>
                    <h3 style={{margin:0,fontSize:13,fontWeight:800,color:ph?t.muted:t.text}}>{ev.title}</h3>
                    <p style={{margin:0,fontSize:12,color:t.accent,fontWeight:700}}>{ev.org}</p>
                    <p style={{margin:0,fontSize:11,color:t.muted}}>{ev.date} · {ev.loc}</p>
                    {!ph&&<p style={{margin:"4px 0 0",fontSize:12,color:t.muted,lineHeight:1.5,flex:1}}>{ev.desc}</p>}
                    {ph?<p style={{margin:"6px 0 0",fontSize:11,color:t.muted,fontStyle:"italic"}}>Placeholder — add event details</p>
                      :<div style={{marginTop:8}}><ClickHint t={t}/></div>}
                  </div>
                </button>
              </div>);})}
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
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.06});
    obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return [ref,vis];
}

/* ═══════ CONTACT SECTION (with single CTA) ═══════ */
function Contact({t,openContact}){
  return(
    <section style={{padding:"80px 1.5rem",background:t.accent,textAlign:"center"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:900,color:"#fff",margin:"0 0 14px"}}>Let's Work Together</h2>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:15,lineHeight:1.8,marginBottom:36}}>
          Seeking Mechanical Engineering SIWES/internships (Nigeria &amp; abroad) in manufacturing, production, or mechanical systems — and AI workflow roles where I help organizations build efficiency at scale.
        </p>

        {/* Single Get in Touch CTA */}
        <button onClick={openContact} style={{background:"#fff",color:t.accent,padding:"14px 36px",borderRadius:12,fontWeight:800,fontSize:15,border:"none",cursor:"pointer",boxShadow:"0 8px 32px rgba(0,0,0,0.2)",transition:"all 0.25s",marginBottom:28}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.3)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.2)";}}>
          Get in Touch
        </button>

        {/* Small footer icons that also open contact modal */}
        <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
          {[{icon:"📧",label:"Email"},{icon:"💬",label:"WhatsApp"},{icon:"🔗",label:"LinkedIn"},{icon:"🐙",label:"GitHub"}].map(item=>(
            <button key={item.label} onClick={openContact} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:999,padding:"8px 16px",cursor:"pointer",color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600,transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>© 2026 Ibukunoluwa J. Oluwafemi · IBK &amp; Co. · Built in React.</p>
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
  const [contactOpen,setContactOpen]=useState(false);
  const [gallery,setGallery]=useState(null);
  const t=mkT(dark);
  const open=useCallback((data)=>setModal(data),[]);
  const close=useCallback(()=>setModal(null),[]);
  const openContact=useCallback(()=>setContactOpen(true),[]);
  const closeContact=useCallback(()=>setContactOpen(false),[]);

  useEffect(()=>{
    const style=document.createElement("style");
    style.id="ibk-animations";
    style.textContent=`
      *{scroll-behavior:smooth;box-sizing:border-box;}
      body{margin:0;padding:0;}
      @keyframes slideDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
      @keyframes spinRing{to{transform:rotate(360deg)}}
      @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes popIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:none}}
      @keyframes cardPulse{0%,100%{box-shadow:0 0 0 0 rgba(13,148,136,0.0)}70%{box-shadow:0 0 0 6px rgba(13,148,136,0.12)}}
      .reveal{animation:fadeUp 0.65s ease both;}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:transparent;}
      ::-webkit-scrollbar-thumb{background:rgba(13,148,136,0.4);border-radius:99px;}
      ::selection{background:rgba(13,148,136,0.25);color:inherit;}
      a,button{-webkit-tap-highlight-color:transparent;}
      button:focus-visible,a:focus-visible{outline:2px solid rgba(13,148,136,0.6);outline-offset:2px;}
      .click-hint{transition:opacity 0.2s;}
      button:hover .click-hint{opacity:1;}
      @media(hover:none){
        .click-hint{opacity:0.85;}
      }
    `;
    if(!document.getElementById("ibk-animations")) document.head.appendChild(style);
    return()=>document.getElementById("ibk-animations")?.remove();
  },[]);

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",lineHeight:1.6}}>
      <Nav dark={dark} toggle={()=>setDark(d=>!d)} t={t} open={open}/>
      <main>
        <Hero open={open} t={t} dark={dark} openContact={openContact}/>
        <About t={t}/>
        <SectionSep t={t}/>
        <Skills open={open} t={t}/>
        <SectionSep t={t}/>
        <Projects open={open} t={t} setGallery={setGallery}/>
        <SectionSep t={t}/>
        <Experience open={open} t={t}/>
        <SectionSep t={t}/>
        <Education open={open} t={t}/>
        <SectionSep t={t}/>
        <Awards open={open} t={t}/>
        <SectionSep t={t}/>
        <Certificates open={open} t={t}/>
        <SectionSep t={t}/>
        <Events open={open} t={t} setGallery={setGallery}/>
        <Contact t={t} openContact={openContact}/>
      </main>
      {modal&&<Modal data={modal} onClose={close} t={t} openGallery={modal.images&&modal.images.length>0?()=>setGallery({images:modal.images,title:modal.modal?.title||modal.title}):null}/>}
      {contactOpen&&<ContactModal onClose={closeContact} t={t}/>}
      {gallery&&<GalleryModal images={gallery.images} title={gallery.title} onClose={()=>setGallery(null)} t={t}/>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AI_OPINION — Engineering Feedback & Risk Assessment
   ═══════════════════════════════════════════════════════════════════

1. GALLERY IMAGES ARE PLACEHOLDERS
   All project and event image paths (e.g., /projects/maize-sheller.jpg)
   are placeholder paths. You MUST add actual images to your public/
   folder or hosting CDN. Without real images, gallery buttons will
   show fallback states. This is the #1 priority for credibility.

2. MISSING /Resumé.pdf PATH
   The résumé download link points to "/Resumé.pdf". Ensure this file
   exists in your public folder. Consider generating a PDF from the
   ATS-optimized HTML résumé provided alongside this file.

3. NAVBAR WIDTH ON VERY SMALL SCREENS
   The pill navbar uses max-width: calc(100vw - 32px) which is safe,
   but at widths below ~360px, the "IBK&Co." brand + hamburger may
   still feel tight. Test on iPhone SE (375px width). If needed,
   reduce brand font-size to 15px and hamburger padding further.

4. PERFORMANCE: LAZY IMAGE LOADING
   The gallery loads images only when opened (good), but the cover
   thumbnails in project cards load immediately. If you add many
   high-res images, use loading="lazy" on thumbnail <img> tags and
   consider compressing to WebP format.

5. ACCESSIBILITY: GALLERY ALT TEXT
   Every gallery image should have descriptive alt text. The data
   structure supports this — fill in the "alt" field for each image.
   This matters for screen readers and SEO.

6. CONTACT MODAL: CLIPBOARD API
   The copy-to-clipboard uses navigator.clipboard which requires
   HTTPS in production. If hosting on HTTP (unlikely in 2026), the
   copy buttons will silently fail. Add a try/catch fallback using
   document.execCommand('copy') if needed.

7. SEO / META TAGS MISSING
   Add <meta> tags for description, Open Graph, and Twitter Cards
   in your index.html. Include keywords: "Mechanical Engineering",
   "SIWES Internship", "Fabrication", "Manufacturing", your name.

8. GOOGLE ANALYTICS / PLAUSIBLE
   Consider adding lightweight analytics to track which sections
   recruiters engage with most. This data helps you iterate.

9. RÉSUMÉ DELIVERABLE
   The résumé has been output as an ATS-optimized HTML file
   (resume_ats.html). Open it in a browser, verify formatting, then
   print-to-PDF (Chrome: Ctrl+P → Save as PDF → Margins: Default).
   Test the PDF in an ATS parser like Jobscan or Resume Worded.

10. STRENGTH OF CURRENT POSITIONING
    Your portfolio now correctly positions Mechanical Engineering as
    primary and AI as a force-multiplier. The SIWES badge, 4.32 CGPA
    prominence, and fabrication storytelling through the gallery
    system give you a strong differentiation vs. typical student
    portfolios. The biggest remaining variable is image quality.

RISK LEVEL: LOW (pending real images and PDF résumé upload)
   ═══════════════════════════════════════════════════════════════════
*/
