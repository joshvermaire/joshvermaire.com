// app.jsx — main app, hero, nav, command palette

// ────────────────────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────────────────────
function Nav({ onOpenCmdK }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <span className="mark">jv</span>
          <span>Josh Vermaire</span>
        </a>
        <nav className="nav-links">
          <a href="#projects">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <button className="kbd-hint" onClick={onOpenCmdK} aria-label="Open command palette">
            <span className="kbd-text">Search</span>
            <span className="kbd">⌘K</span>
          </button>
          <a href="#contact" className="btn btn-primary">
            Get in touch <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow">
              <span className="pulse"></span>
              Available from Q1 2027
            </span>
            <h1>
              Full-stack engineer<br/>
              <span className="accent">building real systems.</span>
            </h1>
            <p className="hero-sub">
              I&apos;m <b>Josh Vermaire</b> — a senior engineer and independent
              contractor. I ship <b>SaaS products, SDKs, and AI-native workflows</b>,
              and I move fast across whatever stack the problem calls for.
            </p>
            <div className="hero-meta">
              <span className="tag alt">TypeScript</span>
              <span className="tag">React / Next.js</span>
              <span className="tag">React Native</span>
              <span className="tag">SDK design</span>
              <span className="tag">Edge / serverless</span>
              <span className="tag">AI workflows</span>
            </div>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                See selected work <span className="arrow">→</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                hello@joshvermaire.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// COMMAND PALETTE (⌘K)
// ────────────────────────────────────────────────────────────
const SVG_ICON = {
  jump: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 8h10M9 4l4 4-4 4"/></svg>,
  ext:  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 3h4v4M13 3 7 9M11 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3"/></svg>,
  copy: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/></svg>,
  search:<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5"/><path d="m11 11 3 3"/></svg>,
};

function CommandPalette({ open, onClose, items }) {
  const [q, setQ] = React.useState('');
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items
      .map(g => ({
        ...g,
        items: g.items.filter(it =>
          it.label.toLowerCase().includes(needle) ||
          (it.keywords || '').toLowerCase().includes(needle))
      }))
      .filter(g => g.items.length);
  }, [items, q]);

  const flat = React.useMemo(
    () => filtered.flatMap(g => g.items),
    [filtered]
  );

  React.useEffect(() => { setActive(0); }, [q]);

  if (!open) return null;

  const run = (it) => {
    onClose();
    requestAnimationFrame(() => it.run?.());
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); flat[active] && run(flat[active]); }
  };

  let idxOffset = 0;
  return (
    <div className="cmdk-root" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cmdk" role="dialog" aria-label="Command palette">
        <div className="cmdk-input">
          {SVG_ICON.search}
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a project, copy email…"
          />
          <span className="esc-hint">esc</span>
        </div>
        <div className="cmdk-list" ref={listRef}>
          {flat.length === 0 && (
            <div className="cmdk-empty">No results for &ldquo;{q}&rdquo;</div>
          )}
          {filtered.map((g) => {
            const startIdx = idxOffset;
            idxOffset += g.items.length;
            return (
              <div key={g.label}>
                <div className="cmdk-group-label">{g.label}</div>
                {g.items.map((it, i) => {
                  const idx = startIdx + i;
                  return (
                    <div
                      key={it.label}
                      className="cmdk-item"
                      data-active={idx === active ? '1' : '0'}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => run(it)}
                    >
                      <span className="icn">{SVG_ICON[it.kind]}</span>
                      <span className="lbl">{it.label}</span>
                      <span className="meta">{it.meta || ''}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="cmdk-foot">
          <div className="grp">
            <span><span className="kbd">↵</span> select</span>
            <span><span className="kbd">↑↓</span> navigate</span>
          </div>
          <div className="grp">
            <span><span className="kbd">esc</span> close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// APP
// ────────────────────────────────────────────────────────────
function App() {
  const [cmdkOpen, setCmdkOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 1800);
  };

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label}`);
    } catch (_) {
      showToast('Copy failed');
    }
  };

  const cmdItems = [
    {
      label: 'Navigate',
      items: [
        { kind: 'jump', label: 'Top',     meta: 'top',       run: () => jump('top') },
        { kind: 'jump', label: 'Work',    meta: '#projects', keywords: 'projects case studies', run: () => jump('projects') },
        { kind: 'jump', label: 'Contact', meta: '#contact',  run: () => jump('contact') },
      ],
    },
    {
      label: 'Open',
      items: [
        { kind: 'ext',  label: 'Surge Reviews',     meta: 'project', keywords: 'review saas inspection', run: () => jump('projects') },
        { kind: 'ext',  label: 'Auddia · Faidr',    meta: 'project', keywords: 'react native radio', run: () => jump('projects') },
        { kind: 'ext',  label: 'Nami Web SDK',      meta: 'project', keywords: 'paywall sdk typescript', run: () => jump('projects') },
        { kind: 'ext',  label: 'GitHub · @joshvermaire', meta: '↗', run: () => window.open('https://github.com/joshvermaire', '_blank') },
        { kind: 'ext',  label: 'X · @joshvermaire',      meta: '↗', run: () => window.open('https://x.com/joshvermaire', '_blank') },
      ],
    },
    {
      label: 'Actions',
      items: [
        { kind: 'copy', label: 'Copy email', meta: 'hello@joshvermaire.com', keywords: 'contact', run: () => copy('hello@joshvermaire.com', 'email') },
        { kind: 'copy', label: 'Copy GitHub handle', meta: '@joshvermaire', run: () => copy('@joshvermaire', 'GitHub handle') },
      ],
    },
  ];

  const onMouseMoveProj = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  };

  return (
    <>
      <div className="bg-fx" />
      <Nav onOpenCmdK={() => setCmdkOpen(true)} />
      <main>
        <Hero />
        <Projects onMouseMoveProj={onMouseMoveProj} />
        <Contact onCopy={copy} />
      </main>
      <Footer />

      <CommandPalette
        open={cmdkOpen}
        onClose={() => setCmdkOpen(false)}
        items={cmdItems}
      />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

window.App = App;
