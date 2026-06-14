"use client";

import { useMemo, useState } from "react";

type CalculatorMode = "bank" | "brokerage" | "travel";

const fieldStyles =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function FinancialCalculator({ mode }: { mode: CalculatorMode }) {
  const [bonus, setBonus] = useState(300);
  const [deposit, setDeposit] = useState(mode === "brokerage" ? 10000 : 5000);
  const [holdingMonths, setHoldingMonths] = useState(3);
  const [monthlyFee, setMonthlyFee] = useState(12);
  const [monthsHeld, setMonthsHeld] = useState(3);
  const [transferFees, setTransferFees] = useState(75);
  const [accountFees, setAccountFees] = useState(0);
  const [travelSpend, setTravelSpend] = useState(3000);
  const [foreignFee, setForeignFee] = useState(3);
  const [atmFee, setAtmFee] = useState(5);
  const [withdrawals, setWithdrawals] = useState(4);

  const result = useMemo(() => {
    if (mode === "travel") {
      const transactionFees = travelSpend * (foreignFee / 100);
      const withdrawalFees = atmFee * withdrawals;
      return {
        primary: transactionFees + withdrawalFees,
        label: "Estimated travel banking fees",
        detail: `${formatMoney(transactionFees)} estimated foreign transaction fees + ${formatMoney(withdrawalFees)} ATM fees`,
      };
    }

    if (mode === "brokerage") {
      return {
        primary: bonus - transferFees - accountFees,
        label: "Estimated net bonus",
        detail: `${formatMoney(bonus)} bonus less listed transfer and account fees`,
      };
    }

    const totalMonthlyFees = monthlyFee * monthsHeld;
    const netBonus = bonus - totalMonthlyFees;
    const simpleReturn = deposit > 0 ? (netBonus / deposit) * (12 / Math.max(holdingMonths, 1)) * 100 : 0;
    return {
      primary: netBonus,
      label: "Estimated net bonus",
      detail: `${simpleReturn.toFixed(2)}% simple annualized estimate before taxes and other costs`,
    };
  }, [accountFees, atmFee, bonus, deposit, foreignFee, holdingMonths, mode, monthlyFee, monthsHeld, transferFees, travelSpend, withdrawals]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="premium-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">Enter comparison details</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {mode === "travel" ? (
            <>
              <NumberField label="Estimated travel spend" value={travelSpend} onChange={setTravelSpend} />
              <NumberField label="Foreign transaction fee (%)" value={foreignFee} onChange={setForeignFee} step="0.1" />
              <NumberField label="ATM fee per withdrawal" value={atmFee} onChange={setAtmFee} />
              <NumberField label="Number of withdrawals" value={withdrawals} onChange={setWithdrawals} />
            </>
          ) : (
            <>
              <NumberField label="Bonus amount" value={bonus} onChange={setBonus} />
              <NumberField label={mode === "bank" ? "Required deposit" : "Transfer amount"} value={deposit} onChange={setDeposit} />
              <NumberField label="Required holding period (months)" value={holdingMonths} onChange={setHoldingMonths} />
              {mode === "bank" ? (
                <>
                  <NumberField label="Monthly fee" value={monthlyFee} onChange={setMonthlyFee} />
                  <NumberField label="Months held" value={monthsHeld} onChange={setMonthsHeld} />
                </>
              ) : (
                <>
                  <NumberField label="Transfer fees" value={transferFees} onChange={setTransferFees} />
                  <NumberField label="Account fees during holding period" value={accountFees} onChange={setAccountFees} />
                </>
              )}
            </>
          )}
        </div>
      </section>
      <aside className="space-y-5">
        <section className="rounded-3xl bg-slate-950 p-7 text-white">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-300">{result.label}</p>
          <p className="mt-4 text-4xl font-black">{formatMoney(result.primary)}</p>
          <p className="mt-4 text-sm leading-6 text-slate-300">{result.detail}</p>
        </section>
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-black text-slate-950">Comparison reminder</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            This estimate is educational, not financial advice. It does not include taxes, lost interest, market changes, every fee, or eligibility rules. Verify current terms directly with the provider.
          </p>
        </section>
      </aside>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = "1",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
}) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input
        className={fieldStyles}
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
      />
    </label>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
