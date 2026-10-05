"use client";

import { useEffect, useRef } from "react";

const LINES = ["Jean Guylane", "Memiaghe Biteghe"];
const MIN_WEIGHT = 200;
const MAX_WEIGHT = 900;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/*
 * Chaque lettre prend de la graisse (Geist est une police variable) et vire à
 * l'orange selon sa distance au curseur, ou à l'inclinaison du téléphone.
 */
export default function NameWave({ isTouch }) {
    const stageRef = useRef(null);
    const lettersRef = useRef([]);

    useEffect(() => {
        const stage = stageRef.current;
        const letters = lettersRef.current.filter(Boolean);
        if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const pointer = { x: 0, y: 0, active: false };
        const values = letters.map(() => 0);
        let centers = [];
        let raf = null;
        let lastMotion = 0;
        const start = performance.now();

        // Positions mesurées au repos pour garder un champ stable
        const measure = () => {
            letters.forEach((el) => {
                el.style.fontWeight = MIN_WEIGHT;
            });
            const s = stage.getBoundingClientRect();
            centers = letters.map((el) => {
                const r = el.getBoundingClientRect();
                return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
            });
        };

        const frame = (now) => {
            const w = stage.offsetWidth;
            const h = stage.offsetHeight;
            let { x, y, active } = pointer;

            // Sans souris ni capteur, une vague lente balaie le nom
            if (isTouch && now - lastMotion > 1500) {
                x = (0.5 + 0.48 * Math.sin((now - start) / 1600)) * w;
                y = (0.5 + 0.3 * Math.sin((now - start) / 2300)) * h;
                active = true;
            }

            const radius = Math.max(120, w * 0.2);
            letters.forEach((el, i) => {
                const c = centers[i];
                const d = active && c ? Math.hypot(c.x - x, (c.y - y) * 1.4) : Infinity;
                const target = clamp(1 - d / radius, 0, 1);
                values[i] += (target - values[i]) * 0.14;
                const v = values[i];
                el.style.fontWeight = Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * v);
                el.style.color = `color-mix(in oklab, var(--accent) ${Math.round(Math.min(1, v * 1.5) * 100)}%, var(--ink))`;
                el.style.transform = `translateY(${(-v * 0.05).toFixed(3)}em)`;
            });
            raf = requestAnimationFrame(frame);
        };

        const startLoop = () => {
            if (!raf) raf = requestAnimationFrame(frame);
        };
        const stopLoop = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = null;
        };

        const onPointerMove = (e) => {
            if (e.pointerType !== "mouse") return;
            const s = stage.getBoundingClientRect();
            pointer.x = e.clientX - s.left;
            pointer.y = e.clientY - s.top;
            pointer.active = true;
        };
        const onPointerLeave = () => {
            pointer.active = false;
        };

        const onOrientation = (e) => {
            if (e.gamma == null || e.beta == null) return;
            lastMotion = performance.now();
            pointer.x = ((clamp(e.gamma, -30, 30) + 30) / 60) * stage.offsetWidth;
            pointer.y = ((clamp(e.beta - 45, -25, 25) + 25) / 50) * stage.offsetHeight;
            pointer.active = true;
        };

        measure();
        document.fonts?.ready.then(measure);
        const ro = new ResizeObserver(measure);
        ro.observe(stage);

        // L'animation ne tourne que quand le footer est visible
        const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()));
        io.observe(stage);

        stage.addEventListener("pointermove", onPointerMove);
        stage.addEventListener("pointerleave", onPointerLeave);
        if (isTouch) window.addEventListener("deviceorientation", onOrientation);

        return () => {
            stopLoop();
            ro.disconnect();
            io.disconnect();
            stage.removeEventListener("pointermove", onPointerMove);
            stage.removeEventListener("pointerleave", onPointerLeave);
            window.removeEventListener("deviceorientation", onOrientation);
        };
    }, [isTouch]);

    let n = 0;
    return (
        <div
            ref={stageRef}
            className="select-none py-6 text-center uppercase leading-[0.92] tracking-[-0.03em]"
            role="img"
            aria-label="Jean Guylane Memiaghe Biteghe"
        >
            {LINES.map((line) => (
                <div key={line} className="whitespace-nowrap text-[clamp(1.9rem,8.4vw,8.6rem)]" aria-hidden="true">
                    {line.split("").map((ch) => {
                        const i = n++;
                        return (
                            <span
                                key={i}
                                ref={(el) => {
                                    lettersRef.current[i] = el;
                                }}
                                className="inline-block text-ink will-change-transform"
                                style={{ fontWeight: MIN_WEIGHT }}
                            >
                                {ch === " " ? " " : ch}
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
