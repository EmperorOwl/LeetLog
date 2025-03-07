type MockProblem = {
  number?: number | string;
  title?: string;
  difficulty?: string;
  topic?: string;
};

const validProblems: MockProblem[] = [
  {
    number: 1,
    title: "Two Sum",
    difficulty: "easy",
    topic: "hashmap",
  },
  {
    number: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    topic: "linked list",
  },
  {
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    topic: "sliding window",
  },
  {
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    topic: "binary search",
  },
  {
    number: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    topic: "1 dp",
  },
  {
    number: 6,
    title: "Zigzag Conversion",
    difficulty: "medium",
    topic: "sliding window",
  },
];

const invalidProblems: [string, MockProblem][] = [
  ["empty", {}],
  ["missing number", { title: "Two Sum", difficulty: "easy" }],
  ["missing title", { number: 1, difficulty: "easy" }],
  ["missing difficulty", { number: 1, title: "Two Sum" }],
  ["missing topic", { number: 1, title: "Two Sum", difficulty: "easy" }],
  ["invalid number", { number: "one", title: "Two Sum", difficulty: "easy" }],
  ["invalid difficulty", { number: 1, title: "Two Sum", difficulty: "simple" }],
  [
    "invalid topic",
    { number: 1, title: "Two Sum", difficulty: "easy", topic: "test" },
  ],
];

export { MockProblem, validProblems, invalidProblems };
