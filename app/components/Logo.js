// Logo « viseur » : un J dessiné dans les coins d'un viseur, boule orange en bout de crochet
export default function Logo({ className = "" }) {
    return (
        <svg viewBox="20 20 80 80" className={className} aria-hidden="true" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                <path d="M26 42V26h16" />
                <path d="M78 26h16v16" />
                <path d="M26 78v16h16" />
                <path d="M94 78v16H78" />
            </g>
            <g transform="translate(5 1)">
                <path d="M68 34V67a13 13 0 0 1-26 0" fill="none" stroke="currentColor" strokeWidth="10" />
                <circle cx="42" cy="65" r="7" fill="var(--accent)" />
            </g>
        </svg>
    );
}
