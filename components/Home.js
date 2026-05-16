"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HERO_STARS = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  left: `${((i * 47 + 13) % 92) + 4}%`,
  top: `${((i * 71) % 56) + 6}%`,
  delay: `${((i * 0.19) % 2.8).toFixed(2)}s`,
  duration: `${2 + (i % 5) * 0.35}s`,
  size: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
}));

const ILLUSTRATIONS = [
  {
    id: 1,
    title: "メーティオン",
    alt: "メーティオンのイラスト",
    thumbSrc: "/ME-TYAN.jpeg",
  },
  {
    id: 2,
    title: "盟友",
    alt: "盟友のイラスト",
    thumbSrc: "/metaru.jpeg",
  },
  {
    id: 3,
    title: "SDキャラクター",
    alt: "SDキャラクターのイラスト",
    thumbSrc: "/SDmacal.jpeg",
  },
];

const DEMO_MP3_SRC =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/tech-ambient-nature.mp3";

function HeroWaveDivider() {
  const d = "M0,0 L0,16 Q280,52 600,28 T1200,40 L1200,0 Z";
  return (
    <div className="relative z-10 h-12 w-full overflow-hidden sm:h-14" aria-hidden>
      <svg className="h-full w-full text-white/45" viewBox="0 0 1200 48" preserveAspectRatio="none">
        <path fill="currentColor" d={d} />
      </svg>
    </div>
  );
}

const CLOUD_STRIPS = [
  { top: "12%", width: "min(42vw, 320px)", height: 6, blur: 3, bg: "rgba(255,255,255,0.22)", duration: "52s", delay: "0s" },
  { top: "28%", width: "min(28vw, 220px)", height: 4, blur: 2, bg: "rgba(255,255,255,0.18)", duration: "68s", delay: "-18s" },
  { top: "44%", width: "min(36vw, 280px)", height: 5, blur: 2.5, bg: "rgba(255,255,255,0.2)", duration: "41s", delay: "-7s" },
  { top: "58%", width: "min(22vw, 180px)", height: 3, blur: 1.5, bg: "rgba(255,255,255,0.16)", duration: "76s", delay: "-32s" },
  { top: "72%", width: "min(50vw, 400px)", height: 7, blur: 4, bg: "rgba(255,255,255,0.15)", duration: "59s", delay: "-24s" },
];

function BottomLandscape() {
  return (
    <section className="relative z-10 mt-6 overflow-hidden bg-transparent" aria-hidden>
      <div className="pointer-events-none relative min-h-[200px] w-full sm:min-h-[260px]">
        <div className="absolute inset-x-0 top-0 h-40 overflow-hidden sm:h-48">
          {CLOUD_STRIPS.map((c, i) => (
            <div
              key={i}
              className="wispy-cloud"
              style={{
                top: c.top,
                width: c.width,
                height: `${c.height}px`,
                backgroundColor: c.bg,
                filter: `blur(${c.blur}px)`,
                animationDuration: c.duration,
                animationDelay: c.delay,
              }}
            />
          ))}
        </div>

        <svg className="absolute bottom-8 left-0 w-full text-sky-950/55" viewBox="0 0 1200 220" preserveAspectRatio="none" style={{ height: "140px" }}>
          <path fill="currentColor" fillOpacity="0.55" d="M0,220 L0,120 Q200,80 400,110 T800,95 L1000,70 L1200,90 L1200,220 Z" />
          <path fill="currentColor" fillOpacity="0.72" d="M0,220 L0,145 Q260,100 520,130 T900,115 L1100,100 L1200,110 L1200,220 Z" />
          <path fill="currentColor" fillOpacity="0.88" d="M0,220 L0,165 Q300,130 600,155 T1000,140 L1200,150 L1200,220 Z" />
        </svg>

        <svg className="absolute bottom-0 left-0 w-full text-cyan-950/85" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: "100px" }}>
          <path fill="currentColor" fillOpacity="0.9" d="M80,120 L95,55 L110,120 Z M110,120 L125,48 L140,120 Z M165,120 L180,62 L195,120 Z M240,120 L255,40 L270,120 Z M320,120 L340,72 L360,120 Z M420,120 L435,50 L450,120 Z M520,120 L540,68 L560,120 Z M640,120 L655,44 L670,120 Z M760,120 L780,78 L800,120 Z M900,120 L920,52 L940,120 Z M1020,120 L1040,70 L1060,120 Z M1120,120 L1140,58 L1160,120 Z" />
          <path fill="currentColor" d="M0,120 L1200,120 L1200,100 Q900,88 600,96 T0,104 Z" />
        </svg>
      </div>
    </section>
  );
}

export default function Home() {
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [shakingId, setShakingId] = useState(null);
  const audioRef = useRef(null);

  const closeMusic = useCallback(() => {
    setMusicModalOpen(false);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMusic();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMusic]);

  const triggerIllustrationShake = (id) => {
    setShakingId(id);
    window.setTimeout(() => setShakingId(null), 450);
  };

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => {});
    else a.pause();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#1a0b2e_0%,#5b4477_34%,#bae6fd_66%,#0284c7_100%)]">
      {/* HEADER NAVIGATION */}
      <header className="absolute top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 sm:px-10">
        <span className="font-semibold text-white tracking-wider">Turu Dogu</span>
        <nav className="flex gap-6 text-xs font-medium uppercase tracking-widest text-sky-200/80">
          <a href="#about" className="hover:text-white transition">ABOUT</a>
          <a href="#works" className="hover:text-white transition">WORKS</a>
          <a href="#sns" className="hover:text-white transition">SNS</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 flex min-h-screen flex-col overflow-hidden bg-transparent px-6 pb-8 pt-20 sm:px-10 sm:pb-12 text-center items-center justify-center">
        <div className="opening-night-veil absolute inset-0 z-[1]" aria-hidden />

        <div className="opening-stars-dim pointer-events-none absolute inset-0 z-[2]" aria-hidden>
          {HERO_STARS.map((s) => (
            <span
              key={s.id}
              className="animate-twinkle absolute rounded-full bg-sky-100 shadow-[0_0_7px_rgba(254,252,232,0.85)]"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                "--twinkle-delay": s.delay,
                "--twinkle-duration": s.duration,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden>
          <div className="opening-full-moon" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center">
          <p className="opening-hero-line opening-hero-line--1 text-xs font-medium uppercase tracking-[0.45em] text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            Illustration &amp; Sound
          </p>
          <h1 className="opening-hero-line opening-hero-line--2 mt-8 text-5xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl">
            Turu Dogu
          </h1>
          <p className="opening-hero-line opening-hero-line--3 mt-3 text-xl font-normal text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-2xl">
            （鶴土偶）
          </p>
          <p className="opening-hero-line opening-hero-line--4 mt-10 max-w-xl text-sm leading-relaxed text-sky-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] sm:text-base">
            絵と文章を書いています。たまに曲を書きます。
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <HeroWaveDivider />
        </div>
      </section>

      {/* ABOUT ME セクション */}
      <section id="about" className="relative z-10 scroll-mt-16 bg-transparent px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-10 shadow-[0_12px_48px_-20px_rgba(0,0,0,0.35)] sm:px-10 sm:py-12">
          <h2 className="text-center text-sm font-medium uppercase tracking-[0.35em] text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            About Me
          </h2>
          <p className="mt-8 text-sm leading-[2] text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] sm:text-base">
            絵や文章や曲を作ります。もっと色々やりたいです。
          </p>
          <p className="mt-6 text-sm leading-[2] text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] sm:text-base">
            作品は主にX（旧Twitter）とPixivで発表しています。
          </p>
        </div>
      </section>

      {/* WORKS セクション（縦並び＆比率維持に大改造！） */}
      <section id="works" className="relative z-10 scroll-mt-16 bg-transparent px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.65)]">
            Works
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm font-medium text-slate-900/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
            イラストをいくつか紹介します。楽曲は再生ボタンからどうぞ。
          </p>

          {/* 横3列並びから、中央揃えの縦1列（フレックス縦並び）に変更 */}
          <div className="mt-14 flex flex-col items-center gap-16">
            {ILLUSTRATIONS.map((item) => (
              <div key={item.id} className="w-full max-w-xl flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => triggerIllustrationShake(item.id)}
                  className={`group w-full overflow-hidden rounded-2xl border border-slate-900/25 bg-white/10 backdrop-blur-sm p-2 outline-none ring-sky-700/25 transition hover:border-slate-900/40 focus-visible:ring-2 ${shakingId === item.id ? "animate-illustration-shake" : ""}`}
                  aria-label={`${item.title}（クリックでひと揺れ）`}
                >
                  {/* aspect-squareを消去し、h-auto（自動高さ）にすることで元の比率を維持 */}
                  <img
                    src={item.thumbSrc}
                    alt={item.alt}
                    className="w-full h-auto rounded-xl object-contain transition duration-300 group-hover:brightness-105"
                    draggable={false}
                  />
                </button>
                <p className="mt-4 text-center text-xs font-semibold text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-md rounded-2xl border border-slate-900/25 bg-white/5 backdrop-blur-sm p-8 text-center shadow-[0_8px_32px_-16px_rgba(15,23,42,0.25)]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
              Audio
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.65)]">
              プロトタイプ曲（デモ音源）
            </p>
            <button
              type="button"
              onClick={() => setMusicModalOpen(true)}
              className="mt-6 inline-flex h-14 min-w-[14rem] items-center justify-center gap-2 rounded-full bg-sky-600 px-8 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900/40"
            >
              <span className="inline-block h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-white" aria-hidden />
              再生ポップアップを開く
            </button>
          </div>
        </div>
      </section>

      {/* SNS セクション（アイコンをモダンな内製デザインに変更） */}
      <section id="sns" className="relative z-10 scroll-mt-16 bg-transparent px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-sm font-medium uppercase tracking-[0.35em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            SNS
          </h2>
          <div className="mt-12 flex flex-col items-stretch gap-8 sm:flex-row sm:justify-center sm:gap-12">
            
            {/* X (Twitter) カード */}
            <a href="https://x.com/cranedogu/" target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-white/35 bg-white/5 backdrop-blur-sm px-8 py-8 transition hover:border-white/55 sm:max-w-xs group">
              {/* シャープで洗練されたXのシンボルアイコン */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white font-bold text-xl tracking-tighter transition group-hover:scale-105 group-hover:bg-white/20">
                𝕏
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-sky-100">X (Twitter)</p>
                <p className="mt-2 font-mono text-sm text-white drop-shadow-sm">@cranedogu</p>
              </div>
            </a>

            {/* Pixiv カード */}
            <a href="https://www.pixiv.net/users/18205740" target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-white/35 bg-white/5 backdrop-blur-sm px-8 py-8 transition hover:border-white/55 sm:max-w-xs group">
              {/* 青いグラデーション夜空に映える、モダンでやわらかいP風のアイコン */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-sky-500/20 text-sky-300 font-black text-2xl tracking-tight transition group-hover:scale-105 group-hover:bg-sky-500/30">
                [p]
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-sky-100">Pixiv</p>
                <p className="mt-2 font-mono text-sm text-white drop-shadow-sm">turu dogu</p>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* BACKGROUND MOUNTAINS & CLOUDS */}
      <BottomLandscape />

      {/* AUDIO POPUP MODAL */}
      {musicModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="楽曲再生" onClick={closeMusic}>
          <button type="button" className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-xs text-white hover:bg-white/10" onClick={(e) => { e.stopPropagation(); closeMusic(); }}>
            閉じる
          </button>
          <div className="w-full max-w-md rounded-2xl border border-sky-400/40 bg-slate-900 p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <audio ref={audioRef} src={DEMO_MP3_SRC} preload="metadata" />
            <div className="mx-auto flex max-w-[220px] justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
              <img src="https://placehold.co/440x440/18181b/38bdf8?text=Track+Art" alt="楽曲イラスト プレースホルダー" className="aspect-square w-full object-cover" />
            </div>
            <p className="mt-6 text-center text-sm font-medium text-sky-300">Dawn Sketch — demo</p>
            <div className="mt-8 flex h-12 items-end justify-center gap-1.5" aria-hidden>
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="animate-wave-bar w-1.5 rounded-full bg-sky-400" style={{ height: `${14 + (i % 5) * 8}px`, animationDelay: `${i * 0.07}s` }} />
              ))}
            </div>
            <button type="button" onClick={toggleAudio} className="mt-8 w-full rounded-full bg-sky-500 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400">
              再生 / 停止
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center text-xs text-white/40 bg-cyan-950/85">
        <p>&copy; 2026 Turu Dogu （鶴土偶）. All rights reserved.</p>
      </footer>
    </div>
  );
}