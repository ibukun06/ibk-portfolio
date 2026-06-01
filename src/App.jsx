import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   IBK & Co. Portfolio v2.0 — Full Redesign
   Design system: Dark-first engineering aesthetic
   Accent: Electric teal #0ea5e9 / amber #f59e0b secondary
   Font: Syne (display) + DM Sans (body)
   ═══════════════════════════════════════════════════════════════════ */

/* ═══════ DATA — edit here to update your portfolio ═══════ */
const P = {
  name:"Ibukunoluwa J. Oluwafemi", nick:"IBK",
  titles:["Mechanical Engineering Student","Fabrication & Workshop Trained","AI Workflow Optimizer"],
  tagline:"I weld steel frames, design in AutoCAD, and use AI to build production tools — a mechanical engineer who ships at the speed of software.",
  summary:"Mechanical Engineering student at Redeemer's University (CGPA 4.32/5.00) with hands-on fabrication experience: SMAW welding, lathe, milling, drilling, and machine operations through SWEP. Used AI-assisted development to design and ship three live web applications for the RUNSA Legislative Summit 2026 — serving 611 registered delegates with zero data loss. SAT 1360/1600 (90th percentile, Math 710). Seeking SIWES/engineering internships in manufacturing, production, or mechanical systems — and AI workflow roles where I help organizations identify and implement tools that cut costs and increase efficiency.",
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
    {value:"3",label:"Live Apps",sub:"Built Solo",detail:"Registration Portal, Live Agenda, ID Card Generator — shipped in under 10 weeks as sole developer."},
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
  {id:"proj-management",icon:"📋",cat:"Professional Competencies",title:"Project Management & Coordination",level:"Applied",
    modal:{tag:"Professional",title:"Project Management & Coordination",subtitle:"Applied across multiple campus initiatives",
      pts:["Supervised committee operations as RUNSA Chief Whip","Managed structured workflows as a Main Teams Officer for the Protocol Team (RPT)","Maintained strict time management and adaptability in fast-paced student governance environments"]}},
  {id:"communication",icon:"🗣️",cat:"Professional Competencies",title:"Analytical & Communication Skills",level:"Endorsed",
    modal:{tag:"Professional",title:"Analytical & Interpersonal Communication",subtitle:"Backed by LinkedIn endorsements and practical application",
      pts:["Demonstrated cognitive flexibility and problem-solving in high-stakes environments","Leveraged research skills for academic and committee work","Applied effective teamwork and interpersonal skills across SPE, RPT, and RUNSA leadership"]}},
];

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
  {id:"rpt",icon:"🛡️",tag:"Operations",title:"Main Teams & Probation Officer",org:"Redeemer's University Protocol Team (RPT)",
    period:"Jan 2026 – Present",loc:"Hybrid / On-site",
    modal:{tag:"Operations & Coordination",title:"Protocol Team Officer",subtitle:"Redeemer's University Protocol Team (RPT) · Jan 2026 – Present",
      pts:["Promoted to Main Teams Officer in May 2026 after successful 5-month probation","Demonstrated high adaptability and communication in managing university protocols","Coordinated structural logistics and team operations"]}},
  {id:"campor",icon:"🏕️",tag:"Outreach",title:"Campus Ambassador",org:"Campor",
    period:"Dec 2025 – Present",loc:"Redeemer's University",
    modal:{tag:"Outreach",title:"Campus Ambassador — Campor",subtitle:"Dec 2025 – Present",
      pts:["Act as a primary liaison between the student body and the Campor platform","Drive engagement and peer-to-peer marketing initiatives"]}},
  {id:"haayaa",icon:"👔",tag:"Outreach",title:"Student Ambassador",org:"Haayaa",
    period:"Feb 2026 – Present",loc:"Nigeria",
    modal:{tag:"Outreach",title:"Student Ambassador — Haayaa",subtitle:"Feb 2026 – Present",
      pts:["Represent the brand on campus, facilitating student adoption and engagement","Leverage communication skills to build platform awareness"]}},
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

const CERTIFICATES=[
  {id:"prog",status:"earned",icon:"💻",title:"Fundamentals of Programming",issuer:"Programming Hero",year:"2020",
    credentialId:null,verifyUrl:null,
    topics:["Data Structures","Algorithms","Conditionals"],
    skills:["Problem-solving","Algorithmic thinking","Basic coding"],
    images:[{src:"/certificates/programming-hero.jpg",caption:"Fundamentals of Programming Certificate",alt:"Programming Hero Certificate"}],
    modal:{tag:"Earned · 2020",title:"Fundamentals of Programming",subtitle:"Programming Hero · 2020",
      pts:["Data Structures & memory management","Algorithms and computational complexity basics","Loops, conditionals, and control flow","Foundational programming concepts and problem-solving methodology"]}},
  {id:"hp-leadership",status:"earned",icon:"🏆",title:"Effective Leadership",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"626c9fdd-0691-4f57-9eb2-1ec155cdb095",verifyUrl:"https://www.life-global.org",
    topics:["Leadership Strategies","Ethics in Leadership","Team Management"],
    skills:["Leadership","Ethical decision-making","Team coordination"],
    images:[{src:"/certificates/hp-leadership.jpg",caption:"HP LIFE Effective Leadership Certificate",alt:"Effective Leadership Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Effective Leadership",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Effective Leadership course, covering leadership theory, strategy selection, and ethical decision-making in professional environments.",
      pts:["Effective leadership frameworks and their strategic application","Adapting leadership style to team and situational context","Ethics and integrity as core pillars of leadership","Credential ID: 626c9fdd-0691-4f57-9eb2-1ec155cdb095"]}},
  {id:"hp-entrepreneurship",status:"earned",icon:"🚀",title:"Social Entrepreneurship",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"e820d6c9-2919-4911-b9f4-1f737434fd89",verifyUrl:"https://www.life-global.org",
    topics:["Social Enterprise","Stakeholder Analysis","Impact Measurement"],
    skills:["Entrepreneurial thinking","Stakeholder analysis","Business impact assessment"],
    images:[{src:"/certificates/hp-entrepreneurship.jpg",caption:"HP LIFE Social Entrepreneurship Certificate",alt:"Social Entrepreneurship Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Social Entrepreneurship",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Social Entrepreneurship course covering sustainable social enterprise development and impact measurement.",
      pts:["Assessing the sustainability and viability of social enterprise ideas","Using stakeholder analysis to evaluate business need and community fit","Measuring and communicating business impact","Credential ID: e820d6c9-2919-4911-b9f4-1f737434fd89"]}},
  {id:"hp-design",status:"earned",icon:"💡",title:"Design Thinking",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"044c5743-5e9b-4393-923f-885fb9bc5f72",verifyUrl:"https://www.life-global.org",
    topics:["Problem Definition","Customer Feedback","Solution Design"],
    skills:["Design thinking","Problem framing","Human-centred design"],
    images:[{src:"/certificates/hp-design-thinking.jpg",caption:"HP LIFE Design Thinking Certificate",alt:"Design Thinking Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Design Thinking",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Design Thinking course, covering the full design thinking process from problem definition to solution iteration.",
      pts:["Applying the design thinking process to real-world challenges","Defining problem statements with precision and user-centricity","Using customer feedback to iterate and improve solutions","Credential ID: 044c5743-5e9b-4393-923f-885fb9bc5f72"]}},
  {id:"hp-ai",status:"earned",icon:"🤖",title:"AI for Business Professionals",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"c7c8bf97-70d4-4f88-b3b9-1fbe2836b824",verifyUrl:"https://www.life-global.org",
    topics:["AI in Business","Prompt Crafting","Ethical AI Use"],
    skills:["AI tools","Prompt engineering","AI ethics"],
    images:[{src:"/certificates/hp-ai-business.jpg",caption:"HP LIFE AI for Business Professionals Certificate",alt:"AI for Business Professionals Certificate"}],
    modal:{tag:"Earned · May 2026",title:"AI for Business Professionals",subtitle:"HP LIFE · HP Foundation · Presented 19 May 2026",
      desc:"Completed HP LIFE's AI for Business Professionals course, covering practical AI tool use, prompt engineering, and ethical considerations for professionals.",
      pts:["AI's role in modern business operations and decision-making","Difference between standalone AI tools and integrated AI features","Crafting effective prompts for professional outputs","Ethical use of AI and managing bias in AI-generated content","Credential ID: c7c8bf97-70d4-4f88-b3b9-1fbe2836b824"]}},
  {id:"hp-email",status:"earned",icon:"📧",title:"Business Email",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"a060a394-306f-4d35-82a8-d1448a4a389a",verifyUrl:"https://www.life-global.org",
    topics:["Email Structure","Professional Writing","Business Communication"],
    skills:["Professional writing","Business communication","Email etiquette"],
    images:[{src:"/certificates/hp-business-email.jpg",caption:"HP LIFE Business Email Certificate",alt:"Business Email Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Business Email",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      pts:["Structural elements of effective business emails","Developing clear, concise, and action-oriented professional emails","Applying email communication across different professional scenarios","Credential ID: a060a394-306f-4d35-82a8-d1448a4a389a"]}},
  {id:"hp-critical",status:"earned",icon:"🧠",title:"Critical Thinking in the AI Era",issuer:"HP LIFE (HP Foundation)",year:"2026",
    credentialId:"6c8953d2-459f-43e0-be87-297f09838df6",verifyUrl:"https://www.life-global.org",
    topics:["Critical Thinking","AI Bias","Fact-Checking"],
    skills:["Critical thinking","Bias mitigation","Information verification"],
    images:[{src:"/certificates/hp-critical-thinking.jpg",caption:"HP LIFE Critical Thinking in the AI Era Certificate",alt:"Critical Thinking Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Critical Thinking in the AI Era",subtitle:"HP LIFE · HP Foundation · Presented 20 May 2026",
      desc:"Completed HP LIFE's Critical Thinking in the AI Era course, covering decision-making frameworks and tools for navigating AI-generated information.",
      pts:["Applying critical thinking frameworks to improve professional decisions","Understanding how AI-generated content can distort or misrepresent information","Strategies to counteract cognitive biases in decision-making","Practical tools and workflows for fact-checking AI-generated content","Credential ID: 6c8953d2-459f-43e0-be87-297f09838df6"]}},
  {id:"ai-intro",status:"earned",icon:"🧩",title:"Purpose-Driven AI: Introduction to Artificial Intelligence",issuer:"Faith Leads University (Grow with Google Partner)",year:"2026",
    credentialId:"8487641051OI",verifyUrl:null,
    topics:["AI Foundations","Machine Learning","AI Ethics"],
    skills:["AI fundamentals","Machine learning concepts","Responsible AI"],
    images:[{src:"/certificates/purpose-driven-ai.jpg",caption:"Purpose-Driven AI Certificate",alt:"Purpose-Driven AI Certificate"}],
    modal:{tag:"Earned · May 2026",title:"Purpose-Driven AI: Introduction to Artificial Intelligence",subtitle:"Faith Leads University · Grow with Google Partner · 28 May 2026",
      pts:["Foundational concepts of artificial intelligence and machine learning","AI applications across industries and professional contexts","Ethical considerations and responsible use of AI systems","Certificate Number: 8487641051OI"]}},
  {id:"ph1",status:"placeholder",icon:"📜",title:"Add Certificate",issuer:"Issuing Body",year:"—",topics:["Topic 1","Topic 2"],skills:[],
    modal:{tag:"Placeholder",title:"Add a Certificate Here",subtitle:"App.jsx → CERTIFICATES array → duplicate an earned entry",
      desc:"Set status:'earned' and fill in: id, title, issuer, year, credentialId, verifyUrl, topics, skills, and modal details."}},
];

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

/* ═══════ DESIGN TOKENS ═══════ */
const mkT = (d) => ({
  bg:         d ? "#070c14" : "#f4f5f7",
  bgAlt:      d ? "#0c1423" : "#eef0f4",
  bgGlass:    d ? "rgba(14,24,42,0.72)" : "rgba(255,255,255,0.78)",
  card:       d ? "#111927" : "#ffffff",
  cardHov:    d ? "#18273d" : "#f0f9ff",
  text:       d ? "#e8edf5" : "#0c1423",
  muted:      d ? "#7a8ca3" : "#5a6a7e",
  faint:      d ? "#3a4a5e" : "#c8d0da",
  accent:     "#0ea5e9",        // sky-500
  accentB:    "#f59e0b",        // amber-500 — secondary
  accentHex2: "#6366f1",        // indigo — tertiary
  aLight:     d ? "rgba(14,165,233,0.12)" : "rgba(14,165,233,0.09)",
  aBLight:    d ? "rgba(245,158,11,0.14)" : "rgba(245,158,11,0.09)",
  border:     d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
  borderHov:  d ? "rgba(14,165,233,0.4)" : "rgba(14,165,233,0.35)",
  nav:        d ? "rgba(7,12,20,0.88)" : "rgba(244,245,247,0.90)",
  shadow:     d ? "0 8px 40px rgba(0,0,0,0.6)" : "0 8px 40px rgba(0,0,0,0.10)",
  shadowAccent: "0 8px 32px rgba(14,165,233,0.28)",
  code:       d ? "#050e1c" : "#f0faf9",
  codeText:   d ? "#38bdf8" : "#0369a1",
  gridLine:   d ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)",
});

/* ═══════ GLOBAL STYLES INJECTION ═══════ */
function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.3); border-radius: 99px; }
      ::selection { background: rgba(14,165,233,0.22); }

      /* Focus ring */
      button:focus-visible, a:focus-visible { outline: 2px solid rgba(14,165,233,0.65); outline-offset: 3px; border-radius: 6px; }
      a, button { -webkit-tap-highlight-color: transparent; }

      /* Keyframes */
      @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
      @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
      @keyframes spinRing { to { transform:rotate(360deg) } }
      @keyframes spinRingRev { to { transform:rotate(-360deg) } }
      @keyframes pulseDot { 0%,100% { opacity:1;transform:scale(1) } 50% { opacity:0.5;transform:scale(0.8) } }
      @keyframes popIn { from { opacity:0;transform:scale(0.93) } to { opacity:1;transform:none } }
      @keyframes shimmer { 0% { background-position:200% 0 } 100% { background-position:-200% 0 } }
      @keyframes slideDown { from { opacity:0;transform:translateY(-14px) } to { opacity:1;transform:none } }
      @keyframes hexGlow { 0%,100% { filter:drop-shadow(0 0 8px rgba(14,165,233,0.4)) } 50% { filter:drop-shadow(0 0 20px rgba(14,165,233,0.8)) } }
      @keyframes scanline { 0% { transform:translateY(-100%) } 100% { transform:translateY(100%) } }
      @keyframes borderDash { to { stroke-dashoffset:0 } }

      /* Grid background pattern */
      .ibk-grid-bg {
        background-image:
          linear-gradient(var(--grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      /* Nav pill */
      #ibk-nav {
        transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        animation: slideDown 0.5s cubic-bezier(0.22,1,0.36,1) both;
      }

      /* Section reveal */
      .reveal-section { opacity:0; transform:translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
      .reveal-section.visible { opacity:1; transform:none; }

      /* Card hover lift */
      .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; cursor:pointer; }
      .card-lift:hover { transform: translateY(-4px) scale(1.01); }

      /* Hexagon clip */
      .hex-clip { clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%); }

      /* Skill badge */
      .skill-badge { transition: all 0.22s ease; }
      .skill-badge:hover { transform: translateY(-3px) scale(1.03); }

      /* Timeline dot */
      .timeline-dot { transition: transform 0.2s ease; }
      .timeline-entry:hover .timeline-dot { transform: scale(1.7); }

      /* Blink cursor */
      .blink { animation: pulseDot 1.1s ease infinite; }

      /* Click hint */
      .click-hint { opacity:0.7; transition: opacity 0.2s; }
      button:hover .click-hint { opacity:1; }
      @media(hover:none) { .click-hint { opacity:0.85; } }

      /* Shimmer skeleton */
      .shimmer {
        background: linear-gradient(90deg, transparent 25%, rgba(14,165,233,0.07) 50%, transparent 75%);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }

      /* Mobile menu */
      .mobile-menu { animation: popIn 0.2s ease both; }
    `}} />
  );
}

/* ═══════ SHARED PRIMITIVES ═══════ */

const Chip = ({ label, t, amber }) => (
  <span style={{
    background: amber ? t.aBLight : t.aLight,
    color: amber ? t.accentB : t.accent,
    padding: "2px 10px", borderRadius: 999,
    fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap",
    display: "inline-block", letterSpacing: "0.2px",
    fontFamily: "'DM Sans', sans-serif",
  }}>{label}</span>
);

const ClickHint = ({ label = "Details", t }) => (
  <span className="click-hint" style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: "0.6px",
    textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
  }}>
    {label} <span style={{ fontSize: 9 }}>↗</span>
  </span>
);

const SectionTag = ({ label, t }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    background: t.aLight, border: `1px solid ${t.accent}30`,
    borderRadius: 999, padding: "5px 16px", marginBottom: 16,
    fontSize: 11, fontWeight: 700, color: t.accent,
    letterSpacing: "1.2px", textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
    {label}
  </div>
);

function SectionTitle({ title, sub, skey, open, t }) {
  return (
    <div style={{ marginBottom: 52, textAlign: "center" }}>
      <button onClick={() => open({ modal: SM[skey] })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <h2 style={{
          fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800,
          color: t.text, margin: "0 0 10px", letterSpacing: "-1.2px",
          lineHeight: 1.05, fontFamily: "'Syne', sans-serif",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          {title}
          <span style={{ color: t.accent, fontSize: "0.5em", opacity: 0.8 }}>↗</span>
        </h2>
      </button>
      {sub && <p style={{ color: t.muted, fontSize: 13, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
    </div>
  );
}

/* Divider with accent pip */
const Divider = ({ t }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,transparent,${t.border})` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent, opacity: 0.45 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,transparent,${t.border})` }} />
  </div>
);

/* ═══════ SCROLL REVEAL HOOK ═══════ */
function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ═══════ CONTACT MODAL ═══════ */
function ContactModal({ onClose, t }) {
  const [copied, setCopied] = useState(null);
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  const doCopy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2000); } catch (e) { }
  };

  const contacts = [
    { icon: "📚", label: "Academic / Internship", value: P.emailAcademic, href: `mailto:${P.emailAcademic}`, copyable: true },
    { icon: "👤", label: "Personal", value: P.emailPersonal, href: `mailto:${P.emailPersonal}`, copyable: true },
    { icon: "💬", label: "WhatsApp", value: "+234 708 057 2415", href: P.whatsapp, external: true },
    { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/ibk-co", href: P.linkedin, external: true },
    { icon: "🐙", label: "GitHub", value: "github.com/ibukun06", href: P.github, external: true },
    { icon: "📄", label: "Download Résumé", value: "Resumé.pdf", href: P.resume, download: true },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(12px)" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.card, color: t.text, borderRadius: 24,
        padding: "2rem", maxWidth: 430, width: "100%",
        maxHeight: "88vh", overflowY: "auto",
        boxShadow: `0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
        position: "relative", animation: "popIn 0.25s ease both",
        border: `1px solid ${t.border}`,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: t.bgAlt, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: t.muted, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ marginBottom: 24, paddingRight: 36 }}>
          <h2 style={{ margin: "0 0 5px", fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'Syne', sans-serif" }}>Let's connect</h2>
          <p style={{ margin: 0, color: t.muted, fontSize: 13 }}>I respond within 24 hours</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {contacts.map((c, i) => {
            const isCopied = copied === c.label;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: "10px 14px", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHov}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</div>
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer" : undefined} download={c.download} style={{ color: t.accent, fontSize: 13, fontWeight: 600, textDecoration: "none", wordBreak: "break-all" }}>{c.value}</a>
                </div>
                {c.copyable && (
                  <button onClick={() => doCopy(c.value, c.label)} style={{ background: isCopied ? "rgba(22,163,74,0.15)" : t.aLight, border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: isCopied ? "#22c55e" : t.accent, flexShrink: 0 }}>
                    {isCopied ? "✓" : "Copy"}
                  </button>
                )}
                {c.external && <span style={{ fontSize: 11, color: t.muted, flexShrink: 0 }}>↗</span>}
                {c.download && <span style={{ fontSize: 11, color: t.muted, flexShrink: 0 }}>↓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════ GALLERY LIGHTBOX ═══════ */
function GalleryModal({ images, title, onClose, t }) {
  const [idx, setIdx] = useState(0);
  const [touchX, setTouchX] = useState(null);
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIdx(i => Math.min(images.length - 1, i + 1));
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, images.length]);

  if (!images || images.length === 0) return null;
  const cur = images[idx];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 10001, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}
        onTouchStart={e => setTouchX(e.changedTouches[0].screenX)}
        onTouchEnd={e => {
          const endX = e.changedTouches[0].screenX;
          if (touchX !== null && endX < touchX - 40 && idx < images.length - 1) setIdx(idx + 1);
          if (touchX !== null && endX > touchX + 40 && idx > 0) setIdx(idx - 1);
          setTouchX(null);
        }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 999, padding: "8px 16px", cursor: "pointer", color: "#fff", fontSize: 16, backdropFilter: "blur(8px)", zIndex: 10 }}>✕ Close</button>
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.08)", color: "#fff", padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, backdropFilter: "blur(8px)", zIndex: 10 }}>{idx + 1} / {images.length}</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "60px 20px 20px" }}>
          <img src={cur.src} alt={cur.alt || cur.caption || title} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)", objectFit: "contain", borderRadius: 8, boxShadow: "0 8px 48px rgba(0,0,0,0.6)", animation: "fadeIn 0.3s ease both" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
          <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🖼️</div>
            <div>Add photo: {cur.src}</div>
          </div>
        </div>
        {cur.caption && <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, padding: "8px 20px", textAlign: "center", maxWidth: 600 }}>{cur.caption}</div>}
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx(Math.max(0, idx - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 999, padding: "12px 16px", cursor: "pointer", color: "#fff", fontSize: 20, opacity: idx > 0 ? 1 : 0.2, transition: "opacity 0.2s" }}>←</button>
            <button onClick={() => setIdx(Math.min(images.length - 1, idx + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 999, padding: "12px 16px", cursor: "pointer", color: "#fff", fontSize: 20, opacity: idx < images.length - 1 ? 1 : 0.2, transition: "opacity 0.2s" }}>→</button>
          </>
        )}
        {images.length > 1 && (
          <div style={{ display: "flex", gap: 6, padding: "12px 0 24px" }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", background: i === idx ? "#0ea5e9" : "rgba(255,255,255,0.25)", transition: "all 0.25s" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════ DETAIL MODAL ═══════ */
function Modal({ data, onClose, t, openGallery }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);
  const m = data?.modal; if (!m) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(12px)" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.card, color: t.text, borderRadius: 20,
        padding: "2rem", maxWidth: 600, width: "100%",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${t.border}`,
        position: "relative", animation: "popIn 0.22s ease both",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: t.bgAlt, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: t.muted, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ marginBottom: 20, paddingRight: 40 }}>
          {m.tag && <span style={{ background: t.aLight, color: t.accent, padding: "3px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, display: "inline-block", marginBottom: 12, letterSpacing: "0.5px" }}>{m.tag}</span>}
          <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: "-0.5px", fontFamily: "'Syne', sans-serif" }}>{m.title}</h2>
          {m.subtitle && <p style={{ margin: 0, color: t.muted, fontSize: 13, lineHeight: 1.6 }}>{m.subtitle}</p>}
        </div>
        {m.desc && <p style={{ color: t.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>{m.desc}</p>}
        {m.ptsLabel && <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: t.text }}>{m.ptsLabel}</p>}
        {m.pts && (
          <ul style={{ margin: "0 0 20px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {m.pts.map((pt, i) => (
              <li key={i} style={{ color: t.muted, fontSize: 14, lineHeight: 1.7, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: t.accent, fontSize: 10, marginTop: 5, flexShrink: 0 }}>▸</span>
                {pt}
              </li>
            ))}
          </ul>
        )}
        {m.specs && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <tbody>{m.specs.map((s, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
                <td style={{ padding: "9px 12px 9px 0", fontWeight: 700, fontSize: 13, color: t.text, width: 165, verticalAlign: "top" }}>{s.l}</td>
                <td style={{ padding: "9px 0", fontSize: 13, color: t.muted }}>{s.v}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {m.code && (
          <pre style={{ background: t.code, border: `1px solid ${t.border}`, borderRadius: 12, padding: "1rem", overflowX: "auto", fontSize: 12, lineHeight: 1.8, color: t.codeText, fontFamily: "'Fira Code','Courier New',monospace", margin: "0 0 20px" }}>{m.code}</pre>
        )}
        {m.tags && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>{m.tags.map(tag => <Chip key={tag} label={tag} t={t} />)}</div>}
        {m.links && (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
            {m.links.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ color: t.accent, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{l.label} ↗</a>)}
          </div>
        )}
        {openGallery && data?.images && data.images.length > 0 && (
          <button onClick={openGallery} style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, background: t.aLight, border: `1px solid ${t.accent}35`, borderRadius: 10, padding: "9px 16px", cursor: "pointer", color: t.accent, fontSize: 12, fontWeight: 700, width: "100%", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = t.borderHov + "18"}
            onMouseLeave={e => e.currentTarget.style.background = t.aLight}>
            🖼️ View Gallery ({data.images.length} {data.images.length === 1 ? "image" : "images"})
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════ NAVBAR ═══════ */
function Nav({ dark, toggle, t, open }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 860 : false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["skills", "projects", "experience", "education", "certificates", "awards", "events"];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(s); break; }
      }
    };
    const onResize = () => setMobile(window.innerWidth < 860);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const links = ["Skills", "Projects", "Experience", "Education", "Certificates", "Awards", "Events"];
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="ibk-nav" style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 200, background: t.nav, backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${scrolled ? t.accent + "25" : t.border}`,
        borderRadius: 999, padding: "0 6px", height: 52,
        display: "flex", alignItems: "center",
        width: "max-content", maxWidth: "calc(100vw - 32px)",
        boxShadow: scrolled ? `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${t.accent}15` : "0 2px 16px rgba(0,0,0,0.1)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2, height: "100%" }}>
          {/* Brand */}
          <button onClick={() => open({ modal: { tag: "Mechanical Engineer · AI Builder", title: "IBK & Co.", subtitle: P.location + " · Open to SIWES & Engineering Internships", desc: P.summary, links: [{ label: "Download Résumé", url: P.resume }, { label: "LinkedIn", url: P.linkedin }, { label: "GitHub", url: P.github }] } })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0 14px 0 10px", height: "100%", display: "flex", alignItems: "center", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>
              <span style={{ color: t.accent }}>IBK</span><span style={{ color: t.text }}>&amp;Co.</span>
            </span>
          </button>

          {!mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 1, height: "100%", borderLeft: `1px solid ${t.border}`, paddingLeft: 4 }}>
              {links.map(l => {
                const isActive = active === l.toLowerCase();
                return (
                  <a key={l} href={`#${l.toLowerCase()}`}
                    style={{ color: isActive ? t.accent : t.muted, textDecoration: "none", fontSize: 12, padding: "5px 9px", borderRadius: 999, fontWeight: isActive ? 700 : 500, transition: "all 0.2s", background: isActive ? t.aLight : "none" }}
                    onMouseEnter={e => { e.target.style.color = t.accent; e.target.style.background = t.aLight; }}
                    onMouseLeave={e => { e.target.style.color = isActive ? t.accent : t.muted; e.target.style.background = isActive ? t.aLight : "none"; }}>
                    {l}
                  </a>
                );
              })}
              <div style={{ width: 1, height: 22, background: t.border, margin: "0 4px" }} />
              <button onClick={toggle} title="Toggle theme" style={{ background: "none", border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 10px", color: t.text, fontSize: 14, transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = t.aLight}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                {dark ? "☀️" : "🌙"}
              </button>
              <a href={P.resume} download style={{ background: t.accent, color: "#fff", padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, textDecoration: "none", marginLeft: 2, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Résumé ↓
              </a>
            </div>
          )}

          {mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 4, height: "100%" }}>
              <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 10px", color: t.text, fontSize: 13 }}>{dark ? "☀️" : "🌙"}</button>
              <button onClick={() => setMenuOpen(o => !o)} style={{ background: menuOpen ? t.aLight : "none", border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 12px", color: t.text, fontSize: 15, fontWeight: 700, transition: "all 0.2s" }}>
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          )}
        </div>
      </nav>

      {mobile && menuOpen && (
        <div className="mobile-menu" style={{ position: "fixed", top: 78, left: 16, right: 16, zIndex: 199, background: t.nav, backdropFilter: "blur(24px)", border: `1px solid ${t.border}`, borderRadius: 20, padding: "1rem", boxShadow: t.shadow, fontFamily: "'DM Sans', sans-serif" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: t.text, textDecoration: "none", fontSize: 15, padding: "11px 8px", borderBottom: `1px solid ${t.border}`, fontWeight: 600, transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = t.accent}
              onMouseLeave={e => e.currentTarget.style.color = t.text}>
              {l}<span style={{ color: t.accent, fontSize: 12 }}>→</span>
            </a>
          ))}
          <a href={P.resume} download onClick={closeMenu} style={{ display: "block", marginTop: 12, background: t.accent, color: "#fff", padding: "11px 0", borderRadius: 12, textAlign: "center", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Download Résumé</a>
        </div>
      )}
    </>
  );
}

/* ═══════ HERO ═══════ */
function Hero({ open, t, dark, openContact }) {
  const [ti, setTi] = useState(0);
  const [avatarHov, setAvatarHov] = useState(false);
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 640 : false);

  useEffect(() => {
    const id = setInterval(() => setTi(i => (i + 1) % P.titles.length), 2800);
    const onResize = () => setMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => { clearInterval(id); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section id="hero" style={{
      paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden",
      background: dark
        ? "linear-gradient(160deg,#060b12 0%,#091523 45%,#060b12 100%)"
        : "linear-gradient(160deg,#f0f4f8 0%,#e8f4fc 45%,#f4f5f7 100%)",
      fontFamily: "'DM Sans', sans-serif",
      "--grid": t.gridLine,
    }}>

      {/* Grid background */}
      <div className="ibk-grid-bg" style={{ position: "absolute", inset: 0, opacity: 1, pointerEvents: "none" }} />

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,rgba(14,165,233,0.09),transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-5%", left: "5%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle,rgba(99,102,241,0.07),transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,rgba(245,158,11,0.05),transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1, textAlign: "center" }}>

        {/* Availability badge */}
        <div style={{ animation: "fadeUp 0.6s 0.1s ease both", display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.28)", borderRadius: 999, padding: "5px 18px", marginBottom: 40, fontSize: 12, fontWeight: 700, color: "#22c55e", letterSpacing: "0.3px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0, animation: "pulseDot 2s ease infinite" }} />
          Available for SIWES / Engineering Internship
        </div>

        {/* HEXAGONAL AVATAR — engineering-themed frame */}
        <div style={{ margin: "0 auto 36px", width: 164, height: 164, position: "relative", animation: "fadeUp 0.7s 0.2s ease both" }}>
          {/* Outer rotating dashed ring */}
          <svg style={{ position: "absolute", inset: -18, width: "calc(100% + 36px)", height: "calc(100% + 36px)", animation: "spinRing 16s linear infinite", pointerEvents: "none" }} viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke={t.accent} strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.4" />
          </svg>
          {/* Inner counter-rotating ring */}
          <svg style={{ position: "absolute", inset: -8, width: "calc(100% + 16px)", height: "calc(100% + 16px)", animation: "spinRingRev 10s linear infinite", pointerEvents: "none" }} viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="82" fill="none" stroke={t.accentB} strokeWidth="0.8" strokeDasharray="2 10" strokeOpacity="0.35" />
          </svg>
          {/* Hex frame */}
          <div className="hex-clip" style={{
            width: "100%", height: "100%", position: "relative",
            background: `conic-gradient(${t.accent},${t.accentHex2},${t.accentB},${t.accent})`,
            padding: 3, transition: "transform 0.4s ease",
            transform: avatarHov ? "scale(1.07)" : "scale(1)",
            animation: "float 5s ease-in-out infinite",
            cursor: "pointer",
          }}
            onMouseEnter={() => setAvatarHov(true)} onMouseLeave={() => setAvatarHov(false)}>
            <div className="hex-clip" style={{ width: "100%", height: "100%", overflow: "hidden", background: t.card }}>
              {P.photo
                ? <img src={P.photo} alt="IBK" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${t.accent},${t.accentHex2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif" }}>IBK</div>}
            </div>
          </div>
          {/* Glow when hovered */}
          {avatarHov && <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle,${t.accent}30,transparent 70%)`, pointerEvents: "none", animation: "fadeIn 0.3s ease" }} />}
        </div>

        {/* Name */}
        <h1 style={{ fontSize: "clamp(2rem,5.5vw,3.4rem)", fontWeight: 800, margin: "0 0 8px", color: t.text, letterSpacing: "-1.5px", lineHeight: 1.08, animation: "fadeUp 0.7s 0.3s ease both", fontFamily: "'Syne', sans-serif" }}>{P.name}</h1>

        {/* Role subtitle */}
        <p style={{ fontSize: 13, fontWeight: 700, color: t.accent, margin: "0 0 14px", letterSpacing: "1.5px", textTransform: "uppercase", animation: "fadeUp 0.7s 0.35s ease both" }}>
          Mechanical Engineering · B.Eng. · Redeemer's University
        </p>

        {/* Animated rotating title */}
        <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, overflow: "hidden", animation: "fadeUp 0.7s 0.4s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: t.accentB, display: "inline-block" }} />
            <p key={ti} style={{ fontSize: 14, fontWeight: 500, color: t.muted, margin: 0, letterSpacing: "0.2px", animation: "fadeUp 0.4s ease both", fontStyle: "italic" }}>{P.titles[ti]}</p>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: t.accentB, display: "inline-block" }} />
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 16, color: t.muted, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 44px", animation: "fadeUp 0.7s 0.5s ease both" }}>{P.tagline}</p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28, animation: "fadeUp 0.7s 0.6s ease both" }}>
          <a href={P.resume} download style={{
            background: `linear-gradient(135deg,${t.accent},#0284c7)`,
            color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14,
            textDecoration: "none", boxShadow: `0 4px 24px rgba(14,165,233,0.4)`, transition: "all 0.25s",
            letterSpacing: "0.2px",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(14,165,233,0.4)"; }}>
            ↓ Download Résumé
          </a>
          <a href="#projects" style={{ background: "none", color: t.text, padding: "12px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", border: `1px solid ${t.border}`, transition: "all 0.25s", backdropFilter: "blur(8px)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}>
            View Projects
          </a>
          <button onClick={openContact} style={{ background: "none", color: t.muted, padding: "12px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14, border: `1px solid ${t.border}`, cursor: "pointer", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.muted; }}>
            Get in Touch
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 10, animation: "fadeUp 0.7s 0.75s ease both" }}>
          {P.stats.map((s, i) => (
            <button key={s.value} onClick={() => open({ modal: { tag: "Quick Stat", title: s.value, subtitle: s.label, desc: s.detail } })}
              style={{
                background: t.bgGlass, backdropFilter: "blur(8px)",
                border: `1px solid ${t.border}`, borderRadius: 14,
                padding: "16px 10px 14px", cursor: "pointer", textAlign: "center",
                transition: "all 0.25s", animation: `fadeUp 0.5s ${0.75 + i * 0.08}s ease both`,
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent + "60"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(14,165,233,0.18)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: t.accent, lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: t.text, fontWeight: 600, marginTop: 5, lineHeight: 1.3 }}>{s.label}</div>
              {s.sub && <div style={{ fontSize: 10, color: t.muted, marginTop: 2 }}>{s.sub}</div>}
              <div className="click-hint" style={{ marginTop: 6, fontSize: 9, fontWeight: 700, color: t.accent, letterSpacing: "0.4px", textTransform: "uppercase" }}>tap ↗</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ ABOUT ═══════ */
function About({ t }) {
  const [ref, vis] = useReveal();
  return (
    <section style={{ padding: "56px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "all 0.75s ease" }}>
        <SectionTag label="About" t={t} />
        <p style={{ fontSize: 15.5, color: t.muted, lineHeight: 1.9, marginBottom: 32 }}>{P.summary}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {P.seeking.map(item => (
            <span key={item} style={{
              background: t.aLight, color: t.accent,
              padding: "7px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700,
              border: `1px solid ${t.accent}20`,
            }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ SKILLS ═══════ */
function Skills({ open, t }) {
  const cats = [...new Set(SKILLS.map(s => s.cat))];
  const [ref, vis] = useReveal();

  const catColors = {
    "Manufacturing & Fabrication": { bg: "rgba(245,158,11,0.1)", text: t.accentB, border: "rgba(245,158,11,0.25)" },
    "Engineering Software": { bg: t.aLight, text: t.accent, border: t.accent + "30" },
    "AI & Productivity": { bg: "rgba(99,102,241,0.1)", text: "#818cf8", border: "rgba(99,102,241,0.25)" },
    "Web Development": { bg: "rgba(34,197,94,0.1)", text: "#22c55e", border: "rgba(34,197,94,0.25)" },
    "Technical": { bg: t.aLight, text: t.accent, border: t.accent + "25" },
    "Leadership": { bg: "rgba(239,68,68,0.09)", text: "#f87171", border: "rgba(239,68,68,0.22)" },
    "Professional Competencies": { bg: "rgba(168,85,247,0.09)", text: "#c084fc", border: "rgba(168,85,247,0.22)" },
  };

  return (
    <section id="skills" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Technical Arsenal" sub="Click any skill card for full details" skey="skills" open={open} t={t} />
        {cats.map(cat => {
          const cc = catColors[cat] || { bg: t.aLight, text: t.accent, border: t.accent + "25" };
          return (
            <div key={cat} style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: cc.text, textTransform: "uppercase", letterSpacing: "2px" }}>{cat}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${cc.border},transparent)` }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 10 }}>
                {SKILLS.filter(s => s.cat === cat).map(skill => (
                  <button key={skill.id} onClick={() => open(skill)} className="card-lift"
                    style={{
                      background: t.card,
                      border: `1px solid ${skill.id === "ai" ? t.accent + "40" : t.border}`,
                      borderRadius: 14, padding: "18px 16px 14px", cursor: "pointer",
                      textAlign: "left", display: "flex", flexDirection: "column", gap: 5,
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cc.border.includes("rgba") ? cc.text + "60" : t.accent + "60"; e.currentTarget.style.boxShadow = `0 8px 32px ${cc.bg}`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = skill.id === "ai" ? t.accent + "40" : t.border; e.currentTarget.style.boxShadow = "none"; }}>
                    {/* Top color strip */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${cc.text},transparent)`, borderRadius: "14px 14px 0 0", opacity: 0.6 }} />
                    <span style={{ fontSize: 24 }}>{skill.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: t.text, lineHeight: 1.3 }}>{skill.title}</span>
                    <span style={{ fontSize: 10.5, color: cc.text, fontWeight: 700, background: cc.bg, padding: "2px 8px", borderRadius: 999, display: "inline-block", width: "fit-content" }}>{skill.level}</span>
                    <ClickHint t={t} />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════ PROJECTS ═══════ */
function Projects({ open, t, setGallery }) {
  const [ref, vis] = useReveal();
  return (
    <section id="projects" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Projects" sub="Click any project to view the full case study" skey="projects" open={open} t={t} />

        {/* Featured project */}
        {PROJECTS.filter(p => p.featured).map(p => (
          <div key={p.id} style={{ marginBottom: 20 }}>
            <button onClick={() => open(p)} style={{
              width: "100%", display: "block",
              background: `linear-gradient(140deg,${t.aLight} 0%,${t.card} 60%,${t.bgAlt} 100%)`,
              border: `1px solid rgba(14,165,233,0.25)`,
              borderRadius: 20, padding: "2.2rem", cursor: "pointer",
              textAlign: "left", transition: "all 0.28s", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 56px rgba(14,165,233,0.2)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.25)"; }}>

              {/* Background accent element */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle,rgba(14,165,233,0.07),transparent 70%)`, pointerEvents: "none" }} />

              <div style={{ position: "absolute", top: 16, right: 16 }}><ClickHint label="View Case Study" t={t} /></div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <Chip label="⭐ Featured Project" t={t} />
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "12px 0 5px", color: t.text, letterSpacing: "-0.6px", fontFamily: "'Syne', sans-serif" }}>{p.icon} {p.title}</h3>
                  <p style={{ color: t.muted, margin: 0, fontSize: 13 }}>{p.subtitle} · {p.period}</p>
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                    style={{ color: t.accent, fontSize: 12, fontWeight: 700, textDecoration: "none", border: `1px solid ${t.accent}40`, padding: "6px 16px", borderRadius: 9, flexShrink: 0, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = t.aLight; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
                    Live Site ↗
                  </a>
                )}
              </div>

              <p style={{ color: t.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>{p.summary}</p>

              {/* Gallery thumbnails */}
              {p.images && p.images.length > 0 && (
                <div onClick={e => { e.stopPropagation(); setGallery({ images: p.images, title: p.title }); }}
                  style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 4 }}>
                  {p.images.slice(0, 4).map((img, i) => (
                    <div key={i} style={{
                      width: 82, height: 58, borderRadius: 10, flexShrink: 0, cursor: "pointer",
                      background: `url(${img.src}) center/cover no-repeat, linear-gradient(135deg,${t.aLight},${t.bgAlt})`,
                      border: `1px solid ${t.border}`, position: "relative", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.borderColor = t.accent + "60"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = t.border; }}>
                      {i === 3 && p.images.length > 4 && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>+{p.images.length - 4}</div>}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", fontSize: 11, color: t.accent, fontWeight: 700, cursor: "pointer", flexShrink: 0, gap: 4 }}>
                    <span>Gallery ({p.images.length})</span><span>↗</span>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{p.tags.map(tag => <Chip key={tag} label={tag} t={t} />)}</div>
            </button>
          </div>
        ))}

        {/* Other projects grid — ENHANCED case study feel */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
          {PROJECTS.filter(p => !p.featured).map(p => (
            <button key={p.id} onClick={() => open(p)} className="card-lift"
              style={{
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 18, padding: 0, cursor: "pointer",
                textAlign: "left", display: "flex", flexDirection: "column",
                width: "100%", overflow: "hidden", position: "relative",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent + "55"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(14,165,233,0.14)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = "none"; }}>

              {/* Colored header bar */}
              <div style={{ height: 4, background: `linear-gradient(to right,${t.accent},${t.accentHex2})`, opacity: 0.7 }} />

              <div style={{ padding: "1.4rem" }}>
                {/* Gallery thumbnails row */}
                {p.images && p.images.length > 0 && (
                  <div onClick={e => { e.stopPropagation(); setGallery({ images: p.images, title: p.title }); }}
                    style={{ display: "flex", gap: 5, marginBottom: 14, cursor: "pointer" }}>
                    {p.images.slice(0, 3).map((img, i) => (
                      <div key={i} style={{ flex: 1, height: 44, borderRadius: 8, background: `url(${img.src}) center/cover no-repeat,${t.bgAlt}`, border: `1px solid ${t.border}` }} />
                    ))}
                    {p.images.length > 3 && <div style={{ width: 44, height: 44, borderRadius: 8, background: t.bgAlt, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: t.accent, fontWeight: 700, flexShrink: 0 }}>+{p.images.length - 3}</div>}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 26 }}>{p.icon}</span>
                  <span style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>{p.period}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 15, margin: "0 0 4px", color: t.text, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: t.accent, margin: "0 0 10px", fontWeight: 700 }}>{p.subtitle}</p>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.75, margin: "0 0 14px", flex: 1 }}>{p.summary}</p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {p.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} t={t} />)}
                </div>
                <ClickHint label="Full Case Study" t={t} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EXPERIENCE — enhanced timeline ═══════ */
function Experience({ open, t }) {
  const [hov, setHov] = useState(null);
  const [ref, vis] = useReveal();

  const tagColors = {
    "Engineering": t.accentB, "Student Govt": "#22c55e", "Fintech": "#a78bfa",
    "SPE": t.accent, "Operations": "#fb923c", "Outreach": "#f472b6", "Business": "#94a3b8",
  };

  return (
    <section id="experience" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 720, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Experience" sub="Click any entry for full details" skey="experience" open={open} t={t} />

        <div style={{ position: "relative", paddingLeft: 30 }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 6, top: 12, bottom: 12, width: 2, background: `linear-gradient(to bottom,${t.accent}80,${t.accentB}40,${t.border})`, borderRadius: 2 }} />

          {EXPERIENCE.map((ex, idx) => {
            const dotColor = tagColors[ex.tag] || t.accent;
            return (
              <button key={ex.id} onClick={() => open(ex)}
                onMouseEnter={() => setHov(ex.id)} onMouseLeave={() => setHov(null)}
                className="timeline-entry"
                style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", marginBottom: 14, position: "relative", animation: `fadeUp 0.5s ${0.1 + idx * 0.05}s ease both` }}>

                {/* Timeline dot */}
                <div className="timeline-dot" style={{
                  position: "absolute", left: -24, top: 20,
                  width: 12, height: 12, borderRadius: "50%",
                  background: dotColor, border: `2px solid ${t.bg}`,
                  zIndex: 1, boxShadow: hov === ex.id ? `0 0 0 4px ${dotColor}25` : "none",
                  transition: "all 0.2s",
                }} />

                <div style={{
                  background: t.card, border: `1px solid ${hov === ex.id ? dotColor + "50" : t.border}`,
                  borderRadius: 14, padding: "1rem 1.3rem", transition: "all 0.22s",
                  transform: hov === ex.id ? "translateX(6px)" : "none",
                  boxShadow: hov === ex.id ? `0 4px 20px ${dotColor}15` : "none",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                    <span style={{ background: dotColor + "18", color: dotColor, padding: "2px 10px", borderRadius: 999, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.3px" }}>{ex.tag}</span>
                    <span style={{ fontSize: 11, color: t.muted, fontWeight: 500 }}>{ex.period}</span>
                  </div>
                  <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Syne', sans-serif" }}>{ex.icon} {ex.title}</h3>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: t.muted }}>{ex.org} · {ex.loc}</p>
                  <ClickHint t={t} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EDUCATION ═══════ */
function Education({ open, t }) {
  const [hov, setHov] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section id="education" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 720, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Education" sub="Academic background & credentials" skey="education" open={open} t={t} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {EDUCATION.map((e, idx) => (
            <button key={e.id} onClick={() => open(e)}
              onMouseEnter={() => setHov(e.id)} onMouseLeave={() => setHov(null)}
              style={{
                background: t.card,
                border: `1px solid ${hov === e.id ? t.accent + "55" : t.border}`,
                borderRadius: 16, padding: "1.3rem 1.6rem", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center", gap: 18,
                transition: "all 0.25s",
                transform: hov === e.id ? "translateX(6px) scale(1.01)" : "none",
                boxShadow: hov === e.id ? `0 8px 32px rgba(14,165,233,0.12)` : "none",
                animation: `fadeUp 0.5s ${0.1 + idx * 0.08}s ease both`,
              }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: t.aLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: `1px solid ${t.accent}20` }}>
                {e.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'Syne', sans-serif" }}>{e.title}</h3>
                <p style={{ margin: "0 0 3px", fontSize: 13, color: t.muted }}>{e.org}</p>
                <p style={{ margin: "0 0 5px", fontSize: 12, color: t.muted }}>{e.period}</p>
                <ClickHint t={t} />
              </div>
              <span style={{ background: t.aLight, color: t.accent, padding: "6px 16px", borderRadius: 10, fontSize: 13, fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap", border: `1px solid ${t.accent}30` }}>{e.badge}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ AWARDS ═══════ */
function Awards({ open, t }) {
  const [hov, setHov] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section id="awards" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Awards & Honors" sub="Formal recognition for leadership & achievement" skey="awards" open={open} t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {AWARDS.map(a => {
            const ph = a.status === "placeholder", isHov = hov === a.id;
            return (
              <button key={a.id} onClick={() => open(a)}
                onMouseEnter={() => setHov(a.id)} onMouseLeave={() => setHov(null)}
                style={{
                  background: ph ? "none" : t.card,
                  border: `${ph ? "2px dashed" : "1px solid"} ${isHov ? "rgba(245,158,11,0.5)" : ph ? t.border : "rgba(245,158,11,0.2)"}`,
                  borderRadius: 18, padding: "1.8rem", cursor: "pointer",
                  textAlign: "left", transition: "all 0.28s",
                  opacity: ph && !isHov ? 0.45 : 1,
                  transform: isHov && !ph ? "translateY(-5px) scale(1.01)" : "none",
                  boxShadow: isHov && !ph ? "0 14px 48px rgba(245,158,11,0.14)" : "none",
                  display: "flex", flexDirection: "column", gap: 4, position: "relative", overflow: "hidden",
                }}>
                {!ph && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,#f59e0b,#fcd34d,#f59e0b)", opacity: 0.7 }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 34 }}>{a.icon}</span>
                  <span style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", padding: "3px 12px", borderRadius: 999, fontSize: 10.5, fontWeight: 800, border: "1px solid rgba(245,158,11,0.25)" }}>{a.category}</span>
                </div>
                <h3 style={{ margin: "0 0 5px", fontSize: 17, fontWeight: 800, color: ph ? t.muted : t.text, letterSpacing: "-0.4px", fontFamily: "'Syne', sans-serif" }}>{a.title}</h3>
                <p style={{ margin: "0 0 3px", fontSize: 13, color: t.accent, fontWeight: 700 }}>{a.org}</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: t.muted, fontWeight: 600 }}>{a.year}</p>
                {!ph && <p style={{ margin: "0 0 12px", fontSize: 13, color: t.muted, lineHeight: 1.7, flex: 1 }}>{a.desc}</p>}
                {ph ? <p style={{ margin: 0, fontSize: 11, color: t.muted, fontStyle: "italic" }}>Placeholder — add award details</p>
                  : <ClickHint label="View Award Details" t={t} />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════ CERTIFICATES — premium grid ═══════ */
function Certificates({ open, t }) {
  const [hov, setHov] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section id="certificates" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Certificates & Credentials" sub="Click any certificate to view full credential details" skey="certificates" open={open} t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 14 }}>
          {CERTIFICATES.map(c => {
            const ph = c.status === "placeholder", isHov = hov === c.id;
            return (
              <button key={c.id} onClick={() => open(c)}
                onMouseEnter={() => setHov(c.id)} onMouseLeave={() => setHov(null)}
                style={{
                  background: ph ? "none" : t.card,
                  border: `${ph ? "2px dashed" : "1px solid"} ${isHov ? t.accent + "55" : ph ? t.border : t.accent + "28"}`,
                  borderRadius: 16, padding: "1.5rem", cursor: "pointer",
                  textAlign: "left", transition: "all 0.25s",
                  opacity: ph && !isHov ? 0.45 : 1,
                  transform: isHov ? "translateY(-5px) scale(1.02)" : "none",
                  boxShadow: isHov && !ph ? `0 12px 40px rgba(14,165,233,0.15)` : "none",
                  display: "flex", flexDirection: "column", gap: 3, position: "relative", overflow: "hidden",
                }}>
                {!ph && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${t.accent},transparent)`, opacity: 0.5 }} />}
                <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{c.icon}</span>
                <h3 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 800, color: ph ? t.muted : t.text, lineHeight: 1.35, fontFamily: "'Syne', sans-serif" }}>{c.title}</h3>
                <p style={{ margin: "0 0 4px", fontSize: 11, color: t.muted }}>{c.issuer}</p>
                <p style={{ margin: "0 0 12px", fontSize: 11, color: t.muted, fontWeight: 700 }}>{c.year}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {c.topics.map(tp => <Chip key={tp} label={tp} t={t} />)}
                </div>
                {ph ? <p style={{ margin: "4px 0 0", fontSize: 10, color: t.muted, fontStyle: "italic" }}>Slot — click to see how to add</p>
                  : <ClickHint label="View Credential" t={t} />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EVENTS ═══════ */
function Events({ open, t, setGallery }) {
  const [hov, setHov] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section id="events" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.75s ease" }}>
        <SectionTitle title="Events" sub="Conferences · Summits · Workshops — Past & Upcoming" skey="events" open={open} t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
          {EVENTS.map(ev => {
            const ph = ev.status === "placeholder", upcoming = ev.type === "upcoming", isHov = hov === ev.id;
            const coverImg = ev.image || (ev.images && ev.images[0]?.src) || null;
            return (
              <div key={ev.id}>
                <button onClick={() => open(ev)} onMouseEnter={() => setHov(ev.id)} onMouseLeave={() => setHov(null)}
                  style={{
                    background: t.card, border: `${ph ? "2px dashed" : "1px solid"} ${isHov ? t.accent + "55" : t.border}`,
                    borderRadius: 16, overflow: "hidden", cursor: "pointer", textAlign: "left",
                    transition: "all 0.25s", display: "flex", flexDirection: "column", width: "100%",
                    transform: isHov ? "translateY(-5px)" : "none",
                    boxShadow: isHov ? `0 12px 36px rgba(14,165,233,0.14)` : "none",
                  }}>
                  <div onClick={e => { if (ev.images && ev.images.length > 0) { e.stopPropagation(); setGallery({ images: ev.images, title: ev.title }); } }}
                    style={{
                      height: 150,
                      background: coverImg ? `url(${coverImg}) center/cover no-repeat` : `linear-gradient(135deg,${t.aLight},${t.bgAlt})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, position: "relative",
                      cursor: ev.images && ev.images.length > 0 ? "pointer" : "default",
                    }}>
                    {!coverImg && <div style={{ textAlign: "center", color: t.muted }}><div style={{ fontSize: 28 }}>{upcoming ? "📅" : "📸"}</div><div style={{ fontSize: 11, marginTop: 4 }}>{upcoming ? "Upcoming" : "Add Photo"}</div></div>}
                    {upcoming && <span style={{ position: "absolute", top: 8, right: 8, background: "#22c55e", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>UPCOMING</span>}
                    {ev.images && ev.images.length > 1 && <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, backdropFilter: "blur(4px)" }}>{ev.images.length} 📷</span>}
                  </div>
                  <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                    <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: ph ? t.muted : t.text, fontFamily: "'Syne', sans-serif" }}>{ev.title}</h3>
                    <p style={{ margin: 0, fontSize: 12, color: t.accent, fontWeight: 700 }}>{ev.org}</p>
                    <p style={{ margin: 0, fontSize: 11, color: t.muted }}>{ev.date} · {ev.loc}</p>
                    {!ph && <p style={{ margin: "4px 0 0", fontSize: 12, color: t.muted, lineHeight: 1.5, flex: 1 }}>{ev.desc}</p>}
                    {ph ? <p style={{ margin: "6px 0 0", fontSize: 11, color: t.muted, fontStyle: "italic" }}>Placeholder — add event details</p>
                      : <div style={{ marginTop: 8 }}><ClickHint t={t} /></div>}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════ CONTACT — redesigned conversion section ═══════ */
function Contact({ t, openContact }) {
  return (
    <section id="contact" style={{
      padding: "96px 1.5rem", position: "relative", overflow: "hidden",
      background: t.bg,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Background design elements */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg,transparent 0%,${t.aLight} 50%,transparent 100%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${t.accent}12,transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,${t.accentB}08,transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionTag label="Let's Work Together" t={t} />
        <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: t.text, margin: "0 0 20px", letterSpacing: "-1.5px", lineHeight: 1.05, fontFamily: "'Syne', sans-serif" }}>
          Open to{" "}
          <span style={{ color: t.accent }}>engineering internships</span>
          {" "}&amp;{" "}
          <span style={{ color: t.accentB }}>AI workflow roles</span>
        </h2>
        <p style={{ color: t.muted, fontSize: 16, lineHeight: 1.85, marginBottom: 44 }}>
          Seeking Mechanical Engineering SIWES/internships in manufacturing, production, or mechanical systems — and AI workflow roles where I help organizations build efficiency at scale. Nigeria &amp; abroad.
        </p>

        {/* Primary CTA */}
        <button onClick={openContact} style={{
          background: `linear-gradient(135deg,${t.accent},#0284c7)`,
          color: "#fff", padding: "16px 40px", borderRadius: 14, fontWeight: 700,
          fontSize: 16, border: "none", cursor: "pointer",
          boxShadow: `0 8px 40px rgba(14,165,233,0.35)`,
          transition: "all 0.25s", marginBottom: 36,
          fontFamily: "'DM Sans', sans-serif",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 48px rgba(14,165,233,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(14,165,233,0.35)"; }}>
          Get in Touch →
        </button>

        {/* Quick links */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {[
            { href: `mailto:${P.email}`, label: "✉ Email" },
            { href: P.linkedin, label: "🔗 LinkedIn", external: true },
            { href: P.github, label: "🐙 GitHub", external: true },
            { href: P.whatsapp, label: "💬 WhatsApp", external: true },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}
              style={{ color: t.muted, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "8px 18px", borderRadius: 999, border: `1px solid ${t.border}`, transition: "all 0.2s", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent + "50"; e.currentTarget.style.background = t.aLight; }}
              onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = "none"; }}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Resume download */}
        <a href={P.resume} download style={{ display: "inline-flex", alignItems: "center", gap: 8, color: t.accent, fontSize: 14, fontWeight: 700, textDecoration: "none", border: `1px solid ${t.accent}35`, padding: "10px 24px", borderRadius: 10, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = t.aLight; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
          ↓ Download Résumé (PDF)
        </a>

        <p style={{ color: t.faint, fontSize: 12, marginTop: 44 }}>© 2026 Ibukunoluwa J. Oluwafemi · IBK &amp; Co. · Built with React.</p>
      </div>
    </section>
  );
}

/* ═══════ FLOATING CONTACT BUTTON ═══════ */
function FloatingContact({ openContact, t }) {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={openContact}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 300,
        background: `linear-gradient(135deg,${t.accent},#0284c7)`,
        color: "#fff", border: "none", borderRadius: 999,
        padding: hov ? "12px 22px" : "12px 16px",
        cursor: "pointer", fontWeight: 700, fontSize: 13,
        boxShadow: `0 8px 32px rgba(14,165,233,0.45)`,
        transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        animation: "fadeUp 0.4s ease both",
      }}>
      ✉{hov && <span style={{ animation: "fadeIn 0.2s ease" }}>Let's Talk</span>}
    </button>
  );
}

/* ═══════ APP ROOT ═══════ */
export default function App() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
  const [modal, setModal] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const t = mkT(dark);
  const open = useCallback((data) => setModal(data), []);
  const close = useCallback(() => setModal(null), []);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div style={{
      minHeight: "100vh", background: t.bg, color: t.text,
      fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
      "--grid": t.gridLine,
    }}>
      <GlobalStyles />
      <Nav dark={dark} toggle={() => setDark(d => !d)} t={t} open={open} />
      <main>
        <Hero open={open} t={t} dark={dark} openContact={openContact} />
        <Divider t={t} />
        <About t={t} />
        <Divider t={t} />
        <Skills open={open} t={t} />
        <Divider t={t} />
        <Projects open={open} t={t} setGallery={setGallery} />
        <Divider t={t} />
        <Experience open={open} t={t} />
        <Divider t={t} />
        <Education open={open} t={t} />
        <Divider t={t} />
        <Awards open={open} t={t} />
        <Divider t={t} />
        <Certificates open={open} t={t} />
        <Divider t={t} />
        <Events open={open} t={t} setGallery={setGallery} />
        <Contact t={t} openContact={openContact} />
      </main>
      <FloatingContact openContact={openContact} t={t} />
      {modal && <Modal data={modal} onClose={close} t={t} openGallery={modal.images && modal.images.length > 0 ? () => setGallery({ images: modal.images, title: modal.modal?.title || modal.title }) : null} />}
      {contactOpen && <ContactModal onClose={closeContact} t={t} />}
      {gallery && <GalleryModal images={gallery.images} title={gallery.title} onClose={() => setGallery(null)} t={t} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   IBK v2.0 — DESIGN SYSTEM NOTES & CHANGE LOG
   ═══════════════════════════════════════════════════════════════════

FONTS LOADED:
  - Syne (700/800): display headings, names, section titles, project titles
  - DM Sans (300–600): all body copy, labels, UI text

COLOR SYSTEM CHANGES:
  - Previous accent: #0d9488 (teal-600) — single accent
  - New primary: #0ea5e9 (sky-500) — tech engineering identity
  - New secondary: #f59e0b (amber-500) — manufacturing/warm complement
  - New tertiary: #6366f1 (indigo-500) — web/AI category color
  - Result: three-accent hierarchy with intent (cold=tech, warm=craft, indigo=digital)

HERO SECTION:
  - Avatar: hexagonal clip-path frame + dual counter-rotating dashed SVG rings
    with conic-gradient border — engineering-themed, custom-built
  - Background: subtle 40px CSS grid pattern on top of linear gradient ambient
  - Three CTAs instead of two (added "View Projects" anchor link)
  - Rotating title gets diamond dot delimiters for visual refinement

PROFILE PICTURE FRAME (addresses your specific requirement):
  - Hexagon clip (CSS polygon) instead of basic circle
  - Conic gradient border rotates through three accent colors
  - Two SVG rings rotate in opposite directions at different speeds
  - Scales up 7% on hover with no reflow
  - Float animation continues on idle

CARDS:
  - Skill cards: category-specific color system (7 categories × unique color)
  - Each skill card has a thin 2px top color strip in category color
  - Project non-featured: added header image gallery strip + colored top bar
  - Awards: gold/amber system with metallic gradient top strip

EXPERIENCE TIMELINE:
  - Each entry dot color maps to the entry's tag type (Engineering=amber, Govt=green, etc.)
  - Dot pulses a soft glow ring on hover
  - Entry slides right 6px + gets a matching color shadow on hover

FLOATING BUTTON:
  - Appears after 400px scroll
  - Expands to show "Let's Talk" text on hover
  - Replaces nothing — purely additive

CONTACT SECTION:
  - Redesigned from solid-accent band to a glass/glow section
  - "Open to engineering internships & AI workflow roles" headline with colored spans
  - Accent word break for visual punch (no longer all white on teal)

KNOWN ITEMS TO ADDRESS:
  1. Add real images to /public/projects/ and /public/certificates/
  2. Ensure /Resumé.pdf exists in /public/
  3. Add meta tags in index.html for SEO (name, description, OG tags)
  4. Optional: add Google Analytics script in index.html

RISK LEVEL: LOW
   ═══════════════════════════════════════════════════════════════════ */
