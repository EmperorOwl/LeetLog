type mockProblem = {
  number?: number | string;
  title?: string;
  difficulty?: string;
};

const validProblems: mockProblem[] = [
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
];

const invalidProblems: [string, mockProblem][] = [
  ["empty", {}],
  ["missing number", { title: "Two Sum", difficulty: "easy" }],
  ["missing title", { number: 1, difficulty: "easy" }],
  ["missing difficulty", { number: 1, title: "Two Sum" }],
  ["invalid number", { number: "one", title: "Two Sum", difficulty: "easy" }],
  ["invalid difficulty", { number: 1, title: "Two Sum", difficulty: "simple" }],
];

export { validProblems, invalidProblems };
