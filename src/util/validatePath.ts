import { existsSync, mkdirSync, writeFileSync } from "fs";

export const validatePath = (path: string, data?: any) => {
  if (!existsSync(path))
    if (data) writeFileSync(path, data);
    else mkdirSync(path);
};
