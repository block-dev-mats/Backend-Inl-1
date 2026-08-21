import express from "express";
import { Blockchain } from "./blockchain.mjs";

function validateTransaction(request, response, next) {
  const { sender, recipient, batchId, weightKg } = request.body ?? {};
  const hasRequiredStrings = [sender, recipient, batchId].every(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
  const hasValidWeight = Number.isFinite(weightKg) && weightKg > 0;

  if (!hasRequiredStrings || !hasValidWeight) {
    return response.status(400).json({ error: "Invalid transaction" });
  }

  return next();
}

export function createApp(blockchain = new Blockchain()) {
  const app = express();

  app.use(express.json());

  app.get("/blockchain", (request, response) => {
    return response.status(200).json(blockchain.chain);
  });

  app.post("/transactions", validateTransaction, (request, response) => {
    blockchain.addTransaction(request.body);

    return response.status(201).json(request.body);
  });

  app.post("/mine", (request, response) => {
    const minedBlock = blockchain.minePendingTransactions();

    return response.status(201).json(minedBlock);
  });

  return app;
}
