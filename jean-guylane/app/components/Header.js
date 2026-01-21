"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = document.querySelectorAll("section[id]");
            let current = "home";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute("id");
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""; // Reset to default
        }
        return () => {
            document.body.style.overflow = ""; // Cleanup
        };
    }, [menuOpen]);

    const navLinks = [
        { name: "Accueil", href: "#home", id: "home" },
        { name: "À Propos", href: "#about", id: "about" },
        { name: "Projets", href: "#work", id: "work" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    const ThemeToggle = () => {
        if (!mounted) return null;
        return (
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-2xl text-text-secondary hover:text-accent-primary transition-colors cursor-pointer ml-4"
                aria-label="Toggle Theme"
            >
                <i className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"}`}></i>
            </button>
        );
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 ${scrolled
                        ? "bg-primary-secondary/85 backdrop-blur-glass border-b border-text-primary/5 shadow-lg !py-4"
                        : "bg-transparent backdrop-blur-none"
                    }`}
            >
                <nav className="container mx-auto px-4 flex justify-between items-center relative">
                    <Link
                        href="#home"
                        className="text-2xl font-extrabold text-text-primary flex items-center gap-2 whitespace-nowrap font-heading z-50"
                    >
                        <i className="bx bx-code-alt text-accent-primary"></i> Jean Guylane
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex gap-10 items-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`nav-link ${activeSection === link.id ? "active" : ""
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Toggle & Theme */}
                    <div className="lg:hidden flex items-center gap-4 z-50">
                        <ThemeToggle />
                        <div
                            className={`text-3xl text-text-primary cursor-pointer transition-opacity duration-300 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            onClick={() => setMenuOpen(true)}
                        >
                            <i className="bx bx-menu"></i>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Portal */}
            {mounted &&
                createPortal(
                    <div
                        className={`fixed inset-0 bg-primary-secondary/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 transition-transform duration-300 ease-in-out z-[100] lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        {/* Close Button (Fixed position inside the portal) */}
                        <div
                            className="absolute top-6 right-6 text-3xl text-text-primary cursor-pointer p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            <i className='bx bx-x'></i>
                        </div>

                        <ul className="flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`nav-link text-2xl ${activeSection === link.id ? "active" : ""
                                            }`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>,
                    document.body
                )}
        </>
    );
}
