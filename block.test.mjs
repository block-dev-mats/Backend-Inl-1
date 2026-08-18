import { expect, test } from "vitest";
import { Block } from "./block.mjs";

test("stores block values", () => {
  const block = new Block(
    1,
    "2026-08-18T12:00:00.000Z",
    "example data",
    "previous-hash",
  );

  expect(block).toMatchObject({
    index: 1,
    timestamp: "2026-08-18T12:00:00.000Z",
    data: "example data",
    previousHash: "previous-hash",
  });
});
