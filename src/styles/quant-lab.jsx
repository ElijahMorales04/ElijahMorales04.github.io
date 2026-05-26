// Style 1 · Quant Research Lab — Primary / default direction.
// Premium dark, navy/near-black, warm white type, Columbia-blue + amber accents.
// Subtle animated stochastic ribbon backdrop. Serious, research-oriented.

const QL = {
  bg:    '#06080f',
  panel: '#0c1020',
  card:  '#10162a',
  ink:   '#e9e4d6',
  body:  '#c9c4b6',
  dim:   '#8a93a8',
  faint: '#5a627a',
  rule:  'rgba(255,255,255,0.08)',
  blue:  '#5b8fcc',
  blueDeep: '#3a6dbb',
  gold:  '#f6b042',
  green: '#5bd17a',
};

// ── Animated SDE ribbon backdrop ─────────────────────────────────
function QLBackdrop({ reduced }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (reduced) return;
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w = 0, h = 0, dpr = window.devicePixelRatio || 1;
    let paths = [];
    const resize = () => {
      const r = c.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + 'px'; c.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // build paths
      const N = 6, STEPS = 220;
      paths = [];
      for (let i = 0; i < N; i++) {
        const baseY = h * (0.18 + i * 0.13);
        const amp = 12 + Math.random() * 22;
        const phase = Math.random() * Math.PI * 2;
        const speed = 0.0018 + Math.random() * 0.0014;
        const series = new Array(STEPS).fill(0);
        for (let s = 1; s < STEPS; s++) {
          series[s] = series[s-1] + (Math.random() - 0.5) * 0.6;
        }
        paths.push({ baseY, amp, phase, speed, series, color: i % 2 === 0 ? QL.blue : QL.gold });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    let raf, t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      paths.forEach((p, idx) => {
        ctx.beginPath();
        const STEPS = p.series.length;
        for (let s = 0; s < STEPS; s++) {
          const x = (s / (STEPS - 1)) * w;
          const wobble = Math.sin(s * 0.04 + t * p.speed + p.phase) * p.amp;
          const noise = p.series[s] * 6;
          const y = p.baseY + wobble + noise;
          if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, p.color + '00');
        grad.addColorStop(0.5, p.color + (idx % 2 ? '30' : '22'));
        grad.addColorStop(1, p.color + '00');
        ctx.strokeStyle = grad;
        ctx.lineWidth = idx === 1 ? 1.4 : 0.8;
        ctx.stroke();
      });
      // tiny dots floating
      for (let i = 0; i < 40; i++) {
        const x = ((i * 37 + t * 0.2) % w);
        const y = ((i * 71) % h);
        ctx.fillStyle = 'rgba(91,143,204,0.25)';
        ctx.fillRect(x, y, 1, 1);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [reduced]);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// ── Small SVG of a metapopulation graph (used in featured research) ──
function QLGraphMini() {
  const nodes = [
    { x: 60,  y: 50  }, { x: 200, y: 40  },
    { x: 60,  y: 150 }, { x: 200, y: 160 },
    { x: 130, y: 100 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[0,4],[1,4],[2,4],[3,4]];
  return (
    <svg viewBox="0 0 260 200" style={{ width: '100%', height: '100%' }}>
      {edges.map(([a,b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke={QL.blue} strokeOpacity="0.45" strokeDasharray="2 3" strokeWidth="1" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill={QL.gold} fillOpacity="0.12" />
          <circle cx={n.x} cy={n.y} r="9"  fill={QL.gold} />
          <text x={n.x} y={n.y + 28} textAnchor="middle" fill={QL.dim} fontSize="9" fontFamily="Geist Mono">P{i+1}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Section header ────────────────────────────────────────────────
function QLSection({ id, no, kicker, title, children, dark }) {
  const [ref, seen] = UI.useInView();
  return (
    <section id={id} ref={ref} style={{
      padding: 'clamp(60px,8vw,108px) clamp(20px,5vw,72px)',
      background: dark ? QL.panel : 'transparent',
      borderTop: `1px solid ${QL.rule}`,
      opacity: seen ? 1 : 0,
      transform: seen ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity .8s ease, transform .8s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'Geist Mono, monospace', fontSize: 11,
          color: QL.gold, letterSpacing: '0.16em',
        }}>§ {no}</span>
        <span style={{
          fontFamily: 'Geist Mono, monospace', fontSize: 11,
          color: QL.dim, letterSpacing: '0.16em', textTransform: 'uppercase',
        }}>{kicker}</span>
      </div>
      <h2 className="ql-h2" style={{
        fontFamily: 'Newsreader, serif', fontWeight: 400,
        fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.05,
        margin: '0 0 36px', letterSpacing: '-0.015em', color: QL.ink, maxWidth: 900,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function QLChip({ children, accent }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px', borderRadius: 999,
      border: `1px solid ${accent ? QL.blue : QL.rule}`,
      color: accent ? QL.blue : QL.body,
      fontFamily: 'Geist Mono, monospace', fontSize: 11,
      background: accent ? 'rgba(91,143,204,0.08)' : 'transparent',
    }}>{children}</span>
  );
}

// ── HERO ──────────────────────────────────────────────────────────
function QLHero() {
  const reduced = UI.useReducedMotion();
  return (
    <section id="hero" style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(80px,12vw,160px) clamp(20px,5vw,72px) clamp(80px,10vw,140px)',
      background: `radial-gradient(80% 60% at 20% 0%, rgba(91,143,204,0.18) 0%, rgba(6,8,15,0) 60%),
                   radial-gradient(60% 40% at 90% 100%, rgba(246,176,66,0.10) 0%, rgba(6,8,15,0) 60%), ${QL.bg}`,
    }}>
      <QLBackdrop reduced={reduced} />
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 'clamp(28px, 4vw, 72px)', alignItems: 'center', maxWidth: 1400, margin: '0 auto' }}
           className="ql-hero-grid">
        <div>
          <div style={{
            display: 'inline-flex', gap: 10, alignItems: 'center',
            padding: '6px 12px', borderRadius: 999, background: 'rgba(91,143,204,0.10)',
            border: '1px solid rgba(91,143,204,0.30)', color: QL.blue,
            fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.12em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 6, background: QL.green, boxShadow: `0 0 8px ${QL.green}` }} />
            OPEN TO QUANT · DATA · RISK ROLES
          </div>
          <h1 className="ql-h1" style={{
            fontFamily: 'Newsreader, serif', fontWeight: 400,
            fontSize: 'clamp(56px, 9vw, 124px)',
            lineHeight: 0.94, letterSpacing: '-0.025em', color: QL.ink,
            margin: '24px 0 0',
          }}>
            Elijah <span style={{ fontStyle: 'italic', color: QL.blue }}>Morales</span>
          </h1>
          <div style={{
            marginTop: 20, fontSize: 'clamp(18px, 1.7vw, 22px)',
            color: QL.body, lineHeight: 1.5, maxWidth: 640,
          }}>
            Applied Mathematics M.S. <span style={{ color: QL.gold }}>@ Columbia</span>.
            Research Analyst — Internal Tools, Automation &amp; Analytics <span style={{ color: QL.gold }}>@ SRA Screening</span>.
          </div>
          <div style={{
            marginTop: 24, fontFamily: 'Newsreader, serif', fontStyle: 'italic',
            fontSize: 'clamp(20px, 2.2vw, 28px)', color: QL.ink, lineHeight: 1.4, maxWidth: 720,
          }}>
            Applied mathematics, stochastic modeling,<br/>
            and <span style={{ color: QL.gold }}>data-driven automation</span>.
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 36 }}>
            <a {...UI.externalLinkProps(CONTENT.links.resume)} className="ql-cta ql-cta-primary">
              Resume <UI.Icon.Download width="14" height="14" />
            </a>
            <a {...UI.externalLinkProps(CONTENT.links.github)} className="ql-cta">
              <UI.Icon.Github width="14" height="14" /> GitHub
            </a>
            <a {...UI.externalLinkProps(CONTENT.links.linkedin)} className="ql-cta">
              <UI.Icon.Linkedin width="14" height="14" /> LinkedIn
            </a>
            <a {...UI.externalLinkProps(`mailto:${CONTENT.links.email}`)} className="ql-cta">
              <UI.Icon.Mail width="14" height="14" /> Email
            </a>
          </div>
          <div style={{
            marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,auto))', gap: 'clamp(16px, 3vw, 40px)',
            fontFamily: 'Geist Mono, monospace', fontSize: 11,
          }}>
            {[
              ['GPA',     '4.17',  'Columbia scale'],
              ['Program', 'M.S. APMA', 'Columbia · 2028'],
              ['Research','NSF REU',   '67pp preprint, 2024'],
              ['Based',   'South Florida', 'Fort Lauderdale · Remote / Hybrid'],
            ].map(([k, v, s]) => (
              <div key={k}>
                <div style={{ color: QL.faint, letterSpacing: '0.1em' }}>{k.toUpperCase()}</div>
                <div style={{ color: QL.ink, fontSize: 18, marginTop: 6, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>{v}</div>
                <div style={{ color: QL.dim, marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait card */}
        <div className="ql-hero-portrait" style={{ position: 'relative' }}>
          <div style={{
            position: 'relative', aspectRatio: '4 / 5', borderRadius: 12, overflow: 'hidden',
            background: '#0a0d18',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
          }}>
            <img src="assets/headshot.png" alt="Elijah Morales"
                 style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%', filter: 'contrast(1.04)' }} />
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(6,8,15,0) 60%, rgba(6,8,15,0.85) 100%)',
            }} />
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16,
                          display: 'flex', justifyContent: 'space-between', alignItems: 'end',
                          fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em', color: QL.body }}>
              <div>
                <div style={{ color: QL.faint }}>BASED</div>
                <div style={{ color: QL.ink, fontSize: 11, marginTop: 2 }}>FORT LAUDERDALE, FL</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: QL.faint }}>SIGNATURE</div>
                <div style={{ color: QL.gold, fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 18, marginTop: 2 }}>E.M.</div>
              </div>
            </div>
          </div>
          {/* annotation */}
          <div style={{
            position: 'absolute', top: -14, right: -8,
            background: 'rgba(91,143,204,0.12)', color: QL.blue,
            padding: '6px 12px', borderRadius: 999,
            border: '1px solid rgba(91,143,204,0.35)',
            fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.06em',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          }}>Open to quant / data / risk roles</div>
        </div>
      </div>

      {/* Scroll-to-explore hint */}
      <a href="#focus" onClick={(e) => { e.preventDefault(); UI.scrollToId('focus'); }}
         className="ql-scroll-hint" aria-label="Scroll to explore">
        <span className="ql-scroll-line" />
        <span>SCROLL TO EXPLORE</span>
        <span className="ql-scroll-arrow"><UI.Icon.Chevron width="12" height="12" /></span>
      </a>
    </section>
  );
}

// ── FOCUS PILLARS ─────────────────────────────────────────────────
function QLFocus() {
  return (
    <QLSection id="focus" no="01" kicker="Research focus"
      title={<>Four pillars I'm <em style={{ color: QL.blue, fontStyle: 'italic' }}>building around</em>.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {CONTENT.focus.map((f, i) => (
          <div key={f.k} style={{
            padding: '24px 22px', background: QL.card, borderRadius: 12,
            border: `1px solid ${QL.rule}`, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 16, right: 18,
              fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.faint, letterSpacing: '0.1em',
            }}>0{i+1}</div>
            <div style={{
              fontFamily: 'Newsreader, serif', fontSize: 22, lineHeight: 1.2,
              color: QL.ink, letterSpacing: '-0.01em',
            }}>{f.k}</div>
            <div style={{ marginTop: 14, fontSize: 13, color: QL.body, lineHeight: 1.6 }}>{f.v}</div>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '40%', height: 2, background: i % 2 ? QL.gold : QL.blue }} />
          </div>
        ))}
      </div>
    </QLSection>
  );
}

// ── FEATURED RESEARCH ─────────────────────────────────────────────
function QLResearch() {
  const r = CONTENT.featuredResearch;
  return (
    <QLSection id="research" no="02" kicker="Featured research" dark
      title={<>A 67-page co-authored preprint on <em style={{ color: QL.blue, fontStyle: 'italic' }}>dispersal evolution</em>.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 'clamp(24px, 4vw, 56px)' }}
           className="ql-two-col">
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            <QLChip accent>NSF QRLSSP REU</QLChip>
            <QLChip>Arizona State University · 2024</QLChip>
            <QLChip>67 pages · preprint</QLChip>
          </div>
          <h3 style={{
            fontFamily: 'Newsreader, serif', fontWeight: 400,
            fontSize: 'clamp(28px,3.5vw,40px)', lineHeight: 1.1, margin: 0,
            color: QL.ink, letterSpacing: '-0.015em',
          }}>
            {r.title}
          </h3>
          <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, color: QL.dim, marginTop: 12 }}>
            {r.authors.map((a, i) => (
              <span key={i}>
                {a === 'E. Morales' ? <span style={{ color: QL.gold, fontStyle: 'normal' }}>{a}</span> : a}
                {i < r.authors.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
          <p style={{ marginTop: 22, fontSize: 15, lineHeight: 1.75, color: QL.body, maxWidth: 720 }}>
            {r.description}
          </p>

          <ul style={{ margin: '20px 0 0', padding: 0, listStyle: 'none' }}>
            {r.deepDive.map((b, i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8,
                fontSize: 14, lineHeight: 1.65, color: QL.body, marginBottom: 10,
              }}>
                <span style={{ color: QL.gold, fontFamily: 'Geist Mono, monospace', fontSize: 11, paddingTop: 3 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {r.chips.map((c) => <QLChip key={c}>{c}</QLChip>)}
          </div>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {r.links.map((l) => (
              <a key={l.label} {...(l.external ? UI.externalLinkProps(l.href) : { href: l.href })}
                 style={{
                   display: 'inline-flex', alignItems: 'center', gap: 6,
                   padding: '10px 14px', borderRadius: 999,
                   background: l.soon ? 'transparent' : QL.blue,
                   color: l.soon ? QL.dim : '#04081a',
                   border: l.soon ? `1px dashed ${QL.faint}` : 'none',
                   fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
                   textDecoration: 'none', fontWeight: 600,
                 }}>
                {l.label.toUpperCase()}
                {l.soon ? ' · SOON' : ''} {!l.soon && <UI.Icon.Arrow width="12" height="12" />}
              </a>
            ))}
          </div>
        </div>

        {/* Side card */}
        <div>
          <div style={{
            background: QL.bg, border: `1px solid ${QL.rule}`, borderRadius: 12,
            padding: 22, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.faint, letterSpacing: '0.12em', marginBottom: 10 }}>
              <span>FIG. 1 · METAPOPULATION GRAPH</span>
              <span>4 PATCHES + CORE</span>
            </div>
            <div style={{ height: 200 }}><QLGraphMini /></div>
            <div style={{ marginTop: 10, fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13, color: QL.dim }}>
              Adult dispersal connects patches; dispersal cost <em>c</em> tunes the regime.
            </div>
          </div>

          <div style={{
            marginTop: 16, background: QL.bg, border: `1px solid ${QL.rule}`, borderRadius: 12, padding: 22,
            fontFamily: 'Newsreader, serif', fontStyle: 'italic',
          }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontStyle: 'normal', fontSize: 10, color: QL.faint, letterSpacing: '0.12em' }}>EQUATIONS · SELECTED</div>
            <div style={{ marginTop: 16, fontSize: 18, color: QL.ink }}>
              L<sub>t+1</sub> = b · A<sub>t</sub> · e<sup>−c<sub>el</sub>L<sub>t</sub> − c<sub>ea</sub>A<sub>t</sub></sup>
            </div>
            <div style={{ marginTop: 14, fontSize: 18, color: QL.ink }}>
              dX<sub>t</sub> = μ(X<sub>t</sub>) dt + σ(X<sub>t</sub>) dW<sub>t</sub>
            </div>
            <div style={{ marginTop: 14, fontSize: 18, color: QL.ink }}>
              R<sub>0</sub>(m, r) &gt; 1 ⟹ <span style={{ color: QL.gold }}>mutant invades</span>
            </div>
          </div>
        </div>
      </div>
    </QLSection>
  );
}

// ── PROJECTS (with filter + expand) ───────────────────────────────
function QLProjects() {
  const [filter, setFilter] = React.useState('All');
  const [openId, setOpenId] = React.useState(null);
  const filtered = CONTENT.projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Learning') return false;
    return p.cat === filter;
  });
  return (
    <QLSection id="projects" no="03" kicker="Projects"
      title={<>Selected work, plus what I'm <em style={{ color: QL.blue, fontStyle: 'italic' }}>building next</em>.</>}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {CONTENT.projectFilters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="ql-filter" data-active={f === filter}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 32, border: `1px dashed ${QL.faint}`, borderRadius: 12, color: QL.dim, fontStyle: 'italic' }}>
            No projects in this category yet — see Roadmap for what's planned.
          </div>
        )}
        {filtered.map((p) => {
          const open = openId === p.id;
          return (
            <article key={p.id} style={{
              background: QL.card, borderRadius: 14, border: `1px solid ${QL.rule}`,
              padding: 22, display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'transform .2s, border-color .2s',
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = QL.blue; }}
               onMouseLeave={(e) => { e.currentTarget.style.borderColor = QL.rule; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.gold,
                  letterSpacing: '0.12em',
                }}>{p.cat.toUpperCase()} · {p.year}</span>
                <span style={{
                  fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.dim,
                  letterSpacing: '0.06em', padding: '3px 8px', border: `1px solid ${QL.rule}`,
                  borderRadius: 999,
                }}>{p.status}</span>
              </div>
              <h3 style={{
                fontFamily: 'Newsreader, serif', fontSize: 24, lineHeight: 1.15,
                margin: 0, color: QL.ink, letterSpacing: '-0.01em', fontWeight: 400,
              }}>{p.title}</h3>
              <div style={{ fontSize: 14, color: QL.body, lineHeight: 1.6 }}>
                {open ? p.description : p.blurb}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                {p.tags.slice(0, open ? 99 : 4).map((t) => <QLChip key={t}>{t}</QLChip>)}
                {!open && p.tags.length > 4 && <QLChip>+{p.tags.length - 4}</QLChip>}
              </div>
              <button onClick={() => setOpenId(open ? null : p.id)} style={{
                background: 'transparent', border: 0, cursor: 'pointer',
                color: QL.blue, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
              }}>{open ? 'COLLAPSE ▴' : 'READ MORE ▾'}</button>
            </article>
          );
        })}
      </div>
    </QLSection>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function QLExperience() {
  return (
    <QLSection id="experience" no="04" kicker="Experience" dark
      title={<>Where the modeling work and instruments <em style={{ color: QL.blue, fontStyle: 'italic' }}>get built</em>.</>}>
      {CONTENT.experience.map((j, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '180px 1fr', gap: 'clamp(20px, 3vw, 40px)',
          padding: '32px 0', borderTop: `1px solid ${QL.rule}`,
          ...(i === CONTENT.experience.length - 1 ? { borderBottom: `1px solid ${QL.rule}` } : {}),
        }} className="ql-exp-row">
          <div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.gold, letterSpacing: '0.1em' }}>{j.range}</div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.dim, marginTop: 6 }}>{j.loc}</div>
            <div style={{ marginTop: 12 }}>
              <QLChip accent={j.tag === 'Current'}>{j.tag}</QLChip>
            </div>
          </div>
          <div>
            <h3 style={{
              fontFamily: 'Newsreader, serif', fontSize: 30, margin: 0, fontWeight: 400,
              color: QL.ink, letterSpacing: '-0.015em',
            }}>{j.org}</h3>
            <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 16, color: QL.dim, marginTop: 4 }}>{j.role}</div>
            <ul style={{ margin: '18px 0 0', padding: 0, listStyle: 'none' }}>
              {j.bullets.map((b, k) => (
                <li key={k} style={{
                  display: 'grid', gridTemplateColumns: '20px 1fr', gap: 8,
                  fontSize: 14, lineHeight: 1.65, color: QL.body, marginBottom: 10,
                }}>
                  <span style={{ color: QL.gold }}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </QLSection>
  );
}

// ── TOOLKIT ──────────────────────────────────────────────────────
function QLToolkit() {
  return (
    <QLSection id="toolkit" no="05" kicker="Technical toolkit"
      title={<>What I reach for, what I'm <em style={{ color: QL.blue, fontStyle: 'italic' }}>actively building</em>.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {CONTENT.toolkit.map((g, i) => (
          <div key={g.group} style={{
            background: QL.card, border: `1px solid ${QL.rule}`, borderRadius: 12, padding: 22,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <h3 style={{
                fontFamily: 'Newsreader, serif', fontSize: 22, margin: 0, fontWeight: 400,
                color: QL.ink, letterSpacing: '-0.01em',
              }}>{g.group}</h3>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.faint }}>0{i+1}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.items.map((it) => (
                <span key={it} style={{
                  padding: '5px 11px', borderRadius: 6,
                  background: i === 3 ? 'rgba(246,176,66,0.10)' : 'rgba(255,255,255,0.04)',
                  border: i === 3 ? '1px solid rgba(246,176,66,0.30)' : `1px solid ${QL.rule}`,
                  color: i === 3 ? QL.gold : QL.body,
                  fontFamily: 'Geist Mono, monospace', fontSize: 12,
                }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </QLSection>
  );
}

// ── ROADMAP ──────────────────────────────────────────────────────
function QLRoadmap() {
  const c = CONTENT.coursework;
  const cols = [
    { k: 'Completed', items: c.completed, color: QL.green },
    { k: 'In progress', items: c.current, color: QL.gold },
    { k: 'Planned', items: c.planned, color: QL.blue },
  ];
  return (
    <QLSection id="roadmap" no="06" kicker="Coursework · learning roadmap" dark
      title={<>Toward a probability, optimization, and <em style={{ color: QL.blue, fontStyle: 'italic' }}>stochastic-analysis</em> foundation.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {cols.map((col) => (
          <div key={col.k}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
              paddingBottom: 12, borderBottom: `1px solid ${QL.rule}`,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: col.color, boxShadow: `0 0 10px ${col.color}` }} />
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: QL.ink, letterSpacing: '0.1em' }}>
                {col.k.toUpperCase()} · {col.items.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map((it) => (
                <div key={it.code} style={{
                  padding: '14px 16px', background: QL.card, borderRadius: 10,
                  border: `1px solid ${QL.rule}`,
                  display: 'flex', flexDirection: 'column', gap: 4,
                  borderLeft: `2px solid ${col.color}`,
                }}>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.faint, letterSpacing: '0.08em' }}>{it.code}</div>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, color: QL.ink }}>{it.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, padding: 22, background: QL.card, borderRadius: 12, border: `1px solid ${QL.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.faint, letterSpacing: '0.1em' }}>EDUCATION SUMMARY</div>
          <div style={{ marginTop: 6, fontFamily: 'Newsreader, serif', fontSize: 22, color: QL.ink }}>
            Columbia M.S. APMA · GPA <span style={{ color: QL.gold }}>4.17</span> · USF B.A. <span style={{ color: QL.gold }}>3.81</span> Magna Cum Laude
          </div>
        </div>
        <a {...UI.externalLinkProps(CONTENT.links.resume)} className="ql-cta ql-cta-primary">
          Coursework listed on resume <UI.Icon.Download width="14" height="14" />
        </a>
      </div>
    </QLSection>
  );
}

// ── WRITING ──────────────────────────────────────────────────────
function QLWriting() {
  return (
    <QLSection id="writing" no="07" kicker="Writing · notes"
      title={<>Field notes from the lab — <em style={{ color: QL.blue, fontStyle: 'italic' }}>coming soon</em>.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {CONTENT.futureWriting.map((t, i) => (
          <div key={t} style={{
            padding: 22, borderRadius: 12, background: QL.card, border: `1px dashed ${QL.faint}`,
            display: 'flex', flexDirection: 'column', gap: 10, minHeight: 140,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.faint, letterSpacing: '0.1em' }}>DRAFT · {String(i+1).padStart(2,'0')}</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.gold, letterSpacing: '0.1em' }}>COMING SOON</span>
            </div>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: QL.ink, lineHeight: 1.25 }}>{t}</div>
          </div>
        ))}
      </div>
    </QLSection>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────
function QLContact() {
  const now = new Date();
  const year = now.getFullYear();
  const lastUpdated = now.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  return (
    <section id="contact" style={{
      padding: 'clamp(80px, 12vw, 160px) clamp(20px,5vw,72px) clamp(60px,8vw,100px)',
      background: `radial-gradient(70% 100% at 80% 100%, rgba(91,143,204,0.18) 0%, rgba(6,8,15,0) 60%), ${QL.bg}`,
      borderTop: `1px solid ${QL.rule}`,
    }}>
      <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.gold, letterSpacing: '0.16em' }}>§ 08 · CONTACT</div>
      <h2 style={{
        fontFamily: 'Newsreader, serif', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95,
        margin: '20px 0 0', color: QL.ink, letterSpacing: '-0.025em', maxWidth: 1200,
      }}>
        Let's <em style={{ color: QL.blue, fontStyle: 'italic' }}>talk numbers</em>.
      </h2>
      <div style={{ marginTop: 28, fontSize: 18, color: QL.body, maxWidth: 760, lineHeight: 1.5 }}>
        Open to conversations around quantitative analytics, data science, risk modeling, and applied research.
      </div>
      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, borderTop: `1px solid ${QL.rule}`, borderBottom: `1px solid ${QL.rule}` }}>
        {[
          { k: 'Email',    v: CONTENT.links.email,    href: 'mailto:' + CONTENT.links.email },
          { k: 'LinkedIn', v: 'in/elijah-morales',    href: CONTENT.links.linkedin },
          { k: 'GitHub',   v: 'ElijahMorales04',      href: CONTENT.links.github },
          { k: 'Location', v: 'Fort Lauderdale, FL',  href: null },
        ].map((c, i) => (
          <a key={c.k} {...(c.href ? UI.externalLinkProps(c.href) : { href: undefined })}
             style={{
               padding: '26px 24px', textDecoration: 'none', color: 'inherit',
               borderLeft: i === 0 ? 'none' : `1px solid ${QL.rule}`,
               display: 'block', cursor: c.href ? 'pointer' : 'default',
             }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.faint, letterSpacing: '0.12em' }}>{c.k.toUpperCase()}</div>
            <div style={{ marginTop: 8, fontSize: 18, color: QL.ink }}>{c.v}</div>
          </a>
        ))}
      </div>
      <a {...UI.externalLinkProps(CONTENT.links.resume)} style={{
        marginTop: 36, display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '14px 22px', borderRadius: 999, background: QL.gold, color: '#1a1100',
        fontFamily: 'Geist Mono, monospace', fontSize: 12, letterSpacing: '0.08em',
        textDecoration: 'none', fontWeight: 600,
      }}>DOWNLOAD RESUME (PDF) <UI.Icon.Download width="14" height="14" /></a>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${QL.rule}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'Geist Mono, monospace', fontSize: 11, color: QL.faint, letterSpacing: '0.06em' }}>
        <div>© {year} ELIJAH MORALES · BUILT WITH MATH AND CARE</div>
        <div>LAST UPDATED · {lastUpdated}</div>
      </div>
    </section>
  );
}

// ── TOP NAV ──────────────────────────────────────────────────────
function QLNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = UI.useScrollSpy(CONTENT.nav.map((n) => n.id));
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const onClick = (id) => (e) => { e.preventDefault(); setMobileOpen(false); UI.scrollToId(id); };
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(6,8,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
      borderBottom: scrolled ? `1px solid ${QL.rule}` : '1px solid transparent',
      transition: 'all .25s ease',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px clamp(16px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <a href="#hero" onClick={onClick('hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8, background: QL.gold, color: '#1a1100',
            display: 'grid', placeItems: 'center', fontFamily: 'Newsreader, serif', fontStyle: 'italic',
            fontSize: 18, fontWeight: 500,
          }}>E</span>
          <span>
            <span style={{ display: 'block', fontFamily: 'Newsreader, serif', fontSize: 16, color: QL.ink, lineHeight: 1 }}>Elijah Morales</span>
            <span style={{ display: 'block', fontFamily: 'Geist Mono, monospace', fontSize: 10, color: QL.dim, marginTop: 4, letterSpacing: '0.08em' }}>QUANT / APPLIED MATH</span>
          </span>
        </a>
        <nav className="ql-nav-d" style={{ display: 'flex', gap: 4 }}>
          {CONTENT.nav.map((n) => (
            <a key={n.id} href={'#' + n.id} onClick={onClick(n.id)} style={{
              padding: '8px 12px', borderRadius: 8, fontFamily: 'Geist Mono, monospace', fontSize: 12,
              color: active === n.id ? QL.gold : QL.body, textDecoration: 'none',
              letterSpacing: '0.04em',
            }}>{n.label}</a>
          ))}
        </nav>
        <button className="ql-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu"
                style={{ background: 'transparent', border: 0, color: QL.ink, padding: 8, cursor: 'pointer', display: 'none' }}>
          <UI.Icon.Menu width="22" height="22" />
        </button>
      </div>
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: QL.bg, zIndex: 200,
          padding: '24px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: QL.ink }}>Menu</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close"
                    style={{ background: 'transparent', border: 0, color: QL.ink, padding: 8, cursor: 'pointer' }}>
              <UI.Icon.X width="22" height="22" />
            </button>
          </div>
          <nav style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {CONTENT.nav.map((n) => (
              <a key={n.id} href={'#' + n.id} onClick={onClick(n.id)} style={{
                padding: '14px 0', fontFamily: 'Newsreader, serif', fontSize: 26, color: QL.ink,
                textDecoration: 'none', borderBottom: `1px solid ${QL.rule}`,
              }}>{n.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────
function QuantLab() {
  return (
    <div style={{
      background: QL.bg, color: QL.ink, fontFamily: 'Geist, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <style>{`
        .ql-cta { display: inline-flex; align-items: center; gap: 8px; padding: 11px 16px; border-radius: 999px;
                  background: rgba(255,255,255,0.04); color: ${QL.ink}; border: 1px solid ${QL.rule};
                  font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.05em;
                  text-decoration: none; transition: all .2s; }
        .ql-cta:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.20); }
        .ql-cta-primary { background: ${QL.gold}; color: #1a1100; border-color: ${QL.gold}; font-weight: 600; }
        .ql-cta-primary:hover { background: #ffc15a; }
        .ql-filter { padding: 8px 14px; border-radius: 999px; background: transparent; color: ${QL.body};
                     border: 1px solid ${QL.rule}; font-family: 'Geist Mono', monospace; font-size: 12px;
                     letter-spacing: 0.05em; cursor: pointer; transition: all .15s; }
        .ql-filter:hover { color: ${QL.ink}; border-color: ${QL.dim}; }
        .ql-filter[data-active="true"] { background: ${QL.gold}; color: #1a1100; border-color: ${QL.gold}; font-weight: 600; }
        .ql-scroll-hint {
          position: absolute; left: clamp(20px, 5vw, 72px); bottom: 28px;
          display: inline-flex; align-items: center; gap: 12px;
          color: ${QL.dim}; text-decoration: none; cursor: pointer; z-index: 2;
          font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.18em;
          transition: color .2s ease;
        }
        .ql-scroll-hint:hover { color: ${QL.gold}; }
        .ql-scroll-hint:hover .ql-scroll-line { background: ${QL.gold}; }
        .ql-scroll-line {
          display: inline-block; width: 48px; height: 1px;
          background: rgba(91,143,204,0.6); transition: background .2s ease;
        }
        .ql-scroll-arrow {
          display: inline-flex; align-items: center;
          animation: qlScrollBounce 2.2s ease-in-out infinite;
        }
        @keyframes qlScrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50%      { transform: translateY(4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ql-scroll-arrow { animation: none; opacity: 0.8; }
        }
        @media (max-width: 880px) {
          .ql-nav-d { display: none !important; }
          .ql-burger { display: inline-flex !important; }
          .ql-hero-grid { grid-template-columns: 1fr !important; }
          .ql-hero-portrait { max-width: 320px; }
          .ql-two-col { grid-template-columns: 1fr !important; }
          .ql-exp-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <QLNav />
      <QLHero />
      <QLFocus />
      <QLResearch />
      <QLProjects />
      <QLExperience />
      <QLToolkit />
      <QLRoadmap />
      <QLWriting />
      <QLContact />
    </div>
  );
}

window.QuantLab = QuantLab;
