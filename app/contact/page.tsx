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
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Contact OfferRadar
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Send offer feedback, comparison questions, or a request for banking
            deal alerts.
          </p>
        </div>
      </section>
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Before you send a message
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Use this form for local banking comparison requests, offer listing
            feedback, or banking deal alerts. Do not submit sensitive account or
            identity information.
          </p>
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            OfferRadar is not a bank and cannot access accounts, approve
            applications, or resolve provider account issues.
          </p>
        </div>
        <section className="premium-card rounded-3xl p-6">
          <LeadCaptureForm source="contact" />
        </section>
      </main>
    </div>
  );
}
