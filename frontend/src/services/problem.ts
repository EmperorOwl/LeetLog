import Problem from "../types/Problem.ts";

const API_URL = "/leetlog/api/problems";

const request = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  switch (response.status) {
    case 204:
      return;
    case 401:
      throw new Error("401 Unauthorized");
    case 404:
      throw new Error("404 Not Found");
    case 500:
      throw new Error("500 Internal Server Error");
  }
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error);
  }
  return json;
};

const fetchProblems = async (listFilter: string) => {
  return request(`${API_URL}?list=${listFilter}`, {});
};

const fetchProblem = async (number: string) => {
  return request(`${API_URL}/${number}`, {});
};

const createProblem = async (problem: Problem, token: string) => {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(problem),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

const updateProblem = async (problem: Problem, token: string) => {
  return request(`${API_URL}/${problem.number}`, {
    method: "PUT",
    body: JSON.stringify(problem),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

const deleteProblem = async (problem: Problem, token: string) => {
  return request(`${API_URL}/${problem.number}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export {
  fetchProblems,
  fetchProblem,
  createProblem,
  updateProblem,
  deleteProblem,
};
