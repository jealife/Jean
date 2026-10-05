import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Jean Guylane MEMIAGHE BITEGHE, développeur web & mobile, designer et photographe à Libreville";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
    const photo = await readFile(join(process.cwd(), "app/_og/photo.jpg"));
    const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

    return new ImageResponse(
        (
            <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#0b0a09" }}>
                <img
                    src={src}
                    alt=""
                    width={1200}
                    height={900}
                    style={{ position: "absolute", top: -150, left: 120, width: 1200, height: 900, objectFit: "cover" }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 1200,
                        height: 630,
                        display: "flex",
                        background: "linear-gradient(90deg, #0b0a09 0%, #0b0a09 22%, rgba(11,10,9,0.75) 50%, rgba(11,10,9,0.05) 80%)",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "64px 72px",
                        width: "100%",
                        height: "100%",
                        color: "#efe9e1",
                    }}
                >
                    <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#a8a097" }}>
                        Portfolio · Libreville, Gabon
                    </div>
                    <div style={{ display: "flex", marginTop: 20, fontSize: 92, fontWeight: 400, lineHeight: 1, letterSpacing: -2 }}>
                        Jean Guylane
                    </div>
                    <div style={{ display: "flex", marginTop: 6, fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -2, color: "#e3622f" }}>
                        MEMIAGHE BITEGHE
                    </div>
                    <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#efe9e1" }}>
                        Développeur web & mobile · Designer · Photographe
                    </div>
                </div>
            </div>
        ),
        size
    );
}
