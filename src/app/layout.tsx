import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/navigation/Header";
import { LanguageProvider } from "@/lib/LanguageContext";
import CookieConsent from "@/components/ui/CookieConsent";
import WhatsAppChatWidget from "@/components/ui/WhatsAppChatWidget";
import { sanitizeJsonLd } from "@/lib/security";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://thepainkillermd.in"),
  title: {
    default: "THE PAINKILLER MD — Evidence-Based Pain Medicine | Dr. Shahnawaz F Shah",
    template: "%s | THE PAINKILLER MD",
  },
  description:
    "Evidence-based pain medicine by Dr. Shahnawaz F Shah in Surat, Gujarat. Advanced non-surgical interventional treatments for sciatica, slip disc, trigeminal neuralgia, and chronic pain.",
  keywords: [
    "pain management surat",
    "pain specialist surat",
    "interventional pain medicine gujarat",
    "sciatica treatment without surgery",
    "slip disc specialist surat",
    "spinal stenosis treatment",
    "chronic back pain doctor",
    "trigeminal neuralgia relief",
    "Dr Shahnawaz Shah",
    "Dr Shahnawaz F Shah",
    "best pain clinic surat",
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
            __html: sanitizeJsonLd({
              "@context": "https://schema.org",
              "@type": "Physician",
              "@id": "https://thepainkillermd.in/#physician",
              name: "Dr. Shahnawaz F Shah",
              alternateName: "Dr. Shahnawaz Shah",
              jobTitle: "Interventional Spine & Chronic Pain Specialist",
              medicalSpecialty: [
                "PainMedicine",
                "InterventionalPainMedicine",
                "Anesthesiology"
              ],
              description:
                "Consultant Spine and Chronic Pain Specialist in Surat, Gujarat. Expert in evidence-based non-surgical interventional treatments for sciatica, slip disc, spinal stenosis, trigeminal neuralgia, and osteoarthritis.",
              url: "https://thepainkillermd.in",
              image: "https://thepainkillermd.in/doctor-photo.png",
              telephone: "+919769682366",
              knowsLanguage: ["English", "Hindi", "Gujarati", "Marathi"],
              alumniOf: [
                { "@type": "EducationalOrganization", name: "FIAPM (Fellow of Indian Academy of Pain Medicine)" },
                { "@type": "EducationalOrganization", name: "FCPM (Fellowship in Chronic Pain Medicine, MUHS)" },
                { "@type": "EducationalOrganization", name: "FPM (Fellowship in Pain Medicine)" },
                { "@type": "EducationalOrganization", name: "MBBS, M.D. (Anaesthesiology)" }
              ],
              worksFor: {
                "@id": "https://thepainkillermd.in/#clinic"
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                addressCountry: "IN"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "@id": "https://thepainkillermd.in/#clinic",
              name: "THE PAINKILLER MD — Interventional Spine & Pain Clinic",
              legalName: "The Painkiller MD",
              url: "https://thepainkillermd.in",
              logo: "https://thepainkillermd.in/logo.jpeg",
              image: "https://thepainkillermd.in/logo.jpeg",
              telephone: "+919769682366",
              priceRange: "₹₹",
              medicalSpecialty: "PainMedicine",
              description:
                "Premier center for evidence-based interventional pain management, non-surgical spine care, radiofrequency ablation, fluoroscopy/ultrasound-guided nerve blocks, and regenerative therapies.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ring Road / Majura Gate",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                postalCode: "395002",
                addressCountry: "IN"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "21.1702",
                longitude: "72.8311"
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Surat" },
                { "@type": "AdministrativeArea", name: "Gujarat" },
                { "@type": "AdministrativeArea", name: "Mumbai" },
                { "@type": "Country", name: "India" },
                { "@type": "AdministrativeArea", name: "International / NRI Patients" }
              ],
              availableService: [
                { "@type": "MedicalProcedure", name: "Non-Surgical Sciatica Treatment" },
                { "@type": "MedicalProcedure", name: "Radiofrequency Ablation for Spine Pain" },
                { "@type": "MedicalProcedure", name: "Lumbar Epidural Steroid Injections" },
                { "@type": "MedicalProcedure", name: "Sacroiliac Joint Injections" },
                { "@type": "MedicalProcedure", name: "Cervical & Lumbar Facet Nerve Blocks" },
                { "@type": "MedicalProcedure", name: "Knee Radiofrequency Neurotomy (Genicular Nerve Block)" },
                { "@type": "MedicalProcedure", name: "Trigeminal Neuralgia Precision Blocks" }
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "19:00"
                }
              ]
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
          <WhatsAppChatWidget />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
