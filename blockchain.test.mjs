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

test("adds a transaction to pending transactions", () => {
  const blockchain = new Blockchain();
  const transaction = {
    sender: "Alice",
    recipient: "Bob",
    batchId: "batch-1",
    weightKg: 10,
  };

  blockchain.addTransaction(transaction);

  expect(blockchain.pendingTransactions).toEqual([transaction]);
});

test("mines pending transactions into a new block", () => {
  const blockchain = new Blockchain();
  const genesisBlock = blockchain.getLatestBlock();
  const transaction = {
    sender: "Alice",
    recipient: "Bob",
    batchId: "batch-1",
    weightKg: 10,
  };

  blockchain.addTransaction(transaction);
  const pendingTransactions = blockchain.pendingTransactions;
  const minedBlock = blockchain.minePendingTransactions();

  expect(minedBlock).toBeInstanceOf(Block);
  expect(minedBlock.index).toBe(1);
  expect(minedBlock.transactions).toEqual([transaction]);
  expect(minedBlock.transactions).toBe(pendingTransactions);
  expect(minedBlock.previousHash).toBe(genesisBlock.hash);
  expect(minedBlock.hash.startsWith("0".repeat(blockchain.difficulty))).toBe(
    true,
  );
  expect(blockchain.getLatestBlock()).toBe(minedBlock);
  expect(blockchain.chain).toHaveLength(2);
  expect(blockchain.pendingTransactions).toEqual([]);
  expect(blockchain.pendingTransactions).not.toBe(pendingTransactions);
});

test("uses difficulty 1 in the test environment", () => {
  const blockchain = new Blockchain();

  expect(blockchain.difficulty).toBe(1);
});

test("returns true for a chain containing a properly mined block", () => {
  const blockchain = new Blockchain();
  blockchain.addTransaction({
    sender: "Alice",
    recipient: "Bob",
    batchId: "batch-1",
    weightKg: 10,
  });

  blockchain.minePendingTransactions();

  expect(blockchain.isChainValid()).toBe(true);
});

test("returns false after a transaction inside a mined block is modified", () => {
  const blockchain = new Blockchain();
  blockchain.addTransaction({
    sender: "Alice",
    recipient: "Bob",
    batchId: "batch-1",
    weightKg: 10,
  });
  const minedBlock = blockchain.minePendingTransactions();

  minedBlock.transactions[0].weightKg = 20;

  expect(blockchain.isChainValid()).toBe(false);
});

test("returns false when a block no longer links to the preceding block", () => {
  const blockchain = new Blockchain();
  blockchain.addTransaction({
    sender: "Alice",
    recipient: "Bob",
    batchId: "batch-1",
    weightKg: 10,
  });
  const minedBlock = blockchain.minePendingTransactions();

  minedBlock.previousHash = "incorrect-previous-hash";
  minedBlock.hash = minedBlock.calculateHash();

  expect(blockchain.isChainValid()).toBe(false);
});

test("returns the genesis block as the latest block", () => {
  const blockchain = new Blockchain();

  expect(blockchain.getLatestBlock()).toBe(blockchain.chain[0]);
});

test("adds a block to a valid chain", () => {
  const blockchain = new Blockchain();
  const block = new Block(
    1,
    new Date().toISOString(),
    [],
    blockchain.getLatestBlock().hash,
  );

  blockchain.addBlock(block);

  expect(blockchain.chain).toHaveLength(2);
  expect(blockchain.getLatestBlock()).toBe(block);
});

test("throws a TypeError when chain is undefined", () => {
  const blockchain = new Blockchain();
  const block = new Block(1, new Date().toISOString(), []);
  blockchain.chain = undefined;

  const addBlock = () => blockchain.addBlock(block);

  expect(addBlock).toThrowError(TypeError);
  expect(addBlock).toThrowError("Chain must be an array");
});

test('throws a TypeError when chain is "abc"', () => {
  const blockchain = new Blockchain();
  const block = new Block(1, new Date().toISOString(), []);
  blockchain.chain = "abc";

  const addBlock = () => blockchain.addBlock(block);

  expect(addBlock).toThrowError(TypeError);
  expect(addBlock).toThrowError("Chain must be an array");
});
