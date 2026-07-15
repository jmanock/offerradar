import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

const runtimeDir = join(process.cwd(), "data", "runtime");

export async function readRuntimeJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(join(runtimeDir, filename), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeRuntimeJson<T>(filename: string, value: T) {
  await mkdir(runtimeDir, { recursive: true });
  const destination = join(runtimeDir, filename);
  const temporary = `${destination}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, destination);
}

export async function appendRuntimeEvent(filename: string, value: unknown) {
  const values = await readRuntimeJson<unknown[]>(filename, []);
  values.push(value);
  await writeRuntimeJson(filename, values.slice(-10000));
}
