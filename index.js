const express = require("express");

const app = express();
const port = 3000;

app.get("/blockchain", (request, response) => {
  const transactions = [
    { sender: "", recipient: "", batchId: "1", weightKg: "" },
    { sender: "", recipient: "", batchId: "2", weightKg: "" },
  ];

  return response.json(transactions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
