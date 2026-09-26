import { useEffect, useRef, useState } from 'react';
import { architecturePatterns, experience, expertise, githubHighlights, principles, profile, projects } from './content/portfolio';

type ThemePreference = 'dark' | 'light' | 'system';

function ArrowIcon({ direction = 'up' }: { direction?: 'up' | 'down' }) {
  return direction === 'down' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m0 0-6-6m6 6 6-6" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11" /></svg>
  );
}

function SectionHeading({ id, number, label, title, accent, description }: { id: string; number: string; label: string; title: string; accent: string; description?: string }) {
  return <div className="section-heading reveal">
    <div><p className="section-kicker">{number} / {label}</p><h2 id={id}>{title} <em>{accent}</em></h2></div>
    {description && <p>{description}</p>}
  </div>;
}

function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    try {
      const value = localStorage.getItem('portfolio-theme');
      return value === 'dark' || value === 'light' ? value : 'system';
    } catch { return 'system'; }
  });

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const resolved = preference === 'system' ? (media.matches ? 'light' : 'dark') : preference;
      document.documentElement.dataset.theme = resolved;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'light' ? '#f4f7f8' : '#070d17');
    };
    apply();
    media.addEventListener('change', apply);
    try { localStorage.setItem('portfolio-theme', preference); } catch { /* preference is optional */ }
    return () => media.removeEventListener('change', apply);
  }, [preference]);

  return { preference, setPreference };
}

function Header({ theme, setTheme }: { theme: ThemePreference; setTheme: (theme: ThemePreference) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [menuOpen]);

  const nextTheme = () => setTheme(theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system');
  const themeLabel = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light';

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top" ref={headerRef}>
    <div className="shell header-inner">
      <a className="brand" href="#top" aria-label="Satyajit Senapati, Back to Top" onClick={() => setMenuOpen(false)}><img className="brand-mark" src="./favicon.svg" alt="" aria-hidden="true" /><span className="brand-name">Satyajit Senapati</span></a>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-nav" aria-label="Main navigation">
        {[['About', '#about'], ['Expertise', '#expertise'], ['Experience', '#experience'], ['Architecture', '#architecture'], ['Projects', '#projects']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowIcon /></a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={nextTheme} aria-label={`Theme: ${themeLabel}. Change theme`} title={`Theme: ${themeLabel}. Click to switch`}><svg className="theme-glyph" aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" /><path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" /></svg><span>{themeLabel}</span></button>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button>
      </div>
    </div>
  </header>;
}

function SystemVisual() {
  return <div className="system-panel" aria-label="Enterprise data flows from sources through cloud engineering to analytics and AI">
    <div className="panel-topline"><span>SYSTEM VIEW / 01</span><span className="panel-cross" aria-hidden="true">✳</span></div>
    <p className="panel-title">From Data to Decisions</p>
    <div className="flow">
      <div className="flow-stage"><span className="flow-index">01 / INGEST</span><div className="flow-icon" aria-hidden="true"><i></i><i></i><i></i></div><strong>Enterprise<br />Sources</strong><small>APIs · Data · Files</small></div>
      <div className="flow-connector" aria-hidden="true"><span></span></div>
      <div className="flow-stage flow-stage-featured"><span className="flow-index">02 / ENGINEER</span><div className="flow-core" aria-hidden="true"><span></span></div><strong>Cloud Data<br />Platform</strong><small>Azure · Spark · Delta</small></div>
      <div className="flow-connector" aria-hidden="true"><span></span></div>
      <div className="flow-stage"><span className="flow-index">03 / ACTIVATE</span><div className="flow-spark" aria-hidden="true">✳</div><strong>Analytics<br />& AI</strong><small>Search · RAG · BI</small></div>
    </div>
    <div className="panel-footer"><span className="signal" aria-hidden="true"></span> Designed for scale, security, and real use</div>
  </div>;
}

function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-line"></span> SATYAJIT SENAPATI <span className="eyebrow-divider">/</span> LEAD DATA & AI ENGINEER</p>
      <h1 id="hero-title">Engineering Intelligent Systems <em>from Data to AI.</em></h1>
      <p className="hero-intro">I design scalable Azure data platforms, intelligent search, and AI-powered applications — connecting architecture with production engineering.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore Projects <ArrowIcon /></a><a className="button button-secondary" href="#architecture">Explore Architecture <ArrowIcon /></a></div>
      <div className="hero-secondary"><a href={profile.resume} download>Download Resume <ArrowIcon direction="down" /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a><span className="hero-location">Based in India</span></div>
      <div className="hero-facts" aria-label="Career highlights"><div><strong>8<span>+</span></strong><span>Years in Data Engineering</span></div><div><strong>2<span>+</span></strong><span>Years in Enterprise AI</span></div><div><strong>4</strong><span>Industries Served</span></div></div>
    </div>
    <SystemVisual />
    <div className="hero-bottom" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span>↓</span></div>
  </section>;
}

function About() {
  return <section className="section about-section" id="about" aria-labelledby="about-title"><div className="shell about-layout">
    <div className="about-side reveal"><p className="section-kicker">01 / ABOUT</p><div className="about-rule"><span>DATA</span><span>INTELLIGENCE</span><span>SOFTWARE</span></div></div>
    <div className="about-main reveal"><h2 id="about-title">I Build Systems Where <em>Data, Intelligence, and Software Meet.</em></h2><p>My work spans the full path from ingestion and distributed processing to search, AI applications, and secure cloud delivery. I pair hands-on engineering with architecture and technical leadership to make complex platforms usable and dependable.</p><div className="capability-line"><span>Data Platforms</span><span>AI Systems</span><span>Cloud Architecture</span><span>Product Engineering</span></div></div>
  </div></section>;
}

function Expertise() {
  return <section className="section expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="shell">
    <SectionHeading id="expertise-title" number="02" label="ENGINEERING EXPERTISE" title="Depth Across" accent="the Stack." description="The technologies I use to design, build, and run complete data and AI systems." />
    <div className="expertise-grid">{expertise.map((group) => <div className="expertise-item reveal" key={group.title}><span className="expertise-number">{group.number}</span><h3>{group.title}</h3><p className="expertise-summary">{group.summary}</p><p className="expertise-technologies">{group.items.join(' · ')}</p></div>)}</div>
  </div></section>;
}

function Experience() {
  return <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="shell experience-layout">
    <div className="experience-intro reveal"><p className="section-kicker">03 / EXPERIENCE</p><h2 id="experience-title">A Career Built Across the <em>Data Stack.</em></h2><p>From databases and big data to leading Azure data and AI delivery across healthcare, wildlife, commerce, and telecom.</p><a className="text-link" href={profile.resume} target="_blank" rel="noopener noreferrer">View Full Resume <ArrowIcon /></a></div>
    <div className="timeline">{experience.map((item) => <details className="timeline-item reveal" key={item.organization}>
      <summary><span className="timeline-date">{item.period}</span><span className="timeline-heading"><strong>{item.role}</strong><span className="timeline-org">{item.organization} <b>·</b> {item.client}</span><span className="timeline-summary">{item.summary}</span></span><span className="timeline-expand" aria-hidden="true">+</span></summary>
      <div className="timeline-details"><p className="detail-label">SELECTED CONTRIBUTIONS</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="timeline-tech">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
    </details>)}</div>
  </div></section>;
}

function ArchitectureLab() {
  const [patternIndex, setPatternIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const pattern = architecturePatterns[patternIndex]!;
  const stage = pattern.stages[stageIndex]!;

  const selectPattern = (index: number) => { setPatternIndex(index); setStageIndex(0); };

  return <section className="section architecture-section" id="architecture" aria-labelledby="architecture-title"><div className="shell">
    <SectionHeading id="architecture-title" number="04" label="ARCHITECTURE LAB" title="Think in" accent="Systems." description="Explore reference patterns drawn from the platforms and applications I work on. Select a stage to see its role." />
    <div className="architecture-shell reveal"><div className="architecture-tabs" aria-label="Architecture patterns">{architecturePatterns.map((item, index) => <button key={item.id} type="button" className={index === patternIndex ? 'is-active' : ''} aria-pressed={index === patternIndex} onClick={() => selectPattern(index)}><span>0{index + 1}</span>{item.title}</button>)}</div>
      <div className="architecture-content"><div className="architecture-topline"><span>REFERENCE PATTERN / 0{patternIndex + 1}</span><span>{pattern.stages.length} STAGES</span></div><h3>{pattern.title}</h3><p>{pattern.description}</p>
        <div className="architecture-flow" aria-label={`${pattern.title} stages`}>{pattern.stages.map((item, index) => <button key={item.label} type="button" className={`architecture-node${index === stageIndex ? ' is-active' : ''}`} aria-pressed={index === stageIndex} onClick={() => setStageIndex(index)}><span className="architecture-node-number">0{index + 1}</span><strong>{item.label}</strong></button>)}</div>
        <div className="architecture-detail" aria-live="polite"><span>STAGE 0{stageIndex + 1}</span><strong>{stage.label}</strong><p>{stage.detail}</p></div>
      </div></div>
  </div></section>;
}

function Projects() {
  return <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="shell">
    <SectionHeading id="projects-title" number="05" label="PRODUCT EXPLORATIONS" title="Ideas Built as" accent="Systems." description="Product work that extends my engineering practice into learning, productivity, and developer tooling." />
    <div className="projects-grid">{projects.map((project, index) => <article className={`project-card project-${index + 1} reveal`} key={project.name}>
      <div className="project-preview"><div className="preview-top"><span>{project.kind}</span><span>0{index + 1} / 03</span></div><div className="preview-mark" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div><div className="preview-name">{project.name}</div><div className="preview-lines" aria-hidden="true"><i></i><i></i><i></i></div></div>
      <div className="project-copy"><p className="project-type">{project.kind}</p><h3>{project.name}</h3><strong>{project.positioning}</strong><p>{project.description}</p><details className="project-details"><summary>Explore Product Scope <span aria-hidden="true">+</span></summary><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>{project.technologies.length > 0 && <div className="project-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}{!project.repository && <p className="project-link-status">Repository and demo links pending confirmation.</p>}</details>{project.repository && <a className="project-repository" href={project.repository} target="_blank" rel="noopener noreferrer">View Repository <ArrowIcon /></a>}</div>
    </article>)}</div>
    <div className="github-strip reveal"><div><p className="section-kicker">MORE ON GITHUB</p><h3>Published Work & Notes</h3><a href={profile.github} target="_blank" rel="noopener noreferrer">Explore All Repositories <ArrowIcon /></a></div><div className="github-list">{githubHighlights.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"><span><strong>{item.name}</strong><small>{item.description}</small></span><ArrowIcon /></a>)}</div></div>
  </div></section>;
}

function Principles() {
  return <section className="section principles-section" id="principles" aria-labelledby="principles-title"><div className="shell principles-layout"><div className="reveal"><p className="section-kicker">06 / HOW I WORK</p><h2 id="principles-title">Engineering with <em>Intent.</em></h2></div><div className="principles-list">{principles.map((principle, index) => <div className="principle reveal" key={principle.title}><span>0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.description}</p></div></div>)}</div></div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch { window.location.href = `mailto:${profile.email}`; }
  };
  return <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="shell contact-inner reveal"><p className="section-kicker">07 / CONTACT</p><h2 id="contact-title">Let’s Build Something <em>Intelligent.</em></h2><p>Interested in data platforms, AI systems, cloud architecture, or product engineering? Let’s connect.</p><div className="contact-actions"><a className="contact-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon /></a><button className="copy-button" type="button" onClick={copyEmail} aria-live="polite">{copied ? 'Copied' : 'Copy Email'}</button></div><div className="contact-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a></div></div></section>;
}

function App() {
  const { preference, setPreference } = useTheme();

  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)').matches) return;
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, []);

  return <><a className="skip-link" href="#main">Skip to content</a><Header theme={preference} setTheme={setPreference} /><main id="main"><Hero /><About /><Expertise /><Experience /><ArchitectureLab /><Projects /><Principles /><Contact /></main><footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><span>{profile.role}</span><div><a href={profile.resume} download>Resume</a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a><a href="#top">Back to Top ↑</a></div></div></footer></>;
}

export default App;
