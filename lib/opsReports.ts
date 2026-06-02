import { existsSync, readFileSync } from "fs";
import { join } from "path";

const reportsDir = join(process.cwd(), "automation", "reports");

export function readAutomationReport<T>(filename: string, fallback: T): T {
  const reportPath = join(reportsDir, filename);

  if (!existsSync(reportPath)) {
    return fallback;
  }

  return JSON.parse(readFileSync(reportPath, "utf8")) as T;
}
