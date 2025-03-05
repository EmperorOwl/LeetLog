const loginUser = async (username: string, password: string) => {
  const response = await fetch("/leetlog/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (response.status == 500) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error);
  }
  return json.token;
};

export { loginUser };
