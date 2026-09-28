import { useEffect, useRef, useState } from "react";
import {
  architecturePatterns,
  experience,
  expertise,
  liveProjects,
  localProjects,
  principles,
  profile,
} from "./content/portfolio";

type ThemePreference = "dark" | "light" | "system";

function ArrowIcon({ direction = "up" }: { direction?: "up" | "down" }) {
  return direction === "down" ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v16m0 0-6-6m6 6 6-6" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: ThemePreference }) {
  if (theme === "light")
    return (
      <svg
        className="theme-glyph"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  if (theme === "dark")
    return (
      <svg
        className="theme-glyph"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
      </svg>
    );
  return (
    <svg
      className="theme-glyph"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
    </svg>
  );
}

function SectionHeading({
  id,
  number,
  label,
  title,
  accent,
  description,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  description?: string;
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="section-kicker">
          {number} / {label}
        </p>
        <h2 id={id}>
          {title} <em>{accent}</em>
        </h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    try {
      const value = localStorage.getItem("portfolio-theme");
      return value === "dark" || value === "light" ? value : "system";
    } catch {
      return "system";
    }
  });

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: light)");
    const apply = () => {
      const resolved =
        preference === "system"
          ? media.matches
            ? "light"
            : "dark"
          : preference;
      document.documentElement.dataset.theme = resolved;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", resolved === "light" ? "#f6f4ef" : "#111115");
    };
    apply();
    media.addEventListener("change", apply);
    try {
      localStorage.setItem("portfolio-theme", preference);
    } catch {
      /* preference is optional */
    }
    return () => media.removeEventListener("change", apply);
  }, [preference]);

  return { preference, setPreference };
}

function Header({
  theme,
  setTheme,
}: {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        headerRef.current
          ?.querySelector<HTMLButtonElement>(".menu-toggle")
          ?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      )
        setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const nextTheme = () =>
    setTheme(
      theme === "system" ? "dark" : theme === "dark" ? "light" : "system",
    );
  const themeLabel =
    theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      id="top"
      ref={headerRef}
    >
      <div className="shell header-inner">
        <a
          className="brand"
          href="#top"
          aria-label="Satyajit Senapati, Back to Top"
          onClick={() => setMenuOpen(false)}
        >
          <img
            className="brand-mark"
            src="./favicon.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-name">Satyajit Senapati</span>
        </a>
        <nav
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          id="site-nav"
          aria-label="Main navigation"
        >
          {[
            ["Work", "#projects"],
            ["About", "#about"],
            ["Expertise", "#expertise"],
            ["Experience", "#experience"],
            ["Architecture", "#architecture"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact <ArrowIcon />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={nextTheme}
            aria-label={`Theme: ${themeLabel}. Change theme`}
            title={`Theme: ${themeLabel}. Click to switch`}
          >
            <ThemeIcon theme={theme} />
            <span>{themeLabel}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 0v80M0 40h80M12 12l56 56M12 68l56-56"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> LEAD DATA & AI ENGINEER · INDIA
        </p>
        <p className="hero-hello">Hi, I’m Satyajit.</p>
        <h1 id="hero-title">
          Intelligent Systems <br />
          <em>from Data to AI.</em>
        </h1>
        <p className="hero-intro">
          I connect data, cloud, and AI to build systems that work in the real
          world. From enterprise platforms to thoughtfully crafted products.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore My Work <ArrowIcon />
          </a>
          <a className="button button-secondary" href={profile.resume} download>
            Download Resume <ArrowIcon direction="down" />
          </a>
        </div>
        <div className="hero-socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowIcon />
          </a>
          <span>Architecture Meets Execution</span>
        </div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-orbit orbit-one" aria-hidden="true" />
        <div className="portrait-orbit orbit-two" aria-hidden="true" />
        <span className="portrait-coordinate" aria-hidden="true">
          PERSON / ENGINEER / BUILDER
        </span>
        <div className="portrait-disc">
          <div className="portrait-grid" aria-hidden="true" />
          <img
            src="./images/satyajit-avatar.webp"
            width="720"
            height="720"
            alt="Digital avatar of Satyajit Senapati"
            fetchPriority="high"
          />
        </div>
        <Spark className="portrait-spark" />
        <div className="portrait-label">
          <span className="status-dot" />
          <div>
            <strong>Satyajit Senapati</strong>
            <span>Turning Complexity into Clarity</span>
          </div>
          <span className="label-symbol" aria-hidden="true">
            ↗
          </span>
        </div>
        <span className="portrait-note">A Human Behind the Systems.</span>
      </div>
      <div className="hero-bottom">
        <p>
          Built on Experience.
          <br />
          <strong>Driven by Curiosity.</strong>
        </p>
        <div className="hero-facts">
          <div>
            <strong>
              8<span>+</span>
            </strong>
            <span>Years in Data Engineering</span>
          </div>
          <div>
            <strong>
              2<span>+</span>
            </strong>
            <span>Years in Enterprise AI</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Industries Served</span>
          </div>
        </div>
        <a
          href="#projects"
          className="scroll-link"
          aria-label="Scroll to selected work"
        >
          <ArrowIcon direction="down" />
        </a>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="shell">
        <SectionHeading
          id="projects-title"
          number="01"
          label="SELECTED WORK"
          title="From an Idea"
          accent="to Something Useful."
          description="Personal products and engineering tools. Built with the same care I bring to enterprise systems."
        />
        <div className="featured-projects">
          {liveProjects.map((project, index) => (
            <article
              className={`featured-project project-${index + 1} reveal`}
              key={project.name}
            >
              <a
                className="project-visual"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${project.name}`}
              >
                <div className={index === 0 ? "datarevia-art" : "nevri-art"}>
                  <span className="art-caption">
                    {index === 0
                      ? "KNOW THE CONCEPT. OWN THE ANSWER."
                      : "A QUIETER PLACE TO WRITE"}
                  </span>
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                      <small>{new URL(project.demo).hostname}</small>
                    </div>
                    <img
                      src={`./images/${index === 0 ? "datarevia" : "nevri"}-preview.webp`}
                      width="1200"
                      height="833"
                      alt={`Visit ${project.name} website`}
                      loading="lazy"
                    />
                  </div>
                  <span className="art-footnote">
                    {index === 0
                      ? "A Local-First Approach to Learning"
                      : "Space for Your Next Thought."}
                  </span>
                </div>
                <span className="visual-open">
                  <ArrowIcon />
                </span>
              </a>
              <div className="project-copy">
                <p className="section-kicker">
                  <span className="status-dot" /> WEB APPLICATION{" "}
                  <span className="project-count">0{index + 1}</span>
                </p>
                <h3>{project.name}</h3>
                <p className="project-positioning">{project.positioning}</p>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <details className="project-details">
                  <summary>
                    Inside the Product <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
                <a
                  className="text-link"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Website for ${project.name}`}
                >
                  Visit Website <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="local-projects">
          <div className="local-projects-heading">
            <h3>
              From the Workbench<span>.</span>
            </h3>
            <p>Local Tools. Public Repositories.</p>
          </div>
          <div className="local-projects-grid">
            {localProjects.map((project, index) => (
              <article className="local-project-card reveal" key={project.name}>
                <div className="local-project-top">
                  <span className="tool-symbol" aria-hidden="true">
                    {index === 0 ? "⌘" : ">_"}
                  </span>
                  <span className="section-kicker">
                    {index === 0 ? "ORCHESTRATION" : "HANDS-ON PRACTICE"}
                  </span>
                  <a
                    className="icon-link"
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} repository`}
                  >
                    <ArrowIcon />
                  </a>
                </div>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <details className="project-details">
                  <summary>
                    Explore Capabilities <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <a
                  className="text-link"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="section about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="shell about-layout">
        <div className="about-aside reveal">
          <p className="section-kicker">02 / THE PERSON BEHIND THE WORK</p>
          <div className="about-emblem" aria-hidden="true">
            <Spark />
            <span>DATA · INTELLIGENCE · SOFTWARE</span>
          </div>
          <p className="about-caption">
            An Engineer’s Mind.
            <br />
            <em>A Builder’s Instinct.</em>
          </p>
        </div>
        <div className="about-main reveal">
          <h2 id="about-title">
            The Best Systems <br />
            Make Complexity <em>Feel Simple.</em>
          </h2>
          <p className="about-lead">
            I’m a data and AI engineer who cares about the whole picture — the
            platform underneath and the person using it.
          </p>
          <p>
            My work connects ingestion and distributed processing with
            intelligent search, AI applications, and secure cloud delivery. I
            pair hands-on engineering with architecture and technical leadership
            to make complex platforms usable and dependable.
          </p>
          <div className="about-current">
            <span className="status-dot" />
            <p>
              Currently Leading Data & AI Engineering
              <br />
              <strong>Cognizant Technology Solutions · Optum</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSymbol({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <ellipse cx="32" cy="15" rx="22" ry="9" />
          <path d="M10 15v17c0 12 44 12 44 0V15M10 32v17c0 12 44 12 44 0V32" />
        </>
      ) : index === 1 ? (
        <>
          <path d="m32 5 25 14-25 14L7 19 32 5Zm-25 27 25 14 25-14M7 45l25 14 25-14" />
        </>
      ) : index === 2 ? (
        <>
          <circle cx="32" cy="32" r="10" />
          <circle cx="32" cy="32" r="26" strokeDasharray="3 6" />
          <path d="M32 0v20m0 24v20M0 32h20m24 0h20M10 10l14 14m16 16 14 14M10 54l14-14m16-16 14-14" />
        </>
      ) : (
        <>
          <path d="m23 17-16 15 16 15m18-30 16 15-16 15M37 8 27 56" />
        </>
      )}
    </svg>
  );
}

function Expertise() {
  return (
    <section
      className="section expertise-section"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="shell">
        <SectionHeading
          id="expertise-title"
          number="03"
          label="ENGINEERING EXPERTISE"
          title="One Connected"
          accent="Engineering Practice."
          description="From the first data source to the application in someone’s hands. Depth where it matters, perspective across the stack."
        />
        <div className="expertise-grid">
          {expertise.map((group, index) => (
            <article className="expertise-item reveal" key={group.title}>
              <div className="expertise-top">
                <ExpertiseSymbol index={index} />
                <span>{group.number}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <div className="expertise-technologies">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      className="section experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="shell experience-layout">
        <div className="experience-intro reveal">
          <p className="section-kicker">04 / THE JOURNEY</p>
          <h2 id="experience-title">
            Built over Time. <br />
            <em>Applied at Scale.</em>
          </h2>
          <p>
            From databases and big data to leading cloud and AI delivery. A
            career across healthcare, wildlife, commerce, and telecom.
          </p>
          <a
            className="text-link"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Full Resume <ArrowIcon />
          </a>
          <div className="experience-note">
            <span>2017</span>
            <span className="journey-line" />
            <span>Present</span>
          </div>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <details
              className="timeline-item reveal"
              key={item.organization}
              open={index === 0 ? true : undefined}
            >
              <summary>
                <span className="timeline-marker" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="timeline-heading">
                  <span className="timeline-date">{item.period}</span>
                  <strong>{item.role}</strong>
                  <span className="timeline-org">
                    {item.organization} <b>·</b> {item.client}
                  </span>
                </span>
                <span className="timeline-expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="timeline-details">
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-tech">
                  {item.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureLab() {
  const [patternIndex, setPatternIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const pattern = architecturePatterns[patternIndex]!;
  const stage = pattern.stages[stageIndex]!;
  return (
    <section
      className="section architecture-section"
      id="architecture"
      aria-labelledby="architecture-title"
    >
      <div className="shell">
        <SectionHeading
          id="architecture-title"
          number="05"
          label="UNDER THE SURFACE"
          title="Good Products Start with"
          accent="Thoughtful Systems."
          description="An interactive look at the reference patterns behind my work. Pick a pattern, then explore each stage."
        />
        <div className="architecture-shell reveal">
          <div className="architecture-tabs" aria-label="Architecture patterns">
            {architecturePatterns.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === patternIndex ? "is-active" : ""}
                aria-pressed={index === patternIndex}
                onClick={() => {
                  setPatternIndex(index);
                  setStageIndex(0);
                }}
              >
                <span>0{index + 1}</span>
                {item.title}
              </button>
            ))}
          </div>
          <div className="architecture-content">
            <div className="architecture-topline">
              <span>REFERENCE PATTERN / 0{patternIndex + 1}</span>
              <span>SELECT A STAGE BELOW</span>
            </div>
            <h3>{pattern.title}</h3>
            <p>{pattern.description}</p>
            <div
              className="architecture-flow"
              aria-label={`${pattern.title} stages`}
            >
              {pattern.stages.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={`architecture-node${index === stageIndex ? " is-active" : ""}`}
                  aria-pressed={index === stageIndex}
                  onClick={() => setStageIndex(index)}
                >
                  <span className="architecture-node-number">0{index + 1}</span>
                  <strong>{item.label}</strong>
                  <span className="node-dot" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="architecture-detail" aria-live="polite">
              <span className="stage-label">STAGE 0{stageIndex + 1}</span>
              <div>
                <strong>{stage.label}</strong>
                <p>{stage.detail}</p>
              </div>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section
      className="section principles-section"
      id="principles"
      aria-labelledby="principles-title"
    >
      <div className="shell principles-layout">
        <div className="reveal">
          <p className="section-kicker">06 / HOW I WORK</p>
          <h2 id="principles-title">
            Intent in <br />
            <em>Every Decision.</em>
          </h2>
        </div>
        <div className="principles-list">
          {principles.map((principle, index) => (
            <div className="principle reveal" key={principle.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    timer.current = setTimeout(() => setCopyState("idle"), 3500);
  };
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-inner">
        <div className="contact-top">
          <p className="section-kicker">07 / LET’S CONNECT</p>
          <Spark />
        </div>
        <div className="contact-main">
          <div>
            <h2 id="contact-title">
              Your Next Idea. <br />
              <em>Let’s Talk.</em>
            </h2>
            <p>
              Data platforms, AI systems, or something worth building.
              <br /> I’d love to hear what you have in mind.
            </p>
          </div>
          <a
            className="contact-round"
            href={`mailto:${profile.email}`}
            aria-label="Email Satyajit"
          >
            <ArrowIcon />
          </a>
        </div>
        <div className="contact-bottom">
          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>
              {profile.email.split("@")[0]}
              <wbr />@{profile.email.split("@")[1]}
            </a>
            <button
              className="copy-button"
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V4H4v12h4" />
              </svg>
            </button>
            <span className="copy-status" role="status">
              {copyState === "copied"
                ? "Email copied."
                : copyState === "failed"
                  ? "Please select and copy the email."
                  : ""}
            </span>
          </div>
          <div className="contact-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const { preference, setPreference } = useTheme();
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches
    )
      return;
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to Content
      </a>
      <Header theme={preference} setTheme={setPreference} />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Expertise />
        <Experience />
        <ArchitectureLab />
        <Principles />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="footer-brand" href="#top">
            <img src="./favicon.svg" width="32" height="32" alt="" />
            Satyajit Senapati
          </a>
          <span>© {new Date().getFullYear()} · Built with Intent.</span>
          <div>
            <a href={profile.resume} download>
              Resume <ArrowIcon direction="down" />
            </a>
            <a href="#top">
              Back to Top <ArrowIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
