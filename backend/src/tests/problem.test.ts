import request from "supertest";

import app from "../app";
import { dropCollection } from "../db";
import { MockProblem, validProblems, invalidProblems } from "./mock";

import "./setup";

const setToken = async () => {
  const response = await request(app).post("/api/user/login").send({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  app.locals.token = response.body.token;
  console.log("Logged in and token set");
};

const testGetAllProblems = (count: number) => {
  test(`Get all problems (${count})`, async () => {
    const response = await request(app)
      .get("/api/problems")
      .set("Authorization", app.locals.token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
  });
};

const testCreateProblem = (
  problem: MockProblem,
  testDesc: string,
  shouldSucceed: boolean,
) => {
  test(testDesc, async () => {
    const response = await request(app)
      .post("/api/problems")
      .set("Authorization", app.locals.token)
      .send(problem);
    if (shouldSucceed) {
      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
      expect(response.body.number).toBeDefined();
      expect(response.body.title).toBeDefined();
      expect(response.body.difficulty).toBeDefined();
    } else {
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    }
  });
};

const testGetProblem = (number: number, shouldSucceed: boolean) => {
  test(`Get problem #${number}`, async () => {
    const response = await request(app)
      .get(`/api/problems/${number}`)
      .set("Authorization", app.locals.token);
    if (shouldSucceed) {
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
      expect(response.body.number).toBe(number);
    } else {
      expect(response.status).toBe(404);
    }
  });
};

const testUpdateProblem = (
  number: number,
  updatedProblem: MockProblem,
  expectedStatus: number,
) => {
  test(`Update problem #${number}`, async () => {
    const response = await request(app)
      .put(`/api/problems/${number}`)
      .set("Authorization", app.locals.token)
      .send(updatedProblem);
    expect(response.status).toBe(expectedStatus);
    if (expectedStatus == 200) {
      expect(response.body._id).toBeDefined();
      expect(response.body.number).toBe(updatedProblem.number);
      expect(response.body.title).toBe(updatedProblem.title);
      expect(response.body.difficulty).toBe(updatedProblem.difficulty);
    } else if (expectedStatus == 400) {
      expect(response.body.error).toBeDefined();
    }
  });
};

const testDeleteProblem = (number: number, shouldSucceed: boolean) => {
  test(`Delete problem #${number}`, async () => {
    const response = await request(app)
      .delete(`/api/problems/${number}`)
      .set("Authorization", app.locals.token);
    if (shouldSucceed) {
      expect(response.status).toBe(204);
    } else {
      expect(response.status).toBe(404);
    }
  });
};

describe("Happy Case", () => {
  beforeAll(async () => {
    await setToken();
    await dropCollection("problems");
  });

  testGetAllProblems(0);

  validProblems.forEach((problem) => {
    testCreateProblem(problem, `Add problem #${problem.number}`, true);
  });
  testGetAllProblems(validProblems.length);
  testGetProblem(1, true);

  const updatedProblem = JSON.parse(JSON.stringify(validProblems[0])); // Deep copy
  updatedProblem.title = "Updated Title";
  testUpdateProblem(1, updatedProblem, 200);

  testDeleteProblem(2, true);
  testGetAllProblems(validProblems.length - 1);
});

describe("Error Case", () => {
  beforeAll(async () => {
    await setToken();
    await dropCollection("problems");
  });

  invalidProblems.forEach((testCase) => {
    testCreateProblem(testCase[1], `Add problem: ${testCase[0]}`, false);
  });
  testGetAllProblems(0);

  testGetProblem(99, false);
  testUpdateProblem(99, validProblems[0], 404);
  testDeleteProblem(99, false);

  testCreateProblem(validProblems[0], "SETUP: Add problem #1", true);
  const updatedProblem = JSON.parse(JSON.stringify(validProblems[0])); // Deep copy
  updatedProblem.difficulty = "simple";
  testUpdateProblem(1, updatedProblem, 400);
});
