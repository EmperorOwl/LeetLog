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

const fetchProblems = async (listFilter: string, topicFilter: string) => {
  const params: { [key: string]: string } = {};
  if (listFilter !== "all") {
    params["list"] = listFilter;
  }
  if (topicFilter !== "all") {
    params["topic"] = topicFilter;
  }
  const apiUrl = API_URL + "?" + new URLSearchParams(params).toString();
  return request(apiUrl, {});
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

const updateProblem = async (number: number, problem: Problem, token: string) => {
  return request(`${API_URL}/${number}`, {
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
