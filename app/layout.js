import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const FULL_NAME = "Jean Guylane MEMIAGHE BITEGHE";
const SITE_URL = "https://jea-life.vercel.app";
const DESCRIPTION =
  "Jean Guylane MEMIAGHE BITEGHE, développeur web & mobile, designer graphique et photographe à Libreville, Gabon. Sites web, identités visuelles et photographie.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${FULL_NAME} · Développeur web & photographe`,
  description: DESCRIPTION,
  applicationName: FULL_NAME,
  keywords: [
    "Jean Guylane Memiaghe Biteghe",
    "Jean Guylane Memiaghe",
    "Memiaghe Biteghe",
    "JEaLiFe",
    "JEaLiFe Agency",
    "développeur web Gabon",
    "développeur web Libreville",
    "création site web Libreville",
    "photographe Libreville",
    "graphiste Gabon",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "/",
    siteName: FULL_NAME,
    title: `${FULL_NAME} · Portfolio`,
    description: DESCRIPTION,
    firstName: "Jean Guylane",
    lastName: "Memiaghe Biteghe",
  },
  twitter: {
    card: "summary_large_image",
    title: `${FULL_NAME} · Portfolio`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "yCwgh2yrykVaS-qZ8sNMUygk6amYyuseXmMcep0Qvsc",
  },
};

export const viewport = {
  themeColor: "#0b0a09",
};

// Données structurées : page de profil + personne + site
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: FULL_NAME,
      inLanguage: "fr-FR",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: `${FULL_NAME} · Portfolio`,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: FULL_NAME,
      givenName: "Jean Guylane",
      familyName: "Memiaghe Biteghe",
      alternateName: ["Jean Guylane Memiaghe Biteghe", "Jean Guylane Memiaghe", "JEaLiFe"],
      url: SITE_URL,
      image: `${SITE_URL}/jean_guylane_memiaghe.webp`,
      email: "mailto:jealife.pictures@gmail.com",
      jobTitle: ["Développeur web & mobile", "Designer graphique", "Photographe"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Libreville",
        addressCountry: "GA",
      },
      worksFor: {
        "@type": "Organization",
        name: "JEaLiFe Agency",
        url: "https://www.jealife.com",
      },
      knowsAbout: ["Développement web", "Next.js", "React", "Tailwind CSS", "WordPress", "Figma", "Design graphique", "Photographie"],
      sameAs: [
        "https://github.com/jealife",
        "https://linkedin.com/in/jealife",
        "https://instagram.com/jealife_pictures",
        "https://unsplash.com/fr/@jealife_pictures",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://unpkg.com" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrument.variable} grain antialiased bg-bg text-ink overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
