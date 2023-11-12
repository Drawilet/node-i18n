import { Locale } from "types/Locale";
import { Strategy } from "types/Strategy";

import { translate } from "@vitalets/google-translate-api";

class GoogleStrategy implements Strategy {
  public id = "google-translate";

  constructor(id?: string) {
    if (id) this.id = id;
  }

  async get(text: string, { from, to }: { from: Locale; to: Locale }) {
    const res = await translate(text, { from, to });

    return res.text;
  }
}

export default GoogleStrategy;
