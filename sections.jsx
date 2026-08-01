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

const SPECTRUM_BAND_COUNT = 32;
const SPECTRUM_BARS = Array.from({length: SPECTRUM_BAND_COUNT}, (_, index) => {
  const frequency = index / (SPECTRUM_BAND_COUNT - 1);
  return {
    id: `band-${index + 1}`,
    frequency,
    bassResponse: Math.exp(-(((frequency - .12) / .22) ** 2)),
    midResponse: Math.exp(-(((frequency - .48) / .30) ** 2)),
    highResponse: Math.exp(-(((frequency - .82) / .20) ** 2)),
    texture: .84 + Math.sin(index * 1.53) * .10 + Math.sin(index * .47) * .06,
  };
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const pulse = (position, interval, decay) => Math.exp(-modulo(position, interval) * decay);

function noise(position, seed) {
  const start = Math.floor(position);
  const amount = position - start;
  const smooth = amount * amount * (3 - 2 * amount);
  const sample = (point) => {
    const value = Math.sin(point * 127.1 + seed * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };

  return sample(start) * (1 - smooth) + sample(start + 1) * smooth;
}

function getSpectrumLevels(time) {
  const beat = time / (60 / 106);
  const kick = pulse(beat, 1, 7.4);
  const sub = pulse(beat, 2, 2.8);
  const snare = pulse(beat - 1, 2, 8.8);
  const hat = pulse(beat, .5, 18);
  const offbeatHat = pulse(beat - .5, 1, 15);
  const phrase =
    .78 +
    Math.sin(beat * Math.PI / 16) * .12 +
    Math.sin(beat * Math.PI / 7) * .06;
  const measureVariation = .86 + noise(beat / 4, 7) * .22;
  const bass = (.22 + kick * .62 + sub * .24) * phrase * measureVariation;
  const mid = (.24 + snare * .38 + kick * .15 + noise(time * 1.7, 13) * .12) * phrase;
  const high = .15 + hat * .26 + offbeatHat * .12 + snare * .12 + noise(time * 5.2, 29) * .09;

  return SPECTRUM_BARS.map((band, index) => {
    const sharedMovement =
      .90 +
      Math.sin(time * (2.8 + band.frequency * 2.1) + index * .32) * .07 +
      (noise(time * 7 + index * .18, 41) - .5) * .08;
    const energy =
      bass * band.bassResponse * .70 +
      mid * band.midResponse * .52 +
      high * band.highResponse * .40;

    return clamp(.10 + energy * band.texture * sharedMovement, .10, .96);
  });
}

function PlaybackSpectrum() {
  const waveformRef = React.useRef(null);

  React.useEffect(() => {
    const waveform = waveformRef.current;
    if (!waveform) return undefined;

    const bars = Array.from(waveform.children);
    const peaks = new Float32Array(bars.length);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = null;
    let lastFrame = 0;
    let visible = true;

    const render = (time, elapsed = .05) => {
      getSpectrumLevels(time).forEach((level, index) => {
        peaks[index] = clamp(
          level > peaks[index] ? level + .04 : Math.max(level + .015, peaks[index] - elapsed * .22),
          .08,
          .98,
        );
        bars[index].style.setProperty('--current-level', level.toFixed(3));
        bars[index].style.setProperty('--current-peak', `${(peaks[index] * 100).toFixed(1)}%`);
        bars[index].style.setProperty('--current-opacity', (.82 + level * .18).toFixed(2));
      });
    };

    const stop = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
    };

    const animate = (now) => {
      animationFrame = null;
      if (!visible || reducedMotion.matches) return;

      const elapsed = Math.min((now - lastFrame) / 1000, .1);
      if (now - lastFrame >= 50) {
        render(now / 1000, elapsed);
        lastFrame = now;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (animationFrame !== null || !visible || reducedMotion.matches) return;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(animate);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        stop();
        render(2.4);
      } else {
        start();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, {rootMargin: '120px'});

    render(2.4);
    observer.observe(waveform);
    reducedMotion.addEventListener('change', handleMotionPreference);
    handleMotionPreference();

    return () => {
      stop();
      observer.disconnect();
      reducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div className="waveform" ref={waveformRef} aria-hidden="true">
      {SPECTRUM_BARS.map((bar) => <i key={bar.id}></i>)}
    </div>
  );
}

export function Projects({ onMouseMoveProj }) {
  const [featured, ...supporting] = PROJECTS;

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
              <PlaybackSpectrum />
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
