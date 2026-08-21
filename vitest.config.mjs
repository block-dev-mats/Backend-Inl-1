import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: [["text", { skipFull: false }]],
      include: [
        "app.mjs",
        "block.mjs",
        "blockchain.mjs",
        "add.js",
        "transactions.js",
        "server.mjs",
      ],
      exclude: [
        "**/*.test.*",
        "**/*.spec.*",
        "node_modules/**",
        "coverage/**",
        "vitest.config.mjs",
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
  },
});
