import Link from "next/link";

export default function SiteHeader({ cta = true }: { cta?: boolean }) {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-sm font-bold tracking-tight text-ink">
            Responsible AI for Churches
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            document builder
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-muted transition hover:text-brand"
          >
            About
          </Link>
          {cta ? (
            <Link
              href="/build"
              className="rounded-lg bg-brand px-4 py-1.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start
            </Link>
          ) : (
            <a
              href="https://github.com/mattshandera/Responsible-AI-for-Churches"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium text-muted transition hover:text-brand"
            >
              Source
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
