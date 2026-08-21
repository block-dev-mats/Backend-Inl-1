import crypto from "node:crypto";

export class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const payload =
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions);

    return crypto.createHash("sha256").update(payload).digest("hex");
  }
}
