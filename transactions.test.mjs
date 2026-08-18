import { expect, test } from "vitest";
import { addTransaction } from "./transactions.js";

test("adds a transaction", () => {
  const transactions = [];
  const transaction = {
    sender: "Alice",
    recipient: "Bob",
    batchId: "1",
    weightKg: 10,
  };

  addTransaction(transactions, transaction);

  expect(transactions).toContainEqual(transaction);
});
