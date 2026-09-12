import ProjectBand from '../components/ProjectBand'
import projects from '../data/projects.ts'
import certifications from '../data/certifications.ts'
import skills from '../data/skills.ts'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const sectionColors = [
  'bg-white text-ink',
  'bg-[#174540] text-pearl',
  'bg-[#0e2a2a] text-pearl',
  'bg-[#041414] text-pearl',
]

const startingEdge = 'edge-b-a'
const sectionEdge = (index: number) => (index % 2 === 0 ? startingEdge : 'edge-a-b')

const sectionStyles = [
  { edge: 'edge-first-alt', color: sectionColors[0] },
  { edge: sectionEdge(projects.length + 1), color: sectionColors[1] },
  { edge: sectionEdge(projects.length), color: sectionColors[2] },
  { edge: sectionEdge(projects.length + 1), color: sectionColors[3] },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header id="hero" className={`band ${sectionStyles[0].edge} ${sectionStyles[0].color}`}>
        <div className="wrap">
          <div className="mb-4 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
            Portfolio — Lincoln, UK
          </div>
          <h1 className="mb-[20px] max-w-[16ch] font-display text-[clamp(38px,6.5vw,62px)] font-semibold tracking-[-0.01em]">
            Timothy Pearman
          </h1>
          <div className="mb-5 font-display text-[19px] italic text-ink-soft">
            Embedded and IoT systems enthusiast
          </div>

          <p className="mb-[30px] max-w-[54ch] text-[15.5px] text-ink-soft">
            currently studying computer science at the University of Lincoln,
            with a keen interest in embedded systems and IoT. I enjoy exploring the
            intersection of hardware and software, and I'm always looking for opportunities
            to apply my skills to real-world problems. following this you will be able to
            dive in and find a highlights of my work, including projects, skills, and certifications.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center rounded-full border border-[#1F5F55] bg-[#1F5F55] px-[22px] py-[11px] font-sans text-[14px] font-medium text-pearl transition-transform duration-150 hover:-translate-y-0.5 hover:border-ink hover:bg-transparent hover:text-ink"
              onClick={() => scrollTo('work')}
            >
              learn about me
            </button>
            <button
              className="inline-flex items-center rounded-full border border-[#1F5F55] bg-[#1F5F55] px-[22px] py-[11px] font-sans text-[14px] font-medium text-pearl transition-transform duration-150 hover:-translate-y-0.5 hover:border-ink hover:bg-transparent hover:text-ink"
              onClick={() => scrollTo('contact')}
            >
              Get in touch
            </button>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="work" className={``}>
        {projects.map((project, index) => (
          <ProjectBand key={project.slug} {...project} index={index} />
        ))}
      </section>

      {/* Skills Section */}
      <section id="skills" className={`band ${sectionStyles[1].edge} ${sectionStyles[1].color}`}>
        <div className="wrap">
          <h2 className="mb-8 font-display text-[30px] font-semibold">Skills &amp; Experience</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div className="rounded-[24px] border border-black/10 bg-white/70 p-6 shadow-soft" key={group.label}>
                <h4 className="mb-3 font-display text-[22px] font-semibold">{group.label}</h4>
                <p className="text-[15px] text-ink-soft">{group.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className={`band ${sectionStyles[2].edge} ${sectionStyles[2].color}`}>
        <div className="wrap">
          
          <h2 className="mb-8 font-display text-[30px] font-semibold text-pearl-soft">Certifications</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((cert) => (
              <article className="rounded-[24px] border border-black/10 bg-white/70 p-6 shadow-soft" key={cert.name}>
                <div className="mb-4 flex items-center justify-between gap-3 text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft">
                  <span>{cert.status}</span>
                  <span>{cert.date}</span>
                </div>
                <h3 className="mb-2 font-display text-[22px] font-semibold">{cert.name}</h3>
                <p className="mb-2 text-[14px] font-semibold text-ink-soft">{cert.issuer}</p>
                <p className="text-[15px] text-ink-soft">{cert.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`band ${sectionStyles[3].edge} ${sectionStyles[3].color}`}>
        <div className="wrap text-pearl-soft">
          <h2 className="mb-4 font-display text-[30px] font-semibold">Get in Touch</h2>
          <p className="mb-6 max-w-[60ch] text-[15px]">
            Early-career developer actively looking for roles to grow and contribute. Let's talk!
          </p>
          <div className="mb-6 flex flex-wrap gap-[18px] font-mono text-[12.5px]">
            <a className="underline decoration-white/30 underline-offset-2" href="mailto:TimothyPearman1@gmail.com">
              email
            </a>
            <a className="underline decoration-white/30 underline-offset-2" href="https://github.com/TimothyPearman">
              github ↗
            </a>
            <a className="underline decoration-white/30 underline-offset-2" href="https://www.linkedin.com/in/timothy-pearman-65693136b/">
              linkedin ↗
            </a>
            <a className="underline decoration-white/30 underline-offset-2" href="#">
              resume.pdf ↗
            </a>
          </div>



          <div className="text-[13px] text-pearl-soft">Timothy Pearman — portfolio last updated September 2026</div>
        </div>
      </section>
    </>
  )
}
