const SITE_URL = "https://jea-life.vercel.app";

export default function sitemap() {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            images: [
                `${SITE_URL}/jean_guylane_memiaghe.webp`,
                `${SITE_URL}/JEALIFE_Pictures.webp`,
                `${SITE_URL}/mosquee-hassan2.webp`,
                `${SITE_URL}/jealife_pictures-2.webp`,
            ],
        },
    ];
}
