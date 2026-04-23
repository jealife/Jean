import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jean Guylane Memiaghe | Développeur Web & Mobile | Photographe",
  description: "Jean Guylane Memiaghe - Développeur Web & Mobile passionné et Photographe professionnel. Création d'expériences numériques uniques et captures visuelles d'exception.",
  keywords: "Jean Guylane Memiaghe, jealife, développeur web gabon, photographe libreville, création site web, portfolio développeur, graphic designer gabon",
  authors: [{ name: "Jean Guylane Memiaghe" }],
  openGraph: {
    type: "website",
    url: "https://jea-life.vercel.app/",
    title: "Jean Guylane Memiaghe | Portfolio",
    description: "Découvrez l'univers de Jean Guylane Memiaghe, entre code et photographie.",
    siteName: "Jean Guylane Memiaghe",
    images: [{
      url: "https://jea-life.vercel.app/jean_guylane_memiaghe.webp",
      width: 1200,
      height: 630,
      alt: "Jean Guylane Memiaghe Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jean Guylane Memiaghe | Portfolio",
    description: "Découvrez l'univers de Jean Guylane Memiaghe, entre code et photographie.",
    images: ["https://jea-life.vercel.app/jean_guylane_memiaghe.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/jean_guylane_memiaghe.webp",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="yCwgh2yrykVaS-qZ8sNMUygk6amYyuseXmMcep0Qvsc" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jean Guylane Memiaghe",
              "url": "https://jea-life.vercel.app/",
              "image": "https://jea-life.vercel.app/jean_guylane_memiaghe.webp",
              "jobTitle": "Développeur Web | Photographe",
              "sameAs": [
                "https://github.com/jealife",
                "https://linkedin.com/in/jealife"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-primary text-text-primary overflow-x-hidden`}
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
// npm run capture-portfolio
