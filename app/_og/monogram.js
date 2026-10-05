// Monogramme partagé par le favicon et l'icône Apple
export function Monogram({ size }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                background: "#0b0a09",
                borderRadius: size * 0.22,
                color: "#efe9e1",
                fontSize: size * 0.46,
                fontWeight: 700,
                letterSpacing: -size * 0.02,
            }}
        >
            JG
            <div style={{ display: "flex", width: size * 0.1, height: size * 0.1, marginLeft: size * 0.03, marginTop: size * 0.2, borderRadius: size, background: "#e3622f" }} />
        </div>
    );
}
