"use client";
import React, { useState } from "react";

export default function Page() {
  // イラストをクリックしたときに揺らすための仕組み
  const [shakingIdx, setShakingIdx] = useState(null);

  const handleImageClick = (idx) => {
    setShakingIdx(idx);
    setTimeout(() => setShakingIdx(null), 450); // globals.cssの0.45秒の揺れと連動
  };

  // 🎨 WORKSセクションに並べるイラストのデータ（ご自身で自由に打ち替え可能です！）
  const artworks = [
    {
      title: "メーティオン",
      src: "/IMG_9745.jpg", // publicフォルダの画像を見に行きます
      //desc: "青空に向かって手を伸ばす翼を持った少女のイラスト。"
    },
    {
      title: "盟友",
      src: "/IMG_9746.jpg", // publicフォルダの画像を見に行きます
      //desc: "ボルドーの衣装を纏い、クリスタル"
    },
    {
      title: "SDキャラクター",
      src: "/IMG_9747.jpeg", // ※これだけ拡張子が.jpegなので注意してください
      //desc: "デフォルメされた可愛いキャラクターイラスト。"
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500/30 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b] overflow-x-hidden">      
      {/* 演出用の背景ベール（globals.cssの夜明けアニメーションと連動） */}
      <div className="opening-night-veil fixed inset-0 z-0 opening-stars-dim" />
      {/* メインコンテンツ */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        
        {/* HERO セクション */}
        <header className="relative flex min-h-[75vh] flex-col justify-center py-20">
          {/* 満月エフェクト */}
          <div className="opening-full-moon" />
          
          <div className="mt-12 space-y-4">
            <h1 className="opening-hero-line opening-hero-line--1 text-4xl font-bold tracking-wider sm:text-6xl text-white drop-shadow-md">
              Turu Dogu
            </h1>
            <p className="opening-hero-line opening-hero-line--2 text-xl font-medium tracking-wide text-sky-200/90">
              （鶴土偶）
            </p>
            
            {/* 📝 ご希望の自己紹介文章に変更しました！ */}
            <p className="opening-hero-line opening-hero-line--3 max-w-md pt-6 text-base leading-relaxed text-slate-300">
              絵と文章を書いています。たまに曲を書きます。
            </p>
          </div>
        </header>

        {/* WORKS セクション */}
        <section id="works" className="py-20 border-t border-slate-800/60">
          <h2 className="text-2xl font-bold tracking-widest text-white mb-12 uppercase">
            Works / Illustrations
          </h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((art, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/40 p-4 border border-slate-800/40 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/40"
              >
                <div className="overflow-hidden rounded-xl bg-slate-950 aspect-[4/3] flex items-center justify-center relative">
                  {/* 画像タグ */}
                  <img
                    src={art.src}
                    alt={art.title}
                    onClick={() => handleImageClick(idx)}
                    className={`h-full w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105 ${
                      shakingIdx === idx ? "animate-illustration-shake" : ""
                    }`}
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {art.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT セクション */}
        <section id="about" className="py-20 border-t border-slate-800/60">
          <div className="max-w-2xl bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold tracking-widest text-white mb-6">ABOUT ME</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              鶴土偶（Turu Dogu）のポートフォリオサイトです。デジタルイラストレーション、物語の執筆、音楽制作など、形にとらわれない創作活動を記録しています。
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
