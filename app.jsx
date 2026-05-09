// app.jsx — main app, hero, nav, command palette, tweaks wiring

const TWEAK_DEFAULTS = {
  "type": "inter",
  "hero": "terminal",
  "bg": "grid",
  "density": "case",
  "accent": "emerald"
};

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
          <a href="#projects">Projects</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <button className="kbd-hint" onClick={onOpenCmdK} aria-label="Open command palette">
            <span className="kbd-text">Search</span>
            <span className="kbd">⌘K</span>
          </button>
          <a href="#contact" className="btn btn-primary">
            Start a project <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// HERO TERMINAL PANEL
// ────────────────────────────────────────────────────────────
const FEED_SEED = [
  { t: '14:22', lvl: 'dep', tag: 'deploy', msg: ['nami-web-sdk ', '2.4.1 → prod'] },
  { t: '11:08', lvl: 'ok',  tag: 'merge',  msg: ['surge/inbox ', 'unify webhook router'] },
  { t: '09:41', lvl: 'inf', tag: 'spec',   msg: ['draft RFC ', 'edge-side feature flags'] },
  { t: '08:12', lvl: 'dep', tag: 'deploy', msg: ['faidr ', 'native build · 1.18.0'] },
  { t: 'yest',  lvl: 'ok',  tag: 'merge',  msg: ['nami ', 'paywall a/b harness'] },
  { t: 'yest',  lvl: 'inf', tag: 'note',   msg: ['benchmark: ', 'KV vs D1 for review queue'] },
];

function HeroTerminal() {
  return (
    <div className="hero-panel" aria-hidden="true">
      <div className="hp-bar">
        <div className="hp-bar-left">
          <span className="hp-dots"><i/><i/><i/></span>
          <span>~/josh · system</span>
        </div>
        <div className="hp-bar-right">live</div>
      </div>
      <div className="hp-stats">
        <div className="hp-stat">
          <div className="k">region</div>
          <div className="v">iad1 · sfo1</div>
        </div>
        <div className="hp-stat">
          <div className="k">avg latency</div>
          <div className="v accent">42<span style={{fontSize:13,color:'var(--muted)'}}> ms</span></div>
        </div>
        <div className="hp-stat">
          <div className="k">uptime · 90d</div>
          <div className="v">99.99%</div>
        </div>
      </div>
      <div className="hp-feed">
        {FEED_SEED.map((r, i) => (
          <div className="hp-row" key={i}>
            <span className="t">{r.t}</span>
            <span className={`lvl ${r.lvl}`}>{r.tag}</span>
            <span className="msg">
              <span className="dim">{r.msg[0]}</span>{r.msg[1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroData() {
  return (
    <div className="hero-data" aria-hidden="true">
      <div className="cell">
        <div className="k">Years building</div>
        <div className="v">12<span style={{color:'var(--muted)',fontSize:18}}>+</span></div>
        <div className="sub">since 2014 · TS / RN / Edge</div>
      </div>
      <div className="cell">
        <div className="k">Shipped systems</div>
        <div className="v accent">38</div>
        <div className="sub">SDKs · SaaS · native apps</div>
      </div>
      <div className="cell">
        <div className="k">Production uptime</div>
        <div className="v">99.99%</div>
        <div className="sub">edge-first · multi-region</div>
      </div>
      <div className="cell">
        <div className="k">Current focus</div>
        <div className="v" style={{fontSize:20}}>AI-native SDKs</div>
        <div className="sub">paywalls · review systems</div>
      </div>
    </div>
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
              Available · select Q3 engagements
            </span>
            <h1>
              Full-stack engineer<br/>
              <span className="accent">building real systems.</span>
            </h1>
            <p className="hero-sub">
              I&apos;m <b>Josh Vermaire</b> — a senior engineer and independent contractor
              shipping <b>SaaS products, SDKs, and AI-native workflows</b> across
              TypeScript, React, and the edge.
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
          <div>
            <HeroTerminal />
            <HeroData />
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
  tweak:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="5" cy="4" r="1.6"/><path d="M2 4h1.4M6.6 4H14"/><circle cx="11" cy="8" r="1.6"/><path d="M2 8h7.4M12.6 8H14"/><circle cx="6" cy="12" r="1.6"/><path d="M2 12h2.4M7.6 12H14"/></svg>,
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
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cmdkOpen, setCmdkOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.type = t.type;
    root.dataset.hero = t.hero;
    root.dataset.bg = t.bg;
    root.dataset.accent = t.accent;
  }, [t.type, t.hero, t.bg, t.accent]);

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
  const openTweaks = () => {
    window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
  };

  const cmdItems = [
    {
      label: 'Navigate',
      items: [
        { kind: 'jump', label: 'Hero',       meta: 'top',    run: () => jump('top') },
        { kind: 'jump', label: 'Projects',   meta: '#projects', keywords: 'work case studies', run: () => jump('projects') },
        { kind: 'jump', label: 'Philosophy', meta: '#philosophy', keywords: 'principles', run: () => jump('philosophy') },
        { kind: 'jump', label: 'Stack',      meta: '#stack',  keywords: 'tools tech', run: () => jump('stack') },
        { kind: 'jump', label: 'Contact',    meta: '#contact', run: () => jump('contact') },
      ],
    },
    {
      label: 'Open',
      items: [
        { kind: 'ext',  label: 'Surge Reviews',     meta: 'project · 2025', keywords: 'review automation', run: () => jump('projects') },
        { kind: 'ext',  label: 'Auddia · Faidr',    meta: 'project · 2024', keywords: 'react native radio', run: () => jump('projects') },
        { kind: 'ext',  label: 'Nami Web SDK',      meta: 'project · 2023', keywords: 'paywall sdk typescript', run: () => jump('projects') },
        { kind: 'ext',  label: 'GitHub · @joshvermaire', meta: '↗', run: () => window.open('https://github.com/joshvermaire', '_blank') },
        { kind: 'ext',  label: 'X · @joshvermaire',      meta: '↗', run: () => window.open('https://x.com/joshvermaire', '_blank') },
      ],
    },
    {
      label: 'Actions',
      items: [
        { kind: 'copy', label: 'Copy email', meta: 'hello@joshvermaire.com', keywords: 'contact', run: () => copy('hello@joshvermaire.com', 'email') },
        { kind: 'copy', label: 'Copy GitHub handle', meta: '@joshvermaire', run: () => copy('@joshvermaire', 'GitHub handle') },
        { kind: 'tweak', label: 'Open Tweaks panel', meta: 'theme · variants', keywords: 'settings theme', run: openTweaks },
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
        <Projects density={t.density} onMouseMoveProj={onMouseMoveProj} />
        <Philosophy />
        <Stack />
        <Contact onCopy={copy} />
      </main>
      <Footer />

      <CommandPalette
        open={cmdkOpen}
        onClose={() => setCmdkOpen(false)}
        items={cmdItems}
      />
      {toast && <div className="toast">{toast}</div>}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Type" />
        <TweakRadio label="Pairing" value={t.type}
                    options={[
                      { value: 'inter',    label: 'Inter' },
                      { value: 'satoshi',  label: 'Satoshi' },
                      { value: 'mono',     label: 'Mono' },
                    ]}
                    onChange={(v) => setTweak('type', v)} />
        <TweakSection label="Hero" />
        <TweakRadio label="Variant" value={t.hero}
                    options={[
                      { value: 'terminal',     label: 'Term' },
                      { value: 'data',         label: 'Data' },
                      { value: 'typographic',  label: 'Type' },
                    ]}
                    onChange={(v) => setTweak('hero', v)} />
        <TweakSection label="Surface" />
        <TweakRadio label="Background" value={t.bg}
                    options={[
                      { value: 'solid', label: 'Solid' },
                      { value: 'grid',  label: 'Grid' },
                      { value: 'dot',   label: 'Dot' },
                    ]}
                    onChange={(v) => setTweak('bg', v)} />
        <TweakRadio label="Accent" value={t.accent}
                    options={[
                      { value: 'emerald', label: 'Emer' },
                      { value: 'indigo',  label: 'Indi' },
                      { value: 'mono',    label: 'Mono' },
                    ]}
                    onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Projects" />
        <TweakRadio label="Layout" value={t.density}
                    options={[
                      { value: 'case',    label: 'Case study' },
                      { value: 'compact', label: 'Compact' },
                    ]}
                    onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </>
  );
}

window.App = App;
