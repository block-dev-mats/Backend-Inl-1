import { expect, test } from "vitest";
import { add } from "./add.js";

test("adds 1 and 2", () => {
  expect(add(1, 2)).toBe(3);
});

test("throws when inputs are not numbers", () => {
  expect(() => add("abc", "åäö")).toThrow();
});
