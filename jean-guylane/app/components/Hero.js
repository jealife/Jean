"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const toRotate = ["Développeur Web", "Graphic Designer", "Photographe"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullTxt = toRotate[i];
        let updatedText = isDeleting
            ? fullTxt.substring(0, text.length - 1)
            : fullTxt.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullTxt) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        } else {
            // Reset delta to normal speed if not paused or deleting fast
            if (isDeleting) {
                setDelta(100);
            } else {
                setDelta(200 - Math.random() * 100);
            }
        }
    };

    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center text-center pt-32 relative overflow-hidden w-full"
            id="home"
        >
            {/* Gradient Blobs */}
            <div className="absolute w-[300px] h-[300px] bg-accent-primary blur-[150px] opacity-15 top-[10%] left-[10%] -z-10 animate-pulse"></div>
            <div className="absolute w-[300px] h-[300px] bg-accent-secondary blur-[150px] opacity-15 bottom-[10%] right-[10%] -z-10 animate-pulse delay-1000"></div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <h3
                    className="font-heading text-accent-primary font-semibold tracking-[4px] uppercase mb-4 text-sm"
                    data-aos="fade-up"
                >
                    Bienvenue dans mon univers
                </h3>
                <h1
                    className="text-4xl md:text-6xl mb-6 leading-tight font-heading font-bold"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Jean Guylane Memiaghe<br />
                    <span className="text-gradient font-bold h-[1.2em] inline-block">
                        {text}
                        <span className="animate-pulse">|</span>
                    </span>
                </h1>
                <p
                    className="max-w-[600px] text-text-secondary mx-auto mb-10 text-lg font-body"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Je façonne des expériences numériques modernes et capture des moments
                    uniques à travers l'objectif. Explorez mon travail alliant technique
                    et créativité.
                </p>
                <div
                    className="flex gap-4 justify-center flex-wrap"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <Link href="#work" className="btn btn-primary">
                        Voir mes projets
                    </Link>
                    <a href="/assets/CV.pdf" download className="btn btn-outline">
                        Télécharger CV <i className="bx bx-download"></i>
                    </a>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-20 mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <a
                        href="https://github.com/jealife"
                        target="_blank"
                        className="relative h-[300px] rounded-lg overflow-hidden flex items-end p-8 bg-cover bg-center transition-transform hover:-translate-y-2.5 group"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1617900906639-cab7adceb499?auto=format&fit=crop&w=800&q=80')",
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,10,0.9)] to-transparent group-hover:from-accent-primary/20 transition-all duration-300"></div>
                        <div className="relative z-10 text-left">
                            <span className="font-heading font-semibold text-xl text-white">
                                Projets Web
                            </span>
                        </div>
                    </a>
                    <a
                        href="https://unsplash.com/fr/@jealife_pictures"
                        target="_blank"
                        className="relative h-[300px] rounded-lg overflow-hidden flex items-end p-8 bg-cover bg-center transition-transform hover:-translate-y-2.5 group"
                        style={{
                            backgroundImage: "url('/JEALIFE_Pictures.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,10,0.9)] to-transparent group-hover:from-accent-secondary/20 transition-all duration-300"></div>
                        <div className="relative z-10 text-left">
                            <span className="font-heading font-semibold text-xl text-white">
                                Photographies
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
