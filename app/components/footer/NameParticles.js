"use client";

import { useEffect, useRef } from "react";

/*
 * V2 : le nom est composé de milliers de grains, comme une émulsion photo.
 * Ils se « révèlent » à l'arrivée sur le footer, fuient la souris en
 * tourbillon, éclatent au clic et basculent en relief avec l'inclinaison
 * du téléphone (secouer disperse les grains).
 *
 * Le canvas déborde du bloc du nom (toute la largeur de l'écran, et loin
 * au-dessus du footer) pour que les grains et les ondes ne soient pas coupés.
 * Il laisse passer les clics : les événements sont écoutés sur le footer.
 */

const LEVELS = 6;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const makePalette = (from, to) => {
    const a = hexToRgb(from);
    const b = hexToRgb(to);
    return Array.from({ length: LEVELS }, (_, l) => {
        const t = l / (LEVELS - 1);
        return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
    });
};

export default function NameParticles({ isTouch }) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let W = 0; // largeur du bloc du nom
        let H = 0; // hauteur du bloc du nom
        let CW = 0; // dimensions du canvas qui déborde
        let CH = 0;
        let offX = 0; // position du bloc du nom dans le canvas
        let offY = 0;
        let n = 0;
        let size = 3;
        let radius = 100;
        let fsNow = 100;
        // Sur mobile : relief plus profond, grains plus souples (ils traînent
        // et rebondissent), capteur plus sensible, secousse plus facile
        const M = isTouch
            ? { fit: 0.82, slide: 0.2, depth: 0.12, spring: 0.032, damping: 0.9, tiltFollow: 0.12, sensitivity: 18, idle: 1, radius: 0.24, shake: 9, speedGlow: 1.6 }
            : { fit: 0.94, slide: 0, depth: 0.11, spring: 0.05, damping: 0.86, tiltFollow: 0.08, sensitivity: 30, idle: 0.7, radius: 0.085, shake: 14, speedGlow: 0 };
        let hx, hy, x, y, vx, vy, depth, level;
        let palette = [];
        let accent = "#e3622f";
        let raf = null;
        let revealedAt = 0;
        let lastMotion = 0;
        let lastShake = 0;
        const start = performance.now();
        const pointer = { x: 0, y: 0, active: false };
        const tilt = { x: 0, y: 0 };
        const tiltNow = { x: 0, y: 0 };
        const rings = [];

        const build = () => {
            const styles = getComputedStyle(wrap);
            const ink = styles.getPropertyValue("--ink").trim() || "#efe9e1";
            accent = styles.getPropertyValue("--accent").trim() || accent;
            palette = makePalette(ink, accent);

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = wrap.clientWidth;
            const lines = W < 640 ? ["JEAN", "GUYLANE", "MEMIAGHE", "BITEGHE"] : ["JEAN GUYLANE", "MEMIAGHE BITEGHE"];

            // Rendu du texte hors écran puis échantillonnage des pixels pleins
            const off = document.createElement("canvas");
            const o = off.getContext("2d", { willReadFrequently: true });
            o.font = `800 100px ${styles.fontFamily}`;
            const widest = Math.max(...lines.map((l) => o.measureText(l).width));
            const fs = Math.min((W * M.fit * 100) / widest, 170);
            const lh = fs * 0.96;
            const padY = fs * 0.4;
            H = Math.ceil(lines.length * lh + padY * 2);
            wrap.style.height = `${H}px`;

            // Débordement : toute la largeur de l'écran, et vers le haut sur
            // une bonne partie de la page (par-dessus la section Contact)
            const wr = wrap.getBoundingClientRect();
            const footer = wrap.closest("footer");
            const bleedTop = Math.round(Math.min(window.innerHeight * 0.8, 760));
            const bleedBottom = footer ? Math.max(0, Math.round(footer.getBoundingClientRect().bottom - wr.bottom)) : 0;
            offX = Math.round(wr.left);
            offY = bleedTop;
            CW = document.documentElement.clientWidth;
            CH = H + bleedTop + bleedBottom;

            off.width = Math.ceil(W);
            off.height = H;
            o.font = `800 ${fs}px ${styles.fontFamily}`;
            o.textAlign = "center";
            o.textBaseline = "middle";
            o.fillStyle = "#fff";
            lines.forEach((l, i) => o.fillText(l, W / 2, padY + lh * (i + 0.5)));

            const data = o.getImageData(0, 0, off.width, H).data;
            const step = Math.max(2, Math.round(fs / 26));
            const pts = [];
            for (let py = 0; py < H; py += step) {
                for (let px = 0; px < off.width; px += step) {
                    if (data[(py * off.width + px) * 4 + 3] > 140) pts.push(px, py);
                }
            }

            n = pts.length / 2;
            hx = new Float32Array(n);
            hy = new Float32Array(n);
            x = new Float32Array(n);
            y = new Float32Array(n);
            vx = new Float32Array(n);
            vy = new Float32Array(n);
            depth = new Float32Array(n);
            level = new Uint8Array(n);
            for (let i = 0; i < n; i++) {
                hx[i] = pts[i * 2] + offX;
                hy[i] = pts[i * 2 + 1] + offY;
                x[i] = reduce ? hx[i] : Math.random() * CW;
                y[i] = reduce ? hy[i] : offY + (Math.random() * 2 - 0.5) * H;
                depth[i] = 0.3 + Math.random() * 0.7;
            }
            size = step * 0.72;
            radius = Math.max(70, W * M.radius);
            fsNow = fs;

            canvas.width = Math.round(CW * dpr);
            canvas.height = Math.round(CH * dpr);
            canvas.style.width = `${CW}px`;
            canvas.style.height = `${CH}px`;
            canvas.style.left = `${-offX}px`;
            canvas.style.top = `${-offY}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            revealedAt = 0;
            draw(performance.now());
        };

        const shockwave = (cx, cy, strength = 22) => {
            const R = Math.max(radius * 3, W * 0.3);
            for (let i = 0; i < n; i++) {
                const dx = x[i] - cx;
                const dy = y[i] - cy;
                const d = Math.hypot(dx, dy) || 1;
                if (d < R) {
                    const f = (1 - d / R) * strength * (0.6 + depth[i] * 0.6);
                    vx[i] += (dx / d) * f;
                    vy[i] += (dy / d) * f;
                }
            }
            // Deux cercles décalés pour un effet d'ondulation
            const t = performance.now();
            rings.push({ x: cx, y: cy, t }, { x: cx, y: cy, t: t + 140 });
        };

        const step = (now) => {
            // Les grains s'assemblent progressivement à la première apparition
            if (!revealedAt) revealedAt = now;
            const reveal = clamp((now - revealedAt) / 1600, 0, 1);
            const k = 0.006 + M.spring * reveal * reveal;

            if (isTouch && now - lastMotion > 1500) {
                // Pas de capteur : le relief respire doucement
                tilt.x = Math.sin((now - start) / 1700) * M.idle;
                tilt.y = Math.cos((now - start) / 2300) * M.idle * 0.7;
            }
            tiltNow.x += (tilt.x - tiltNow.x) * M.tiltFollow;
            tiltNow.y += (tilt.y - tiltNow.y) * M.tiltFollow;

            const R = radius;
            const R2 = R * R;
            // Glissement d'ensemble + léger décalage selon la profondeur du grain
            const ox = tiltNow.x * fsNow;
            const oy = tiltNow.y * fsNow * 0.6;

            for (let i = 0; i < n; i++) {
                const shift = M.slide + M.depth * depth[i];
                const tx = hx[i] + ox * shift;
                const ty = hy[i] + oy * shift;
                let ax = (tx - x[i]) * k;
                let ay = (ty - y[i]) * k;

                if (pointer.active) {
                    const dx = x[i] - pointer.x;
                    const dy = y[i] - pointer.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < R2) {
                        const d = Math.sqrt(d2) || 1;
                        let f = 1 - d / R;
                        f = f * f * 6;
                        // Répulsion + composante tangentielle = tourbillon
                        ax += (dx / d) * f - (dy / d) * f * 0.45;
                        ay += (dy / d) * f + (dx / d) * f * 0.45;
                    }
                }

                vx[i] = (vx[i] + ax) * M.damping;
                vy[i] = (vy[i] + ay) * M.damping;
                x[i] += vx[i];
                y[i] += vy[i];

                const disp = Math.abs(x[i] - tx) + Math.abs(y[i] - ty);
                // Les grains rapides s'allument aussi en orange (mobile)
                const speed = Math.abs(vx[i]) + Math.abs(vy[i]);
                level[i] = Math.min(LEVELS - 1, (disp / 7 + speed * M.speedGlow) | 0);
            }
        };

        const draw = (now) => {
            ctx.clearRect(0, 0, CW, CH);
            for (let l = 0; l < LEVELS; l++) {
                ctx.fillStyle = palette[l];
                ctx.beginPath();
                for (let i = 0; i < n; i++) {
                    if (level[i] !== l) continue;
                    const s = size * (0.7 + depth[i] * 0.45);
                    ctx.rect(x[i], y[i], s, s);
                }
                ctx.fill();
            }

            // Ondes de choc
            for (let r = rings.length - 1; r >= 0; r--) {
                // L'horodatage rAF peut précéder celui du clic : on borne à 0
                const p = Math.max(0, (now - rings[r].t) / 1300);
                if (p >= 1) {
                    rings.splice(r, 1);
                    continue;
                }
                if (p === 0) continue;
                const eased = 1 - (1 - p) ** 3;
                ctx.globalAlpha = (1 - p) * 0.85;
                ctx.strokeStyle = accent;
                ctx.lineWidth = 2.5 * (1 - p) + 0.5;
                ctx.beginPath();
                ctx.arc(rings[r].x, rings[r].y, eased * Math.max(CW, CH) * 0.6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        };

        const frame = (now) => {
            step(now);
            draw(now);
            raf = requestAnimationFrame(frame);
        };

        const startLoop = () => {
            if (!raf && !reduce) raf = requestAnimationFrame(frame);
        };
        const stopLoop = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = null;
        };

        const local = (e) => {
            const r = canvas.getBoundingClientRect();
            return [e.clientX - r.left, e.clientY - r.top];
        };
        const onPointerMove = (e) => {
            [pointer.x, pointer.y] = local(e);
            pointer.active = true;
            if (e.pointerType === "mouse") {
                // Léger relief qui suit la souris sur desktop
                tilt.x = clamp(((pointer.x - offX) / W - 0.5) * 1.2, -1, 1);
                tilt.y = clamp(((pointer.y - offY) / H - 0.5) * 1.2, -1, 1);
            }
        };
        const onPointerLeave = () => {
            pointer.active = false;
            if (!isTouch) {
                tilt.x = 0;
                tilt.y = 0;
            }
        };
        const onPointerDown = (e) => {
            if (e.target.closest("a, button")) return;
            const [px, py] = local(e);
            shockwave(px, py);
        };
        const onOrientation = (e) => {
            if (e.gamma == null || e.beta == null) return;
            lastMotion = performance.now();
            tilt.x = clamp(e.gamma / M.sensitivity, -1.3, 1.3);
            tilt.y = clamp((e.beta - 45) / M.sensitivity, -1.3, 1.3);
        };
        const onMotion = (e) => {
            const a = e.acceleration;
            if (!a || a.x == null) return;
            const now = performance.now();
            if (Math.hypot(a.x, a.y, a.z) > M.shake && now - lastShake > 600) {
                lastShake = now;
                shockwave(offX + W / 2, offY + H / 2, isTouch ? 38 : 30);
            }
        };

        let lastWidth = 0;
        const ro = new ResizeObserver(() => {
            if (wrap.clientWidth === lastWidth) return;
            lastWidth = wrap.clientWidth;
            build();
        });
        // Le canvas (et non le bloc du nom) : l'animation tourne tant que des
        // grains peuvent être visibles au-dessus du footer
        const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()));

        let cancelled = false;
        (document.fonts?.ready ?? Promise.resolve()).then(() => {
            if (cancelled) return;
            ro.observe(wrap);
            io.observe(canvas);
        });

        // Le canvas laisse passer les clics : on écoute le footer
        const target = wrap.closest("footer") ?? wrap;
        target.addEventListener("pointermove", onPointerMove);
        target.addEventListener("pointerleave", onPointerLeave);
        target.addEventListener("pointercancel", onPointerLeave);
        target.addEventListener("pointerdown", onPointerDown);
        if (isTouch) {
            window.addEventListener("deviceorientation", onOrientation);
            window.addEventListener("devicemotion", onMotion);
        }

        return () => {
            cancelled = true;
            stopLoop();
            ro.disconnect();
            io.disconnect();
            target.removeEventListener("pointermove", onPointerMove);
            target.removeEventListener("pointerleave", onPointerLeave);
            target.removeEventListener("pointercancel", onPointerLeave);
            target.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("deviceorientation", onOrientation);
            window.removeEventListener("devicemotion", onMotion);
        };
    }, [isTouch]);

    return (
        <div ref={wrapRef} role="img" aria-label="Jean Guylane Memiaghe Biteghe" className="relative w-full cursor-crosshair touch-pan-y">
            <canvas ref={canvasRef} className="pointer-events-none absolute z-10 block max-w-none" aria-hidden="true" />
        </div>
    );
}
