import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#sns", label: "SNS" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-900/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-6 sm:h-[4.25rem] sm:px-10">
        <Link
          href="#hero"
          className="shrink-0 text-sm font-medium tracking-[0.14em] text-sky-300 transition-opacity hover:opacity-85"
        >
          Turu Dogu
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-[0.7rem] sm:tracking-[0.24em]">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="transition-colors hover:text-sky-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
