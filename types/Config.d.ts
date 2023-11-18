import { Strategy } from "./Strategy";

export interface Config {
  strategy: Strategy;
  locales: Locale[];
  defaultLocale: Locale;
  files: string;
  cache_path: string;
  data_path: string;
}
