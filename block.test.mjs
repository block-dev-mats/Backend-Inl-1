import { expect, test } from "vitest";
import { Block } from "./block.mjs";

test("stores block values", () => {
  const transactions = [
    {
      sender: "Alice",
      recipient: "Bob",
      batchId: "1",
      weightKg: 10,
    },
  ];
  const block = new Block(
    1,
    "2026-08-18T12:00:00.000Z",
    transactions,
    "previous-hash",
  );

  expect(block).toMatchObject({
    index: 1,
    timestamp: "2026-08-18T12:00:00.000Z",
    transactions,
    previousHash: "previous-hash",
    nonce: 0,
  });
});

test("returns the same hash for the same values", () => {
  const transactions = [
    {
      sender: "Alice",
      recipient: "Bob",
      batchId: "1",
      weightKg: 10,
    },
  ];
  const firstBlock = new Block(
    1,
    "2026-08-18T12:00:00.000Z",
    transactions,
    "previous-hash",
  );
  const secondBlock = new Block(
    1,
    "2026-08-18T12:00:00.000Z",
    transactions,
    "previous-hash",
  );

  const firstHash = firstBlock.calculateHash();
  const secondHash = secondBlock.calculateHash();

  expect(firstHash).toBe(secondHash);
});
