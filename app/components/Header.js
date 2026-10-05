"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo from "./Logo";

const navLinks = [
    { name: "Accueil", href: "#home", id: "home" },
    { name: "À propos", href: "#about", id: "about" },
    { name: "Parcours", href: "#experience", id: "experience" },
    { name: "Projets", href: "#work", id: "work" },
    { name: "Contact", href: "#contact", id: "contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            // Le header reste « chambre noire » tant qu'on est sur le hero
            const hero = document.getElementById("home");
            setScrolled(window.scrollY > (hero ? hero.offsetHeight - 80 : 50));

            const sections = document.querySelectorAll("section[id]");
            let current = "home";
            sections.forEach((section) => {
                if (window.scrollY >= section.offsetTop - 150) {
                    current = section.getAttribute("id");
                }
            });
            setActiveSection(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const isDark = resolvedTheme !== "light";

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ${scrolled
                    ? "border-b border-line bg-bg/80 py-3 backdrop-blur-xl"
                    : "force-dark border-b border-transparent py-5"
                    }`}
            >
                <nav className="container-x flex items-center justify-between" aria-label="Navigation principale">
                    <Link href="#home" className="group flex items-center gap-2.5 text-ink" aria-label="Jean Guylane Memiaghe Biteghe — accueil">
                        <Logo className="size-8 shrink-0" />
                        <span className="text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors group-hover:text-accent">
                            Memiaghe Biteghe
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 lg:flex">
                        <ul className="flex items-center gap-7">
                            {navLinks.map((link) => {
                                const active = activeSection === link.id;
                                return (
                                    <li key={link.id}>
                                        <Link
                                            href={link.href}
                                            aria-current={active ? "true" : undefined}
                                            className={`text-sm transition-colors ${active ? "text-ink" : "text-ink-2 hover:text-ink"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {mounted && <ThemeToggle isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />}
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        {mounted && <ThemeToggle isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />}
                        <button
                            className={`flex size-10 items-center justify-center rounded-full border border-line text-2xl text-ink transition-opacity ${menuOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
                            onClick={() => setMenuOpen(true)}
                            aria-label="Ouvrir le menu"
                            aria-expanded={menuOpen}
                        >
                            <i className="bx bx-menu-alt-right" aria-hidden="true" />
                        </button>
                    </div>
                </nav>
            </header>

            {mounted &&
                createPortal(
                    <div
                        className={`fixed inset-0 z-[100] flex flex-col bg-bg transition-[clip-path] duration-700 ease-out-expo lg:hidden ${menuOpen ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"}`}
                        aria-hidden={!menuOpen}
                    >
                        <div className="container-x flex items-center justify-between py-5">
                            <span className="kicker">Menu</span>
                            <button
                                className="flex size-10 items-center justify-center rounded-full border border-line text-2xl text-ink"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Fermer le menu"
                                tabIndex={menuOpen ? 0 : -1}
                            >
                                <i className="bx bx-x" aria-hidden="true" />
                            </button>
                        </div>

                        <ul className="container-x mt-6 flex flex-col">
                            {navLinks.map((link, i) => (
                                <li key={link.id} className="border-b border-line">
                                    <Link
                                        href={link.href}
                                        tabIndex={menuOpen ? 0 : -1}
                                        onClick={() => setMenuOpen(false)}
                                        className={`flex items-baseline gap-4 py-4 font-display text-5xl ${activeSection === link.id ? "text-accent" : "text-ink"}`}
                                    >
                                        <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="container-x mt-auto pb-8">
                            <p className="font-display text-2xl text-ink">Jean Guylane Memiaghe Biteghe</p>
                            <a href="mailto:jealife.pictures@gmail.com" tabIndex={menuOpen ? 0 : -1} className="mt-1 block font-mono text-xs text-ink-2">
                                jealife.pictures@gmail.com
                            </a>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

function ThemeToggle({ isDark, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
            aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
        >
            <span className="relative size-2.5 overflow-hidden rounded-full border border-current">
                <span className={`absolute inset-y-0 left-0 bg-current transition-[width] duration-300 ${isDark ? "w-1/2" : "w-full"}`} />
            </span>
            {isDark ? "Négatif" : "Tirage"}
        </button>
    );
}
