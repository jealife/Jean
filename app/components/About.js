import Image from "next/image";

export default function About() {
    return (
        <section
            className="section container mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center"
            id="about"
        >
            <div className="relative" data-aos="fade-right">
                <div className="rounded-lg overflow-hidden w-full aspect-4/5 relative shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <Image
                        src="/jean_guylane_memiaghe.webp"
                        alt="Photo de Jean Guylane Memiaghe"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-accent-gradient p-8 rounded-md text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-white">
                    <span className="block text-4xl font-extrabold leading-none font-heading">
                        6+
                    </span>
                    <span className="font-heading text-sm">Ans d'Expérience</span>
                </div>
            </div>

            <div data-aos="fade-left">
                <h3 className="text-accent-primary uppercase text-sm tracking-[2px] mb-2 font-heading font-semibold">
                    Qui suis-je ?
                </h3>
                <h2 className="mb-4 text-3xl md:text-4xl font-bold font-heading">
                    Passionné par la fusion du <span className="text-gradient">Code</span>{" "}
                    et de l'<span className="text-gradient">Image</span>
                </h2>
                <p className="text-text-secondary text-lg mb-8 font-body leading-relaxed">
                    Développeur web et mobile basé à Libreville, Gabon, je mets mon
                    expertise technique au service de vos projets digitaux. Passionné de
                    photographie, j'apporte un regard esthétique et minutieux à chaque
                    interface que je conçois.
                </p>
                <div className="flex flex-wrap gap-4 font-heading font-medium text-sm">
                    <div className="bg-primary-secondary px-5 py-2 rounded-full flex items-center gap-2 border border-white/8 transition-all hover:border-accent-primary hover:-translate-y-1 cursor-default">
                        <i className="bx bxl-nextjs text-xl text-accent-primary"></i> Next.js
                    </div>
                    <div className="bg-primary-secondary px-5 py-2 rounded-full flex items-center gap-2 border border-white/8 transition-all hover:border-accent-primary hover:-translate-y-1 cursor-default">
                        <i className="bx bxl-tailwind-css text-xl text-accent-primary"></i>{" "}
                        Tailwind
                    </div>
                    <div className="bg-primary-secondary px-5 py-2 rounded-full flex items-center gap-2 border border-white/8 transition-all hover:border-accent-primary hover:-translate-y-1 cursor-default">
                        <i className="bx bxl-figma text-xl text-accent-primary"></i> Figma
                    </div>
                    <div className="bg-primary-secondary px-5 py-2 rounded-full flex items-center gap-2 border border-white/8 transition-all hover:border-accent-primary hover:-translate-y-1 cursor-default">
                        <i className="bx bxl-wordpress text-xl text-accent-primary"></i>{" "}
                        Wordpress
                    </div>
                    <div className="bg-primary-secondary px-5 py-2 rounded-full flex items-center gap-2 border border-white/8 transition-all hover:border-accent-primary hover:-translate-y-1 cursor-default">
                        <i className="bx bxs-camera text-xl text-accent-primary"></i> Photo
                    </div>
                </div>
            </div>
        </section>
    );
}
