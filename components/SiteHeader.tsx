import Link from "next/link";

export default function SiteHeader({ cta = true }: { cta?: boolean }) {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
        {/* The name stays "for Churches"; the parenthetical says the
            builder is just as much for any faith-driven organization. */}
        <Link
          href="/"
          className="group flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2"
        >
          <span className="text-sm font-bold tracking-tight text-ink">
            Responsible AI for Churches
          </span>
          <span className="text-xs italic text-muted">
            (and other faith-driven organizations)
          </span>
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
      </div>
    </header>
  );
}
