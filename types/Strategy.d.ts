import { Locale } from "./Locale";
import { CacheStrategy } from "./Strategy/Cache";

export interface Strategy {
  id: string;
  get(
    text: string,
    { from, to }: { from: Locale; to: Locale }
  ): Promise<string>;
}
