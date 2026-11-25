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
// A boring object earns its review by being boring: no feature, no
// surprise, no second use. The cotton bud qualifies on all three.

import { mkdirSync, readFileSync, writeFileSync, chmodSync } from "node:fs";

const REVIEW =
  "The cotton bud cleans nothing: it just pushes the wax further in, then gets thrown away for doing exactly what you asked.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

// The bounty allows at most 200 characters and exactly one line.
// Every rule the entry must satisfy is checked here, before anything
// is written, so a bad review can never reach the output file.
function selfCheck(text: string): void {
  if (text.includes("\n")) {
    throw new Error("entry must be exactly one line, no newline allowed");
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
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop, like a real review");
  }
}

// After writing, read the file back and prove it is byte-identical to
// the reviewed text: no trailing newline, no encoding surprise, no
// partial write. A review that changed on disk is not the review.
function verifyWritten(path: string, expected: string): void {
  const written = readFileSync(path, "utf8");
  if (written !== expected) {
    throw new Error(
      `output mismatch: file holds ${written.length} characters, expected ${expected.length}`,
    );
  }
}

selfCheck(REVIEW);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, REVIEW, "utf8");
chmodSync(OUTPUT_FILE, 0o644);
verifyWritten(OUTPUT_FILE, REVIEW);
console.log(`Wrote ${REVIEW.length} characters to ${OUTPUT_FILE}`);
