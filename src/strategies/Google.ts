import { Locale } from "types/Locale";
import { Strategy } from "types/Strategy";

import { translate } from "@vitalets/google-translate-api";
import { HttpProxyAgent } from "http-proxy-agent";

class GoogleStrategy implements Strategy {
  public id = "google-translate";
  public fetchOptions;

  constructor(agent?: string) {
    if (agent) this.fetchOptions = { agent: new HttpProxyAgent(agent) };
  }

  async get(
    text: string,
    { from, to, context }: { from: Locale; to: Locale; context?: string }
  ) {
    const res = await translate(`[(${context})] ${text}`, {
      from,
      to,
      fetchOptions: this.fetchOptions,
    });
    const cleanedText = res.text.replace(/\[\((.*?)\)\]/g, "").slice(1);

    return cleanedText;
  }
}

export default GoogleStrategy;
