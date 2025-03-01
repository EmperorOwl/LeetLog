import request from "supertest";

import app from "../app";
import { Problem } from "../models/problem";
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

const test_get_problems = (count: number) => {
  test(`Get all problems: ${count}`, async () => {
    const response = await request(app)
      .get("/api/problems")
      .set("Authorization", app.locals.token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
  });
};

const test_update_problem = () => {
  test(`Update problem`, async () => {
    const doc = await Problem.findOne();
    if (!doc) {
      throw new Error("No problem found");
    }
    const response = await request(app)
      .put(`/api/problems/${doc._id}`)
      .set("Authorization", app.locals.token)
      .send({ title: "Updated Title" });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
  });
};

const test_delete_problem = () => {
  test(`Delete problem`, async () => {
    const doc = await Problem.findOne();
    if (!doc) {
      throw new Error("No problem found");
    }
    const response = await request(app)
      .delete(`/api/problems/${doc._id}`)
      .set("Authorization", app.locals.token);
    expect(response.status).toBe(204);
  });
};

describe("Happy Case", () => {
  beforeAll(async () => {
    const response = await request(app).post("/api/user/login").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    app.locals.token = response.body.token;
  });

  problems.forEach((problem) => {
    test_create_problem(
      problem,
      `Add problem: ${problem.number}. ${problem.title}`,
    );
  });
  test_get_problems(problems.length);

  test_update_problem();

  test_delete_problem();
  test_get_problems(problems.length - 1);
});
