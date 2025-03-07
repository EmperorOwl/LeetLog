import { NEETCODE_150 } from "../utils/constants";

test(`Neetcode 150`, () => {
  expect(NEETCODE_150.length).toBe(18);
  expect(NEETCODE_150.flat().length).toBe(150);
});
