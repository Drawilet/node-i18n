import { Strategy } from "./Strategy";

export interface Config {
  strategy: Strategy;
  locales: Locale[];
  defaultLocale: Locale;

  cache_path: string;
  output_path: string;
  output_mode: "merged" | "separated";

  inputs: Record<string, string>;

  parser?: (route: string) => string;
}
