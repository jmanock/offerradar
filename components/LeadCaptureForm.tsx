"use client";

import { useState } from "react";
import { leadSubmit, newsletterSignup } from "@/lib/analytics";
import { bankingCategories } from "@/data/localSeo";

const productOptions = bankingCategories.map((category) => category.label);

export function LeadCaptureForm({ source }: { source: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage("");

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      productInterest: String(formData.get("productInterest") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      source,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setStatus("error");
      setMessage(result?.error ?? "Please check the form and try again.");
      return;
    }

    leadSubmit({
      source,
      city: payload.city,
      product_interest: payload.productInterest,
    });

    if (payload.productInterest.toLowerCase().includes("alerts")) {
      newsletterSignup({ source });
    }

    setStatus("success");
    setMessage("Thanks. Your banking comparison request was received.");
  }

  return (
    <form action={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Name
          <input
            name="name"
            required
            minLength={2}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-500"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          City
          <input
            name="city"
            required
            minLength={2}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Product interest
          <select
            name="productInterest"
            required
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-500"
          >
            <option value="">Choose one</option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Banking deal alerts">Banking deal alerts</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Optional notes
        <textarea
          name="notes"
          rows={4}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-500"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-blue-700 px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {status === "submitting" ? "Submitting..." : "Get matched with a local bank"}
      </button>
      {message ? (
        <p
          className={
            status === "success"
              ? "rounded-2xl bg-teal-50 p-3 text-sm font-bold text-teal-800"
              : "rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
