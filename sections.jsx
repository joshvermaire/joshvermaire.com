// sections.jsx: projects, contact, footer

import React from 'react';

const PROJECTS = [
  {
    category: 'Mobile modernization',
    name: 'Auddia · faidr',
    role: 'Independent contractor · ongoing',
    tagline: 'Lower costs, faster releases, and a more reliable live audio app',
    blurb: 'I help replace costly parts of faidr’s mobile stack with an in-house React Native foundation. The work spans playback stability, difficult production issues, native integration, and customer-facing releases across iOS and Android.',
    evidence: [
      { label: 'Foundation', value: 'In-house React Native' },
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'Focus', value: 'Playback · reliability' },
    ],
    stack: ['Mobile systems', 'Live audio', 'Product delivery'],
    links: [
      { label: 'View on iOS', href: 'https://apps.apple.com/us/app/faidr/id1558795470' },
      { label: 'View on Android', href: 'https://play.google.com/store/apps/details?id=com.auddia.faidr' },
    ],
  },
  {
    category: 'Founder-led SaaS',
    name: 'Surge Reviews',
    role: 'Founding engineer · 2024 to present',
    tagline: 'Automated customer follow-up for home inspectors',
    blurb: 'I built Surge end to end to turn completed home inspections into reliable, automated customer review requests.',
    stack: ['Workflow automation', 'SaaS', 'Product ownership'],
    links: [
      { label: 'Visit Surge Reviews', href: 'https://surge.reviews' },
    ],
  },
  {
    category: 'SDK architecture',
    name: 'Nami',
    role: 'Independent contractor · 2024 and 2025',
    tagline: 'No-code paywalls everywhere, through a TypeScript SDK',
    blurb: 'I designed and built a TypeScript SDK that brings Nami’s no-code paywalls to web, desktop, and smart-TV apps.',
    stack: ['TypeScript', 'Cross-platform SDK', 'Smart-TV runtimes'],
    links: [
      { label: 'Read the SDK docs', href: 'https://docs.namiml.com' },
    ],
  },
];

export function Projects({ onMouseMoveProj }) {
  const [featured, ...supporting] = PROJECTS;
  const waveform = [28, 42, 66, 38, 78, 54, 88, 46, 70, 34, 58, 84, 48, 72, 40, 62, 30, 52, 76, 44, 68, 36, 56, 82];

  return (
    <section className="projects wrap" id="projects">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Selected work</div>
          <h2 className="section-title">Work I&apos;ve shipped.</h2>
        </div>
        <div className="section-meta">Active engagement + selected builds</div>
      </div>

      <div className="proj-list">
        <article className="proj proj-featured" onMouseMove={onMouseMoveProj}>
          <div className="proj-feature-copy">
            <div className="proj-kicker">
              <span className="proj-status">Active work</span>
              <span>{featured.category}</span>
            </div>
            <h3 className="proj-name">{featured.name}</h3>
            <div className="proj-role">{featured.role}</div>
            <p className="proj-tagline">{featured.tagline}</p>
            <p className="proj-blurb">{featured.blurb}</p>

            <dl className="proj-evidence">
              {featured.evidence.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="proj-stack">
              {featured.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
            <div className="proj-links proj-links-featured">
              {featured.links.map((link, index) => (
                <a
                  key={link.label}
                  className={index === 0 ? 'proj-link-primary' : ''}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="proj-artifact" aria-label="Live audio mobile system">
            <div className="artifact-topline">
              <span>faidr mobile system</span>
              <span className="artifact-live"><i></i> live</span>
            </div>
            <div className="artifact-stage">
              <div className="artifact-label">Playback signal</div>
              <div className="waveform" aria-hidden="true">
                {waveform.map((height, index) => (
                  <i key={index} style={{'--wave-height': `${height}%`, '--wave-delay': `${index * -70}ms`}}></i>
                ))}
              </div>
              <div className="artifact-time">
                <span>00:00</span>
                <span>continuous</span>
              </div>
            </div>
            <div className="artifact-layers">
              <div>
                <span>01</span>
                <strong>Playback core</strong>
                <em>stable</em>
              </div>
              <div>
                <span>02</span>
                <strong>Native integration</strong>
                <em>in-house</em>
              </div>
              <div>
                <span>03</span>
                <strong>Cross-platform releases</strong>
                <em>iOS · Android</em>
              </div>
            </div>
            <div className="artifact-foot">
              <span>Production audio</span>
              <span>Ongoing delivery</span>
            </div>
          </div>
        </article>

        <div className="proj-supporting">
          {supporting.map((project) => (
            <article key={project.name} className="proj proj-compact" onMouseMove={onMouseMoveProj}>
              <div className="proj-kicker">{project.category}</div>
              <h3 className="proj-name">{project.name}</h3>
              <div className="proj-role">{project.role}</div>
              <p className="proj-tagline">{project.tagline}</p>
              <p className="proj-blurb">{project.blurb}</p>
              <div className="proj-stack">
                {project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
              </div>
              <div className="proj-links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="career-history" aria-label="Earlier work at Groupon, ThisLife, and Shutterfly">
        <div className="career-history-label">
          <span>Earlier work</span>
          <strong>Built for millions before going independent</strong>
        </div>
        <div className="career-logos">
          <div className="career-logo">
            <img src="/logos/groupon.png" alt="Groupon" />
          </div>
          <div className="career-logo">
            <img src="/logos/shutterfly.png" alt="Shutterfly" />
          </div>
          <div className="career-logo career-logo-thislife">
            <img src="/logos/thislife.png" alt="ThisLife" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// CONTACT
// ────────────────────────────────────────────────────────────
export function Contact({ onCopy }) {
  return (
    <section className="contact wrap" id="contact">
      <div className="contact-card">
        <div>
          <div className="section-eyebrow" style={{marginBottom:18}}>Contact</div>
          <h2>Ready to automate and ship faster?</h2>
          <p>
            I take on a small number of engagements as a senior product or
            contract engineer, helping teams automate workflows, accelerate
            development, and turn AI ideas into reliable production systems.
            I&apos;m booking Q1 2027 and open to early conversations.
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
            <span className="lbl">Status</span>
            <span className="val" style={{color:'var(--accent)'}}>Booking Q1 2027</span>
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
export function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="bullets">
          <span><i></i>Independent · contract</span>
          <span>Booking Q1 2027</span>
        </div>
        <div>© {new Date().getFullYear()} Josh Vermaire · built with care</div>
      </div>
    </footer>
  );
}
