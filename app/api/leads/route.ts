import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  city?: unknown;
  productInterest?: unknown;
  notes?: unknown;
  source?: unknown;
};

type StoredLead = {
  id: string;
  name: string;
  email: string;
  city: string;
  productInterest: string;
  notes: string;
  source: string;
  createdAt: string;
};

const leadsPath = join(process.cwd(), "data", "leads.json");

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as LeadPayload | null;

  if (!payload) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    city: clean(payload.city),
    productInterest: clean(payload.productInterest),
    notes: clean(payload.notes).slice(0, 1000),
    source: clean(payload.source),
    createdAt: new Date().toISOString(),
  };

  if (lead.name.length < 2) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }

  if (!isEmail(lead.email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (lead.city.length < 2) {
    return Response.json({ error: "City is required." }, { status: 400 });
  }

  if (!lead.productInterest) {
    return Response.json({ error: "Product interest is required." }, { status: 400 });
  }

  await mkdir(dirname(leadsPath), { recursive: true });
  const existing = await readFile(leadsPath, "utf8")
    .then((text) => JSON.parse(text) as StoredLead[])
    .catch((): StoredLead[] => []);
  existing.push(lead);
  await writeFile(leadsPath, `${JSON.stringify(existing, null, 2)}\n`);

  return Response.json({ ok: true });
}
