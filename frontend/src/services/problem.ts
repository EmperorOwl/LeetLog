import Problem from "../types/Problem.ts";

const API_URL = "/leetlog/api/problems";

const request = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (response.status == 204) {
    return;
  }
  if ([401, 404, 500].includes(response.status)) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error);
  }
  return json;
};

const fetchProblems = async () => {
  return request(API_URL, {});
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
