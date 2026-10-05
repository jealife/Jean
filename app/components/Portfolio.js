"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const websites = [
    { title: "JEaLiFe Agency", image: "/projects/jealife.jpg", link: "https://www.jealife.com", type: "Site d'agence" },
    { title: "Orpheenyny", image: "/projects/orpheenyny.jpg", link: "https://www.orpheenyny.com", type: "Site vitrine" },
    { title: "Eloquent Boutique", image: "/projects/eloquent-boutique.jpg", link: "https://www.eloquentgrandb.com/boutique", type: "E-commerce" },
    { title: "Eloquent Grand B", image: "/projects/eloquent.jpg", link: "https://www.eloquentgrandb.com", type: "Site vitrine" },
    { title: "Éclat 241", image: "/projects/eclat241.jpg", link: "https://eclat241.vercel.app", type: "Site vitrine" },
    { title: "Talent Box Clone", image: "/projects/talent-box.jpg", link: "https://talent-box-clone.vercel.app/", type: "Intégration" },
];

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?q=80&w=2000&auto=format&fit=crop`;

const photos = [
    { title: "Portrait — Rocksia Mbemba", image: unsplash("1735530504626-56011dc003d9"), w: 2, h: 3 },
    { title: "Femmes aux chapeaux de paille dans un champ", image: unsplash("1714898579275-dcb4fbcbe142"), w: 3, h: 2 },
    { title: "Mosquée Hassan II, Casablanca", image: "/mosquee-hassan2.webp", w: 2048, h: 1279 },
    { title: "Portrait aux cheveux afro — Oceanne Evane", image: unsplash("1699220274995-a37956b7e43e"), w: 2, h: 3 },
    { title: "Le pont d'Adouma, Lambaréné, Gabon", image: unsplash("1759082927410-1d1856152b50"), w: 3, h: 2 },
    { title: "Clair-obscur", image: "/jealife_pictures-2.webp", w: 1424, h: 1780 },
    { title: "Orphee NYNY", image: unsplash("1746036295519-f12529f893db"), w: 3, h: 2 },
];

const filters = [
    { id: "all", label: "Tout" },
    { id: "website", label: "Web" },
    { id: "pictures", label: "Photo" },
];

const hostname = (url) => new URL(url).hostname.replace(/^www\./, "");

export default function Portfolio() {
    const [filter, setFilter] = useState("all");
    const [lightbox, setLightbox] = useState(null);

    return (
        <section id="work" className="relative py-28 sm:py-36">
            <div className="container-x">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="kicker mb-6" data-aos="fade-up">
                            Réalisations
                        </p>
                        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]" data-aos="fade-up" data-aos-delay="60">
                            Travaux <em className="text-accent">choisis</em>
                        </h2>
                    </div>

                    <div role="tablist" aria-label="Filtrer les réalisations" className="flex gap-1 self-start rounded-full border border-line p-1 md:self-auto" data-aos="fade-up">
                        {filters.map((f) => {
                            const active = filter === f.id;
                            return (
                                <button
                                    key={f.id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setFilter(f.id)}
                                    className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"}`}
                                >
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {filter !== "pictures" && (
                    <div className="mt-16">
                        <SubHeading label="Développement web" />
                        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
                            {websites.map((p, i) => (
                                <div key={p.title} className={i % 2 === 1 ? "md:translate-y-20" : ""}>
                                <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block animate-fade-up"
                                    style={{ animationDelay: `${i * 60}ms` }}
                                >
                                    <div className="overflow-hidden rounded-lg border border-line bg-surface transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.6)]">
                                        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                                            <span className="flex gap-1.5" aria-hidden="true">
                                                <span className="size-2 rounded-full bg-ink-3/40" />
                                                <span className="size-2 rounded-full bg-ink-3/40" />
                                                <span className="size-2 rounded-full bg-ink-3/40" />
                                            </span>
                                            <span className="flex-1 truncate rounded-sm bg-surface-2 px-3 py-1 text-center font-mono text-[11px] text-ink-3">
                                                {hostname(p.link)}
                                            </span>
                                        </div>
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={p.image}
                                                alt={`Capture d'écran du site ${p.title}`}
                                                fill
                                                className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-medium text-ink">{p.title}</h3>
                                            <p className="mt-1 text-sm text-ink-3">{p.type}</p>
                                        </div>
                                        <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 transition-colors group-hover:text-accent">
                                            <i className="bx bx-arrow-back rotate-[135deg] text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                        </span>
                                    </div>
                                </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {filter !== "website" && (
                    <div className={filter === "all" ? "mt-28 md:mt-44" : "mt-16"}>
                        <SubHeading label="Photographie" />
                        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                            {photos.map((p, i) => (
                                <button
                                    key={p.title}
                                    type="button"
                                    onClick={() => setLightbox(i)}
                                    className="group relative mb-6 block w-full break-inside-avoid animate-fade-up text-left"
                                    style={{ animationDelay: `${i * 60}ms` }}
                                    aria-label={`Agrandir la photo : ${p.title}`}
                                >
                                    <div className="relative overflow-hidden rounded-[3px] bg-surface" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                                        <Image
                                            src={p.image}
                                            alt={`${p.title}, photographie de Jean Guylane Memiaghe Biteghe`}
                                            fill
                                            className="object-cover transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.04]"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-lg text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                                            <i className="bx bx-expand-alt" />
                                        </span>
                                    </div>
                                    <p className="mt-3 text-sm text-ink-2">{p.title}</p>
                                </button>
                            ))}
                        </div>
                        <a
                            href="https://unsplash.com/fr/@jealife_pictures"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline mt-6 text-ink"
                        >
                            Plus de photos sur Unsplash <i className="bx bx-arrow-back rotate-[135deg]" aria-hidden="true" />
                        </a>
                    </div>
                )}
            </div>

            {lightbox !== null && (
                <Lightbox index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
            )}
        </section>
    );
}

function SubHeading({ label }) {
    return (
        <div className="mb-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            <span>{label}</span>
            <span className="h-px flex-1 bg-line" />
        </div>
    );
}

function Lightbox({ index, onChange, onClose }) {
    const closeRef = useRef(null);
    const photo = photos[index];

    const go = useCallback(
        (dir) => onChange((index + dir + photos.length) % photos.length),
        [index, onChange]
    );

    useEffect(() => {
        closeRef.current?.focus();
        document.body.style.overflow = "hidden";
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [go, onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={photo.title}
            className="force-dark fixed inset-0 z-[90] flex flex-col bg-bg/95 text-ink backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="container-x flex items-center justify-between py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
                <span className="tabular-nums">
                    <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(photos.length).padStart(2, "0")}
                </span>
                <button ref={closeRef} onClick={onClose} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 hover:text-ink">
                    Fermer <span className="text-ink-3">Esc</span>
                </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
                <Image key={photo.image} src={photo.image} alt={photo.title} fill sizes="100vw" className="object-contain px-4 animate-fade-up sm:px-20" />
                <button
                    onClick={() => go(-1)}
                    aria-label="Photo précédente"
                    className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/60 text-2xl transition-colors hover:border-accent hover:text-accent sm:left-6"
                >
                    <i className="bx bx-chevron-left" aria-hidden="true" />
                </button>
                <button
                    onClick={() => go(1)}
                    aria-label="Photo suivante"
                    className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/60 text-2xl transition-colors hover:border-accent hover:text-accent sm:right-6"
                >
                    <i className="bx bx-chevron-right" aria-hidden="true" />
                </button>
            </div>

            <div className="container-x flex flex-wrap items-baseline justify-between gap-3 py-5">
                <p className="font-display text-2xl">{photo.title}</p>
                <a href={photo.image} target="_blank" rel="noopener noreferrer" className="link-underline text-ink-2">
                    Ouvrir l&apos;original <i className="bx bx-arrow-back rotate-[135deg]" aria-hidden="true" />
                </a>
            </div>
        </div>
    );
}
