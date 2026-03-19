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
  linkedin: "www.linkedin.com/in/hariom-rathore-787b81253", // replace with your actual LinkedIn URL
  about: [
    "I'm a B.Tech Computer Science student at SGSITS Indore with a strong foundation in Java, SQL, and web development. I enjoy building practical applications that solve real problems.",
    "I've solved 150+ DSA problems on LeetCode & HackerRank and have hands-on experience building authentication systems, REST APIs, and collaborative platforms.",
    "Currently looking for internships and entry-level opportunities where I can contribute, grow, and build things that matter.",
  ],
  social: {
    LinkedIn: "https://www.linkedin.com/in/hariom-rathore-787b81253", // replace with your actual URL
    GitHub:   "https://github.com/sud0xploit",   // replace with your actual URL
    LeetCode: "https://leetcode.com", // replace with your actual URL
    Email:    "mailto:hariomrathore174@gmail.com",
  },
  stats: [
    { label: "DSA Problems Solved", target: 150 },
    { label: "Projects Built",      target: 2   },
    { label: "Certifications",      target: 3   },
    { label: "CGPA",               target: 7   },
  ],
};

/* ─── EmailJS CONFIG — fill these in ─── */
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
    tags: ["PostgreSQL","Node.js","Express","java Script"],
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
    --paper:  ${dark ? "#0f0f0f" : "#f5f0e8"};
    --accent: #1e6fe8;
    --accent2: #e84c1e;
    --muted:  ${dark ? "#888070" : "#7a7468"};
    --line:   ${dark ? "rgba(240,235,224,0.1)" : "rgba(13,13,13,0.12)"};
    --mono:   'JetBrains Mono', monospace;
    --display:'Bebas Neue', sans-serif;
    --body:   'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--paper); color: var(--ink); font-family: var(--body); cursor: none; transition: background 0.4s, color 0.4s; }

  .noise { position: fixed; inset: 0; pointer-events: none; z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px; opacity: 0.35; }

  .cursor { width: 10px; height: 10px; background: var(--accent); border-radius: 50%;
    position: fixed; pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%); transition: width 0.2s, height 0.2s, opacity 0.2s; }
  .cursor.big { width: 36px; height: 36px; opacity: 0.22; }

  #ptcl { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

  /* NAV */
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 3rem; border-bottom: 1px solid var(--line);
    background: ${dark ? "rgba(15,15,15,0.9)" : "rgba(245,240,232,0.9)"}; backdrop-filter: blur(14px); }
  .nav-logo { font-family: var(--display); font-size: 1.6rem; color: var(--ink); letter-spacing: 0.06em; cursor: none; }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links a { font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; cursor: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--accent); }
  .theme-btn { background: none; border: 1px solid var(--line); padding: 0.3rem 0.75rem;
    font-family: var(--mono); font-size: 0.68rem; color: var(--muted); cursor: none;
    transition: all 0.2s; letter-spacing: 0.08em; }
  .theme-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* HERO */
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 3rem 4rem; position: relative; overflow: hidden; z-index: 1; }
  .hero-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    font-family: var(--display); font-size: 22vw; color: transparent;
    -webkit-text-stroke: 1px ${dark ? "rgba(240,235,224,0.04)" : "rgba(13,13,13,0.05)"};
    white-space: nowrap; pointer-events: none; letter-spacing: -0.02em; user-select: none; }
  .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--mono); font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;
    padding: 0.3rem 0.8rem; border: 1px solid var(--accent); width: fit-content;
    opacity: 0; animation: fadeUp 0.8s 0.15s forwards; }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: pulse 1.5s ease-in-out infinite; }
  .hero-name { font-family: var(--display); font-size: clamp(3.5rem, 10vw, 10rem);
    line-height: 0.88; letter-spacing: -0.01em; opacity: 0; animation: fadeUp 0.9s 0.35s forwards; }
  .hero-name .accent { color: var(--accent); }
  .hero-name .accent2 { color: var(--accent2); }
  .typewriter-wrap { font-family: var(--mono); font-size: 0.88rem; color: var(--muted);
    min-height: 1.4rem; display: flex; align-items: center; gap: 0.3rem; margin-top: 1rem;
    opacity: 0; animation: fadeUp 0.8s 0.6s forwards; }
  .tw-cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); animation: blink 0.75s step-end infinite; }
  .hero-meta { display: flex; justify-content: space-between; align-items: flex-end;
    margin-top: 1.6rem; border-top: 1px solid var(--line); padding-top: 1.5rem;
    opacity: 0; animation: fadeUp 0.9s 0.8s forwards; }
  .hero-tagline { font-size: 0.93rem; color: var(--muted); max-width: 380px; line-height: 1.75; }
  .hero-cta { display: flex; gap: 1rem; flex-direction: column; align-items: flex-end; }
  .cta-btn { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.7rem 1.4rem; cursor: none;
    border: 1px solid var(--ink); color: var(--ink); background: none; transition: all 0.2s; text-decoration: none; }
  .cta-btn:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
  .cta-btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .cta-btn.primary:hover { opacity: 0.85; }
  .hero-scroll { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
  .scroll-line { width: 1px; height: 48px; background: var(--accent); animation: scrollPulse 1.6s ease-in-out infinite; }

  /* SECTION */
  .section { padding: 7rem 3rem; border-top: 1px solid var(--line); position: relative; z-index: 1; }
  .section-label { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 3rem;
    display: flex; align-items: center; gap: 1rem; }
  .section-label::after { content:''; flex:1; height:1px; background:var(--line); max-width:80px; }

  /* STATS */
  .stats-bar { display: grid; grid-template-columns: repeat(4,1fr);
    border: 1px solid var(--line); margin-bottom: 5rem; }
  .stat-item { padding: 2rem 1.5rem; border-right: 1px solid var(--line); text-align: center; }
  .stat-item:last-child { border-right: none; }
  .stat-num { font-family: var(--display); font-size: 3.5rem; color: var(--accent); line-height: 1; }
  .stat-label { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); margin-top: 0.4rem; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
  .about-headline { font-family: var(--display); font-size: clamp(2.5rem,5vw,4.5rem); line-height: 1; letter-spacing: 0.02em; }
  .about-body { font-size: 0.94rem; line-height: 1.85; color: var(--muted); }
  .about-body p+p { margin-top: 1.1rem; }
  .skills-list { margin-top: 2.5rem; display: flex; flex-wrap: wrap; gap: 0.55rem; }
  .skill-tag { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.08em;
    padding: 0.35rem 0.85rem; border: 1px solid var(--ink); text-transform: uppercase;
    transition: all 0.2s; cursor: none; }
  .skill-tag:hover { background: var(--accent); border-color: var(--accent); color: #fff; }

  /* EDUCATION */
  .edu-list { display: flex; flex-direction: column; gap: 0; }
  .edu-row { display: grid; grid-template-columns: 1fr auto; gap: 2rem;
    padding: 1.8rem 0; border-bottom: 1px solid var(--line);
    transition: padding 0.25s ease; position: relative; overflow: hidden; }
  .edu-row::before { content:''; position:absolute; left:0; top:0; bottom:0;
    width:0; background:var(--accent); transition:width 0.3s; }
  .edu-row:hover::before { width: 3px; }
  .edu-row:hover { padding-left: 1.2rem; }
  .edu-institution { font-family: var(--display); font-size: 1.4rem; letter-spacing: 0.04em; margin-bottom: 0.3rem; }
  .edu-degree { font-size: 0.85rem; color: var(--muted); }
  .edu-meta { text-align: right; }
  .edu-year { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); }
  .edu-score { font-family: var(--mono); font-size: 0.75rem; color: var(--accent); margin-top: 0.3rem; font-weight: 500; }

  /* PROJECTS */
  .projects-list { display: flex; flex-direction: column; }
  .project-row { display: grid; grid-template-columns: 60px 1fr 100px 32px;
    align-items: center; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--line);
    cursor: none; transition: padding 0.25s ease; position: relative; overflow: hidden; }
  .project-row::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:var(--accent); transition:width 0.3s; }
  .project-row:hover::before { width: 3px; }
  .project-row:hover { padding-left: 1.2rem; }
  .project-row:hover .project-num { color: var(--accent); }
  .project-row:hover .project-arrow { color: var(--accent); transform: translate(3px,-3px); }
  .project-num { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); transition: color 0.2s; }
  .project-title { font-family: var(--display); font-size: 1.8rem; letter-spacing: 0.04em; }
  .project-desc { font-size: 0.82rem; color: var(--muted); margin-top: 0.3rem; line-height: 1.6; }
  .project-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.6rem; }
  .project-tag { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.05em;
    padding: 0.18rem 0.5rem; background: var(--ink); color: var(--paper); text-transform: uppercase; }
  .project-year { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); }
  .project-arrow { font-size: 1.1rem; color: var(--muted); transition: color 0.2s, transform 0.2s; }

  /* CERTIFICATIONS */
  .certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px;
    border: 1px solid var(--line); }
  .cert-card { padding: 1.8rem 1.5rem; border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line); transition: background 0.2s; }
  .cert-card:hover { background: var(--accent); }
  .cert-card:hover .cert-name { color: #fff; }
  .cert-icon { font-size: 1.5rem; margin-bottom: 0.7rem; }
  .cert-name { font-size: 0.85rem; color: var(--ink); line-height: 1.5; transition: color 0.2s; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
  .contact-headline { font-family: var(--display); font-size: clamp(3rem,7vw,6rem);
    line-height: 0.9; letter-spacing: 0.01em; margin-bottom: 2rem; }
  .contact-headline .accent { color: var(--accent); }
  .contact-detail { font-family: var(--mono); font-size: 0.8rem; color: var(--muted); margin-bottom: 0.5rem; }
  .contact-detail a { color: var(--muted); text-decoration: none; }
  .contact-detail a:hover { color: var(--accent); }
  .social-links { display: flex; gap: 1.2rem; flex-wrap: wrap; margin-top: 2rem; }
  .social-link { font-size: 0.75rem; letter-spacing: 0.09em; text-transform: uppercase;
    text-decoration: none; color: var(--ink); padding-bottom: 2px; cursor: none;
    border-bottom: 1px solid var(--accent); transition: color 0.2s; }
  .social-link:hover { color: var(--accent); }

  /* FORM */
  .form-group { margin-bottom: 1.4rem; }
  .form-label { font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 0.5rem; }
  .form-input { width: 100%; background: transparent; border: none;
    border-bottom: 1px solid var(--line); padding: 0.7rem 0;
    font-family: var(--body); font-size: 0.94rem; color: var(--ink);
    outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-bottom-color: var(--accent); }
  .form-input::placeholder { color: var(--muted); }
  textarea.form-input { resize: vertical; min-height: 110px; }
  .submit-btn { font-family: var(--mono); font-size: 0.74rem; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 0.9rem 2rem; background: var(--accent); color: #fff;
    border: none; cursor: none; transition: opacity 0.2s, transform 0.15s; margin-top: 1.8rem; display: inline-block; }
  .submit-btn:hover:not(:disabled) { opacity: 0.88; }
  .submit-btn:active { transform: scale(0.97); }
  .submit-btn:disabled { opacity: 0.5; }
  .form-msg { font-family: var(--mono); font-size: 0.7rem; margin-top: 0.8rem; }
  .form-msg.ok  { color: #2eb86b; }
  .form-msg.err { color: #e84c1e; }

  /* FOOTER */
  footer { padding: 1.5rem 3rem; border-top: 1px solid var(--line);
    display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; }
  .footer-copy { font-family: var(--mono); font-size: 0.67rem; color: var(--muted); letter-spacing: 0.1em; }
  .footer-made { font-family: var(--mono); font-size: 0.67rem; color: var(--muted); }
  .footer-made .accent { color: var(--accent); }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
  @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.4);opacity:0.3} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }

  @media(max-width:768px){
    nav { padding:1rem 1.2rem; }
    .nav-links { gap:0.8rem; }
    .hero { padding:0 1.5rem 3rem; }
    .hero-name { font-size:15vw; }
    .section { padding:4rem 1.5rem; }
    .stats-bar { grid-template-columns:1fr 1fr; }
    .stat-item { border-right:none; border-bottom:1px solid var(--line); }
    .about-grid,.contact-grid { grid-template-columns:1fr; gap:2.5rem; }
    .project-row { grid-template-columns:40px 1fr 30px; }
    .project-year { display:none; }
    .certs-grid { grid-template-columns:1fr 1fr; }
    footer { flex-direction:column; gap:0.5rem; text-align:center; padding:1.2rem; }
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
        {status === "sending" ? "Sending..." : "Send Message →"}
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
      { threshold: 0.08 }
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
  const [big, setBig]   = useState(false);

  useReveal();

  useEffect(() => {
    const m = e => setCur({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const go  = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const hov = on => setBig(on);

  return (
    <>
      <style>{buildStyles(dark)}</style>
      <div className="noise" />
      <Particles dark={dark} />
      <div className={`cursor${big ? " big" : ""}`} style={{ left: cur.x, top: cur.y }} />

      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo">{ME.initials}</div>
        <div className="nav-links">
          {["about", "education", "projects", "contact"].map(s => (
            <a key={s} onClick={() => go(s)} onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>{s}</a>
          ))}
          <button className="theme-btn" onClick={() => setDark(d => !d)}
            onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}>
            {dark ? "☀ LIGHT" : "☾ DARK"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg-text">CODE</div>
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
          <div className="about-headline reveal">READY<br />TO BUILD.<br />EAGER<br />TO GROW.</div>
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
            <div key={i} className="edu-row reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
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
              style={{ transitionDelay: `${i * 0.08}s` }}
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
                <div className="cert-icon">{c.icon}</div>
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
