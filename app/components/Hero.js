"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MODES = [
    {
        id: "photo",
        label: "Photo",
        role: "Photographe",
        line: "Portraits, scènes de rue, paysages. Je photographie au Gabon et au Maroc.",
    },
    {
        id: "code",
        label: "Code",
        role: "Développeur web & mobile",
        line: "Je fais des sites web et mobiles, de la maquette à la mise en ligne.",
    },
    {
        id: "design",
        label: "Design",
        role: "Designer graphique",
        line: "Logos, affiches, chartes graphiques : je m'occupe aussi de l'identité visuelle.",
    },
];

const AUTOPLAY_MS = 7000;

const TERMINAL = `$ whoami
jean-guylane memiaghe-biteghe

$ cat stack.json
{
  "front":  ["Next.js", "React", "Tailwind"],
  "cms":    ["WordPress"],
  "design": ["Figma"]
}

$ npm run build
✓ 6 sites en production`;

export default function Hero() {
    const sectionRef = useRef(null);
    const focusRef = useRef(null);
    const [mode, setMode] = useState("photo");
    const [autoplay, setAutoplay] = useState(true);
    const [flashKey, setFlashKey] = useState(0);

    const current = MODES.find((m) => m.id === mode);

    // Défilement automatique des ambiances, coupé dès que l'utilisateur choisit
    useEffect(() => {
        if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setTimeout(() => {
            const i = MODES.findIndex((m) => m.id === mode);
            setMode(MODES[(i + 1) % MODES.length].id);
        }, AUTOPLAY_MS);
        return () => clearTimeout(t);
    }, [mode, autoplay]);

    // Le collimateur de mise au point suit le curseur
    const handlePointerMove = useCallback((e) => {
        if (e.pointerType !== "mouse" || !sectionRef.current || !focusRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        focusRef.current.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
    }, []);

    const handleShutter = (e) => {
        if (mode !== "photo" || e.target.closest("a, button")) return;
        setFlashKey((k) => k + 1);
    };

    const pickMode = (id) => {
        setAutoplay(false);
        setMode(id);
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            onPointerMove={handlePointerMove}
            onClick={handleShutter}
            className={`force-dark relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-bg text-ink ${mode === "photo" ? "cursor-crosshair" : ""}`}
            aria-label="Présentation"
        >
            {/* ---------- Ambiance PHOTO ---------- */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${mode === "photo" ? "opacity-100" : "opacity-0"}`}
            >
                <div key={mode === "photo" ? "on" : "off"} className="absolute inset-0 animate-[ken-burns_9s_var(--ease-out-expo)_both]">
                    <Image
                        src="/JEALIFE_Pictures.webp"
                        alt="Jean Guylane Memiaghe Biteghe accroupi, appareil photo à l'œil, au milieu des pigeons"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[60%_40%]"
                    />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_2%,transparent_55%),linear-gradient(to_bottom,rgb(11_10_9/0.75),transparent_28%),linear-gradient(to_right,rgb(11_10_9/0.85),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_30%,transparent_85%)] md:hidden" />
            </div>

            {/* ---------- Ambiance CODE ---------- */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${mode === "code" ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_40%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)]" />
                <div className="absolute right-[4%] top-[18%] hidden w-[min(520px,42vw)] overflow-hidden rounded-xl border border-line bg-surface/80 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur md:block">
                    <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                        <span className="size-2.5 rounded-full bg-ink-3/50" />
                        <span className="size-2.5 rounded-full bg-ink-3/50" />
                        <span className="size-2.5 rounded-full bg-ink-3/50" />
                        <span className="ml-3 font-mono text-[11px] text-ink-3">~/jean-guylane — zsh</span>
                    </div>
                    <Terminal key={mode === "code" ? "on" : "off"} active={mode === "code"} />
                </div>
            </div>

            {/* ---------- Ambiance DESIGN ---------- */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${mode === "design" ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
            >
                <div className="dot-grid absolute inset-0" />
                {/* Tracé à la plume */}
                <svg className="absolute right-[6%] top-[16%] hidden h-[56%] w-[40%] md:block" viewBox="0 0 400 400" fill="none">
                    <path
                        key={mode === "design" ? "on" : "off"}
                        d="M40 320 C 80 80, 220 60, 250 200 S 380 330, 360 90"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeDasharray="900"
                        strokeDashoffset="900"
                        className="animate-[draw_2.4s_var(--ease-out-expo)_forwards]"
                    />
                    <line x1="40" y1="320" x2="80" y2="80" stroke="var(--ink-3)" strokeDasharray="3 4" />
                    <line x1="250" y1="200" x2="220" y2="60" stroke="var(--ink-3)" strokeDasharray="3 4" />
                    <line x1="360" y1="90" x2="380" y2="330" stroke="var(--ink-3)" strokeDasharray="3 4" />
                    {[[40, 320], [250, 200], [360, 90]].map(([x, y]) => (
                        <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
                    ))}
                    {[[80, 80], [220, 60], [380, 330]].map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--ink-3)" />
                    ))}
                </svg>
            </div>

            {/* ---------- Viseur : coins + collimateur ---------- */}
            <div className="pointer-events-none absolute inset-4 sm:inset-6" aria-hidden="true">
                {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
                    <span key={c} className={`absolute size-6 border-ink/50 ${c}`} />
                ))}
            </div>
            <div
                ref={focusRef}
                className={`pointer-events-none absolute left-0 top-0 hidden transition-[transform,opacity] duration-300 ease-out md:block ${mode === "photo" ? "opacity-100" : "opacity-0"}`}
                style={{ transform: "translate3d(62vw, 38vh, 0)" }}
                aria-hidden="true"
            >
                <div className="-translate-x-1/2 -translate-y-1/2">
                    <div className="relative size-16">
                        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
                            <span key={c} className={`absolute size-3 border-accent ${c}`} />
                        ))}
                        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                    </div>
                </div>
            </div>
            {flashKey > 0 && (
                <div key={flashKey} className="pointer-events-none absolute inset-0 z-30 bg-white animate-[shutter_0.35s_ease-out_forwards]" aria-hidden="true" />
            )}

            <div className="pt-24 sm:pt-28" />

            {/* ---------- Identité ---------- */}
            <div className="container-x relative z-10 mt-auto pb-10 sm:pb-14">
                <p className="kicker mb-5 text-ink-2">
                    Portfolio · Libreville, Gabon
                </p>

                <div className="relative inline-block max-w-full">
                    <h1 className="relative">
                        <span className="block font-display text-[clamp(3.2rem,12vw,9.5rem)] leading-[0.9] tracking-[-0.02em]">
                            Jean <em className="italic">Guylane</em>
                        </span>
                        <span className="mt-2 block text-[clamp(1.75rem,7vw,6rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em]">
                            Memiaghe Biteghe
                        </span>
                        {/* Cadre de sélection façon Figma */}
                        <span
                            className={`pointer-events-none absolute -inset-3 border border-accent transition-opacity duration-500 ${mode === "design" ? "opacity-100" : "opacity-0"}`}
                            aria-hidden="true"
                        >
                            {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((c) => (
                                <span key={c} className={`absolute size-2 border border-accent bg-bg ${c}`} />
                            ))}
                        </span>
                    </h1>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div key={mode} className="max-w-xl animate-fade-up">
                        <p className="text-xl font-medium text-accent sm:text-2xl">{current.role}</p>
                        <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{current.line}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <Link href="#work" className="btn btn-accent">
                                Voir les projets <i className="bx bx-right-arrow-alt text-lg" aria-hidden="true" />
                            </Link>
                            <a href="/assets/CV.pdf" download className="link-underline text-ink">
                                Télécharger le CV <i className="bx bx-download" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Molette de modes */}
                    <div role="tablist" aria-label="Choisir un univers" className="flex w-full gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-md sm:w-auto">
                        {MODES.map((m) => {
                            const active = m.id === mode;
                            return (
                                <button
                                    key={m.id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => pickMode(m.id)}
                                    className={`relative flex-1 overflow-hidden rounded-full px-5 py-2.5 text-sm transition-colors duration-300 sm:flex-none ${active ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"}`}
                                >
                                    {m.label}
                                    {active && autoplay && (
                                        <span
                                            key={mode}
                                            className="absolute inset-x-4 bottom-1 h-px origin-left bg-accent"
                                            style={{ animation: `dial-progress ${AUTOPLAY_MS}ms linear forwards` }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Le terminal se remonte à chaque entrée en mode Code pour rejouer la frappe
function Terminal({ active }) {
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (!active) return;
        const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? TERMINAL.length : 2;
        const t = setInterval(() => {
            setTyped((n) => Math.min(n + step, TERMINAL.length));
        }, 22);
        return () => clearInterval(t);
    }, [active]);

    return (
        <pre className="min-h-[340px] whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-ink-2">
            {TERMINAL.slice(0, typed).split("\n").map((l, i) => (
                <span key={i} className={l.startsWith("$") ? "text-ink" : l.startsWith("✓") ? "text-accent" : ""}>
                    {l}
                    {"\n"}
                </span>
            ))}
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent animate-[blink_1s_steps(1)_infinite]" />
        </pre>
    );
}
