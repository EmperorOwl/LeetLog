import request from "supertest";

import app from "../app";
import "./setup";

describe("Problem", () => {
  it("should create a problem", async () => {
    let response = await request(app).post("/api/user/login").send({
      username: "admin",
      password: "admin",
    });
    const token = response.body.token;

    response = await request(app)
      .post("/api/problems")
      .set("Authorization", token)
      .send({
        title: "Two Sum",
        difficulty: "easy",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Two Sum");
  });
});
