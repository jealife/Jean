export default function Experience() {
    const experiences = [
        {
            date: "Janvier 2024 - Présent",
            title: "Directeur & Fondateur",
            company: "JEaLiFe Agency | Libreville, Gabon",
            description:
                "Direction d'une agence digitale spécialisée dans la création de contenu visuel, le branding et le développement web vitrine.",
        },
        {
            date: "Août 2022 - Mars 2023",
            title: "Développeur Web & Graphiste",
            company: "TOTAC Académie | Casablanca, Maroc",
            description:
                "Conception de supports visuels et maintenance des plateformes web pour l'académie de formation.",
        },
        {
            date: "Août 2021 - Septembre 2023",
            title: "Photographe & Community Manager",
            company: "Bambou d'Afrique | Casablanca, Maroc",
            description:
                "Gestion de l'image de marque et création de contenu visuel pour le secteur de la restauration.",
        },
    ];

    return (
        <section className="section container mx-auto px-4">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Mon Parcours
                </h2>
                <p className="text-text-secondary">
                    Une progression constante dans le monde du numérique.
                </p>
            </div>

            <div className="relative max-w-[800px] mx-auto mt-16">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 w-0.5 h-full bg-white/8"></div>

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="relative pl-12 mb-16 last:mb-0"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="absolute left-[-6px] top-0 w-3.5 h-3.5 rounded-full bg-accent-primary shadow-glow"></div>
                        <span className="font-heading text-accent-primary font-semibold text-sm mb-2 block uppercase tracking-wider">
                            {exp.date}
                        </span>
                        <h3 className="text-xl mb-2 font-heading font-semibold text-text-primary">
                            {exp.title}
                        </h3>
                        <span className="text-text-secondary font-medium mb-4 block">
                            {exp.company}
                        </span>
                        <p className="text-text-muted font-body leading-relaxed">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
