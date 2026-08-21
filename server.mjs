import { createApp } from "./app.mjs";

const port = 3000;
const app = createApp();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
