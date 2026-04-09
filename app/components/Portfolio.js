"use client";

import { useState } from "react";
import Image from "next/image";

export default function Portfolio() {
    const [filter, setFilter] = useState("all");

    const projects = [
        {
            title: "JEaLiFe Agency",
            category: "website",
            image: "/projects/jealife.jpg",
            link: "https://www.jealife.com",
            cta: "Visiter",
        },
        {
            title: "Orpheenyny",
            category: "website",
            image: "/projects/orpheenyny.jpg",
            link: "https://www.orpheenyny.com",
            cta: "Visiter",
        },
        {
            title: "Eloquent Boutique",
            category: "website",
            image: "/projects/eloquent-boutique.jpg",
            link: "https://www.eloquentgrandb.com/boutique",
            cta: "Visiter",
        },
        {
            title: "Eloquent Grand B",
            category: "website",
            image: "/projects/eloquent.jpg",
            link: "https://www.eloquentgrandb.com",
            cta: "Visiter",
        },
        {
            title: "Éclat 241",
            category: "website",
            image: "/projects/eclat241.jpg",
            link: "https://eclat241.vercel.app",
            cta: "Visiter",
        },
        {
            title: "Talent Box Clone",
            category: "website",
            image: "/projects/talent-box.jpg",
            link: "https://talent-box-clone.vercel.app/",
            cta: "Visiter",
        },
    ];

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <section className="section container mx-auto px-4" id="work">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Mes Réalisations
                </h2>
                <div className="flex justify-center gap-4 mt-8">
                    {[
                        { id: "all", label: "Tout" },
                        { id: "website", label: "Web" },
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            className={`px-6 py-2 rounded-full font-heading font-medium cursor-pointer transition-all duration-300 border border-text-primary/10 ${filter === btn.id
                                ? "bg-accent-primary text-white border-accent-primary"
                                : "bg-primary-secondary text-text-secondary hover:bg-accent-primary hover:text-white hover:border-accent-primary"
                                }`}
                            onClick={() => setFilter(btn.id)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <div
                        key={`${project.title}-${index}`}
                        className="group bg-primary-secondary rounded-md overflow-hidden border border-text-primary/10 transition-all hover:-translate-y-2 portfolio-item"
                    // Adding a key to force re-render/animation on filter change
                    >
                        <div className="relative overflow-hidden aspect-16/10">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-accent-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="btn btn-outline bg-transparent border-white text-white hover:bg-white hover:text-accent-primary hover:border-white"
                                >
                                    {project.cta}
                                </a>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg mb-2 font-heading font-semibold text-text-primary">
                                {project.title}
                            </h3>
                            <span className="text-text-muted text-xs uppercase tracking-wide font-medium">
                                {project.category === "website"
                                    ? "Web Development"
                                    : "Photography"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
