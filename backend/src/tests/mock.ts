type MockProblem = {
  number?: number | string;
  title?: string;
  difficulty?: string;
};

const validProblems: MockProblem[] = [
  {
    number: 1,
    title: "Two Sum",
    difficulty: "easy",
  },
  {
    number: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
  },
  {
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
  },
  {
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
  },
  {
    number: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
  },
  {
    number: 6,
    title: "Zigzag Conversion",
    difficulty: "medium",
  },
];

const invalidProblems: [string, MockProblem][] = [
  ["empty", {}],
  ["missing number", { title: "Two Sum", difficulty: "easy" }],
  ["missing title", { number: 1, difficulty: "easy" }],
  ["missing difficulty", { number: 1, title: "Two Sum" }],
  ["invalid number", { number: "one", title: "Two Sum", difficulty: "easy" }],
  ["invalid difficulty", { number: 1, title: "Two Sum", difficulty: "simple" }],
];

export { MockProblem, validProblems, invalidProblems };
