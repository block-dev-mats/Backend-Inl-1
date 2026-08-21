import request from "supertest";
import { describe, expect, test } from "vitest";
import { createApp } from "./app.mjs";
import { Blockchain } from "./blockchain.mjs";

function createTestApp() {
  return createApp(new Blockchain());
}

describe("blockchain API", () => {
  test("GET /blockchain initially returns the genesis block", async () => {
    const app = createTestApp();

    const response = await request(app).get("/blockchain");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      index: 0,
      transactions: [],
      previousHash: "",
    });
  });

  test("POST /mine returns a block containing the accepted transaction", async () => {
    const app = createTestApp();
    const transaction = {
      sender: "Alice",
      recipient: "Bob",
      batchId: "batch-1",
      weightKg: 10,
    };

    const transactionResponse = await request(app)
      .post("/transactions")
      .send(transaction);
    const mineResponse = await request(app).post("/mine");

    expect(transactionResponse.status).toBe(201);
    expect(transactionResponse.body).toEqual(transaction);
    expect(mineResponse.status).toBe(201);
    expect(mineResponse.body.transactions).toContainEqual(transaction);
  });

  test("GET /blockchain returns the genesis and newly mined blocks", async () => {
    const app = createTestApp();
    const transaction = {
      sender: "Alice",
      recipient: "Bob",
      batchId: "batch-1",
      weightKg: 10,
    };

    await request(app).post("/transactions").send(transaction);
    const mineResponse = await request(app).post("/mine");
    const blockchainResponse = await request(app).get("/blockchain");

    expect(blockchainResponse.status).toBe(200);
    expect(blockchainResponse.body).toHaveLength(2);
    expect(blockchainResponse.body[0].index).toBe(0);
    expect(blockchainResponse.body[1]).toEqual(mineResponse.body);
  });
});
