import { useState, useEffect, useRef, memo } from "react";
import {
  Moon,
  Sun,
  Mail,
  ExternalLink,
  Monitor,
  Cpu,
  Database,
  Cloud,
  Shield,
  Wifi,
  HardDrive,
  Terminal,
  Server,
  Code,
  Menu,
  X,
  Globe,
  ShoppingBag,
  Plane,
  BookOpen,
  Home,
} from "lucide-react";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
/* ═══════════ TYPEWRITER (ref-based, zero re-renders) ═══════════ */
const TITLES = [
  "Web Developer",
  "Web Designer",
  "AI Engineer",
  "Information Technologist",
];
const TypewriterTitle = memo(({ color }) => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  useEffect(() => {
    let idx = 0,
      pos = 0,
      del = false,
      timer;
    const tick = () => {
      const word = TITLES[idx];
      if (!textRef.current) return;
      if (!del) {
        pos++;
        textRef.current.textContent = word.substring(0, pos);
        if (pos === word.length) {
          if (cursorRef.current)
            cursorRef.current.style.animation = "blink 1s step-end infinite";
          timer = setTimeout(() => {
            del = true;
            if (cursorRef.current) {
              cursorRef.current.style.animation = "none";
              cursorRef.current.style.opacity = "1";
            }
            tick();
          }, 2800);
          return;
        }
        timer = setTimeout(tick, 85 + Math.random() * 55);
      } else {
        pos--;
        textRef.current.textContent = word.substring(0, pos);
        if (pos === 0) {
          del = false;
          idx = (idx + 1) % TITLES.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 30 + Math.random() * 25);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return (
    <p
      className="mono"
      style={{ fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 600, color }}
    >
      <span ref={textRef} />
      <span
        ref={cursorRef}
        style={{
          display: "inline-block",
          width: 2,
          height: "1.1em",
          marginLeft: 3,
          background: color,
          verticalAlign: "text-bottom",
          animation: "blink 1s step-end infinite",
        }}
      />
    </p>
  );
});

/* ═══════════ SCROLL REVEAL (no flash fix) ═══════════ */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  style: extraStyle = {},
}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVis(true);
      setReady(true);
      return;
    }
    setReady(true);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: !ready ? 0 : vis ? 1 : 0,
        transform: !ready ? "none" : vis ? "translateY(0)" : "translateY(40px)",
        transition: ready
          ? `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}s, transform .75s cubic-bezier(.22,1,.36,1) ${delay}s`
          : "none",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════ FLOATING PARTICLES (CSS-only animation) ═══════════ */
const iconList = [
  Monitor,
  Cpu,
  Database,
  Cloud,
  Shield,
  Wifi,
  HardDrive,
  Terminal,
  Server,
  Code,
];
const particles = Array.from({ length: 20 }, (_, i) => ({
  Icon: iconList[i % iconList.length],
  left: `${(i * 5 + 1.5) % 97}%`,
  size: 18 + (i % 5) * 6,
  dur: 20 + (i % 7) * 6,
  dly: -(i * 2.5),
  up: i % 2 === 0,
}));

/* ═══════════ STYLES ═══════════ */
const injectOnce = () => {
  if (document.getElementById("pf-s")) return;
  const s = document.createElement("style");
  s.id = "pf-s";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
@keyframes floatUp{0%{transform:translateY(110vh) rotate(0deg);opacity:0}8%{opacity:0.6}92%{opacity:0.6}100%{transform:translateY(-8vh) rotate(270deg);opacity:0}}
@keyframes floatDown{0%{transform:translateY(-8vh) rotate(0deg);opacity:0}8%{opacity:0.6}92%{opacity:0.6}100%{transform:translateY(110vh) rotate(-270deg);opacity:0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.75}}
html,body,#root{margin:0;padding:0;width:100%;min-height:100vh;overflow-x:hidden}
html{scroll-behavior:smooth}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Sora',sans-serif}
.mono{font-family:'Space Mono',monospace}
.gt{background:linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradShift 4s ease infinite}
.gtd{background:linear-gradient(135deg,#38bdf8,#a78bfa,#fb7185);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradShift 4s ease infinite}
.navl{position:relative}.navl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:linear-gradient(90deg,#0ea5e9,#8b5cf6);transition:width .3s}.navl:hover::after{width:100%}
.ch{transition:all .4s cubic-bezier(.22,1,.36,1)}.ch:hover{transform:translateY(-5px)}
.hm{display:flex!important}.sm{display:none!important}
@media(max-width:768px){.hm{display:none!important}.sm{display:flex!important}}
section{scroll-margin-top:80px}
`;
  document.head.appendChild(s);
};

/* ═══════════ MAIN ═══════════ */
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [mob, setMob] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    injectOnce();
  }, []);

  // track active section on scroll
  useEffect(() => {
    const secs = ["hero", "about", "projects", "resume", "contact"];
    const onScroll = () => {
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(secs[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMob(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const c = dark
    ? {
        bg: "#0b0f1a",
        brd: "#1e293b",
        txt: "#e2e8f0",
        mut: "#94a3b8",
        acc: "#38bdf8",
        ac2: "#a78bfa",
        nav: "rgba(11,15,26,.88)",
        cardBg: "rgba(255,255,255,.025)",
      }
    : {
        bg: "#f8fafc",
        brd: "#e2e8f0",
        txt: "#1e293b",
        mut: "#64748b",
        acc: "#0ea5e9",
        ac2: "#8b5cf6",
        nav: "rgba(248,250,252,.88)",
        cardBg: "rgba(255,255,255,.75)",
      };
  const g = dark ? "gtd" : "gt";

  const nav = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const SectionTitle = ({ tag, title, accent, delay = 0 }) => (
    <Reveal delay={delay}>
      <p
        className="mono"
        style={{
          color: c.acc,
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {tag}
      </p>
      <h2
        style={{
          fontSize: "clamp(28px,4vw,44px)",
          fontWeight: 700,
          color: c.txt,
          marginBottom: 48,
        }}
      >
        {title} <span className={g}>{accent}</span>
      </h2>
    </Reveal>
  );

  /* ═══════ Project link button helper ═══════ */
  const ProjectBtn = ({ href, icon: Ic, label }) => {
    const isActive = !!href;
    if (isActive) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            border: `1px solid ${c.acc}`,
            background: "transparent",
            color: c.acc,
            fontFamily: "'Sora'",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            cursor: "pointer",
            transition: "all .3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = c.acc;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = c.acc;
          }}
        >
          <Ic size={14} />
          {label}
        </a>
      );
    }
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 16px",
          borderRadius: 10,
          border: `1px solid ${dark ? "rgba(148,163,184,0.2)" : "rgba(100,116,139,0.2)"}`,
          background: "transparent",
          color: dark ? "rgba(148,163,184,0.35)" : "rgba(100,116,139,0.35)",
          fontFamily: "'Sora'",
          fontSize: 13,
          fontWeight: 500,
          cursor: "not-allowed",
        }}
      >
        <Ic size={14} />
        {label}
      </span>
    );
  };

  /* ════════════════════════════════════════════════════════════ */
  return (
    <div
      style={{
        background: c.bg,
        color: c.txt,
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        transition: "background .6s, color .6s",
      }}
    >
      {/* ══ FLOATING ICONS ══ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              color: dark ? "rgba(148,163,184,0.22)" : "rgba(120,130,150,0.28)",
              animation: `${p.up ? "floatUp" : "floatDown"} ${p.dur}s linear ${
                p.dly
              }s infinite`,
              willChange: "transform",
            }}
          >
            <p.Icon size={p.size} strokeWidth={1} />
          </div>
        ))}
      </div>

      {/* ══ AMBIENT BLOBS ══ */}
      <div
        style={{
          position: "fixed",
          top: "8%",
          right: "-12%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          filter: "blur(130px)",
          pointerEvents: "none",
          zIndex: 0,
          background: dark ? "rgba(56,189,248,.05)" : "rgba(14,165,233,.05)",
          transition: "background .6s",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          left: "-10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          filter: "blur(130px)",
          pointerEvents: "none",
          zIndex: 0,
          background: dark ? "rgba(167,139,250,.04)" : "rgba(139,92,246,.04)",
          transition: "background .6s",
        }}
      />

      {/* ══ NAV ══ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 100,
          padding: "0 24px",
          height: 72,
          background: c.nav,
          backdropFilter: "blur(18px)",
          borderBottom: `1px solid ${c.brd}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background .6s, border-color .6s",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: c.txt }}>
            R<span className={g}>V</span>
          </span>
        </button>
        <div className="hm" style={{ gap: 6, alignItems: "center" }}>
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="navl"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 14px",
                fontFamily: "'Sora'",
                fontSize: 14,
                fontWeight: active === n.id ? 600 : 400,
                color: active === n.id ? c.acc : c.mut,
                transition: "color .3s",
              }}
              onMouseEnter={(e) => {
                if (active !== n.id) e.target.style.color = c.txt;
              }}
              onMouseLeave={(e) => {
                if (active !== n.id) e.target.style.color = c.mut;
              }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="ch"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: `1px solid ${c.brd}`,
              background: dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: c.txt,
              marginLeft: 8,
            }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="sm" style={{ gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: `1px solid ${c.brd}`,
              background: dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: c.txt,
            }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMob(!mob)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: `1px solid ${c.brd}`,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: c.txt,
            }}
          >
            {mob ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay — always mounted, animated in/out */}
      <div
        style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: dark ? "rgba(11,15,26,.97)" : "rgba(248,250,252,.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: mob ? 1 : 0,
          pointerEvents: mob ? "auto" : "none",
          transform: mob ? "translateY(0)" : "translateY(-20px)",
          transition:
            "opacity .35s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {nav.map((n, i) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "16px 32px",
              fontFamily: "'Sora'",
              fontSize: 24,
              fontWeight: active === n.id ? 700 : 400,
              color: active === n.id ? c.acc : c.txt,
              opacity: mob ? 1 : 0,
              transform: mob ? "translateY(0)" : "translateY(-15px)",
              transition: `opacity .3s cubic-bezier(.22,1,.36,1) ${mob ? 0.06 + i * 0.05 : 0}s, transform .3s cubic-bezier(.22,1,.36,1) ${mob ? 0.06 + i * 0.05 : 0}s, color .3s`,
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ──────── HERO ──────── */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 60,
              justifyContent: "center",
            }}
          >
            <Reveal>
              <div style={{ position: "relative", width: 380, height: 440 }}>
                {/* Subtle gradient glow behind the photo */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${dark ? "rgba(56,189,248,.1)" : "rgba(14,165,233,.07)"} 0%, transparent 70%)`,
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />
                <img
                  src="/ricky-photo.png"
                  alt="Ricky Vang"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    position: "relative",
                    zIndex: 1,
                    filter: `drop-shadow(0 10px 30px ${dark ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.08)"})`,
                  }}
                />
              </div>
            </Reveal>
            <div style={{ flex: "1 1 380px", minWidth: 280 }}>
              <Reveal delay={0.1}>
                <p
                  className="mono"
                  style={{
                    color: c.acc,
                    fontSize: 14,
                    letterSpacing: 2,
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Hello, I'm
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h1
                  style={{
                    fontSize: "clamp(36px,5vw,56px)",
                    fontWeight: 700,
                    color: c.txt,
                    lineHeight: 1.1,
                    marginBottom: 16,
                  }}
                >
                  Ricky <span className={g}>Vang</span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <div
                  style={{
                    height: 40,
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TypewriterTitle color={c.ac2} />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <p
                  style={{
                    color: c.mut,
                    fontSize: 16,
                    lineHeight: 1.7,
                    maxWidth: 500,
                    marginBottom: 32,
                  }}
                >
                  Building thoughtful digital experiences with modern
                  technologies. Passionate about clean code, beautiful
                  interfaces, AI-powered solutions, and solving complex
                  problems.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="ch"
                    style={{
                      padding: "14px 32px",
                      borderRadius: 12,
                      border: "none",
                      cursor: "pointer",
                      background: `linear-gradient(135deg, ${c.acc}, ${c.ac2})`,
                      color: "#fff",
                      fontFamily: "'Sora'",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    Get in Touch
                  </button>
                  <button
                    onClick={() => scrollTo("resume")}
                    style={{
                      padding: "14px 32px",
                      borderRadius: 12,
                      cursor: "pointer",
                      background: "transparent",
                      border: `2px solid ${c.brd}`,
                      color: c.txt,
                      fontFamily: "'Sora'",
                      fontWeight: 600,
                      fontSize: 15,
                      transition: "border-color .3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.borderColor = c.acc)}
                    onMouseLeave={(e) => (e.target.style.borderColor = c.brd)}
                  >
                    View Resume
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
                  {[
                    { icon: GithubIcon, href: "https://github.com/vangricky" },
                    {
                      icon: LinkedinIcon,
                      href: "https://www.linkedin.com/in/rickyvang/",
                    },
                    { icon: Mail, href: "mailto:cheemengrvang@gmail.com" },
                  ].map(({ icon: Ic, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ch"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `1px solid ${c.brd}`,
                        color: c.mut,
                        transition: "all .3s",
                        background: dark
                          ? "rgba(255,255,255,.03)"
                          : "rgba(0,0,0,.02)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = c.acc;
                        e.currentTarget.style.borderColor = c.acc;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = c.mut;
                        e.currentTarget.style.borderColor = c.brd;
                      }}
                    >
                      <Ic size={20} />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ──────── ABOUT ──────── */}
        <section
          id="about"
          style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}
        >
          <SectionTitle tag="Get to know me" title="About" accent="Me" />
          <div>
            <div style={{ maxWidth: 800 }}>
              {[
                "I'm Ricky Vang, a technologist and developer who thrives at the intersection of building things and figuring out how they work. I earned my Bachelor of Science in Web Design and Development from Brigham Young University-Idaho, where I spent just as much time outside the classroom teaching myself new frameworks and tools as I did in lectures.",
                "My professional journey has taken me from nearly four years as an IT Support Technician at BYU-Idaho, where I mentored teams, wrote documentation that actually got used, and kept campus technology running smoothly, to my current role as an Epic Technology Advisor at Adventist Health, where I deploy and configure critical healthcare systems across clinics and hospitals. Along the way, I've built production websites for real clients, led a university society as president, and developed full stack applications from the ground up.",
                "Currently, I'm actively learning and building with large language models, exploring retrieval augmented generation, prompt engineering, and fine tuning techniques like QLoRA using tools such as LangChain, Hugging Face, and Gradio. Combining my web development skills with AI is where I see the future heading, and I want to be at the forefront of it. Whether it's crafting a clean user interface, configuring network infrastructure, or building an AI powered tool, I bring the same level of care, curiosity, and commitment to everything I work on.",
              ].map((t2, i) => (
                <Reveal key={i} delay={0.15 + i * 0.1}>
                  <p
                    style={{
                      color: c.txt,
                      fontSize: 16,
                      lineHeight: 1.8,
                      marginBottom: 20,
                    }}
                  >
                    {t2}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          {/* Skills */}
          <Reveal delay={0.15}>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: c.txt,
                marginTop: 56,
                marginBottom: 24,
              }}
            >
              Technical <span className={g}>Toolkit</span>
            </h3>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                t: "Frontend",
                d: "React, Angular, Svelte, TypeScript, Tailwind, SASS, Bootstrap",
              },
              { t: "Backend", d: "Node.js, Express.js, ASP.NET, C#, Python" },
              { t: "Databases", d: "MongoDB, PostgreSQL, MySQL" },
              {
                t: "AI & Machine Learning",
                d: "Prompt Engineering, LLM APIs, RAG, LangChain, Hugging Face, Gradio, QLoRA Fine-tuning",
              },
              {
                t: "IT & Networking",
                d: "SolarWinds, DHCP, PXE Boot, Ivanti, Network Toning",
              },
              { t: "Tools", d: "Git, GitHub, Figma, VS Code" },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.08 + i * 0.06}>
                <div
                  className="ch"
                  style={{
                    padding: 24,
                    borderRadius: 16,
                    border: `1px solid ${c.brd}`,
                    background: c.cardBg,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: c.acc,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {s.t}
                  </p>
                  <p style={{ color: c.mut, fontSize: 14, lineHeight: 1.7 }}>
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ──────── PROJECTS ──────── */}
        <section
          id="projects"
          style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}
        >
          <SectionTitle
            tag="What I've Built"
            title="Featured"
            accent="Projects"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                icon: Home,
                title: "HomeGap",
                desc: "A web application designed to make interior design accessible and affordable for everyone. HomeGap helps users bridge the gap between their dream home vision and reality by providing intuitive tools and resources for planning and visualizing interior spaces, regardless of budget or design experience.",
                tags: ["React", "Web App", "UI/UX", "Interior Design"],
                github: null,
                live: "https://homegap.app/",
              },
              {
                icon: Globe,
                title: "High Desert Investments LLC",
                desc: "Led the development of a responsive, production-ready website using React and Tailwind CSS. Worked closely with the client to refine design requirements and deliver a tailored user experience that reflects their brand identity.",
                tags: [
                  "React",
                  "Tailwind CSS",
                  "Responsive Design",
                  "Client Work",
                ],
                github:
                  "https://github.com/highdesertinvestments/highdesertinvestments",
                live: null,
              },
              {
                icon: ShoppingBag,
                title: "Discount Catalog",
                desc: "Created a full-stack affiliate marketing website using Node.js and Express.js to centralize online deals. Users can find discounts from multiple sources in one place. Deployed on a personal domain with custom backend architecture.",
                tags: [
                  "Node.js",
                  "Express.js",
                  "Full-Stack",
                  "Affiliate Marketing",
                ],
                github: "https://github.com/vangricky/discountcatalog",
                live: null,
              },
              {
                icon: Plane,
                title: "Flight Finder",
                desc: "A flight search application built as a final project for WDD 330. Users can search and discover flights with an intuitive interface, making travel planning simple and efficient. Deployed and hosted on Render.",
                tags: ["JavaScript", "Web App", "API Integration", "Render"],
                github:
                  "https://github.com/vangricky/wdd330-finalproject/tree/main",
                live: "https://flight-finder-nkge.onrender.com/",
              },
              {
                icon: BookOpen,
                title: "Book API",
                desc: "A collaborative RESTful API built with a team for Web Backend Development class. The API provides full CRUD operations for managing a book catalog, showcasing backend architecture, route handling, and database integration.",
                tags: ["Node.js", "REST API", "MongoDB", "Team Project"],
                github: "https://github.com/byui-cse341-f24/Group-3---Book-API",
                live: "https://group-3-book-api.onrender.com/",
              },
              {
                icon: Cpu,
                title: "AI Web Scraper & Summarizer",
                desc: "Built a Python-based web scraper that fetches and cleans webpage text, then generates AI-powered summaries using OpenAI LLMs. The tool analyzes raw web content and produces concise, human-readable summaries for quick content digestion.",
                tags: ["Python", "OpenAI API", "Web Scraping", "LLMs"],
                github: "https://github.com/vangricky/llm_engineer_projects",
                live: null,
              },
            ].map((proj, i) => (
              <Reveal key={proj.title} delay={0.1 + i * 0.12}>
                <div
                  className="ch"
                  style={{
                    padding: 32,
                    borderRadius: 20,
                    border: `1px solid ${c.brd}`,
                    background: c.cardBg,
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${c.acc}18, ${c.ac2}18)`,
                      color: c.acc,
                      marginBottom: 20,
                    }}
                  >
                    <proj.icon size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: c.txt,
                      marginBottom: 12,
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      color: c.mut,
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 20,
                      flex: 1,
                    }}
                  >
                    {proj.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono"
                        style={{
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 8,
                          background: dark
                            ? "rgba(56,189,248,.08)"
                            : "rgba(14,165,233,.06)",
                          color: c.acc,
                          letterSpacing: 0.5,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <ProjectBtn
                      href={proj.github}
                      icon={GithubIcon}
                      label="GitHub"
                    />
                    <ProjectBtn
                      href={proj.live}
                      icon={ExternalLink}
                      label="Live Site"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ──────── RESUME ──────── */}
        <section
          id="resume"
          style={{ padding: "100px 24px", maxWidth: 860, margin: "0 auto" }}
        >
          <SectionTitle tag="My Background" accent="Resume" />
          <div
            style={{
              padding: "40px clamp(20px,4vw,48px)",
              borderRadius: 20,
              border: `1px solid ${c.brd}`,
              background: c.cardBg,
              backdropFilter: "blur(12px)",
            }}
          >
            <Reveal delay={0.1}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 40,
                  paddingBottom: 24,
                  borderBottom: `1px solid ${c.brd}`,
                }}
              >
                <h2 style={{ fontSize: 28, fontWeight: 700, color: c.txt }}>
                  Cheemeng Ricky Vang
                </h2>
                <p style={{ color: c.mut, fontSize: 14, marginTop: 8 }}>
                  cheemengrvang@gmail.com &nbsp;|&nbsp; (916) 398-7814
                  &nbsp;|&nbsp; linkedin.com/in/rickyvang
                </p>
              </div>
            </Reveal>
            {/* Education */}
            <ResumeSection t={c} g={g} title="Education" delay={0.15}>
              <ResumeEntry
                t={c}
                title="B.S. Web Design and Development"
                sub="Brigham Young University – Idaho"
                date="Dec 2025"
                dots={[
                  "Full Stack Web Development Certificate",
                  "Web Frontend Development Certificate",
                  "Web Development Certificate",
                ]}
              />
            </ResumeSection>
            {/* AI & Generative AI */}
            <ResumeSection t={c} g={g} title="AI & Generative AI" delay={0.17}>
              <ResumeEntry
                t={c}
                title="AI & Generative AI Learning"
                sub="In Progress/Self-Directed"
                date="Ongoing"
                dots={[
                  "Learning and implementing Retrieval-Augmented Generation (RAG) for document-based AI systems",
                  "Working with frontier and open-source models, focusing on inference and prompt engineering",
                  "Developing AI agents and tool-using workflows",
                  "Applying fine-tuning techniques such as QLoRA",
                  "Using tools and frameworks including Hugging Face, LangChain, and Gradio",
                ]}
              />
            </ResumeSection>
            {/* Experience */}
            <ResumeSection t={c} g={g} title="Work Experience" delay={0.2}>
              <ResumeEntry
                t={c}
                title="Epic Technology Advisor — Contract"
                sub="Adventist Health"
                date="Nov 2025 – Apr 2026"
                dots={[
                  "Deploy Epic hardware across clinics, hospitals, and emergency departments, ensuring devices are properly configured and operational",
                  "Install, maintain, and troubleshoot Workstations on Wheels (WOWs) to support daily clinical workflows",
                  "Managing and resolving IT support tickets using Ivanti by communicating with medical staff and addressing hardware and software issues in a timely manner",
                  "Perform network toning and tracing in IDF closets to identify and verify network connections",
                  "Used SolarWinds to manage IP addressing, including modifying device IPs and creating DHCP IP reservations to ensure network stability",
                  "Utilized PXE boot for automated imaging and deployment of workstation systems",
                ]}
              />
              <ResumeEntry
                t={c}
                title="IT Support Technician"
                sub="BYU-Idaho, Rexburg, ID"
                date="Jul 2021 – Apr 2025"
                dots={[
                  "Provided independent consultation to supervisors on team performance, gave feedback on technician effectiveness, and participated in interviewing and onboarding new hires to strengthen team capability",
                  "Drafted, reviewed, and maintained technical documentation, training manuals, and blueprints for classroom technology, ensuring accuracy, clarity, and compliance with organizational standards. Guided the setup, maintenance, and troubleshooting of conference room technology, ensuring 100% functionality during meetings, and reducing downtime by 20%",
                  "Served as liaison between IT, HR, faculty, and campus departments, communicating technical information and resolving escalated performance and technology issues",
                  "Supervised and mentored new technicians, providing hands-on training, constructive feedback, and progressive guidance to improve individual and team effectiveness. Orchestrated weekly team meetings for all 10 members on the team; Conducted training on campus technology and troubleshooting best practices with hands-on projects",
                ]}
              />
            </ResumeSection>
            {/* Leadership */}
            <ResumeSection t={c} g={g} title="Leadership" delay={0.25}>
              <ResumeEntry
                t={c}
                title="President — Web Design & Development Society"
                sub="BYU-Idaho"
                date="Sep – Dec 2024"
                dots={[
                  "Led weekly strategy meetings with my Vice President, Media Content Creator, Events Coordinator, and Marketing Head to plan and coordinate instructional topics and activities for 10+ members, representing society at career fairs to engage peers, parents, and prospective parents",
                  "Collaborated with adjunct professor to prototype a music portfolio website",
                ]}
              />
            </ResumeSection>
          </div>
        </section>

        {/* ──────── CONTACT ──────── */}
        <section
          id="contact"
          style={{
            padding: "100px 24px 120px",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <SectionTitle tag="Let's Connect" title="Get in" accent="Touch" />
          <p
            style={{
              color: c.mut,
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: 48,
              marginTop: -32,
            }}
          >
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
            <div style={{ flex: "1 1 380px" }}>
              <Reveal delay={0.1}>
                <ContactForm c={c} dark={dark} />
              </Reveal>
            </div>
            <div style={{ flex: "1 1 240px" }}>
              <Reveal delay={0.2}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "cheemengrvang@gmail.com",
                      href: "mailto:cheemengrvang@gmail.com",
                    },
                    {
                      icon: LinkedinIcon,
                      label: "LinkedIn",
                      value: "linkedin.com/in/rickyvang",
                      href: "https://www.linkedin.com/in/rickyvang/",
                    },
                    {
                      icon: GithubIcon,
                      label: "GitHub",
                      value: "github.com/vangricky",
                      href: "https://github.com/vangricky",
                    },
                  ].map(({ icon: Ic, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ch"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        textDecoration: "none",
                        padding: 20,
                        borderRadius: 16,
                        border: `1px solid ${c.brd}`,
                        background: c.cardBg,
                        transition: "all .3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = c.acc)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = c.brd)
                      }
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `linear-gradient(135deg, ${c.acc}22, ${c.ac2}22)`,
                          color: c.acc,
                        }}
                      >
                        <Ic size={20} />
                      </div>
                      <div>
                        <p
                          className="mono"
                          style={{
                            fontSize: 11,
                            color: c.mut,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            marginBottom: 2,
                          }}
                        >
                          {label}
                        </p>
                        <p style={{ color: c.txt, fontSize: 14 }}>{value}</p>
                      </div>
                      <ExternalLink
                        size={14}
                        style={{ color: c.mut, marginLeft: "auto" }}
                      />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer
          style={{
            textAlign: "center",
            padding: "32px 24px",
            borderTop: `1px solid ${c.brd}`,
            transition: "border-color .6s",
          }}
        >
          <p style={{ color: c.mut, fontSize: 13 }}>
            &copy; {new Date().getFullYear()} Ricky Vang.
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ═══════════ SUB-COMPONENTS ═══════════ */

function ResumeSection({ t, g, title, delay, children }) {
  return (
    <Reveal delay={delay}>
      <div style={{ marginBottom: 48 }}>
        <h3
          className="mono"
          style={{
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: t.acc,
            marginBottom: 20,
            paddingBottom: 8,
            borderBottom: `2px solid ${t.brd}`,
          }}
        >
          {title}
        </h3>
        {children}
      </div>
    </Reveal>
  );
}

function ResumeEntry({ t, title, sub, date, dots }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <h4 style={{ fontSize: 17, fontWeight: 600, color: t.txt }}>{title}</h4>
        {date && (
          <span className="mono" style={{ fontSize: 12, color: t.ac2 }}>
            {date}
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 14,
          color: t.mut,
          marginBottom: 10,
          fontStyle: "italic",
        }}
      >
        {sub}
      </p>
      <ul style={{ paddingLeft: 20, listStyle: "none" }}>
        {dots.map((b, i) => (
          <li
            key={i}
            style={{
              color: t.mut,
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 6,
              position: "relative",
              paddingLeft: 16,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${t.acc}, ${t.ac2})`,
              }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactForm({ c, dark }) {
  const inp = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    fontSize: 15,
    border: `1px solid ${c.brd}`,
    background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.02)",
    color: c.txt,
    fontFamily: "'Sora'",
    outline: "none",
    transition: "border-color .3s",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input
        id="cf-n"
        placeholder="Your Name"
        style={inp}
        onFocus={(e) => (e.target.style.borderColor = c.acc)}
        onBlur={(e) => (e.target.style.borderColor = c.brd)}
      />
      <input
        id="cf-e"
        placeholder="Your Email"
        style={inp}
        onFocus={(e) => (e.target.style.borderColor = c.acc)}
        onBlur={(e) => (e.target.style.borderColor = c.brd)}
      />
      <textarea
        id="cf-m"
        placeholder="Your Message"
        rows={6}
        style={{ ...inp, resize: "vertical" }}
        onFocus={(e) => (e.target.style.borderColor = c.acc)}
        onBlur={(e) => (e.target.style.borderColor = c.brd)}
      />
      <button
        onClick={() => {
          const n = document.getElementById("cf-n").value,
            e = document.getElementById("cf-e").value,
            m = document.getElementById("cf-m").value;
          window.open(
            `mailto:cheemengrvang@gmail.com?subject=${encodeURIComponent(
              "Portfolio Contact from " + n,
            )}&body=${encodeURIComponent(
              "Name: " + n + "\nEmail: " + e + "\n\n" + m,
            )}`,
            "_blank",
          );
        }}
        className="ch"
        style={{
          padding: "14px 32px",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          background: `linear-gradient(135deg, ${c.acc}, ${c.ac2})`,
          color: "#fff",
          fontFamily: "'Sora'",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        Send Message
      </button>
    </div>
  );
}
