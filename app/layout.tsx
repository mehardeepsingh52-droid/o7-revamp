import type { Metadata } from "next";
import { company, services } from "@/lib/site";
import "./globals.css";

const title = "O7 Solutions | Web, App & Software Development Company in Jalandhar";
const description =
  "O7 Solutions is an ISO 9001:2015 certified company in Jalandhar, Punjab building websites, mobile apps and business software (GST billing, CRM, ERP), with SEO, Google Ads and IT networking services.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: company.name, title, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", site: "@o7_solutions", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  url: company.url,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressRegion: company.region,
    addressCountry: company.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
  areaServed: ["Jalandhar", "Punjab", "India"],
  sameAs: Object.values(company.social),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
