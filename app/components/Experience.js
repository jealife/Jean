const experiences = [
    {
        date: "2024 — Aujourd'hui",
        title: "Directeur & fondateur",
        company: "JEaLiFe Agency",
        place: "Libreville, Gabon",
        description:
            "Direction d'une agence digitale spécialisée dans la création de contenu visuel, le branding et le développement de sites vitrines.",
    },
    {
        date: "Août 2022 — Mars 2023",
        title: "Développeur web & graphiste",
        company: "TOTAC Académie",
        place: "Casablanca, Maroc",
        description:
            "Conception de supports visuels et maintenance des plateformes web de l'académie de formation.",
    },
    {
        date: "Août 2021 — Sept. 2023",
        title: "Photographe & community manager",
        company: "Bambou d'Afrique",
        place: "Casablanca, Maroc",
        description:
            "Gestion de l'image de marque et création de contenu visuel pour le secteur de la restauration.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="relative border-t border-line bg-surface/40 py-28 sm:py-36">
            <div className="container-x">
                <div className="grid gap-6 md:grid-cols-12">
                    <p className="kicker md:col-span-4" data-aos="fade-up">
                        Parcours
                    </p>
                    <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] md:col-span-8" data-aos="fade-up" data-aos-delay="60">
                        Mon parcours, <em className="text-ink-2">entre Libreville et Casablanca.</em>
                    </h2>
                </div>

                <ol className="mt-16 border-t border-line">
                    {experiences.map((exp, index) => (
                        <li
                            key={exp.company}
                            className="group relative grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-10"
                            data-aos="fade-up"
                            data-aos-delay={index * 80}
                        >
                            <span className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-[width] duration-700 ease-out-expo group-hover:w-full" aria-hidden="true" />
                            <div className="md:col-span-4">
                                <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-3 tabular-nums">{exp.date}</p>
                                <p className="mt-2 text-sm text-ink-2">{exp.place}</p>
                            </div>
                            <div className="md:col-span-8">
                                <h3 className="text-2xl font-medium tracking-[-0.01em] text-ink sm:text-3xl">
                                    {exp.title}{" "}
                                    <span className="font-display italic text-ink-2 transition-colors group-hover:text-accent">— {exp.company}</span>
                                </h3>
                                <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-2">{exp.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
