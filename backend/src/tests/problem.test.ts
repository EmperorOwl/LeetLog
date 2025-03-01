import request from "supertest";

import app from "../app";
import "./setup";

const problems = [
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

const test_create_problem = (problem: object, testDesc: string) => {
  test(testDesc, async () => {
    const response = await request(app)
      .post("/api/problems")
      .set("Authorization", app.locals.token)
      .send(problem);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.number).toBeDefined();
    expect(response.body.title).toBeDefined();
    expect(response.body.difficulty).toBeDefined();
  });
};

describe("Add new problem", () => {
  beforeAll(async () => {
    const response = await request(app).post("/api/user/login").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    app.locals.token = response.body.token;
  });

  problems.forEach((problem) => {
    test_create_problem(problem, `${problem.number}. ${problem.title}`);
  });
});
