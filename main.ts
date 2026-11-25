// The Most Boring Object, Reviewed in One Line
// make.fun bounty: u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3
// The program writes one review, one line, at most 200 characters,
// of the most boring everyday object it can name: the cotton bud.
//
// Why the cotton bud: its defining, true, recognisable failure IS the joke.
// It is hired to clean your ear and instead pushes the wax further in,
// then gets thrown away for doing exactly what you asked. The dullness
// of the object — a little stick with cotton on both ends — is the joke:
// it cannot do its one job, and nobody expects more of it anyway.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const REVIEW =
  "The cotton bud cleans nothing: it just pushes the wax further in, then gets thrown away for doing exactly what you asked.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function selfCheck(text: string): void {
  const lines = text.split("\n").filter((line) => line.length > 0);
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly one line, got ${lines.length}`);
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (!text.toLowerCase().includes("cotton bud")) {
    throw new Error("entry must name the boring object it reviews");
  }
  if (text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
}

selfCheck(REVIEW);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, REVIEW, "utf8");
chmodSync(OUTPUT_FILE, 0o644);
console.log(`Wrote ${REVIEW.length} characters to ${OUTPUT_FILE}`);
