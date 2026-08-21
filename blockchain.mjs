import { Block } from "./block.mjs";

export class Blockchain {
  constructor() {
    const genesisBlock = new Block(0, new Date().toISOString(), [], "");

    this.chain = [genesisBlock];
    this.pendingTransactions = [];
    this.difficulty = process.env.NODE_ENV === "test" ? 1 : 2;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
}
