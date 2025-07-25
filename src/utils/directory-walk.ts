import fs from "fs";
import path from "path";

export function* walk(dirPath: string): Generator<[string, string[], string[]]> {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];
  const dirs = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      dirs.push(entry.name);
    } else {
      files.push(entry.name);
    }
  }

  yield [dirPath, dirs, files];

  for (const dir of dirs) {
    // 递归地对子目录调用 walk*
    yield* walk(path.join(dirPath, dir));
  }
}