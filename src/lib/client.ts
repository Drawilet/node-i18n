import I18nBase from "./base";
import I18nInstance from "./instance";

class I18nClient extends I18nBase {
  constructor() {
    super();
  }

  public Instance(type?: string) {
    return new I18nInstance(this, type ?? this.defaultInput);
  }
}

export default I18nClient;
