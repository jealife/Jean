"use client";

import { useState } from "react";

const EMAIL = "jealife.pictures@gmail.com";

const socials = [
    { label: "Instagram", href: "https://instagram.com/jealife_pictures", icon: "bxl-instagram" },
    { label: "GitHub", href: "https://github.com/jealife", icon: "bxl-github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jealife", icon: "bxl-linkedin" },
    { label: "Unsplash", href: "https://unsplash.com/fr/@jealife_pictures", icon: "bx-camera" },
];

const projectTypes = ["Site web", "Identité visuelle", "Photographie", "Autre"];

const fieldClass =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink-3/70 transition-colors focus:border-accent focus:outline-none focus:ring-0";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [sending, setSending] = useState(false);
    const [type, setType] = useState(projectTypes[0]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden border-t border-line py-28 sm:py-36">
            <div
                className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_16%,transparent),transparent)]"
                aria-hidden="true"
            />
            <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                    <p className="kicker mb-6" data-aos="fade-up">
                        Contact
                    </p>
                    <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92]" data-aos="fade-up" data-aos-delay="60">
                        Un projet ? <em className="text-accent">Écrivez-moi.</em>
                    </h2>
                    <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-2" data-aos="fade-up" data-aos-delay="120">
                        Pour un site, une identité visuelle ou une séance photo, envoyez-moi un email ou passez par le formulaire.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-3" data-aos="fade-up" data-aos-delay="160">
                        <a href={`mailto:${EMAIL}`} className="break-all text-xl font-medium text-ink underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-accent sm:text-2xl">
                            {EMAIL}
                        </a>
                        <button
                            type="button"
                            onClick={copyEmail}
                            className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:border-accent hover:text-accent"
                            aria-live="polite"
                        >
                            {copied ? "Copié ✓" : "Copier"}
                        </button>
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-ink-2">
                        <i className="bx bx-map text-accent" aria-hidden="true" /> Libreville, Gabon
                    </p>

                    <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
                        {socials.map((s) => (
                            <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-ink-2 hover:text-ink">
                                    <i className={`bx ${s.icon} text-lg`} aria-hidden="true" /> {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <form
                    action="https://submit-form.com/Q6PX1HC6"
                    method="POST"
                    onSubmit={() => setSending(true)}
                    className="rounded-xl border border-line bg-surface/60 p-6 backdrop-blur sm:p-10 lg:col-span-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <input type="hidden" name="_redirect" value="https://jea-life.vercel.app/" />
                    <input type="hidden" name="type" value={type} />

                    <fieldset>
                        <legend className="kicker mb-4">Type de projet</legend>
                        <div className="flex flex-wrap gap-2">
                            {projectTypes.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    aria-pressed={type === t}
                                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${type === t ? "border-accent bg-accent text-accent-ink" : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        <label className="block">
                            <span className="kicker">Nom</span>
                            <input type="text" name="name" required autoComplete="name" placeholder="Votre nom" className={fieldClass} />
                        </label>
                        <label className="block">
                            <span className="kicker">Email</span>
                            <input type="email" name="email" required autoComplete="email" placeholder="vous@exemple.com" className={fieldClass} />
                        </label>
                    </div>

                    <label className="mt-8 block">
                        <span className="kicker">Message</span>
                        <textarea
                            name="message"
                            required
                            minLength={10}
                            rows={5}
                            placeholder="Quelques mots sur votre projet…"
                            className={`${fieldClass} resize-y`}
                        />
                    </label>

                    <button type="submit" disabled={sending} className="btn btn-accent mt-10 disabled:cursor-wait disabled:opacity-70">
                        {sending ? "Envoi en cours…" : "Envoyer le message"}
                        <i className={`bx ${sending ? "bx-loader-alt animate-spin" : "bx-right-arrow-alt"} text-lg`} aria-hidden="true" />
                    </button>
                </form>
            </div>
        </section>
    );
}
