import { Block } from "./block.mjs";

export class Blockchain {
  constructor() {
    const genesisBlock = new Block(0, new Date().toISOString(), [], "");

    this.chain = [genesisBlock];
    this.pendingTransactions = [];
    this.difficulty = process.env.NODE_ENV === "test" ? 1 : 2;
  }

  addBlock(block) {
    if (!Array.isArray(this.chain)) {
      throw new TypeError("Chain must be an array");
    }

    this.chain.push(block);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
}
