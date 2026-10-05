import Image from "next/image";

const specs = [
    { label: "Basé à", value: "Libreville, Gabon" },
    { label: "Expérience", value: "6+ ans · Gabon & Maroc" },
    { label: "Métiers", value: "Développement web & mobile, design graphique, photographie" },
    { label: "Outils", value: "Next.js · Tailwind CSS · WordPress · Figma" },
    { label: "Agence", value: "Fondateur de JEaLiFe Agency" },
];

export default function About() {
    return (
        <section id="about" className="relative py-28 sm:py-36">
            <div className="container-x grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
                <figure className="relative md:col-span-5" data-aos="fade-up">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-surface">
                        <Image
                            src="/jean_guylane_memiaghe.webp"
                            alt="Portrait en noir et blanc de Jean Guylane Memiaghe Biteghe, pull blanc, regard baissé"
                            fill
                            className="object-cover object-top grayscale"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>
                </figure>

                <div className="md:col-span-6 md:col-start-7 md:pt-10">
                    <p className="kicker mb-6" data-aos="fade-up">
                        À propos
                    </p>
                    <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.01em]" data-aos="fade-up" data-aos-delay="60">
                        Développeur, <em className="text-accent">avec un œil de photographe.</em>
                    </h2>
                    <div className="mt-8 max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink-2" data-aos="fade-up" data-aos-delay="120">
                        <p>
                            Je m&apos;appelle Jean Guylane Memiaghe Biteghe et je vis à Libreville. Je crée des sites pour
                            des marques, des boutiques en ligne et des artistes, et je m&apos;occupe de tout&nbsp;: la
                            maquette, le développement et la mise en ligne.
                        </p>
                        <p>
                            Je suis aussi photographe, et ça se voit dans mes interfaces&nbsp;: je fais attention au cadrage,
                            aux couleurs et aux petits détails.
                        </p>
                    </div>

                    <dl className="mt-12 border-t border-line" data-aos="fade-up" data-aos-delay="180">
                        {specs.map((s) => (
                            <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 pt-1">{s.label}</dt>
                                <dd className="text-ink">{s.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
