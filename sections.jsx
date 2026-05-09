// sections.jsx — Projects, Philosophy, Stack, Contact, Footer

const PROJECTS = [
  {
    idx: '01',
    name: 'Surge Reviews',
    role: 'Founding engineer · 2024 — present',
    tagline: 'Home inspection review management — automated.',
    blurb: (
      <>
        A multi-tenant SaaS that turns inspection reports into review pipelines.
        Built the <b>request engine</b>, <b>edge-cached public profiles</b>, and a
        rules-based automation layer so inspectors stop manually chasing happy
        customers. Heavy on <b>queueing, deliverability, and idempotency</b> —
        the boring parts that keep review automation reliable.
      </>
    ),
    stack: ['Next.js', 'TypeScript', 'Postgres', 'Resend', 'Cloudflare Workers', 'Stripe'],
    metrics: [
      { v: '14k+', lbl: 'reviews routed/mo' },
      { v: '<200ms', lbl: 'public profile p95', accent: true },
    ],
    links: [
      { label: 'Live', href: 'https://surgereviews.com' },
    ],
  },
  {
    idx: '02',
    name: 'Auddia · Faidr',
    role: 'Lead mobile engineer · 2022 — 2024',
    tagline: 'Commercial-free radio app — React Native, at scale.',
    blurb: (
      <>
        Rebuilt the Faidr mobile app on <b>React Native</b>, replacing a
        legacy native stack. Designed the playback core: a deterministic
        <b> ad-elision engine</b> hooked into native audio, offline queues, and
        background streaming. Shipped a release pipeline that took
        <b> store-deploy time from days to hours</b>.
      </>
    ),
    stack: ['React Native', 'TypeScript', 'Native modules', 'Redux Toolkit', 'Firebase', 'Detox'],
    metrics: [
      { v: '2.0★ → 4.6★', lbl: 'app store rating' },
      { v: '−68%', lbl: 'crash rate', accent: true },
    ],
    links: [
      { label: 'iOS', href: 'https://apps.apple.com/us/app/faidr/id1558795470' },
      { label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.auddia.faidr' },
    ],
  },
  {
    idx: '03',
    name: 'Nami Web SDK',
    role: 'Independent contractor · 2023',
    tagline: 'No-code paywalls everywhere — TypeScript SDK.',
    blurb: (
      <>
        A typed SDK that renders Nami&apos;s no-code subscription pages and
        paywalls on <b>web, desktop, and smart-TV</b> targets. Designed the
        public surface, an event/state model that survives weird embed
        contexts, and a build pipeline outputting ESM, CJS, IIFE, and
        UMD bundles from one source of truth.
      </>
    ),
    stack: ['TypeScript', 'tsup', 'Vitest', 'Web Components', 'Stripe', 'Smart-TV runtimes'],
    metrics: [
      { v: '12kb', lbl: 'gzip core', accent: true },
      { v: '6+', lbl: 'platforms supported' },
    ],
    links: [
      { label: 'Docs', href: 'https://docs.namiml.com' },
    ],
  },
];

function Projects({ density, onMouseMoveProj }) {
  return (
    <section className="projects wrap" id="projects">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Selected work</div>
          <h2 className="section-title">
            Engineering case studies, not screenshots.
          </h2>
        </div>
        <div className="section-meta">{PROJECTS.length.toString().padStart(2,'0')} / {PROJECTS.length.toString().padStart(2,'0')}</div>
      </div>
      <div className="proj-list" data-density={density}>
        {PROJECTS.map((p) => (
          <article key={p.idx} className="proj" onMouseMove={onMouseMoveProj}>
            <header className="proj-head">
              <div className="proj-idx">// {p.idx}</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-role">{p.role}</div>
            </header>
            <div className="proj-body">
              <p style={{color:'var(--text)',fontSize:'15px'}}><b>{p.tagline}</b></p>
              <p>{p.blurb}</p>
              <div className="proj-stack">
                {p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>
            </div>
            <aside className="proj-side">
              <div className="label col-h">Outcome</div>
              {p.metrics.map((m, i) => (
                <div key={i} className="metric">
                  <span className={'v' + (m.accent ? ' accent' : '')}>{m.v}</span>
                  <span className="lbl">{m.lbl}</span>
                </div>
              ))}
              <div className="proj-links">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
              </div>
            </aside>
          </article>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PHILOSOPHY
// ────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    n: '01',
    h: 'Ship working systems over overengineering.',
    p: 'Architecture earns its complexity. I default to the smallest design that handles the next 18 months — flat data models, boring queues, observable boundaries — and only reach for distributed primitives when the workload genuinely needs them.',
    q: 'simple, then sharper.',
  },
  {
    n: '02',
    h: 'AI-assisted, not AI-driven.',
    p: 'AI lives in the seams of my workflow: codegen for boilerplate, agents for refactors, evals for pull requests. The architecture, the trade-offs, the contracts with users — those still come from me. The result is more shipped, not less owned.',
    q: 'taste is the bottleneck.',
  },
  {
    n: '03',
    h: 'Edge-first, latency as a product feature.',
    p: "Cold starts, region routing, and KV-shaped data are not infra trivia — they're the difference between an app that feels alive and one that feels remote. I treat p95 latency the way I treat copy: an editable surface.",
    q: 'closer is faster is better.',
  },
  {
    n: '04',
    h: 'Product instincts beat pure engineering.',
    p: "I read changelogs the way other engineers read source. I pair with founders on the actual problem before reaching for a framework. The best engineering decisions I've made were the ones that quietly removed the need for engineering at all.",
    q: 'less code, more leverage.',
  },
];

function Philosophy() {
  return (
    <section className="philosophy wrap" id="philosophy">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">How I work</div>
          <h2 className="section-title">
            A point of view on shipping software in 2026.
          </h2>
        </div>
        <div className="section-meta">— Engineering principles</div>
      </div>
      <div className="phil-grid">
        {PRINCIPLES.map((pr) => (
          <article className="phil" key={pr.n}>
            <span className="phil-num">// {pr.n}</span>
            <h3>{pr.h}</h3>
            <p>{pr.p}</p>
            <p className="quote">→ {pr.q}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// STACK
// ────────────────────────────────────────────────────────────
const STACK = [
  {
    h: 'Frontend',
    items: [
      ['TypeScript', 'core'],
      ['React / Next.js', 'app router'],
      ['React Native', 'native bridges'],
      ['Tailwind / shadcn', 'design'],
      ['Web Components', 'embeds'],
    ],
  },
  {
    h: 'Backend',
    items: [
      ['Node / Bun', 'runtime'],
      ['Postgres + Drizzle', 'OLTP'],
      ['Redis · KV', 'queues'],
      ['Stripe / Resend', 'platform APIs'],
      ['tRPC · Hono', 'RPC'],
    ],
  },
  {
    h: 'Infrastructure',
    items: [
      ['Vercel · Cloudflare', 'edge'],
      ['Workers · Durable Obj.', 'compute'],
      ['Turbo · Nx', 'monorepos'],
      ['GitHub Actions', 'CI'],
      ['OpenTelemetry', 'observe'],
    ],
  },
  {
    h: 'AI Tooling',
    items: [
      ['Claude Code', 'pair'],
      ['Cursor', 'editor'],
      ['LangChain · ai SDK', 'glue'],
      ['Evals · Inkeep', 'guardrails'],
      ['MCP servers', 'agents'],
    ],
  },
];

function Stack() {
  return (
    <section className="stack wrap" id="stack">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Stack</div>
          <h2 className="section-title">
            Tools, grouped by where they earn their keep.
          </h2>
        </div>
        <div className="section-meta">— Not a skills bar</div>
      </div>
      <div className="stack-grid">
        {STACK.map((col) => (
          <div className="stack-col" key={col.h}>
            <h4>{col.h}</h4>
            <div className="stack-list">
              {col.items.map(([n, r]) => (
                <div className="stack-item" key={n}>
                  <span>{n}</span>
                  <span className="role">{r}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// CONTACT
// ────────────────────────────────────────────────────────────
function Contact({ onCopy }) {
  return (
    <section className="contact wrap" id="contact">
      <div className="contact-card">
        <div>
          <div className="section-eyebrow" style={{marginBottom:18}}>Contact</div>
          <h2>Have something real to ship?</h2>
          <p>
            I take on a small number of contracts per year — typically as
            founding/lead engineer on a product where shipping velocity and
            architectural taste both matter. Email is best.
          </p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <a href="mailto:hello@joshvermaire.com" className="btn btn-primary">
              hello@joshvermaire.com <span className="arrow">→</span>
            </a>
            <a href="https://github.com/joshvermaire" target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="contact-list">
          <div className="contact-row">
            <span className="lbl">Email</span>
            <a className="val" href="mailto:hello@joshvermaire.com">hello@joshvermaire.com</a>
            <button className="copy" onClick={() => onCopy('hello@joshvermaire.com', 'email')}>copy</button>
          </div>
          <div className="contact-row">
            <span className="lbl">GitHub</span>
            <a className="val" href="https://github.com/joshvermaire" target="_blank" rel="noreferrer">@joshvermaire</a>
            <button className="copy" onClick={() => onCopy('@joshvermaire', 'GitHub handle')}>copy</button>
          </div>
          <div className="contact-row">
            <span className="lbl">X</span>
            <a className="val" href="https://x.com/joshvermaire" target="_blank" rel="noreferrer">@joshvermaire</a>
            <button className="copy" onClick={() => onCopy('@joshvermaire', 'X handle')}>copy</button>
          </div>
          <div className="contact-row">
            <span className="lbl">Status</span>
            <span className="val" style={{color:'var(--accent)'}}>Available · Q3 2026</span>
            <span className="copy" style={{cursor:'default'}}>open</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="bullets">
          <span><i></i>Independent · contract</span>
          <span>Boulder, CO · UTC−7</span>
        </div>
        <div>© {new Date().getFullYear()} Josh Vermaire — built with care, not a template.</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Philosophy, Stack, Contact, Footer });
