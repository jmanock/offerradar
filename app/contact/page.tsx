import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Contact OfferRadar",
  description:
    "Contact OfferRadar about banking comparisons, local bank matches, offer listings, and deal alerts.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
          Contact OfferRadar
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Use this form for local banking comparison requests, offer listing
          feedback, or banking deal alerts. Do not submit sensitive account or
          identity information.
        </p>
      </div>
      <section className="premium-card rounded-3xl p-6">
        <LeadCaptureForm source="contact" />
      </section>
    </main>
  );
}
