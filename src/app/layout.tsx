import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/navigation/Header";
import { LanguageProvider } from "@/lib/LanguageContext";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "THE PAINKILLER MD — Evidence-Based Pain Medicine",
    template: "%s | THE PAINKILLER MD",
  },
  description:
    "Evidence-based pain medicine by Dr. Shahnawaz F Shah. Advanced diagnostics, interventional procedures, and compassionate care for chronic pain conditions.",
  keywords: [
    "pain management",
    "interventional pain",
    "sciatica treatment",
    "spinal stenosis",
    "chronic pain",
    "pain specialist",
    "Dr Shahnawaz Shah",
  ],
  authors: [{ name: "Dr. Shahnawaz F Shah" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "THE PAINKILLER MD",
    title: "THE PAINKILLER MD — Evidence-Based Pain Medicine",
    description:
      "Advanced pain diagnostics and treatment. Understanding pain from mechanism to management.",
    images: [
      {
        url: "/logo.jpeg",
        width: 512,
        height: 512,
        alt: "THE PAINKILLER MD Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "THE PAINKILLER MD — Evidence-Based Pain Medicine",
    description:
      "Evidence-based pain medicine by Dr. Shahnawaz F Shah.",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr. Shahnawaz F Shah",
              jobTitle: "Pain Medicine Specialist",
              medicalSpecialty: "Pain Medicine",
              description:
                "Evidence-based pain medicine combining advanced diagnostics with compassionate care.",
              url: "https://thepainkillermd.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "THE PAINKILLER MD",
              medicalSpecialty: "Pain Medicine",
              description:
                "Advanced interventional pain management and diagnostic services.",
              url: "https://thepainkillermd.com",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip Navigation — WCAG 2.2 AA */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <LanguageProvider>
          <Header />

          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>

          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
