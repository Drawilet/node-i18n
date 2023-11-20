import { Strategy } from "./Strategy";

export interface Config {
  strategy: Strategy;
  locales: Locale[];
  defaultLocale: Locale;
  cache_path: string;
  input_path: string;
  output_path: string;
}
