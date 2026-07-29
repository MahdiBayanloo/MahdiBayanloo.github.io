import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { identity } from "@/content/resume";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const SITE_URL = "https://mahdibayanloo.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${identity.name} — ${identity.role}`,
  description: `${identity.name} (Mehdi Bayanloo) — ${identity.subline}`,
  keywords: [
    "Mahdi Bayanloo",
    "Mehdi Bayanloo",
    "Mahdi Bayanlou",
    "Mehdi Bayanlou",
    "Bayanloo",
    "مهدی بیانلو",
    "Software Integration Engineer Berlin",
    "OTA Systems Engineer",
    "Embedded Software Engineer Berlin",
    "Vehicle Software Engineer",
  ],
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description: identity.subline,
    url: SITE_URL,
    siteName: identity.name,
    type: "website",
    locale: "en_US",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description: identity.subline,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  verification: { google: "4L_yayoUG4Sqb9QLo-rdwuuW2dUcqzLtKMVBB-77r5w" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  alternateName: ["Mehdi Bayanloo", "Mahdi Bayanlou", "Mehdi Bayanlou", "مهدی بیانلو"],
  jobTitle: "Software Integration Engineer",
  worksFor: { "@type": "Organization", name: "Rivian and Volkswagen Group Technologies" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Freie Universität Berlin" },
    { "@type": "CollegeOrUniversity", name: "University of Zanjan" },
  ],
  knowsAbout: [
    "OTA Systems",
    "Embedded Software",
    "ECU Integration",
    "Hardware-in-the-Loop Testing",
    "Automotive Ethernet",
    "CAN Bus",
    "Python",
    "C++",
  ],
  email: `mailto:${identity.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
  sameAs: [identity.links.linkedin, identity.links.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-fg">
        <a
          href="#work"
          className="absolute left-4 top-4 z-[100] -translate-y-20 rounded-md bg-signal px-4 py-2 font-medium text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
