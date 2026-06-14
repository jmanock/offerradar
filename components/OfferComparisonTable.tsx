import Link from "next/link";
import { formatDate } from "@/lib/offers";
import type { Offer } from "@/types/offer";

export function OfferComparisonTable({
  offers,
  title,
  variant = "brokerage",
}: {
  offers: Offer[];
  title: string;
  variant?: "bank" | "brokerage" | "provider";
}) {
  const headings =
    variant === "bank"
      ? ["Provider", "Offer type", "Value", "Direct deposit", "Deposit requirement", "Monthly fee", "Verification"]
      : variant === "provider"
        ? ["Tracked record", "Category", "Value", "Offer type", "Key requirement", "Verification"]
        : ["Provider", "Offer type", "Value", "Transfer requirement", "Funding requirement", "Verification"];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">{title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          This comparison uses available tracked fields. Blank or broad
          requirements should be verified directly with the provider.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[900px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                {headings.map((heading) => (
                  <th key={heading} className="px-4 py-3 font-extrabold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.slug} className="border-t border-slate-200 bg-white align-top">
                  {variant === "bank" ? (
                    <>
                      <ProviderCell offer={offer} />
                      <td className="px-4 py-4 text-slate-700">{offer.offerType}</td>
                      <td className="px-4 py-4 font-bold text-slate-950">{offer.offerAmount}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.requiresDirectDeposit ? "May be required; verify definition" : "Not listed"}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.minimumDeposit ?? "Verify with provider"}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.monthlyFee ?? "Verify with provider"}</td>
                      <VerificationCell offer={offer} />
                    </>
                  ) : variant === "provider" ? (
                    <>
                      <td className="px-4 py-4 font-extrabold text-blue-700"><Link href={`/offer/${offer.slug}`}>{offer.title}</Link></td>
                      <td className="px-4 py-4 text-slate-700">{offer.category.replaceAll("-", " ")}</td>
                      <td className="px-4 py-4 font-bold text-slate-950">{offer.offerAmount}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.offerType}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.requirements[0] ?? "Verify with provider"}</td>
                      <VerificationCell offer={offer} />
                    </>
                  ) : (
                    <>
                      <ProviderCell offer={offer} />
                      <td className="px-4 py-4 text-slate-700">{offer.offerType}</td>
                      <td className="px-4 py-4 font-bold text-slate-950">{offer.offerAmount}</td>
                      <td className="px-4 py-4 text-slate-700">{textMatch(offer, "transfer")}</td>
                      <td className="px-4 py-4 text-slate-700">{offer.minimumDeposit ?? "Verify with provider"}</td>
                      <VerificationCell offer={offer} />
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProviderCell({ offer }: { offer: Offer }) {
  return <td className="px-4 py-4 font-extrabold text-blue-700"><Link href={`/offer/${offer.slug}`}>{offer.provider}</Link></td>;
}

function VerificationCell({ offer }: { offer: Offer }) {
  return <td className="px-4 py-4 text-slate-700">{offer.verificationStatus.replaceAll("_", " ")} · {formatDate(offer.lastVerified)}</td>;
}

function textMatch(offer: Offer, term: string) {
  const requirement = offer.requirements.find((item) =>
    item.toLowerCase().includes(term),
  );
  return requirement ?? "Not listed";
}
