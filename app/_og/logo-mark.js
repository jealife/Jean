// Version de l'icône pour ImageResponse (couleurs en dur, fond arrondi).
// Les coins du viseur s'épaississent en petite taille pour rester visibles.
export function LogoMark({ size }) {
    const frame = size <= 64 ? 6 : 3;
    return (
        <svg width={size} height={size} viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="#0b0a09" />
            <g fill="none" stroke="#efe9e1" strokeWidth={frame} strokeLinecap="square">
                <path d="M26 42V26h16" />
                <path d="M78 26h16v16" />
                <path d="M26 78v16h16" />
                <path d="M94 78v16H78" />
            </g>
            <path d="M73 35V68a13 13 0 0 1-26 0" fill="none" stroke="#efe9e1" strokeWidth="10" />
            <circle cx="47" cy="66" r="7" fill="#e3622f" />
        </svg>
    );
}
