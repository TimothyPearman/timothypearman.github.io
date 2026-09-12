import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-ink/90 bg-white/90 backdrop-blur-sm">
      <div className="wrap flex h-[58px] items-center justify-between">
        <Link className="font-display text-[17px] font-semibold no-underline" to="/#hero">
          Timothy Pearman
        </Link>
        <div className="flex gap-[22px] font-mono text-[12px]">
          <Link className="text-ink-soft transition-colors hover:text-coral" to="/#work">
            Work
          </Link>
          <Link className="text-ink-soft transition-colors hover:text-coral" to="/#skills">
            Skills
          </Link>
          <Link className="text-ink-soft transition-colors hover:text-coral" to="/#certifications">
            Certifications
          </Link>
          <Link className="text-ink-soft transition-colors hover:text-coral" to="/#contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
