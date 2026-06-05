import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://offerradar.io"),
  title: {
    default: "OfferRadar | Track bonuses, offers, referrals, and promotions",
    template: "%s | OfferRadar",
  },
  description:
    "OfferRadar tracks bonuses, offers, referrals, and promotions with clear requirements, verification dates, and disclosure-first comparison pages.",
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "msvalidate.01": "fbd66d1bed94486a87683b0b5f029153",
    },
  },
  openGraph: {
    type: "website",
    url: "https://offerradar.io",
    siteName: "OfferRadar",
    title: "OfferRadar | Banking Offers and Local Financial Comparisons",
    description:
      "Compare banking offers, bonuses, referrals, local account options, verification dates, and disclosure-first financial comparison pages.",
  },
  twitter: {
    card: "summary",
    title: "OfferRadar | Banking Offers and Local Financial Comparisons",
    description:
      "Compare banking offers, bonuses, referrals, local account options, verification dates, and disclosure-first financial comparison pages.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6f8fb] text-slate-950">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://offerradar.io/#organization",
            name: "OfferRadar",
            url: "https://offerradar.io",
            description:
              "OfferRadar helps users compare banking offers, bonuses, referrals, and local financial account options.",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Editorial and site inquiries",
              url: "https://offerradar.io/contact",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://offerradar.io/#website",
            name: "OfferRadar",
            url: "https://offerradar.io",
            publisher: {
              "@id": "https://offerradar.io/#organization",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://offerradar.io/offers",
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
