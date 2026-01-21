import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

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
    images: [{ url: "https://jea-life.vercel.app/jean_guylane_memiaghe.webp" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-primary text-text-primary overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
