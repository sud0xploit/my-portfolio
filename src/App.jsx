import { useState, useEffect, useRef } from "react";

/* ─── YOUR REAL INFO ─── */
const ME = {
  name: "HARIOM RATHORE",
  initials: "HR.",
  role: ["Java Developer", "Web Developer", "CS Student @ SGSITS", "Problem Solver"],
  tagline: "B.Tech Computer Science student passionate about building scalable, user-focused applications. Open to internships & entry-level roles.",
  email: "hariomrathore174@gmail.com",
  phone: "+91 9111608025",
  location: "Indore, Madhya Pradesh",
  linkedin: "www.linkedin.com/in/hariom-rathore-787b81253",
  about: [
    "I'm a B.Tech Computer Science student at SGSITS Indore with a strong foundation in Java, SQL, and web development. I enjoy building practical applications that solve real problems.",
    "I've solved 150+ DSA problems on LeetCode & HackerRank and have hands-on experience building authentication systems, REST APIs, and collaborative platforms.",
    "Currently looking for internships and entry-level opportunities where I can contribute, grow, and build things that matter.",
  ],
  social: {
    LinkedIn: "https://www.linkedin.com/in/hariom-rathore-787b81253",
    GitHub:   "https://github.com/sud0xploit",
    LeetCode: "https://leetcode.com",
    Email:    "mailto:hariomrathore174@gmail.com",
  },
  stats: [
    { label: "DSA Problems Solved", target: 150 },
    { label: "Projects Built",      target: 2   },
    { label: "Certifications",      target: 3   },
    { label: "CGPA",               target: 7   },
  ],
};

/* ─── EmailJS CONFIG ─── */
const EMAILJS = {
  serviceId:  "service_s4uoyqh",
  templateId: "template_k8qmx23",
  publicKey:  "PjsSycbQrl_pNitvP",
};

const PROJECTS = [
  {
    num: "01",
    title: "Skill Sharing Platform",
    desc: "Platform for users to share and learn skills — with authentication, role-based access, and content-sharing for 100+ users.",
    tags: ["HTML", "CSS", "JavaScript", "SQL","JDBC", "Java","postgreSQL","Servlet"],
    year: "2025",
  },
  {
    num: "02",
    title: "Library Management System",
    desc: "Manages 500+ books with automated issue/return records, search & filter features that cut lookup time by 40%.",
    tags: ["PostgreSQL","Node.js","Express","JavaScript"],
    year: "2025",
  },
];

const SKILLS = ["Java (Core)", "Java (Advanced)", "Python", "JavaScript", "HTML", "CSS", "SQL", "PostgreSQL", "Git", "DSA", "OOP", "DBMS"];

const CERTS = [
  { name: "Java (OOP) Certified",      icon: "☕" },
  { name: "Java Advanced Certified",   icon: "☕" },
  { name: "Blockchain Tech Workshop",  icon: "🔗" },
  { name: "150+ LeetCode Problems",    icon: "🧩" },
  { name: "150+ HackerRank Problems",  icon: "🏅" },
];

/* ══════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════ */
const buildStyles = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    ${dark ? "#f0ebe0" : "#0d0d0d"};
    --paper:  ${dark ? "#0a0a0a" : "#f5f0e8"};
    --accent: #1e6fe8;
    --accent2: #e84c1e;
    --accent3: #2eb86b;
    --muted:  ${dark ? "#888070" : "#7a7468"};
    --line:   ${dark ? "rgba(240,235,224,0.08)" : "rgba(13,13,13,0.1)"};
    --card-bg: ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"};
    --glow:   ${dark ? "rgba(30,111,232,0.15)" : "rgba(30,111,232,0.08)"};
    --mono:   'JetBrains Mono', monospace;
    --display:'Bebas Neue', sans-serif;
    --body:   'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    cursor: none;
    transition: background 0.5s cubic-bezier(0.4,0,0.2,1), color 0.5s cubic-bezier(0.4,0,0.2,1);
    overflow-x: hidden;
  }

  /* ── NOISE TEXTURE ── */
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px; opacity: ${dark ? "0.5" : "0.3"};
  }

  /* ── CUSTOM CURSOR ── */
  .cursor {
    width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed; pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    transition: width 0.25s cubic-bezier(0.4,0,0.2,1),
                height 0.25s cubic-bezier(0.4,0,0.2,1),
                opacity 0.25s, background 0.25s;
    mix-blend-mode: ${dark ? "screen" : "multiply"};
  }
  .cursor.big { width: 44px; height: 44px; opacity: 0.18; background: var(--accent); }
  .cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid var(--accent);
    border-radius: 50%;
    position: fixed; pointer-events: none; z-index: 9997;
    transform: translate(-50%,-50%);
    opacity: 0.35;
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1),
                height 0.4s cubic-bezier(0.4,0,0.2,1),
                opacity 0.3s;
  }
  .cursor-ring.big { width: 60px; height: 60px; opacity: 0.12; }

  #ptcl { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

  /* ── PROGRESS BAR ── */
  .progress-bar {
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    z-index: 9999;
    transform-origin: left;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px var(--accent);
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1rem 3rem;
    border-bottom: 1px solid var(--line);
    background: ${dark ? "rgba(10,10,10,0.85)" : "rgba(245,240,232,0.85)"};
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    transition: all 0.4s ease;
  }
  nav.scrolled {
    padding: 0.75rem 3rem;
    box-shadow: 0 4px 30px ${dark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)"};
  }
  .nav-logo {
    font-family: var(--display); font-size: 1.7rem; color: var(--ink);
    letter-spacing: 0.06em; cursor: none;
    position: relative;
  }
  .nav-logo::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-logo:hover::after { transform: scaleX(1); }

  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links a {
    font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; cursor: none;
    transition: color 0.2s; position: relative; padding-bottom: 2px;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: var(--accent); transform: scaleX(0); transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-links a:hover::after { transform: scaleX(1); transform-origin: left; }

  .theme-btn {
    background: none; border: 1px solid var(--line); padding: 0.35rem 0.85rem;
    font-family: var(--mono); font-size: 0.66rem; color: var(--muted); cursor: none;
    transition: all 0.25s; letter-spacing: 0.08em; border-radius: 2px;
    position: relative; overflow: hidden;
  }
  .theme-btn::before {
    content: ''; position: absolute; inset: 0;
    background: var(--accent); transform: translateY(100%);
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
    z-index: -1;
  }
  .theme-btn:hover { border-color: var(--accent); color: #fff; }
  .theme-btn:hover::before { transform: translateY(0); }

  /* ── MOBILE NAV ── */
  .hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: none;
    background: none; border: none; padding: 4px;
  }
  .hamburger span {
    display: block; width: 22px; height: 1.5px;
    background: var(--ink); transition: all 0.3s ease;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .mobile-menu {
    display: none;
    position: fixed; inset: 0; z-index: 190;
    background: ${dark ? "rgba(10,10,10,0.97)" : "rgba(245,240,232,0.97)"};
    backdrop-filter: blur(20px);
    flex-direction: column; justify-content: center; align-items: center; gap: 2.5rem;
    opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-family: var(--display); font-size: 3rem; color: var(--ink);
    text-decoration: none; letter-spacing: 0.08em; cursor: none;
    transition: color 0.2s; text-transform: uppercase;
  }
  .mobile-menu a:hover { color: var(--accent); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 3rem 4rem; position: relative; overflow: hidden; z-index: 1;
  }
  .hero-bg-text {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-52%);
    font-family: var(--display); font-size: 22vw; color: transparent;
    -webkit-text-stroke: 1px ${dark ? "rgba(240,235,224,0.035)" : "rgba(13,13,13,0.04)"};
    white-space: nowrap; pointer-events: none; letter-spacing: -0.02em;
    user-select: none; animation: bgTextDrift 20s ease-in-out infinite;
  }
  @keyframes bgTextDrift {
    0%,100% { transform: translate(-50%,-52%) skewX(0deg); }
    50% { transform: translate(-50%,-50%) skewX(-1deg); }
  }

  /* Floating orbs */
  .hero-orb {
    position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
    animation: orbFloat 8s ease-in-out infinite;
  }
  .hero-orb-1 {
    width: 500px; height: 500px; top: -100px; right: -100px;
    background: radial-gradient(circle, ${dark ? "rgba(30,111,232,0.12)" : "rgba(30,111,232,0.07)"} 0%, transparent 70%);
    animation-duration: 9s;
  }
  .hero-orb-2 {
    width: 350px; height: 350px; bottom: 100px; left: -80px;
    background: radial-gradient(circle, ${dark ? "rgba(232,76,30,0.1)" : "rgba(232,76,30,0.06)"} 0%, transparent 70%);
    animation-duration: 12s; animation-delay: -4s;
  }
  .hero-orb-3 {
    width: 250px; height: 250px; top: 40%; right: 20%;
    background: radial-gradient(circle, ${dark ? "rgba(46,184,107,0.08)" : "rgba(46,184,107,0.05)"} 0%, transparent 70%);
    animation-duration: 14s; animation-delay: -7s;
  }
  @keyframes orbFloat {
    0%,100% { transform: translateY(0) scale(1); }
    33% { transform: translateY(-30px) scale(1.05); }
    66% { transform: translateY(15px) scale(0.97); }
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--mono); font-size: 0.68rem; color: var(--accent);
    letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;
    padding: 0.35rem 1rem; border: 1px solid rgba(30,111,232,0.4);
    width: fit-content; background: rgba(30,111,232,0.06); border-radius: 2px;
    opacity: 0; animation: fadeUp 0.8s 0.15s forwards;
    backdrop-filter: blur(8px);
  }
  .badge-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 1.5s ease-in-out infinite;
  }

  .hero-name {
    font-family: var(--display);
    font-size: clamp(3.5rem, 11vw, 11rem);
    line-height: 0.86; letter-spacing: -0.01em;
    opacity: 0; animation: fadeUp 0.9s 0.35s forwards;
  }
  .hero-name .accent { color: var(--accent); }
  .hero-name .accent2 {
    color: transparent;
    -webkit-text-stroke: 2px var(--accent2);
    background: linear-gradient(135deg, var(--accent2), #ff7a52);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .typewriter-wrap {
    font-family: var(--mono); font-size: 0.88rem; color: var(--muted);
    min-height: 1.4rem; display: flex; align-items: center; gap: 0.3rem;
    margin-top: 1rem; opacity: 0; animation: fadeUp 0.8s 0.6s forwards;
  }
  .tw-cursor {
    display: inline-block; width: 2px; height: 1em;
    background: var(--accent);
    animation: blink 0.75s step-end infinite;
    box-shadow: 0 0 6px var(--accent);
  }

  .hero-meta {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-top: 1.8rem; border-top: 1px solid var(--line); padding-top: 1.6rem;
    opacity: 0; animation: fadeUp 0.9s 0.8s forwards;
  }
  .hero-tagline { font-size: 0.92rem; color: var(--muted); max-width: 380px; line-height: 1.8; }

  .hero-cta { display: flex; gap: 1rem; flex-direction: column; align-items: flex-end; }
  .cta-btn {
    font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.75rem 1.6rem; cursor: none;
    border: 1px solid var(--ink); color: var(--ink); background: none;
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1); text-decoration: none;
    position: relative; overflow: hidden;
  }
  .cta-btn::before {
    content: ''; position: absolute; inset: 0;
    background: var(--ink); transform: translateX(-101%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); z-index: -1;
  }
  .cta-btn:hover { color: var(--paper); border-color: var(--ink); }
  .cta-btn:hover::before { transform: translateX(0); }
  .cta-btn.primary {
    background: linear-gradient(135deg, var(--accent), #1557c0);
    border-color: transparent; color: #fff;
    box-shadow: 0 4px 20px rgba(30,111,232,0.35);
  }
  .cta-btn.primary::before { background: linear-gradient(135deg, #1557c0, var(--accent)); }
  .cta-btn.primary:hover { color: #fff; box-shadow: 0 6px 28px rgba(30,111,232,0.5); }

  .hero-scroll {
    font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  }
  .scroll-line {
    width: 1px; height: 52px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 1.8s ease-in-out infinite;
  }

  /* ── SECTION ── */
  .section {
    padding: 8rem 3rem; border-top: 1px solid var(--line);
    position: relative; z-index: 1;
  }
  .section-label {
    font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 3.5rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-label::after {
    content:''; flex:1; height:1px;
    background: linear-gradient(to right, var(--line), transparent);
    max-width: 100px;
  }

  /* ── STATS ── */
  .stats-bar {
    display: grid; grid-template-columns: repeat(4,1fr);
    border: 1px solid var(--line); margin-bottom: 5rem;
    background: var(--card-bg);
    position: relative; overflow: hidden;
  }
  .stats-bar::before {
    content: '';
    position: absolute; top: 0; left: -100%; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  .stat-item {
    padding: 2.2rem 1.5rem; border-right: 1px solid var(--line); text-align: center;
    position: relative; overflow: hidden; transition: background 0.3s;
  }
  .stat-item::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 0;
    background: linear-gradient(to top, var(--glow), transparent);
    transition: height 0.4s ease;
  }
  .stat-item:hover::before { height: 100%; }
  .stat-item:last-child { border-right: none; }
  .stat-num {
    font-family: var(--display); font-size: 3.8rem;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1;
  }
  .stat-label {
    font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); margin-top: 0.5rem;
  }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
  .about-headline {
    font-family: var(--display);
    font-size: clamp(2.5rem,5vw,4.8rem);
    line-height: 1; letter-spacing: 0.02em;
    position: relative;
  }
  .about-headline .hl { position: relative; display: inline-block; }
  .about-headline .hl::after {
    content: ''; position: absolute; bottom: 4px; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s;
  }
  .about-headline .hl.visible::after { transform: scaleX(1); }

  .about-body { font-size: 0.93rem; line-height: 1.88; color: var(--muted); }
  .about-body p+p { margin-top: 1.1rem; }

  .skills-list { margin-top: 2.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag {
    font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.08em;
    padding: 0.38rem 0.9rem; border: 1px solid var(--line);
    text-transform: uppercase; transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    cursor: none; background: var(--card-bg); position: relative; overflow: hidden;
  }
  .skill-tag::before {
    content: ''; position: absolute; inset: 0;
    background: var(--accent); transform: scaleX(0); transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); z-index: -1;
  }
  .skill-tag:hover { border-color: var(--accent); color: #fff; }
  .skill-tag:hover::before { transform: scaleX(1); }

  /* ── EDUCATION ── */
  .edu-list { display: flex; flex-direction: column; gap: 0; }
  .edu-row {
    display: grid; grid-template-columns: 1fr auto; gap: 2rem;
    padding: 2rem 0 2rem 0; border-bottom: 1px solid var(--line);
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    position: relative; overflow: hidden;
    background: transparent;
  }
  .edu-row::before {
    content:''; position:absolute; left:0; top:0; bottom:0;
    width:0; background: linear-gradient(to bottom, var(--accent), var(--accent2));
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .edu-row:hover::before { width: 3px; }
  .edu-row:hover { padding-left: 1.4rem; background: var(--card-bg); }
  .edu-institution {
    font-family: var(--display); font-size: 1.5rem;
    letter-spacing: 0.04em; margin-bottom: 0.3rem;
  }
  .edu-degree { font-size: 0.84rem; color: var(--muted); }
  .edu-meta { text-align: right; }
  .edu-year { font-family: var(--mono); font-size: 0.68rem; color: var(--muted); }
  .edu-score {
    font-family: var(--mono); font-size: 0.74rem; color: var(--accent);
    margin-top: 0.4rem; font-weight: 500;
  }

  /* ── PROJECTS ── */
  .projects-list { display: flex; flex-direction: column; }
  .project-row {
    display: grid; grid-template-columns: 60px 1fr 100px 36px;
    align-items: center; gap: 2rem; padding: 2.2rem 0;
    border-bottom: 1px solid var(--line);
    cursor: none; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    position: relative; overflow: hidden;
  }
  .project-row::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:0;
    background: linear-gradient(to bottom, var(--accent), var(--accent2));
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .project-row::after {
    content: ''; position: absolute; inset: 0;
    background: var(--card-bg); opacity: 0;
    transition: opacity 0.3s ease; z-index: -1;
  }
  .project-row:hover::before { width: 3px; }
  .project-row:hover::after { opacity: 1; }
  .project-row:hover { padding-left: 1.4rem; }
  .project-row:hover .project-num { color: var(--accent); }
  .project-row:hover .project-arrow {
    color: var(--accent); transform: translate(4px,-4px);
    text-shadow: 0 0 12px var(--accent);
  }
  .project-num {
    font-family: var(--mono); font-size: 0.68rem; color: var(--muted);
    transition: color 0.25s;
  }
  .project-title {
    font-family: var(--display); font-size: 1.9rem; letter-spacing: 0.04em;
    line-height: 1;
  }
  .project-desc { font-size: 0.82rem; color: var(--muted); margin-top: 0.35rem; line-height: 1.65; }
  .project-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.65rem; }
  .project-tag {
    font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.06em;
    padding: 0.2rem 0.55rem;
    background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"};
    color: var(--muted); text-transform: uppercase; border-radius: 2px;
    transition: all 0.2s;
  }
  .project-row:hover .project-tag {
    background: rgba(30,111,232,0.15); color: var(--accent);
  }
  .project-year { font-family: var(--mono); font-size: 0.68rem; color: var(--muted); }
  .project-arrow {
    font-size: 1.15rem; color: var(--muted);
    transition: color 0.25s, transform 0.25s, text-shadow 0.25s;
  }

  /* ── CERTIFICATIONS ── */
  .certs-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 1px; background: var(--line);
    border: 1px solid var(--line);
  }
  .cert-card {
    padding: 2rem 1.6rem;
    background: var(--paper);
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    position: relative; overflow: hidden;
  }
  .cert-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    z-index: 0;
  }
  .cert-card:hover::before { transform: translateY(0); }
  .cert-card:hover .cert-name { color: #fff; }
  .cert-card:hover .cert-icon { transform: scale(1.2) rotate(10deg); }
  .cert-icon {
    font-size: 1.6rem; margin-bottom: 0.8rem;
    display: block; position: relative; z-index: 1;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .cert-name {
    font-size: 0.84rem; color: var(--ink);
    line-height: 1.5; transition: color 0.3s;
    position: relative; z-index: 1;
  }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
  .contact-headline {
    font-family: var(--display);
    font-size: clamp(2.8rem,7vw,6rem);
    line-height: 0.88; letter-spacing: 0.01em; margin-bottom: 2.5rem;
  }
  .contact-headline .accent { color: var(--accent); text-shadow: 0 0 40px rgba(30,111,232,0.3); }
  .contact-detail {
    font-family: var(--mono); font-size: 0.78rem; color: var(--muted);
    margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.6rem;
  }
  .contact-detail a {
    color: var(--muted); text-decoration: none;
    transition: color 0.2s;
  }
  .contact-detail a:hover { color: var(--accent); }
  .social-links { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.2rem; }
  .social-link {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; color: var(--ink); padding: 0.4rem 0.9rem;
    border: 1px solid var(--line); cursor: none;
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    background: var(--card-bg); position: relative; overflow: hidden;
  }
  .social-link::before {
    content: ''; position: absolute; inset: 0;
    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); z-index: -1;
  }
  .social-link:hover { border-color: var(--accent); color: #fff; }
  .social-link:hover::before { transform: scaleY(1); }

  /* ── FORM ── */
  .form-group { margin-bottom: 1.5rem; position: relative; }
  .form-label {
    font-family: var(--mono); font-size: 0.64rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
    display: block; margin-bottom: 0.55rem;
    transition: color 0.2s;
  }
  .form-group:focus-within .form-label { color: var(--accent); }
  .form-input {
    width: 100%; background: transparent; border: none;
    border-bottom: 1px solid var(--line); padding: 0.75rem 0;
    font-family: var(--body); font-size: 0.93rem; color: var(--ink);
    outline: none; transition: border-color 0.25s ease;
  }
  .form-input:focus { border-bottom-color: var(--accent); }
  .form-input::placeholder { color: ${dark ? "rgba(240,235,224,0.2)" : "rgba(13,13,13,0.25)"}; }
  textarea.form-input { resize: vertical; min-height: 120px; }

  .submit-btn {
    font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.14em;
    text-transform: uppercase; padding: 0.95rem 2.2rem;
    background: linear-gradient(135deg, var(--accent), #1557c0);
    color: #fff; border: none; cursor: none;
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    margin-top: 1.8rem; display: inline-flex; align-items: center; gap: 0.6rem;
    box-shadow: 0 4px 20px rgba(30,111,232,0.3);
    position: relative; overflow: hidden;
  }
  .submit-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #1557c0, var(--accent));
    opacity: 0; transition: opacity 0.25s;
  }
  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(30,111,232,0.45); }
  .submit-btn:hover:not(:disabled)::before { opacity: 1; }
  .submit-btn span { position: relative; z-index: 1; }
  .submit-btn:active { transform: scale(0.97); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .form-msg { font-family: var(--mono); font-size: 0.7rem; margin-top: 0.9rem; display: flex; align-items: center; gap: 0.4rem; }
  .form-msg.ok  { color: #2eb86b; }
  .form-msg.err { color: #e84c1e; }

  /* ── FOOTER ── */
  footer {
    padding: 1.8rem 3rem; border-top: 1px solid var(--line);
    display: flex; justify-content: space-between; align-items: center;
    position: relative; z-index: 1;
    background: ${dark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.02)"};
  }
  .footer-copy { font-family: var(--mono); font-size: 0.65rem; color: var(--muted); letter-spacing: 0.1em; }
  .footer-made { font-family: var(--mono); font-size: 0.65rem; color: var(--muted); }
  .footer-made .accent { color: var(--accent2); }

  /* ── BACK TO TOP ── */
  .back-top {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 100;
    width: 40px; height: 40px;
    background: var(--accent); color: #fff;
    border: none; cursor: none; border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; opacity: 0; pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 4px 16px rgba(30,111,232,0.35);
  }
  .back-top.visible { opacity: 1; pointer-events: all; }
  .back-top:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(30,111,232,0.5); }

  /* ── REVEAL ── */
  .reveal {
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.visible { opacity: 1; transform: none; }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }
  @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.3);opacity:0.2} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.65)} }

  /* ── MOBILE / RESPONSIVE ── */
  @media(max-width:1024px){
    .about-grid { gap:3.5rem; }
    .contact-grid { gap: 3rem; }
    .project-row { grid-template-columns: 50px 1fr 80px 30px; gap: 1.5rem; }
  }
  @media(max-width:768px){
    nav { padding: 0.85rem 1.2rem; }
    nav.scrolled { padding: 0.7rem 1.2rem; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { display: flex; }
    .hero { padding: 0 1.5rem 3rem; }
    .hero-name { font-size: clamp(3rem, 16vw, 6rem); }
    .hero-orb-1 { width: 300px; height: 300px; top: -50px; right: -80px; }
    .hero-orb-2 { width: 200px; height: 200px; }
    .hero-orb-3 { display: none; }
    .section { padding: 5rem 1.5rem; }
    .stats-bar {
      grid-template-columns: 1fr 1fr;
    }
    .stat-item { border-right: none; border-bottom: 1px solid var(--line); }
    .stat-item:nth-child(even) { border-right: none; }
    .stat-item:nth-child(odd) { border-right: 1px solid var(--line); }
    .stat-item:nth-last-child(-n+2) { border-bottom: none; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .project-row {
      grid-template-columns: 40px 1fr 28px;
      gap: 1rem; padding: 1.5rem 0;
    }
    .project-year { display: none; }
    .project-title { font-size: 1.5rem; }
    .certs-grid { grid-template-columns: 1fr 1fr; }
    footer { flex-direction: column; gap: 0.6rem; text-align: center; padding: 1.3rem; }
    .back-top { bottom: 1.2rem; right: 1.2rem; }
    .hero-meta { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
    .hero-cta { flex-direction: row; align-items: center; }
    .hero-scroll { display: none; }
    .contact-headline { font-size: clamp(2.5rem, 10vw, 4rem); }
    .edu-row { grid-template-columns: 1fr; gap: 0.5rem; }
    .edu-meta { text-align: left; }
  }
  @media(max-width:400px){
    .hero-name { font-size: 14vw; }
    .stats-bar { grid-template-columns: 1fr 1fr; }
    .stat-item:nth-child(odd) { border-right: 1px solid var(--line); }
    .certs-grid { grid-template-columns: 1fr; }
  }
`;

/* ── PARTICLES ── */
function Particles({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext("2d");
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const N = 55;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const fc = dark ? "rgba(30,111,232,0.4)" : "rgba(30,111,232,0.2)";
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = fc; ctx.fill();
      });
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(30,111,232,${(1 - dist / 130) * (dark ? 0.2 : 0.1)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} id="ptcl" />;
}

/* ── TYPEWRITER ── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    let delay = del ? 42 : 82;
    if (!del && cIdx === word.length) delay = 1800;
    if (del && cIdx === 0) delay = 400;
    const t = setTimeout(() => {
      if (!del && cIdx < word.length) { setDisplay(word.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
      else if (!del && cIdx === word.length) setDel(true);
      else if (del && cIdx > 0) { setDisplay(word.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
      else { setDel(false); setWIdx(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words]);
  return (
    <div className="typewriter-wrap">
      <span>— {display}</span>
      <span className="tw-cursor" />
    </div>
  );
}

/* ── COUNTER ── */
function Counter({ target, suffix = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || ran.current) return;
      ran.current = true;
      const dur = 1400, step = 16, inc = target / (dur / step);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, target);
        setVal(Math.floor(cur));
        if (cur >= target) clearInterval(t);
      }, step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div className="stat-num" ref={ref}>{val}{suffix}</div>;
}

/* ── CONTACT FORM ── */
function ContactForm({ onHover }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const send = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("fill"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId, template_id: EMAILJS.templateId, user_id: EMAILJS.publicKey,
          template_params: { from_name: form.name, from_email: form.email, subject: form.subject || "Portfolio Inquiry", message: form.message },
        }),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("err"); }
  };
  const inp = (label, name, type = "text", ph = "") => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} name={name} value={form[name]} onChange={set} placeholder={ph}
        onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} />
    </div>
  );
  return (
    <div>
      {inp("Your Name *", "name", "text", "Recruiter / Collaborator")}
      {inp("Email Address *", "email", "email", "you@company.com")}
      {inp("Subject", "subject", "text", "Internship Opportunity / Project")}
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea className="form-input" name="message" rows={5} value={form.message} onChange={set}
          placeholder="Tell me about the opportunity or project..."
          onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} />
      </div>
      <button className="submit-btn" onClick={send} disabled={status === "sending"}
        onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
        <span>{status === "sending" ? "Sending..." : "Send Message →"}</span>
      </button>
      {status === "ok"   && <p className="form-msg ok">✓ Delivered to Hariom Rathore</p>}
      {status === "err"  && <p className="form-msg err">✗ Failed — check EmailJS config.</p>}
      {status === "fill" && <p className="form-msg err">Please fill all required fields (*).</p>}
    </div>
  );
}

/* ── REVEAL HOOK ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [cur, setCur]   = useState({ x: -200, y: -200 });
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [big, setBig]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled]   = useState(false);
  const [showTop, setShowTop]     = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const ringRef = useRef({ x: -200, y: -200 });

  useReveal();

  // Cursor + ring lag
  useEffect(() => {
    const m = e => setCur({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  useEffect(() => {
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringRef.current.x = lerp(ringRef.current.x, cur.x, 0.1);
      ringRef.current.y = lerp(ringRef.current.y, cur.y, 0.1);
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [cur]);

  // Scroll progress + nav shrink + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct);
      setScrolled(el.scrollTop > 60);
      setShowTop(el.scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go  = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const hov = on => setBig(on);

  return (
    <>
      <style>{buildStyles(dark)}</style>

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${scrollPct}%` }} />

      <div className="noise" />
      <Particles dark={dark} />

      {/* Custom cursors */}
      <div className={`cursor${big ? " big" : ""}`} style={{ left: cur.x, top: cur.y }} />
      <div className={`cursor-ring${big ? " big" : ""}`} style={{ left: ring.x, top: ring.y }} />

      {/* Back to top */}
      <button className={`back-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
        ↑
      </button>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["home","about","education","projects","contact"].map(s => (
          <a key={s} onClick={() => go(s)}>{s}</a>
        ))}
        <button className="theme-btn" onClick={() => setDark(d => !d)} style={{ fontSize: "1rem", padding: "0.5rem 1.5rem" }}>
          {dark ? "☀ LIGHT" : "☾ DARK"}
        </button>
      </div>

      {/* ── NAV ── */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo"
          onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
          {ME.initials}
        </div>
        <div className="nav-links">
          {["about", "education", "projects", "contact"].map(s => (
            <a key={s} onClick={() => go(s)} onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>{s}</a>
          ))}
          <button className="theme-btn" onClick={() => setDark(d => !d)}
            onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
            {dark ? "☀ LIGHT" : "☾ DARK"}
          </button>
        </div>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(m => !m)}
          onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg-text">CODE</div>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="hero-badge">
          <span className="badge-dot" />
          Open to Internships &amp; Opportunities
        </div>
        <div className="hero-name">
          HARIOM<br /><span className="accent2">RATHORE</span>
        </div>
        <Typewriter words={ME.role} />
        <div className="hero-meta">
          <div className="hero-tagline">{ME.tagline}</div>
          <div className="hero-cta">
            <a href={`mailto:${ME.email}`} className="cta-btn primary"
              onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
              Hire Me →
            </a>
            <div className="hero-scroll">
              <div className="scroll-line" />
              scroll
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="section-label reveal">001 — About Me</div>

        <div className="stats-bar reveal">
          {ME.stats.map((s, i) => (
            <div key={s.label} className="stat-item">
              <Counter target={s.target} suffix={i === 3 ? "/10" : "+"} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="about-grid">
          <div className="about-headline reveal">
            <span className="hl reveal">READY</span><br />
            TO BUILD.<br />
            EAGER<br />
            TO GROW.
          </div>
          <div>
            <div className="about-body reveal">
              {ME.about.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="skills-list reveal">
              {SKILLS.map(s => (
                <span key={s} className="skill-tag"
                  onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section" id="education">
        <div className="section-label reveal">002 — Education</div>
        <div className="edu-list">
          {[
            { inst: "SGSITS, Indore", degree: "B.Tech in Computer Science", year: "2023 – 2027", score: "CGPA: 7.0" },
            { inst: "Saint Anthony's Convent School", degree: "Higher Secondary (Class XII)", year: "2022", score: "75%" },
            { inst: "Rani Mariya High School", degree: "Secondary (Class X)", year: "2020", score: "79%"}
          ].map((e, i) => (
            <div key={i} className="edu-row reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div>
                <div className="edu-institution">{e.inst}</div>
                <div className="edu-degree">{e.degree}</div>
              </div>
              <div className="edu-meta">
                <div className="edu-year">{e.year}</div>
                <div className="edu-score">{e.score}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" id="projects">
        <div className="section-label reveal">003 — Projects</div>
        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <div key={p.num} className="project-row reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
              <div className="project-num">{p.num}</div>
              <div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
              <div className="project-year">{p.year}</div>
              <div className="project-arrow">↗</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: "5rem" }}>
          <div className="section-label reveal">Certifications &amp; Achievements</div>
          <div className="certs-grid reveal">
            {CERTS.map((c, i) => (
              <div key={i} className="cert-card"
                onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
                <span className="cert-icon">{c.icon}</span>
                <div className="cert-name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="section-label reveal">004 — Contact Me</div>
        <div className="contact-grid">
          <div className="reveal">
            <div className="contact-headline">
              LET'S<br />WORK<br /><span className="accent">TOGETHER.</span>
            </div>
            <div className="contact-detail">📍 {ME.location}</div>
            <div className="contact-detail">
              ✉ <a href={`mailto:${ME.email}`}>{ME.email}</a>
            </div>
            <div className="contact-detail">
              📞 <a href={`tel:${ME.phone}`}>{ME.phone}</a>
            </div>
            <div className="social-links">
              {Object.entries(ME.social).map(([name, href]) => (
                <a key={name} href={href} className="social-link"
                  onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>{name}</a>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.14s" }}>
            <ContactForm onHover={hov} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-copy">© {new Date().getFullYear()} HARIOM RATHORE — SGSITS INDORE</div>
        <div className="footer-made">BUILT WITH <span className="accent">♥</span> &amp; JAVA COFFEE</div>
      </footer>
    </>
  );
}
