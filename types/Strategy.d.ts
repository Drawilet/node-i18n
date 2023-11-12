import { Locale } from "./Locale";

export interface Strategy {
  id: string;
  get(
    text: string,
    { from, to, context }: { from: Locale; to: Locale; context?: string }
  ): Promise<string>;
}
