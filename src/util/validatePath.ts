import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";

export const validatePath = (path: string, data?: any) => {
  if (existsSync(path)) return;

  if (data) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, data, { encoding: "utf-8" });
  } else mkdirSync(path, { recursive: true });
};
