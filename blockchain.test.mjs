import { expect, test } from "vitest";
import { Block } from "./block.mjs";
import { Blockchain } from "./blockchain.mjs";

test("starts with exactly one genesis block", () => {
  const blockchain = new Blockchain();

  expect(blockchain.chain).toHaveLength(1);
  expect(blockchain.chain[0]).toBeInstanceOf(Block);
});

test("creates the genesis block with its initial values", () => {
  const beforeCreation = Date.now();
  const blockchain = new Blockchain();
  const afterCreation = Date.now();
  const genesisBlock = blockchain.chain[0];

  expect(genesisBlock.index).toBe(0);
  expect(genesisBlock.transactions).toEqual([]);
  expect(genesisBlock.previousHash).toBe("");
  expect(Date.parse(genesisBlock.timestamp)).toBeGreaterThanOrEqual(
    beforeCreation,
  );
  expect(Date.parse(genesisBlock.timestamp)).toBeLessThanOrEqual(afterCreation);
});

test("starts with no pending transactions", () => {
  const blockchain = new Blockchain();

  expect(blockchain.pendingTransactions).toEqual([]);
});

test("uses difficulty 1 in the test environment", () => {
  const blockchain = new Blockchain();

  expect(blockchain.difficulty).toBe(1);
});

test("returns the genesis block as the latest block", () => {
  const blockchain = new Blockchain();

  expect(blockchain.getLatestBlock()).toBe(blockchain.chain[0]);
});
