import express from "express";
import { Blockchain } from "./blockchain.mjs";

export function createApp(blockchain = new Blockchain()) {
  const app = express();

  app.use(express.json());

  app.get("/blockchain", (request, response) => {
    return response.status(200).json(blockchain.chain);
  });

  app.post("/transactions", (request, response) => {
    blockchain.addTransaction(request.body);

    return response.status(201).json(request.body);
  });

  app.post("/mine", (request, response) => {
    const minedBlock = blockchain.minePendingTransactions();

    return response.status(201).json(minedBlock);
  });

  return app;
}
