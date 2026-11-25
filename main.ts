// The Funniest Office Joke, Judged Head to Head — make.fun entry (v2).
// Writes one original one-line office joke to
// $MAKEFUN_OUTPUT_DIR/entry.txt (defaults to /output/entry.txt).
// v2: the printer/scanner angle — the printer jams on the deadline,
// and the turn is that the scanner is the only thing working, used to
// photograph the error for IT instead of fixing anything.
// Run: node main.ts (Node 22+, erasable TypeScript only).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE: string =
  "The printer jams on the deadline, and the only part of it that works perfectly is the scanner used to photograph the error for IT.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Gate: single line, 1-200 characters, not only whitespace.
  if (JOKE.length < MIN_CHARS || JOKE.length > MAX_CHARS) {
    throw new Error(
      `joke is ${JOKE.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (/[\r\n]/.test(JOKE) || JOKE.trim().length === 0) {
    throw new Error("joke must be a single non-blank line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");

  // Read it back and refuse to finish unless disk holds exactly the joke.
  const onDisk: string = readFileSync(outPath, "utf8");
  if (onDisk !== JOKE) {
    throw new Error("read-back mismatch: entry.txt does not match the joke");
  }

  console.log(`wrote ${onDisk.length} chars to ${outPath}`);
}

main();
