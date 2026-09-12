type ProjectLink = {
  label: string
  href: string
}

type ProjectBandProps = {
  depth: string
  date: string
  title: string
  description: string
  tags: string[]
  links: ProjectLink[]
  index: number
}

const projectColors = [
  'bg-[#BFE3D6] text-[#0E3D38]',
  'bg-[#74B8A8] text-white',
  'bg-[#3E8C7E] text-white',
  'bg-[#1F5F55] text-white',
]

export default function ProjectBand({ depth, date, title, description, tags, links, index }: ProjectBandProps) {
  const isRightAligned = index % 2 === 1
  const edgeClass = isRightAligned ? 'edge-b-a' : 'edge-a-b'
  const colorClass = projectColors[index] ?? 'bg-white text-ink'

  return (
    <div className={`band relative overflow-hidden ${edgeClass} ${colorClass} ${isRightAligned ? 'text-left' : ''}`}>
      <div className="wrap">
        <span className={`pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(90px,18vw,220px)] font-semibold leading-none opacity-[0.14] ${isRightAligned ? 'right-[-10px] left-auto' : 'left-[-10px]'}`}>
          {depth}
        </span>
        <div className={`relative z-10 max-w-[480px] ${isRightAligned ? 'ml-auto' : ''}`}>
          <span className="mb-2.5 inline-block rounded-full border border-current/30 px-3 py-1 font-mono text-[11.5px]">
            {depth} · {date}
          </span>
          <h3 className="mb-2.5 font-display text-[25px] font-semibold">
            {title}
          </h3>
          <p className="mb-4 max-w-[50ch] text-[15px]">{description}</p>
          <div className="mb-4 flex flex-wrap gap-[7px]">
            {tags.map((tag) => (
              <span className="rounded-full border border-current/70 px-2.5 py-1 font-mono text-[10.5px] opacity-85" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-[18px] font-mono text-[12.5px]">
            {links.map((link) => (
              <a className="underline decoration-current/50 underline-offset-2" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
