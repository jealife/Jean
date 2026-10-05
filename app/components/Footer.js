"use client";

import { useState, useSyncExternalStore } from "react";
import NameWave from "./footer/NameWave";
import NameParticles from "./footer/NameParticles";

const subscribeNoop = () => () => {};
const isTouchDevice = () => window.matchMedia("(hover: none)").matches;
// iOS exige une autorisation explicite (sur un geste) pour lire les capteurs
const needsMotionPermission = () =>
    isTouchDevice() &&
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function";
// V2 par défaut, la V1 reste accessible avec ?nom=v1
const getVariant = () => (new URLSearchParams(window.location.search).get("nom") === "v1" ? "v1" : "v2");

const HINTS = {
    v1: { mouse: "Passez la souris sur mon nom", touch: "Inclinez votre téléphone" },
    v2: { mouse: "Passez la souris sur mon nom, cliquez pour le disperser", touch: "Inclinez, touchez ou secouez votre téléphone" },
};

export default function Footer() {
    const isTouch = useSyncExternalStore(subscribeNoop, isTouchDevice, () => false);
    const askPermission = useSyncExternalStore(subscribeNoop, needsMotionPermission, () => false);
    const variant = useSyncExternalStore(subscribeNoop, getVariant, () => "v2");
    const [granted, setGranted] = useState(false);

    const requestMotion = async () => {
        try {
            const res = await DeviceOrientationEvent.requestPermission();
            if (typeof DeviceMotionEvent?.requestPermission === "function") {
                await DeviceMotionEvent.requestPermission();
            }
            if (res === "granted") setGranted(true);
        } catch {
            // Refus ou indisponible : l'animation automatique continue
        }
    };

    return (
        <footer className="force-dark relative bg-bg text-ink">
            <div className="container-x pt-24 sm:pt-32">
                {variant === "v1" ? <NameWave isTouch={isTouch} /> : <NameParticles isTouch={isTouch} />}

                <div className="mt-6 flex h-10 items-center justify-center">
                    {askPermission && !granted ? (
                        <button
                            type="button"
                            onClick={requestMotion}
                            className="rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent hover:text-accent"
                        >
                            Activer le mouvement
                        </button>
                    ) : (
                        <p className="text-center text-sm text-ink-3">{HINTS[variant][isTouch ? "touch" : "mouse"]}</p>
                    )}
                </div>

                <div className="mt-20 flex flex-col gap-3 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} Jean Guylane Memiaghe Biteghe</p>
                    <a href="#home" className="flex items-center gap-1.5 text-ink-2 transition-colors hover:text-accent">
                        Retour en haut <i className="bx bx-up-arrow-alt text-base" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
