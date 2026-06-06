// sections.jsx — Projects (work), Contact, Footer

const PROJECTS = [
  {
    idx: '01',
    name: 'Surge Reviews',
    role: 'Founding engineer · 2024 — present',
    tagline: 'Home-inspection review management, automated.',
    blurb: (
      <>
        A multi-tenant SaaS that turns inspection reports into automated
        review requests. I built the whole thing — the <b>request engine</b>,
        public inspector profiles, and a rules-based automation layer — on a
        Turborepo with <b>Next.js, Supabase, and Resend</b>. Most of the work
        lives in the unglamorous parts: deliverability, idempotency, and
        keeping the request flow reliable.
      </>
    ),
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Polar', 'Resend', 'Vercel'],
    links: [
      { label: 'Live', href: 'https://surge.reviews' },
    ],
  },
  {
    idx: '02',
    name: 'Auddia · Faidr',
    role: 'Independent contractor · ongoing',
    tagline: 'Commercial-free radio, in React Native.',
    blurb: (
      <>
        As an independent contractor, I work on Faidr&apos;s mobile app in
        <b> React Native</b>. The playback core is built on
        <b> react-native-track-player</b>, app state runs through
        <b> Zustand</b>, and native functionality is bridged with
        <b> Nitro Modules</b> — background streaming, offline behavior, and the
        kind of audio-pipeline details that have to be exactly right.
      </>
    ),
    stack: ['React Native', 'TypeScript', 'Zustand', 'Track Player', 'Nitro Modules', 'React Navigation'],
    links: [
      { label: 'iOS', href: 'https://apps.apple.com/us/app/faidr/id1558795470' },
      { label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.auddia.faidr' },
    ],
  },
  {
    idx: '03',
    name: 'Nami Web SDK',
    role: 'Independent contractor · Summers 2024 & 2025',
    tagline: 'No-code paywalls, everywhere — a TypeScript SDK.',
    blurb: (
      <>
        A typed SDK that renders Nami&apos;s no-code subscription pages and
        paywalls on <b>web, desktop, and smart-TV</b> targets. I designed and
        built the whole thing — the public API surface, an event/state model
        that survives awkward embed contexts, and a build pipeline that ships
        ESM, CJS, IIFE, and UMD bundles from one source of truth.
      </>
    ),
    stack: ['TypeScript', 'tsup', 'Vitest', 'Web Components', 'Smart-TV runtimes'],
    links: [
      { label: 'Docs', href: 'https://docs.namiml.com' },
    ],
  },
];

function Projects({ onMouseMoveProj }) {
  return (
    <section className="projects wrap" id="projects">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Selected work</div>
          <h2 className="section-title">
            Work I&apos;ve shipped.
          </h2>
        </div>
        <div className="section-meta">{PROJECTS.length.toString().padStart(2,'0')} / {PROJECTS.length.toString().padStart(2,'0')}</div>
      </div>
      <div className="proj-list">
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
              <div className="proj-links">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
              </div>
            </div>
          </article>
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
            I take on a small number of engagements — usually as a founding or
            contract engineer where shipping velocity and judgment both matter.
            I&apos;m booking from Q1 2027. Email is best.
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
            <span className="val" style={{color:'var(--accent)'}}>Available from Q1 2027</span>
            <span className="copy" style={{cursor:'default'}}>booking</span>
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
          <span>Available from Q1 2027</span>
        </div>
        <div>© {new Date().getFullYear()} Josh Vermaire — built with care, not a template.</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Contact, Footer });
