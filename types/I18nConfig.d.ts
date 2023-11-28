import { Config } from "./Config";

export default interface I18nConfig extends Config {
  inputs: Array<
    string,
    {
      id: string;
      dir: string;
    }
  >;
}
