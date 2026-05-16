export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/20 bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-10 text-center sm:px-10 sm:py-12">
        <p className="text-xs tracking-[0.12em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          © {new Date().getFullYear()} Turu Dogu（鶴土偶）. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
